#### RE-DO THIS AS INTERACTIVE QUARTO DOCUMENT ON UNIVERSITY SERVER

# Set timer to record run time
start_time <- Sys.time()



# 1. LOAD LIBRARIES ==================================================================================

library(sf) # simple features - geospatial library
library(tidyverse) # data munging
library(here) # relative path management
library(RPostgres) # connecting to PostGIS - note that older package "RpostgreSQL" tried first but there were problems with exporting sf layers to PostGIS
library(DBI) # database
library(beepr) # sound alarm when code chunk has run (for testing code run time)
library(furrr) # parallel processing in tidyverse
library(future) # parallel processing
library(leaflet) # interactive leaflet maps
library(leaflet.extras) # plugins for leaflet
library(RColorBrewer) # colour palettes for plotting with ggplot2
library(scales) # scales functions for plotting
library(dbplyr) # For in_schema function (used in postgres testing)



# 2. POSTGIS DATABASE CONNECTION SETUP ================================================================

# Load postgis db connection details from file (to hide when sharing online)
source(here("Scripts", "postgres.credentials.R"))

# Set database names for connections
dbname.usw <- "usw_research"
dbname.rob <- "rob_research"

# Create generic function to connect to PostgreSQL database - takes parameters that define the specifics of the database connection, such  host, port, dbname, user, and password.
create_conn <- function(host, port, dbname, user, password) {
  # Attempt to create the DBI connection within a tryCatch to handle potential errors
  conn <- tryCatch({
    # Directly construct the PostgreSQL connection string and attempt connection
    dbConnect(RPostgres::Postgres(), dbname=dbname, host=host, port=port, user=user, password=password)
  }, error = function(e) {
    # Return an error indicator instead of stopping the script
    NULL
  })
  
  # Check if connection was successful
  if (is.null(conn)) {
    warning("Connection unsuccessful. Please check your settings.")
  } else {
    print("Connected successfully to the database.")
    return(conn)
  }
}
# Create first Postgres connection to load data from 'usw_research' database 
conn.usw_research <- create_conn(host, port, dbname.usw, user, password)



# 3. DATA IMPORT - HOUSEHOLDS=========================================================================

# ISOCHRONE LAYERS

# Generate list of input isochrone layers from PostGIS
iso_poly_names <- paste0("iso_poly", 1:6, "_400")  # Adjust the sequence as needed

# Create SQL select queries to grab all isochrone polys from each layer
qry_iso <- paste("SELECT * FROM isochrones.", iso_poly_names, sep = "")

# Function to take a SQL query, execute it to read in the spatial data (isochrones) using st_read, and then rename the id column for clarity and later use - also filters out non-polygon geometries produced by some of the isochrone algorithms and calculates areas ofd polygons for later
read_and_rename <- function(qry_iso, conn) {
  st_read(conn.usw_research, query = qry_iso) |> 
    # Ensure any invalid geometries are made valid
    mutate(the_geom = st_make_valid(the_geom)) %>%
    # Filter to retain only POLYGON and MULTIPOLYGON geometries
    filter(st_geometry_type(the_geom) %in% c("POLYGON", "MULTIPOLYGON")) %>%
    # Calculate area for each geometry and add it as a new column
    mutate(area_m2 = st_area(the_geom)) %>%
    # Select and rename columns as needed
    select(id_iso = id, area_m2)
}

# Use purrr's "map" function to apply the 'read_and_rename' function to each query string in the list. This step will execute each query, read the result into R as an sf object, rename the id column, and store the imported isochrone layers in a list 'iso_list'.
tryCatch({
iso_list <- purrr::map(qry_iso, ~read_and_rename(.x, conn.usw_research))
}, error = function(e) {
  print(e)
})
# Give each element of 'iso_list' a name corresponding to its isochrone number (for easier access).
iso_list <- iso_list |> 
  set_names(paste0("isocrn", 1:length(iso_list)))




# ADDRESS BASE

qry_add <- "SELECT * FROM addbase.ab_rd"
# Read in as SF (i.e. geospatial point) object
addBase <- st_read(conn.usw_research, query = qry_add)
# Select only ID column to reduce object size
addBase <- addBase |> 
  select(id)
# Create a non-spatial (geom removed) version of AddressBase layer for later use (in anti-joins) 
addBase.ng <- addBase
st_geometry(addBase.ng) = NULL


## Population data

## PHARMACIES...



# Close database connection when all data has been imported
DBI::dbDisconnect(conn.usw_research)




# 4. CALCS - HOUSEHOLDS WITHIN ISOCHRONES ####

# First step is to count the number of households that fall within isochrones for each of the different isochrone layers - we are interested in overall number of households per layer, not the number of households in each polygon (2nd step)

# Get length (i.e. number of elements in) of iso_list
N <- length(iso_list) 
# Generate character vector containing names of the output points (AddressBase) layers that will be generated from below function 
pts_names <- paste0("pts.isocrn", 1:N)


