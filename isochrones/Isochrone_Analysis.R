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
library(units) # For plotting variables in area units
library(reshape2) # For melt function 



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
# Create Postgres connection to load data from 'usw_research' database 
conn.usw_research <- create_conn(host, port, dbname.usw, user, password)
# Create Postgres connection to load data from 'rob_research' database 
conn.rob_research <- create_conn(host, port, dbname.rob, user, password)



# 3. DATA IMPORT AND CLEAN - ========================================================================

# LOAD ISOCHRONE LAYERS
# Generate list of input isochrone layers from PostGIS
iso_poly_names <- paste0("iso_poly", 1:6, "_400")  # Adjust the sequence as needed
# Create SQL select queries to grab all isochrone polys from each layer
qry_iso <- paste("SELECT * FROM isochrones.", iso_poly_names, sep = "")
# Function to take a SQL query, execute it to read in the spatial data (isochrones) using st_read, and then rename the id column for clarity and later use - also filters out non-polygon geometries produced by some of the isochrone algorithms and calculates areas ofd polygons for later
read_and_rename <- function(qry_iso, conn) {
  st_read(conn.usw_research, query = qry_iso) |> 
    # Ensure any invalid geometries are made valid
    mutate(the_geom = st_make_valid(the_geom)) %>%
    # Check if the CRS is not EPSG:27700 and transform if necessary
    {
      if(st_crs(.)$epsg != 27700) {
        st_transform(., 27700)
      } else {
        .
      }
    } %>%
    # Filter to retain only POLYGON and MULTIPOLYGON geometries
    filter(st_geometry_type(the_geom) %in% c("POLYGON", "MULTIPOLYGON")) |> 
    # Calculate area for each geometry and add it as a new column
    mutate(area_m2 = st_area(the_geom)) |> 
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

# Identify null polygons (problem in iso 5) - remove them and also remove other polys from all layers with same ID to avoid later issues with analysis (e.g. Jaccard comparisions) - only removeS 500 or so polys from each layer of 20,000 - so sample is still plenty big enough

# Function to count null geometries in an sf object
count_null_geometries <- function(sf_layer) {
  sum(st_is_empty(sf_layer$geometry))}

# Use map to apply the function to each layer and create a named vector
count_null_geometries <- function(sf_layer) {
  # Directly access "the_geom" column for geometry data
  geometry_column <- sf_layer[["the_geom"]]
  sum(st_is_empty(geometry_column))
}
# Apply the adjusted function to each sf object in 'iso_list' using map_dbl
null_geometry_counts <- map_dbl(iso_list, count_null_geometries)
# Convert the results into a dataframe
null_geometry_summary <- data.frame(
  Layer = names(null_geometry_counts),
  Null_Geometry_Count = as.vector(null_geometry_counts)
)
# Print the summary dataframe
print(null_geometry_summary)

## Remove empty polygons and also those polygons in other layers with corresponding IDS
#  Function to identify IDs with empty polygons in a single sf layer
find_empty_ids <- function(sf_layer) {
  sf_layer |> 
    filter(st_is_empty(the_geom)) |> 
    pull(id_iso) # Use 'id_iso' as the ID column
}
# Find all IDs with empty polygons across all layers
ids_with_empty_polys <- map(iso_list, find_empty_ids) |>  unlist() |>  unique()

# Function to remove rows by IDs from an sf layer
remove_rows_by_ids <- function(sf_layer, ids) {
  sf_layer |> 
    filter(!id_iso %in% ids)
}
# Apply the removal to all layers in the list
iso_list <- map(iso_list, remove_rows_by_ids, ids = ids_with_empty_polys)


# Remove polys where area is less than 1m2 
remove_small_areas <- function(sf_layer) {
  sf_layer %>%
    # Convert the area_m2 to numeric if it has units
    mutate(area_m2_numeric = as.numeric(area_m2)) %>%
    # Filter based on the numeric value
    filter(area_m2_numeric >= 1) %>%
    # Optionally, remove the temporary numeric column if you want
    select(-area_m2_numeric)
}
# Apply the function to all sf layers in the list to remove rows with small areas
iso_list <- map(iso_list, remove_small_areas)

# Only keep polys with matching IDs across all isochrone layers
common_ids <- iso_list |> 
  map(~pull(., id_iso)) |>  # Extract the 'id_iso' column from each layer
  reduce(intersect)         # Find the intersection (common elements) of all ID vectors
iso_list_filtered <- map(iso_list, ~filter(., id_iso %in% common_ids))

iso_list <- iso_list_filtered
rm(iso_list_filtered)



# LOAD ADDRESS BASE
qry_add <- "SELECT * FROM addbase.ab_rd"
# Read in as SF (i.e. geospatial point) object
addBase <- st_read(conn.usw_research, query = qry_add)
# Select only ID column to reduce object size
addBase <- addBase |> 
  select(id)
# Create a non-spatial (geom removed) version of AddressBase layer for later use (in anti-joins) 
addBase.ng <- addBase
st_geometry(addBase.ng) = NULL


# LOAD AND INTERSECT OPENPOPGRID

# Import OpenPopGrid data (points) from server
qry_pop <- "SELECT * FROM openpopgrid.openpopgrid_wales_pts"
# Read in as SF (i.e. geospatial point) object
opg <- st_read(conn.rob_research, query = qry_pop)
# Create non-spatial version
opg.ng <- st_drop_geometry(opg)

# Spatially intersect each isochrone layer with the OpenPopGrid layer
fun_isocrn <- function(isocrn, opg, opg.ng) {
  # Check if CRS match 
  if (!st_crs(isocrn) == st_crs(opg)) {
    isocrn <- st_transform(isocrn, st_crs(opg))
  }
  # Check if CRS match by EPSG code
  if (!identical(st_crs(isocrn)$epsg, st_crs(opg)$epsg)) {
    isocrn <- st_transform(isocrn, st_crs(opg))
  }
  # Spatially intersect opg points with isochrones
  int <- st_intersection(opg, isocrn)
  # # We only need to know if a point lies within an isochrone - the number of isochrones   intersected by is irrelevant in this step. Therefore, group the AddressBase points by point "id" and select (slice) the first row (single address) in each group. Remove "area_m2" colun for subsequent binding. 
  int.grpd <- int |>
    group_by(id) |>
    select(-area_m2) |>
    slice(1) |>
    ungroup()
  # Perform anti-join with non-spatial version of AddressBase data to generate a data frame of points that did not intersect with isochrone polys (anti-join will not work with two spatial layers)
  opg.noInt <- dplyr::anti_join(opg.ng, int.grpd, by = "id")
  # Create a spatial layer of the non-intersecting points
  opg.noInt.geo <- opg |> 
    filter(id %in% opg.noInt$id)
  # Create a new column "id_iso" and populate with NA (i.e. these points do not fall within a polygon and therefore have no isochrone ID - "id_iso")
  opg.noInt.geo$id_iso <- NA
  # Bind the "int.grpd" and "opg.noInt.geo" rows together to produce a final layer showing unique addressBase points and whether they intersect with an isochrone poly
  pts.isocrn <- rbind(int.grpd, opg.noInt.geo)
  # Add numeric column "iso_YN" containign "1" or "0" to indicate whether points fall in isochrone polygon. 
  pts.isocrn <- pts.isocrn |> 
    mutate(isochroneYN = if_else(!is.na(id_iso), 1, 0))
  # Layer gets added to list "Result"
}


# Set up parallel processing for the function 'fun_isocrn"
# Set up multiprocess with one less core than we have
no_cores <- future::availableCores() - 1
# Increase max allowable size (from 500MB) of the global variable objects that function needs to access to execute in each parallel session.
options(future.globals.maxSize = 5 * 1024^3)  # Increase limit to 5 GB
# Initiate the parallel processing 'plan'
future::plan(multicore, workers = no_cores)

# Execute the 'fun_isocrn' function in parallel over each element in 'iso_list', passing 'addBase' and 'addBase.ng' as additional fixed arguments. The 'future_map' function applies 'fun_isocrn' to each isochrone layer ('.x' from 'iso_list'). The resulting list of processed spatial data frames ('sf' objects) is stored in 'result', with each element corresponding to the output from 'fun_isocrn' applied to an individual isochrone layer.
result.opg <- future_map(iso_list, ~fun_isocrn(.x, opg, opg.ng)) |> 
  # Assign a name to each element (point layer) in the generated list based on 'pts.names'
  set_names(pts_names) 
# save 'result.opg' out of R as backup
save(result.opg, here("Workspace_backups", "result.opg"))

# Eventually export to postgres but this will take time, so only do it on final run - probably don't do this will take too long - just the non-geo version 


# Create a new list of layers with geometry removed
# Retrieve layer names and prepare new names with ".ng" suffix
# Keep previous parallel processing plan settings
original_names <- names(result.opg)
new_names <- paste0(original_names, ".ng")
# Use future_map to iterate over sf_layers, removing geometry
result.opg.ng <- future_map(result.opg, ~st_set_geometry(.x, NULL))
# Set the names of the resulting list to the new names
names(result.opg.ng) <- new_names

# Combine into single data frame for analysis
# Combine into a single dataframe, adding a column for the original layer name
opg_iso_df <- furrr::future_map_dfr(result.opg.ng, ~ .x, .id = "layer_name")
# Extract the numeric part from the `layer_name` and add as a new column `iso_layer_id`
opg_iso_df <- opg_iso_df %>%
  mutate(iso_layer_id = as.integer(str_extract(layer_name, "\\d+"))) |> 
  select(-layer_name)



## LOAD AND INTERSECT PHARMACIES

# Import pharmacies data from postgres
qry_pharm <- "SELECT * FROM poi.pharmacies"
# Read in as SF (i.e. geospatial point) object
pharms <- st_read(conn.rob_research, query = qry_pharm)
# Create non-spatial version
pharms.ng <- st_drop_geometry(pharms)

# Spatially intersect each isochrone layer with the pharmacy layer
fun_pharm <- function(isocrn, pharms, pharms.ng) {
  # Check if CRS match 
  if (!st_crs(isocrn) == st_crs(pharms)) {
    isocrn <- st_transform(isocrn, st_crs(pharms))
  }
  # Check if CRS match by EPSG code
  if (!identical(st_crs(isocrn)$epsg, st_crs(pharms)$epsg)) {
    isocrn <- st_transform(isocrn, st_crs(pharms))
  }
  # Spatially intersect pharms points with isochrones
  int <- st_intersection(pharms, isocrn)
  # # We only need to know if a point lies within an isochrone 
  int.grpd <- int |>
    group_by(id) |>
    select(-area_m2) |>
    slice(1) |>
    ungroup()
  # Perform anti-join with non-spatial version of pharmacies data to generate a data frame of points that did not intersect with isochrone polys (anti-join will not work with two spatial layers)
  pharms.noInt <- dplyr::anti_join(pharms.ng, int.grpd, by = "id")
  # Create a spatial layer of the non-intersecting points
  pharms.noInt.geo <- pharms |> 
    filter(id %in% pharms.noInt$id)
  # Create a new column "id_iso" and populate with NA (i.e. these points do not fall within a polygon and therefore have no isochrone ID - "id_iso")
  pharms.noInt.geo$id_iso <- NA
  # Bind the "int.grpd" and "pharms.noInt.geo" rows together to produce a final layer showing unique addressBase points and whether they intersect with an isochrone poly
  pts.isocrn <- rbind(int.grpd, pharms.noInt.geo)
  # Add numeric column "iso_YN" containign "1" or "0" to indicate whether points fall in isochrone polygon. 
  pts.isocrn <- pts.isocrn |> 
    mutate(isochroneYN = if_else(!is.na(id_iso), 1, 0))
  # Layer gets added to list "Result"
}

# Increase max allowable size (from 500MB) of the global variable objects that function needs to access to execute in each parallel session.
options(future.globals.maxSize = 5 * 1024^3)  # Increase limit to 5 GB
# Initiate the parallel processing 'plan'
future::plan(multicore, workers = no_cores)



# Execute the 'fun_isocrn' function in parallel over each element in 'iso_list', passing 'addBase' and 'addBase.ng' as additional fixed arguments. The 'future_map' function applies 'fun_isocrn' to each isochrone layer ('.x' from 'iso_list'). The resulting list of processed spatial data frames ('sf' objects) is stored in 'result', with each element corresponding to the output from 'fun_isocrn' applied to an individual isochrone layer.
result.pharms <- future_map(iso_list, ~fun_isocrn(.x, pharms, pharms.ng)) |> 
  # Assign a name to each element (point layer) in the generated list based on 'pts.names'
  set_names(pts_names) 
# save 'result.pharms' out of R as backup
save(result.pharms, here("Workspace_backups", "result.pharms"))

# Eventually export to postgres but this will take time, so only do it on final run - probably don't do this will take too long - just the non-geo version 


# Create a new list of layers with geometry removed
# Retrieve layer names and prepare new names with ".ng" suffix
# Keep previous parallel processing plan settings
original_names <- names(result.pharms)
new_names <- paste0(original_names, ".ng")
# Use future_map to iterate over sf_layers, removing geometry
result.pharms.ng <- future_map(result.pharms, ~st_set_geometry(.x, NULL))
# Set the names of the resulting list to the new names
names(result.pharms.ng) <- new_names


# Combine into single data frame for analysis
# Combine into a single dataframe, adding a column for the original layer name
pharms_iso_df <- furrr::future_map_dfr(result.pharms.ng, ~ .x, .id = "layer_name")
# Extract the numeric part from the `layer_name` and add as a new column `iso_layer_id`
pharms_iso_df <- pharms_iso_df %>%
  mutate(iso_layer_id = as.integer(str_extract(layer_name, "\\d+"))) |> 
  select(-layer_name)



# Close database connections when all data has been imported
DBI::dbDisconnect(conn.usw_research)
DBI::dbDisconnect(conn.rob_research)
# Remove unwanted import objects



# 4. ANALYSIS - HOUSEHOLDS ============================================================================

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
    # Check if CRS match by EPSG code, and if not, transform 'isocrn' to match 'addBase' - which is set at 27700
  if (!identical(st_crs(isocrn)$epsg, st_crs(addBase)$epsg)) {
    isocrn <- st_transform(isocrn, st_crs(addBase))
  }
  # Spatially intersect AddressBase points with isochrones
  # int <- st_intersection(addBase, isocrn)
  int <- st_intersection(addBase, isocrn)
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



# Combine pts.isocrn layers from "result" list
# Iterate over the list
pts.iso.combined <- map2_df(result, names(result), function(x, name) {
  # Extract the numeric part from the name
  isocrn_ID <- as.integer(str_extract(name, "\\d+"))
  # Add the extracted number as a new column
  mutate(x, iso_layer_id =  isocrn_ID)
})

# # Export to PostGIS
# # Re-open DB connection
# conn.rob_research <- create_conn(host, port, dbname.rob, user, password)
# # Write to server
# st_write(pts.iso.combined, dsn = conn.rob_research, Id(schema="isochrones", table = "pts.isocrns.combined"), delete_layer = TRUE)
# # Create version with geom removed (regular data frame) for statistical analysis
# pts.isocrns.ng <- st_drop_geometry(pts.iso.combined)
# glimpse(pts.isocrns.ng)
# # Export non geo table to PostGIS
# DBI::dbWriteTable(conn.rob_research, "isochrones.pts.isocrns.ng", pts.isocrns.ng , overwrite = TRUE, row.names = FALSE)


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


# Prep data for plotting - count points in and out of isochrones for each iso layer
plot1_data <- pts.isocrns.ng |> 
  group_by(iso_layer_id, isochroneYN) |> 
  summarise(n = n()) |> 
  ungroup()
# Calculate the label position for household counts and percentages within stacked bars
plot1_data <- plot1_data |> 
  arrange(iso_layer_id, desc(isochroneYN))|> 
  group_by(iso_layer_id) |> 
  mutate(total_count = sum(n),
         percentage = n / total_count * 100, 
         label_position = cumsum(n) - 0.02 * cumsum(n), # offset the label position slightly down from top of bar
         # Creating a combined label with count and percentage, with formatting
         combined_label = paste(format(n, big.mark = ","), "\n(", sprintf("%.1f%%", percentage), ")", sep = "")) |> 
  ungroup()

# Only want to label data within isochrones
label_data <- plot1_data |> 
  filter(isochroneYN == 1) 

# Create plot - FINE TUNE POSITION OF EXIST, CHANGE LABELS AND RMEOVE LEND TITLE - REFORMAT 
plot1.1 <- ggplot(plot1_data, aes(x = as.factor(iso_layer_id), y = n, fill = factor(isochroneYN))) +
  geom_bar(stat = "identity", position = "stack") +
  my_custom_theme +
  scale_fill_brewer(palette = "Set2", labels = c("0" = "Outside isochrones", "1" = "Inside isochrones"), name = "IsochroneYN") +
  geom_text(data = label_data, aes(x = as.factor(iso_layer_id), y = label_position, label = combined_label), vjust = 1, color = "black", size = 3) +
  scale_y_continuous(labels = label_M()) + # Use the custom label function here
  theme(legend.title = element_blank()) + 
  labs(title = "Households within isochrones", x = "Isochrone layer ID", y = "No. of households") 
# View plot
plot1.1
# Export plot
save_my_plot(plot1.1, here("Out", "1_Households_Analysis", "Plot1.1_HHs_by_iso_layer_BAR.png"))


# Calculate number of households per polygon, per ischrone layer
hh.poly.data <- pts.isocrns.ng |> 
  filter(isochroneYN ==1) |> # remove households outside poly
  group_by(iso_layer_id, id_iso) |> 
  summarise(n = n())
# Ensure iso_layer_id is a factor
hh.poly.data$iso_layer_id <- as.factor(hh.poly.data$iso_layer_id)


# Boxplot 
plot1.2 <- ggplot(hh.poly.data, aes(x = iso_layer_id, y = n, fill = iso_layer_id)) +
  geom_boxplot(alpha = 0.5) +
  my_custom_theme +
  scale_y_log10() + # Log-transform the y-axis
  labs(x = "Isochrone layer ID", y = "No. of Households (log10)",
       title = "Distribution of households per isochrone layer") +
  theme(legend.position = "none")
  # theme(legend.title = element_blank())
# View plot
plot1.2
# Export plot
save_my_plot(plot1.2, here("Out", "1_Households_Analysis", "Plot1.2_HHs_per_poly_BOX_log10.png"))


# Violin plot (Plot3)
plot1.3 <- ggplot(hh.poly.data, aes(x = iso_layer_id, y = n, fill = iso_layer_id)) +
  geom_violin(trim = TRUE, alpha = 0.5) + # Use a violin plot and keep all data
  my_custom_theme +
  scale_y_log10() + # Log-transform the y-axis
  labs(x = "Isochrone layer ID", y = "No. of Households (log10)",
       title = "Distribution of households per isochrone layer") +
  theme(legend.position = "none")
# View plot
plot1.3
# Export plot
save_my_plot(plot1.3, here("Out", "1_Households_Analysis", "Plot1.3_HHs_per_poly_VIOLIN_log10.png"))

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
plot1.4 <- ggplot(hh.poly.data, aes(x = n)) + 
  geom_density(aes(fill = iso_layer_id), alpha = 0.5) + # Adjust alpha for transparency
  facet_wrap(~ iso_layer_id, scales = 'fixed') + 
  my_custom_theme +
  labs(title = "Distribution of households per isochrone layer", x = "No . of households", y = "Density", fill = "Isochrone layer") 
# View plot
# plot1.4
# Export plot
save_my_plot(plot1.4, here("Out", "1_Households_Analysis", "Plot1.4_HHs_per_poly_DENSITY.png"))


# Faceted density plot - with log10 transform
plot1.5 <- ggplot(hh.poly.data, aes(x = n)) + 
  geom_density(aes(fill = iso_layer_id), alpha = 0.5) + # Adjust alpha for transparency
  facet_wrap(~ iso_layer_id, scales = 'free') + 
  my_custom_theme +
  labs(x = "Isochrone layer ID", y = "No. of Households (density)",
       title = "No households per polygon, per isochrone layer") +
  scale_x_log10() + # Log-transform the y-axis
  labs(title = "Distribution of households per isochrone layer", x = "No . of households (log10)", y = "Density", fill = "Isochrone layer") 
# 
# plot1.5
# Export plot
save_my_plot(plot1.5, here("Out", "1_Households_Analysis", "Plot1.5_HHs_per_poly_DENSITY_log10.png"))

# Export raw data = popultion per poly per layer
hh.poly.data <- hh.poly.data |> 
  rename(households = n)
write_csv(hh.poly.data, here("Out", "1_Households_Analysis", "households_per_poly_per_layer.csv"))



# 7. CALCS - POPULATION===
# 
# # Re-open DB connection
# conn.rob_research <- create_conn(host, port, dbname.rob, user, password)
# # Import OpenPopGrid data (points) from server
# qry_pop <- "SELECT * FROM openpopgrid.openpopgrid_wales_pts"
# # Read in as SF (i.e. geospatial point) object
# opg <- st_read(conn.rob_research, query = qry_pop)
# # Create non-spatial version
# opg.ng <- st_drop_geometry(opg)
# 
# # CALCS
# # Spatially intersect each isochrone layer with the OpenPopGrid layer
# fun_isocrn <- function(isocrn, opg, opg.ng) {
#   # Check if CRS match 
#   if (!st_crs(isocrn) == st_crs(opg)) {
#     isocrn <- st_transform(isocrn, st_crs(opg))
#   }
#   # Check if CRS match by EPSG code
#   if (!identical(st_crs(isocrn)$epsg, st_crs(opg)$epsg)) {
#     isocrn <- st_transform(isocrn, st_crs(opg))
#   }
#   # Spatially intersect opg points with isochrones
#   int <- st_intersection(opg, isocrn)
#   # # We only need to know if a point lies within an isochrone - the number of isochrones   intersected by is irrelevant in this step. Therefore, group the AddressBase points by point "id" and select (slice) the first row (single address) in each group. Remove "area_m2" colun for subsequent binding. 
#   int.grpd <- int |>
#     group_by(id) |>
#     select(-area_m2) |>
#     slice(1) |>
#     ungroup()
#   # Perform anti-join with non-spatial version of AddressBase data to generate a data frame of points that did not intersect with isochrone polys (anti-join will not work with two spatial layers)
#   opg.noInt <- dplyr::anti_join(opg.ng, int.grpd, by = "id")
#   # Create a spatial layer of the non-intersecting points
#   opg.noInt.geo <- opg |> 
#     filter(id %in% opg.noInt$id)
#   # Create a new column "id_iso" and populate with NA (i.e. these points do not fall within a polygon and therefore have no isochrone ID - "id_iso")
#   opg.noInt.geo$id_iso <- NA
#   # Bind the "int.grpd" and "opg.noInt.geo" rows together to produce a final layer showing unique addressBase points and whether they intersect with an isochrone poly
#   pts.isocrn <- rbind(int.grpd, opg.noInt.geo)
#   # Add numeric column "iso_YN" containign "1" or "0" to indicate whether points fall in isochrone polygon. 
#   pts.isocrn <- pts.isocrn |> 
#     mutate(isochroneYN = if_else(!is.na(id_iso), 1, 0))
#   # Layer gets added to list "Result"
# }
# 
# # Increase max allowable size (from 500MB) of the global variable objects that function needs to access to execute in each parallel session.
# options(future.globals.maxSize = 5 * 1024^3)  # Increase limit to 5 GB
# # Initiate the parallel processing 'plan'
# future::plan(multicore, workers = no_cores)
# 
# # Execute the 'fun_isocrn' function in parallel over each element in 'iso_list', passing 'addBase' and 'addBase.ng' as additional fixed arguments. The 'future_map' function applies 'fun_isocrn' to each isochrone layer ('.x' from 'iso_list'). The resulting list of processed spatial data frames ('sf' objects) is stored in 'result', with each element corresponding to the output from 'fun_isocrn' applied to an individual isochrone layer.
# result.opg <- future_map(iso_list, ~fun_isocrn(.x, opg, opg.ng)) |> 
#   # Assign a name to each element (point layer) in the generated list based on 'pts.names'
#   set_names(pts_names) 
# # save 'result.opg' out of R as backup
# save(result.opg, here("Workspace_backups", "result.opg"))
# 
# # Eventually export to postgres but this will take time, so only do it on final run - probably don't do this will take too long - just the non-geo version 
# 
# 
# # Create a new list of layers with geometry removed
# # Retrieve layer names and prepare new names with ".ng" suffix
# # Keep previous parallel processing plan settings
# original_names <- names(result.opg)
# new_names <- paste0(original_names, ".ng")
# # Use future_map to iterate over sf_layers, removing geometry
# result.opg.ng <- future_map(result.opg, ~st_set_geometry(.x, NULL))
# # Set the names of the resulting list to the new names
# names(result.opg.ng) <- new_names
# 
# # Combine into single data frame for analysis
# # Combine into a single dataframe, adding a column for the original layer name
# opg_iso_df <- furrr::future_map_dfr(result.opg.ng, ~ .x, .id = "layer_name")
# # Extract the numeric part from the `layer_name` and add as a new column `iso_layer_id`
# opg_iso_df <- opg_iso_df %>%
#   mutate(iso_layer_id = as.integer(str_extract(layer_name, "\\d+"))) |> 
#   select(-layer_name)




## 5. ANALYSIS - POPULATION #####

# Prep data for plotting - count points in and out of isochrones for each iso layer
plot_data <- opg_iso_df |> 
  group_by(iso_layer_id, isochroneYN) |> 
  summarise(n = sum(value)) |> 
  ungroup()
# Calculate the label position for household counts and percentages within stacked bars
plot_data <- plot_data |> 
  arrange(iso_layer_id, desc(isochroneYN))|> 
  group_by(iso_layer_id) |> 
  mutate(total_count = sum(n),
         percentage = n / total_count * 100, 
         label_position = cumsum(n) - 0.02 * cumsum(n), # offset the label position slightly down from top of bar
         # Creating a combined label with count and percentage, with formatting
         combined_label = paste(format(n, big.mark = ","), "\n(", sprintf("%.1f%%", percentage), ")", sep = "")) |> 
  ungroup()
# Only want to label data within isochrones
label_data <- plot_data |> 
  filter(isochroneYN == 1) 
# Create plot - FINE TUNE POSITION OF EXIST, CHANGE LABELS AND RMEOVE LEND TITLE - REFORMAT 
plot2.1 <- ggplot(plot_data, aes(x = as.factor(iso_layer_id), y = n, fill = factor(isochroneYN))) +
  geom_bar(stat = "identity", position = "stack") +
  scale_fill_brewer(palette = "Set2", labels = c("0" = "Outside isochrones", "1" = "Inside isochrones"), name = "IsochroneYN") +
  geom_text(data = label_data, aes(x = as.factor(iso_layer_id), y = label_position, label = combined_label), vjust = 1, color = "black", size = 3) +
  scale_y_continuous(labels = label_M()) + # Use the custom label function here
  theme(legend.title = element_blank()) + 
  labs(title = "Population within isochrones", x = "Isochrone layer ID", y = "Population count") +
  my_custom_theme
# View plot
plot2.1 
# Export plot
save_my_plot(plot2.1, here("Out", "2_Population_Analysis", "Plot2.1_Pop_by_iso_layer_BAR.png"))


# Prep data for plotting
plot_data <- opg_iso_df |> 
  group_by(iso_layer_id, isochroneYN) |> 
  summarise(n = sum(value)) |> 
  ungroup()
# Calculate population per polygon, per ischrone layer
pop.poly.data <- opg_iso_df|> 
  filter(isochroneYN ==1) |> # remove households outside poly
  group_by(iso_layer_id, id_iso) |> 
  summarise(n = n())
# Ensure iso_layer_id is a factor
pop.poly.data$iso_layer_id <- as.factor(pop.poly.data$iso_layer_id)


# Boxplot 
plot2.2 <- ggplot(pop.poly.data, aes(x = iso_layer_id, y = n, fill = iso_layer_id)) +
  geom_boxplot(alpha = 0.5) +
  my_custom_theme +
  scale_y_log10() + # Log-transform the y-axis
  labs(x = "Isochrone layer ID", y = "Population count (log10)",
       title = "Population distribution per isochrone layer") +
  theme(legend.position = "none")
# theme(legend.title = element_blank())
# View plot
plot2.2
# Export plot
save_my_plot(plot2.2, here("Out", "2_Population_Analysis", "Plot2.2_Pop_per_poly_BOX_log10.png"))


# Violin plot 
plot2.3 <- ggplot(pop.poly.data, aes(x = iso_layer_id, y = n, fill = iso_layer_id)) +
  geom_violin(trim = TRUE, alpha = 0.5) + # Use a violin plot and keep all data
  my_custom_theme +
  scale_y_log10() + # Log-transform the y-axis
  labs(x = "Isochrone layer ID", y = "Population count (log10)",
       title = "Population distribution per isochrone layer") +
  theme(legend.position = "none")
# View plot
plot2.3
# Export plot
save_my_plot(plot2.3, here("Out", "2_Population_Analysis", "Plot2.3_HHs_per_poly_VIOLIN_log10.png"))


# Faceted density plot - without log transform 
plot2.4 <- ggplot(pop.poly.data, aes(x = n)) + 
  geom_density(aes(fill = iso_layer_id), alpha = 0.5) + # Adjust alpha for transparency
  facet_wrap(~ iso_layer_id, scales = 'fixed') + 
  my_custom_theme +
  labs(x = "Population count", y = "Density",
       title = "Population distribution per isochrone layer", fill = "Isochrone ID") 
# View plot
plot2.4
# Export plot
save_my_plot(plot2.4, here("Out", "2_Population_Analysis", "Plot2.4_Pop_per_poly_DENSITY.png"))


# Faceted density plot - log10 transform
plot2.5 <- ggplot(pop.poly.data, aes(x = n)) + 
  geom_density(aes(fill = iso_layer_id), alpha = 0.5) + # Adjust alpha for transparency
  facet_wrap(~ iso_layer_id, scales = 'fixed') + 
  my_custom_theme +
  scale_x_log10() + # Log-transform the y-axis
  labs(x = "Population count (log10)", y = "Density",
       title = "Population distribution per isochrone layer", fill = "Isochrone ID")
# View plot
plot2.5
# Export plot
save_my_plot(plot2.5, here("Out", "2_Population_Analysis", "Plot2.5_Pop_per_poly_DENSITY_log10.png"))

# Calculate summary statistics
summary_stats <- pop.poly.data %>%
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
write_csv(summary_stats, here("Out", "2_Population_Analysis", "summary_statistics_population_per_layer.csv"))
# Export raw population data per isochrone
pop.poly.data <- pop.poly.data |> 
  rename(pop = n)
write_csv(pop.poly.data, here("Out", "2_Population_Analysis", "population_per_poly_per_layer.csv"))



## 6. ANALYSIS - AREA ####

# Create a new list of isochrone layers with geometry removed
# Keep previous parallel processing plan settings
original_names <- names(iso_list)
# Use future_map to iterate over sf_layers, removing geometry
iso_list.ng <- future_map(iso_list, ~st_set_geometry(.x, NULL))
# Set the names of the resulting list to the new names
names(iso_list.ng) <- original_names 


# Combine into single data frame for analysis
# Combine into a single dataframe, adding a column for the original layer name
iso_ng_df <- furrr::future_map_dfr(iso_list.ng, ~ .x, .id = "layer_name")
# Extract the numeric part from the `layer_name` and add as a new column `iso_layer_id`
iso_ng_df <- iso_ng_df |> 
  mutate(iso_layer_id = as.integer(str_extract(layer_name, "\\d+")),
         area_km2 = as.numeric(round(area_m2) / 1000000)) |>  # New column - area Km2
  select(-layer_name)

# Prep data for plotting - 
plot_area_data <- iso_ng_df |> 
  group_by(iso_layer_id) |> 
  summarise(n = round(sum(area_km2))) |> 
  ungroup()

# Create plot - FINE TUNE POSITION OF EXIST, CHANGE LABELS AND RMEOVE LEND TITLE - REFORMAT 
plot3.1 <- ggplot(plot_area_data, aes(x = as.factor(iso_layer_id), y = n))+
  geom_bar(stat = "identity", fill = "skyblue") + # Use a simple fill color
  geom_text(aes(label = n), vjust = 1.2, color = "black", size = 3.5) + # Adjust 'vjust' to position labels just above the bars
  # scale_y_continuous(labels = label_M()) + # Use the custom label function here
  theme(legend.title = element_blank()) + 
  labs(title = "Isochrones: area analysis", x = "Isochrone layer ID", y = "Area (km2) ") +
  my_custom_theme
# View plot
# plot3.1
# Export plo2
save_my_plot(plot3.1, here("Out", "3_Area_Analysis", "Plot3.1_Area_by_iso_layer_BAR.png"))


# Calculate area per polygon, per ischrone layer
plot_area_data <- iso_ng_df |> 
  group_by(iso_layer_id, id_iso) |> 
  summarise(n = as.numeric(sum(area_m2) / 1e6)) # Convert m² to km²
# Ensure iso_layer_id is a factor
plot_area_data$iso_layer_id <- as.factor(plot_area_data$iso_layer_id)


# Boxplot 
plot3.2 <- ggplot(plot_area_data, aes(x = iso_layer_id, y = n, fill = iso_layer_id)) +
  geom_boxplot(alpha = 0.5) +
  my_custom_theme +
  labs(x = "Isochrone layer ID", y = "Area (km2)",
       title = "Distribution of polygons by area per isochrone layer") +
  theme(legend.position = "none")
# View plot
plot3.2
# Export plot
save_my_plot(plot3.2, here("Out", "3_Area_Analysis", "Plot3.2_Area_per_poly_BOX.png"))


# Violin plot
plot3.3 <- ggplot(plot_area_data, aes(x = iso_layer_id, y = n, fill = iso_layer_id)) +
  geom_violin(alpha = 0.5) +
  my_custom_theme +
  labs(x = "Isochrone layer ID", y = "Area (km2)",
       title = "Distribution of polygons by area per isochrone layer") +
  theme(legend.position = "none")
# View plot
plot3.3
# Export plot
save_my_plot(plot3.3, here("Out", "3_Area_Analysis", "Plot3.3_Area_per_poly_VIOLIN.png"))


# Faceted density plot - without log transform 
plot3.4 <- ggplot(plot_area_data, aes(x = n)) + 
  geom_density(aes(fill = iso_layer_id), alpha = 0.5) + # Adjust alpha for transparency
  facet_wrap(~ iso_layer_id, scales = 'fixed') + 
  my_custom_theme +
  labs(x = "Area (km2)", y = "Density",
       title = "Distribution of polygons by area per isochrone layer", fill = "Isochrone ID") 
# View plot
plot3.4
# Export plot
save_my_plot(plot3.4, here("Out", "3_Area_Analysis", "Plot3.4_Area_per_poly_DENSITY.png"))


# Calculate summary statistics
summary_stats <- plot_area_data |> 
  group_by(iso_layer_id) |> 
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
write_csv(summary_stats, here("Out", "3_Area_Analysis", "summary_statistics_areakm2_per_layer.csv"))
# Export raw data
plot_area_data <- plot_area_data |> 
  rename(areakm2 = n)
write_csv(plot_area_data, here("Out", "3_Area_Analysis", "areakm2_per_poly_per_layer.csv"))



## 7. ANALYSIS - SIMILARITY ==================================================================

# Create a data frame of all input isochrone layer combinations
combinations_df <- tidyr::expand_grid(layer1 = names(iso_list), layer2 = names(iso_list))
# Filter out combinations to avoid duplicating work (i.e., keep (1,2) but remove (2,1))
combinations_df <- combinations_df |> 
  filter(layer1 <= layer2) |> 
  # Avoid self-comparison if not needed
  filter(layer1 != layer2)
# Convert combinations_df to a list of lists for processing with future_map 
combinations_list <- split(combinations_df, seq(nrow(combinations_df)))


# For the Jaccard testing work on a subset of each layer - get 10 polys from each layer matched on ID 
# Expand - then all layers and records for final run
# REMOVE 10 LIMIT FOR FINAL RUN

# Define a function to filter layers by matching IDs using purrr
filter_layers_by_id <- function(layers_list) {
  # Find common IDs across all layers using purrr's reduce and intersect
  common_ids <- reduce(layers_list %>% map(~.$id_iso), intersect)
  # # Keep only the first 10 common IDs if there are more
  # common_ids <- head(common_ids, n = 10)
  # Filter each layer by the common IDs using purrr's map
  filtered_layers <- map(layers_list, ~filter(.x, id_iso %in% common_ids))
  return(filtered_layers)
}
# Use the function to filter the layers
new_iso_list <- filter_layers_by_id(iso_list)

# Compute Jaccard Index pairwise for all layer combinations
fun_jaccard_index <- function(layer1, layer2, name1, name2) {
  matched_ids <- intersect(layer1$id_iso, layer2$id_iso)
  results <- map(matched_ids, ~{
    current_id_iso <- .x
    # Print Ids for debugging
    # print(paste("Processing ID:", current_id_iso))
    
    poly1 <- filter(layer1, id_iso == current_id_iso)
    poly2 <- filter(layer2, id_iso == current_id_iso)
    
    if(nrow(poly1) == 0 || nrow(poly2) == 0) {
      return(tibble(id_iso = current_id_iso, jaccard_index = NA_real_))
    }
    
    intersection <- st_intersection(poly1, poly2)
    union <- st_union(poly1, poly2)
    
    intersection_area <- sum(as.numeric(st_area(intersection)))
    union_area <- sum(as.numeric(st_area(union)))
    
    jaccard_index <- if (union_area > 0) intersection_area / union_area else NA_real_
        # Include layer names in the return tibble
    return(tibble(id_iso = current_id_iso, jaccard_index = jaccard_index, layer1_name = name1, layer2_name = name2))
    
  })
    results_df <- bind_rows(results)
  return(results_df)
}
# Set up parallel processing for the function 'fun_isocrn"
# Set up multiprocess with one less core than we have
no_cores <- future::availableCores() - 1
# Increase max allowable size (from 500MB) of the global variable objects that function needs to access to execute in each parallel session.
options(future.globals.maxSize = 2 * 1024^3)  # Increase limit to 2 GB
# Initiate the parallel processing 'plan'
future::plan(multicore, workers = no_cores)

# Run Jaccard
results <- future_map(combinations_list, ~ {
  l1_name <- .x$layer1
  l2_name <- .x$layer2
  l1 <- new_iso_list[[l1_name]]
  l2 <- new_iso_list[[l2_name]]
  
  fun_jaccard_index(l1, l2, l1_name, l2_name)
}, .progress = TRUE)
# Final output dataframe
final_results <- bind_rows(results)



## STATS

# Data for analysis
data <- final_results
# Add comparison column
data$comparison <- paste(pmin(data$layer1_name, data$layer2_name), 
                         pmax(data$layer1_name, data$layer2_name), sep = "-")

# Boxplot
plot4.1 <- ggplot(data, aes(x = comparison, y = jaccard_index, fill = comparison)) +
  geom_boxplot() +
  my_custom_theme +
  labs(title = "Jaccard score distribution for pairwise isochrone comparisons",
       x = "Isochrone comparison",
       y = "Jaccard index") +
  theme(axis.text.x = element_text(angle = 45, hjust = 1))+
  theme(legend.position = "none")
plot4.1
# Export plot
save_my_plot(plot4.1, here("Out", "4_Similarity_Analysis", "Plot4.1_Jaccard_BOX.png"))


# Violin plot
plot4.2 <- ggplot(data, aes(x = comparison, y = jaccard_index, fill = comparison)) +
  geom_violin() +
  my_custom_theme +
  labs(title = "Jaccard score distribution for pairwise isochrone comparisons",
       x = "Isochrone comparison",
       y = "Jaccard Index") +
  theme(axis.text.x = element_text(angle = 45, hjust = 1))+
  theme(legend.position = "none")
plot4.2
# Export plot
save_my_plot(plot4.2, here("Out", "4_Similarity_Analysis", "Plot4.2_Jaccard_VIOLIN.png"))



# Heatmap of mean Jaccard scores
average_jaccard_scores <- final_results %>%
  group_by(layer1_name, layer2_name) %>%
  summarise(average_jaccard = mean(jaccard_index, na.rm = TRUE)) %>%
  ungroup()
# Plot
plot4.3 <- ggplot(average_jaccard_scores, aes(x = layer1_name, y = layer2_name, fill = average_jaccard)) +
  geom_tile(color = "white") + # Add tiles
  my_custom_theme +
  geom_text(aes(label = sprintf("%.2f", average_jaccard)), size = 3, vjust = 1, fontface = "bold") + # Add bold text with mean scores
  scale_fill_gradient(low = "blue", high = "red") + # Color gradient
  labs(x = NULL, y = NULL, fill = "Mean J", title = "Mean Jaccard scores per pairwise isochrone comparison") + # Remove axis labels
  theme(axis.text.x = element_text(angle = 45, hjust = 1)) # Adjust text angle for x-axis labels
plot4.3
# Export plot
save_my_plot(plot4.3, here("Out", "4_Similarity_Analysis", "Plot4.3_Jaccard_MEAN_HEAT.png"))


# Bar plot
# Create a new column that combines layer1_name and layer2_name for labeling purposes
average_jaccard_scores <- average_jaccard_scores %>%
  mutate(combination = paste(layer1_name, layer2_name, sep = " - "))
# Create the bar plot
plot4.4 <- ggplot(average_jaccard_scores, aes(x = reorder(combination, average_jaccard), y = average_jaccard)) +
  geom_bar(stat = "identity", fill = "steelblue") +
  coord_flip() + # Flip coordinates for horizontal bars
  labs(x = "", y = "Mean Jaccard score", title = "Mean Jaccard scores by pairwise isochrone comparison") 
plot4.4
# Export plot
save_my_plot(plot4.4, here("Out", "4_Similarity_Analysis", "Plot4.4_Jaccard_MEAN_BAR.png"))


# Calculate summary statistics for each comparison
summary_stats <- data |> 
  group_by(comparison) |> 
  summarise(
    Count = n(),
    Mean = mean(jaccard_index),
    SD = sd(jaccard_index),
    Min = min(jaccard_index),
    Q1 = quantile(jaccard_index, 0.25),
    Median = median(jaccard_index),
    Q3 = quantile(jaccard_index, 0.75),
    Max = max(jaccard_index)
  )
# Export as CSV table
write_csv(summary_stats, here("Out", "4_Similarity_Analysis", "summary_statistics_Jaccard.csv"))

# Export raw pairwise Jaccard scores
write_csv(data, here("Out", "4_Similarity_Analysis", "raw_data_pairwise_Jaccard.csv"))




## 8. COMPLEXITY ANALYSIS============================================================================

# Define the function to calculate complexity score using "the_geom"
fun_complexity <- function(polygons) {
  # Explicitly convert polygon borders to line strings for perimeter calculation
  borders_as_lines <- st_boundary(polygons$the_geom)
  
  polygons |> 
    mutate(
      perimeter = as.numeric(st_length(st_boundary(the_geom))), # Convert perimeter to numeric
      area_m2 = as.numeric(area_m2), # Convert area to numeric ensuring same units
      complexity = if_else(area_m2 > 0, perimeter / area_m2, NA_real_) # Calculate complexity
    )
}
# Iterate over iso list and run 'fun_complexity'
results_complex <- future_map(iso_list, fun_complexity)


# Create non geo version of 
original_names <- names(results_complex)
new_names <- paste0(original_names, ".ng")
# Use future_map to iterate over sf_layers, removing geometry
results.complex.ng <- future_map(results_complex, ~st_set_geometry(.x, NULL))
# Set the names of the resulting list to the new names
names(results_complex) <- new_names


# Combine into single dataframe for analysis and plotting
complex_df <- map2_df(results.complex.ng, names(results_complex), function(x, name) {
  # Extract the numeric part from the name
  isocrn_ID <- as.integer(str_extract(name, "\\d+"))
  # Add the extracted number as a new column
  mutate(x, iso_layer_id =  isocrn_ID)
})

complex_df <- complex_df|> 
  select(iso_layer_id, id_iso, complexity) |> 
  rename(n = complexity)


# Prep data for plotting - 
plot_complex_data <- complex_df %>%
  group_by(iso_layer_id) %>%
  summarise(n = mean(n, na.rm = TRUE)) # Exclude NAs in mean calculation
# Convert layer ID to factor
complex_df$iso_layer_id <- factor(complex_df$iso_layer_id)


# Boxplot 
plot5.1 <- ggplot(complex_df, aes(x = iso_layer_id, y = n, fill = iso_layer_id)) +
  geom_boxplot(alpha = 0.5) +
  my_custom_theme +
  scale_y_log10() + # Log-transform the y-axis
  labs(x = "Isochrone layer ID", y = "Polygon complexity (shape index)",
       title = "Polygon complexity (shape index) distribution  per isochrone layer") +
  theme(legend.position = "none")
# View plot
plot5.1
# Export plot
save_my_plot(plot5.1, here("Out", "5_Complexity_Analysis", "Plot5.1_Complexity_per_poly_BOX.png"))



# Violin plot
plot5.2 <- ggplot(complex_df, aes(x = iso_layer_id, y = n, fill = iso_layer_id)) +
  geom_violin(alpha = 0.5) +
  my_custom_theme +
  scale_y_log10() + # Log-transform the y-axis
  labs(x = "Isochrone layer ID", y = "Polygon complexity (shape index)",
       title = "Polygon complexity (shape index) distribution  per isochrone layer") +
  theme(legend.position = "none")
# View plot
plot5.2 
# Export plot
save_my_plot(plot5.2, here("Out", "5_Complexity_Analysis", "Plot5.2_Complexity_per_poly_VIOLIN.png"))


# Bar plot
plot5.3 <- ggplot(plot_complex_data, aes(x = reorder(iso_layer_id, n), y = n)) +
  geom_bar(stat = "identity", fill = "steelblue") +
  my_custom_theme +
  coord_flip() + # Flip coordinates for horizontal bars
  labs(x = "Isochrone ID", y = "Mean polygon complexity (shape index) score", title = "Mean complexity (shape index) score per isochrone layer") 
plot5.3
# Export plot
save_my_plot(plot5.3, here("Out", "5_Complexity_Analysis", "Plot5.3_Complexity_MEAN_BAR.png"))



# Faceted density plot - without log transform 
plot5.4 <- ggplot(complex_df, aes(x = n)) + 
  geom_density(aes(fill = iso_layer_id), alpha = 0.5) + # Adjust alpha for transparency
  my_custom_theme +
  scale_x_log10() + # Log-transform the y-axis
  facet_wrap(~ iso_layer_id, scales = 'fixed') +
  labs(x = "Polygon complexity (shape index) score", y = "Density",
       title = "Distribution of polygons by complexity score per isochrone layer", fill = "Isochrone ID") 
# View plot
plot5.4
# Export plot
save_my_plot(plot5.4, here("Out", "5_Complexity_Analysis", "Plot5.4_compelxity_per_poly_DENSITY.png"))


# Calculate summary statistics
summary_stats <- complex_df |> 
  group_by(iso_layer_id) |> 
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
write_csv(summary_stats, here("Out", "5_Complexity_Analysis", "summary_statistics_complexity.csv"))
# Export raw data
complex_df  <- complex_df |> 
  rename(complexity = n)
write_csv(complex_df, here("Out", "5_Complexity_Analysis", "complexity_data.csv"))



## 9. PHARMACIES ANALYSIS ============================================================================


# Prep data for plotting - count points in and out of isochrones for each iso layer
plot_data <- pharms_iso_df|> 
  group_by(iso_layer_id, isochroneYN) |> 
  summarise(n = n()) |> 
  ungroup()
# Calculate the label position for household counts and percentages within stacked bars
plot_data <- plot_data |> 
  arrange(iso_layer_id, desc(isochroneYN))|> 
  group_by(iso_layer_id) |> 
  mutate(total_count = sum(n),
         percentage = n / total_count * 100, 
         label_position = cumsum(n) - 0.02 * cumsum(n), # offset the label position slightly down from top of bar
         # Creating a combined label with count and percentage, with formatting
         combined_label = paste(format(n, big.mark = ","), "\n(", sprintf("%.1f%%", percentage), ")", sep = "")) |> 
  ungroup()

# Only want to label data within isochrones
label_data <- plot_data |> 
  filter(isochroneYN == 1) 


# Bar plot
plot6.1 <- ggplot(plot_data, aes(x = as.factor(iso_layer_id), y = n, fill = factor(isochroneYN))) +
  geom_bar(stat = "identity", position = "stack") +
  scale_fill_brewer(palette = "Set2", labels = c("0" = "Outside isochrones", "1" = "Inside isochrones"), name = "IsochroneYN") +
  my_custom_theme +
  geom_text(data = label_data, aes(x = as.factor(iso_layer_id), y = label_position, label = combined_label), vjust = 1, color = "black", size = 3) +
  # scale_y_continuous(labels = label_M()) + # Use the custom label function here
  theme(legend.title = element_blank()) + 
  labs(title = "Pharmacies within isochrones", x = "Isochrone layer ID", y = "No. of pharmacies") 
# View plot
# plot6.1 
# Export plot
save_my_plot(plot6.1, here("Out", "6_Pharmacies_Analysis", "Plot6.1_Pharmacies_by_iso_layer_BAR.png"))



# Calculate pharmacies per isochrone
pharms_data <- pharms_iso_df |> 
  filter(isochroneYN ==1) |> # remove households outside poly
  group_by(iso_layer_id, id_iso) |> 
  summarise(n = n())
# Ensure iso_layer_id is a factor
pharms_data$iso_layer_id <- as.factor(pharms_data$iso_layer_id)


# Boxplot 
plot6.2 <- ggplot(pharms_data, aes(x = iso_layer_id, y = n, fill = iso_layer_id)) +
  geom_violin(alpha = 0.5) +
  my_custom_theme +
  # scale_y_log10() + # Log-transform the y-axis
  labs(x = "Isochrone layer ID", y = "Polygon complexity (shape index)",
       title = "Polygon complexity (shape index) distribution  per isochrone layer") +
  theme(legend.position = "none")
# # View plot
# plot6.2
# Export plot
save_my_plot(plot6.2, here("Out", "6_Pharmacies_Analysis", "Plot6.2_Complexity_per_poly_BOX.png"))



# Calculate summary statistics
summary_stats <- pharms_data |> 
  group_by(iso_layer_id) |>
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
write_csv(summary_stats, here("Out", "6_Pharmacies_Analysis", "summary_statistics_pharmacies_per_layer.csv"))
# Export raw data
pharms_data <- pharms_data |> 
  rename(pharmacies = n)
write_csv(pharms_data, here("Out", "6_Pharmacies_Analysis", "pharmacies_per_poly_per_layer.csv"))



# Capture end time
end_time <- Sys.time()
# Calculate runtime in minutes and save to the environment
runtime_minutes <- as.numeric(difftime(end_time, start_time, units = "mins"))
runtime_minutes <- round(runtime_minutes, digits = 1)





## SAVE R SESSION=======================================================================================
# To save re-running script in development 
save.image(file = here("Workspace_backups", "my_workspace.RData"))

# Save session minus huge results.opg data frame
# List all objects in the environment
all_objects <- ls()
# Remove the object 'result.opg' from the list
objects_to_save <- setdiff(all_objects, "result.opg")
save.image(file = here("Workspace_backups", "my_workspace_noResult.opg.RData"))


## LOAD R SESSION=======================================================================================
load(here("Workspace_backups", "my_workspace.RData"))

# Load light version without result.opg
load(here("Workspace_backups", "my_workspace_noResult.opg.RData"))





















