# Define a function to:
# 1) Spatially intersect each isochrone layer with the AddressBase layer
# 2) If an address point (and they will) intersects more than one isochrone polygon in a particular isochrone layer, then count it only once.
# 3) MORE...
fun_isocrn <- function(isocrn, addBase, addBase.ng) {
  # Check if CRS match (27700), and if not, transform 'isocrn' to match 'addBase' - which is set at 27700
  if (!st_crs(isocrn) == st_crs(addBase)) {
    isocrn <- st_transform(isocrn, st_crs(addBase))
  }
  # Spatially intersect AddressBase points with isochrones
  # int <- st_intersection(addBase, isocrn)
  int <- st_intersection(addBase, iso_list$isocrn1)
  # We only need to know if a point lies within an isochrone - the number of isochrones   intersected by is irrelevant in this step. Therefore, group the AddressBase points by point "id" and select (slice) the first row (single address) in each group. Remove "area_m2" colun for subsequent binding. 
  int.grpd <- int |> 
    group_by(id) |> 
    select(-area_m2) |> 
    slice(1) |> 
    ungroup()
  # Perform anti-join with non-spatial version of AddressBase data to generate a data frame of points that did not intersect with isochrone polys (anti-join will not work with two spatial layers)
  addBase.noInt <- dplyr::anti_join(addBase.ng, int.grpd, by = "id")
    # Create a spatial layer of the non-intersecting points
  addBase.noInt.geo <- addBase |> 
    filter(id %in% addBase.noInt$id)
    # Create a new column "id_iso" and populate with NA (i.e. these points do not fall within a polygon and therefore have no isochrone ID - "id_iso")
  addBase.noInt.geo$id_iso <- NA
  # Bind the "int.grpd" and "addBase.noInt.geo" rows together to produce a final layer showing unique addressBase points and whether they intersect with an isochrone poly
  pts.isocrn <- rbind(int.grpd, addBase.noInt.geo)
  # Add numeric column "iso_YN" containign "1" or "0" to indicate whether points fall in isochrone polygon. 
  pts.isocrn <- pts.isocrn |> 
    mutate(isochroneYN = if_else(!is.na(id_iso), 1, 0))
  # Layer gets added to list "Result"
}

# Set up parallel processing for the function 'fun_isocrn"
# Set up multiprocess with one less core than we have
no_cores <- future::availableCores() - 1
# Increase max allowable size (from 500MB) of the global variable objects that function needs to access to execute in each parallel session.
options(future.globals.maxSize = 2 * 1024^3)  # Increase limit to 2 GB
# Initiate the parallel processing 'plan'
future::plan(multicore, workers = no_cores)


# Execute the 'fun_isocrn' function in parallel over each element in 'iso_list', passing 'addBase' and 'addBase.ng' as additional fixed arguments. The 'future_map' function applies 'fun_isocrn' to each isochrone layer ('.x' from 'iso_list'). The resulting list of processed spatial data frames ('sf' objects) is stored in 'result', with each element corresponding to the output from 'fun_isocrn' applied to an individual isochrone layer.
result <- future_map(iso_list, ~fun_isocrn(.x, addBase, addBase.ng)) |> 
  # Assign a name to each element (point layer) in the generated list based on 'pts.names'
  set_names(pts_names) 



## EXPORT TO POSTGIS
#> Export layers in result to Postgres - 'rob_research > isochrones'

# Open connection to 'rob_research' database for exporting generated layers to Postgres server
conn.rob_research <- create_conn(host, port, dbname.rob, user, password)
# Function to iterate through 'Result' list and export each point layer (addresses) to PostGIS
export_postgis <- function(sf_layer, layer_name) {
  # Full table name including schema
  table_name <- paste0("isochrones.", layer_name)
  # Export to PostGIS using the existing connection
  st_write(sf_layer, dsn = conn.rob_research, Id(schema="isochrones", table = layer_name), delete_layer = TRUE)
}
# Iterate over the names of each layer in the 'result' list of sf layers and pass layer names and sf layers themselves to export function above
names(result) %>%
  purrr::walk(function(layer_name) {
    # For each layer name, call the 'export_layer_to_postgis' function.
    # This function exports the corresponding 'sf' layer (accessed by 'result[[layer_name]]')
    # to a PostGIS database, using the layer's name as the table name.
    export_postgis(result[[layer_name]], layer_name)
  })
# Close DB connection
DBI::dbDisconnect(conn.rob_research)





# 5. ANALYSIS - HOUSEHOLDS WITHIN ISOCHRONES - OVERALL ####


# Combine pts.isocrn layers from "result" list
# Iterate over the list
pts.iso.combined <- map2_df(result, names(result), function(x, name) {
  # Extract the numeric part from the name
  isocrn_ID <- as.integer(str_extract(name, "\\d+"))
  # Add the extracted number as a new column
  mutate(x, iso_layer_id =  isocrn_ID)
})


# Export to PostGIS
# Re-open DB connection
conn.rob_research <- create_conn(host, port, dbname.rob, user, password)
# Write to server
st_write(pts.iso.combined, dsn = conn.rob_research, Id(schema="isochrones", table = "pts.isocrns.combined"), delete_layer = TRUE)
# Create version with geom removed (regular data frame) for statistical analysis
pts.isocrns.ng <- st_drop_geometry(pts.iso.combined)
glimpse(pts.isocrns.ng)
# Export non geo table to PostGIS
DBI::dbWriteTable(conn.rob_research, "isochrones.pts.isocrns.ng", pts.isocrns.ng , overwrite = TRUE, row.names = FALSE)



## PLOTS ###

# Create a custom theme for consistency with plotting
my_custom_theme <- theme_bw() + 
  theme(
    text = element_text(family = "Arial", color = "#333333"),
    plot.background = element_rect(fill = "white", color = NA), # Set plot background to white
    panel.background = element_rect(fill = "white", color = NA), # Set panel background to white
   
  )
# Apply the theme globally 
theme_set(my_custom_theme)
  
# Custom function to save plots with a default size
save_my_plot <- function(plot, filename, width = 8, height = 5, dpi = 300) {
    ggsave(plot = plot, filename = filename, width = width, height = height, dpi = dpi)
  } 

# Define a custom label function to shorten numerical labels for number of households in millions
# For xaxis
label_M <- function() {
  function(x) {
    paste0(formatC(x / 1000000, format = "f", digits = 1), "M")
  }
}

plot1_data <- pts.isocrns.ng %>%
  group_by(iso_layer_id, isochroneYN) %>%
  summarise(n = n(), .groups = 'drop') 



# Calculate the label position for household counts and percentages within stacked bars
plot1_data <- pts.isocrns.ng|> 
  arrange(iso_layer_id, desc(isochroneYN))|> 
  group_by(iso_layer_id) |> 
  mutate(total_count = sum(isochroneYN),
         n = n(),
         percentage = n / total_count * 100,
         label_position = cumsum(n) - 0.02 * cumsum(n),
         # Creating a combined label with count and percentage, with formatting
         combined_label = paste(format(n, big.mark = ","), "\n(", sprintf("%.1f%%", percentage), ")", sep = "")) |> 
  ungroup()

glimpse(pts.isocrns.ng)
glimpse(plot1)



plot1_data <- pts.isocrns.ng %>%
  arrange(iso_layer_id, desc(isochroneYN)) %>%
  group_by(iso_layer_id) %>%
  mutate(total_count = sum(n), 
         percentage = isochroneYN / total_count * 100,
         label_position = cumsum(isochroneYN) - 0.02 * cumsum(isochroneYN),
         combined_label = paste(format(isochroneYN, big.mark = ","), "\n(", sprintf("%.1f%%", percentage), ")", sep = "")) %>%
  ungroup()










# We want to offset the label position slightly down for '1' values
label_data <- plot1_data |> 
  filter(isochroneYN == 1) 


# Create plot - FINE TUNE POSITION OF EXIST, CHANGE LABELS AND RMEOVE LEND TITLE - REFORMAT 
plot1 <- ggplot(plot1_data, aes(x = as.factor(iso_layer_id), y = n, fill = factor(isochroneYN))) +
  geom_bar(stat = "identity", position = "stack") +
  scale_fill_brewer(palette = "Set2", labels = c("0" = "Outside isochrones", "1" = "Inside isochrones"), name = "IsochroneYN") +
  geom_text(data = label_data, aes(x = as.factor(iso_layer_id), y = label_position, label = combined_label), vjust = 1, color = "black", size = 3) +
  scale_y_continuous(labels = label_M()) + # Use the custom label function here
  theme(legend.title = element_blank()) + 
  labs(title = "Households within isochrones", x = "Isochrone layer ID", y = "No. of households") +
  my_custom_theme
# View plot
plot1
# Export plot
save_my_plot(plot1, here("Out", "1_Households_Analysis", "Plot1.1_HHs_by_iso_layer_BAR.png"))




# 6. ANALYSIS - DISTRIBUTION OF HOUSHOLD COUNTS=========================================================

# Calculate number of households per polygon, per ischrone layer
hh.poly.data <- pts.isocrns.ng |> 
  filter(isochroneYN ==1) |> # remove households outside poly
  group_by(iso_layer_id, id_iso) |> 
  summarise(n = n())
# Ensure iso_layer_id is a factor
hh.poly.data$iso_layer_id <- as.factor(hh.poly.data$iso_layer_id)


# Boxplot 
plot2 <- ggplot(hh.poly.data, aes(x = iso_layer_id, y = n, fill = iso_layer_id)) +
  geom_boxplot(alpha = 0.5) +
  my_custom_theme +
  scale_y_log10() + # Log-transform the y-axis
  labs(x = "Isochrone layer ID", y = "No. of Households (log10)",
       title = "Distribution of households per polygon, per isochrone layer") +
  theme(legend.position = "none")
  # theme(legend.title = element_blank())
# View plot
plot2
# Export plot
save_my_plot(plot2, here("Out", "1_Households_Analysis", "Plot1.2_HHs_per_poly_BOX_log10.png"))


# Violin plot (Plot3)
plot3 <- ggplot(hh.poly.data, aes(x = iso_layer_id, y = n, fill = iso_layer_id)) +
  geom_violin(trim = TRUE, alpha = 0.5) + # Use a violin plot and keep all data
  my_custom_theme +
  scale_y_log10() + # Log-transform the y-axis
  labs(x = "Isochrone layer ID", y = "No. of Households (log10)",
       title = "Distribution of households per polygon, per isochrone layer") +
  theme(legend.position = "none")
# View plot
plot3
# Export plot
save_my_plot(plot3, here("Out", "1_Households_Analysis", "Plot1.3_HHs_per_poly_VIOLIN_log10.png"))

# Calculate summary statistics
summary_stats <- hh.poly.data %>%
  group_by(iso_layer_id) %>%
  summarise(
    Count = n(),
    Mean = mean(n, na.rm = TRUE),
    Median = median(n, na.rm = TRUE),
    SD = sd(n, na.rm = TRUE),
    Min = min(n, na.rm = TRUE),
    Max = max(n, na.rm = TRUE),
    .groups = 'drop'  # This drops the grouping structure after summarising
  )
# Export as CSV table
write_csv(summary_stats, here("Out", "1_Households_Analysis", "summary_statistics_housholds_per_layer.csv"))



# Faceted density plot - without log transform (Plot 4)
plot4 <- ggplot(hh.poly.data, aes(x = n)) + 
  geom_density(aes(fill = iso_layer_id), alpha = 0.5) + # Adjust alpha for transparency
  facet_wrap(~ iso_layer_id, scales = 'fixed') + 
  my_custom_theme +
  labs(x = "Isochrone layer ID", y = "No. of Households",
       title = "No households per polygon, per isochrone layer") +
  labs(title = "Distribution of households per polygon, per isochrone layer", x = "Households (count) - log10", y = "Density", fill = "Isochrone layer") 
# View plot
plot4
# Export plot
save_my_plot(plot4, here("Out", "1_Households_Analysis", "Plot1.4_HHs_per_poly_DENSITY.png"))


# Faceted density plot - with log10 transform
plot5 <- ggplot(hh.poly.data, aes(x = n)) + 
  geom_density(aes(fill = iso_layer_id), alpha = 0.5) + # Adjust alpha for transparency
  facet_wrap(~ iso_layer_id, scales = 'free') + 
  my_custom_theme +
  labs(x = "Isochrone layer ID", y = "No. of Households",
       title = "No households per polygon, per isochrone layer") +
  scale_x_log10() + # Log-transform the y-axis
  labs(title = "Distribution of households per polygon, per isochrone layer (log10)", x = "Households (count) - log10", y = "Density", fill = "Isochrone layer") 
# View plot
plot4
# Export plot
save_my_plot(plot5, here("Out", "1_Households_Analysis", "Plot1.5_HHs_per_poly_DENSITY_log10.png"))


# 7. ANALYSIS - POPULATION==============================================================================

# Re-open DB connection
conn.rob_research <- create_conn(host, port, dbname.rob, user, password)
# Import OpenPopGrid data (points) from server
qry_pop <- "SELECT * FROM openpopgrid.openpopgrid_wales_pts"
# Read in as SF (i.e. geospatial point) object
opg <- st_read(conn.rob_research, query = qry_pop)





# Create a non-spatial (geom removed) version for later use (in anti-joins ans stats) 
opg.ng <- opg
st_geometry(opg.ng) = NULL






# Capture end time
end_time <- Sys.time()
# Calculate runtime in minutes and save to the environment
runtime_minutes <- as.numeric(difftime(end_time, start_time, units = "mins"))
runtime_minutes <- round(runtime_minutes, digits = 1)






#### CHECK ALL GEOMS IN 








# 8. ANALYSIS - ISOCHRONE POLYGON SIZE

# Areas pre-calculated on import











## SAVE R SESSION=======================================================================================
# To save re-running script in development 
save.image(file = here("Workspace_backups", "my_workspace.RData"))

## LOAD R SESSION=======================================================================================

load(here("Workspace_backups", "my_workspace.RData"))

# Get Open Pop Grid for Wales
















glimpse(iso_list[[1]])



























