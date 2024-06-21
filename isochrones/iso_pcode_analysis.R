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
library(RColorBrewer) # colour palettes for plotting with ggplot2
library(scales) # scales functions for plotting
library(reshape2) # For melt function



# 2. POSTGRES DATABASE CONNECTION SETUP ================================================================

# Load PostgeSQL database connection details
source(here("Scripts", "postgres.credentials.R"))
# Set database names for connections (to USW GIS database + my personal database)
dbname.usw <- "usw_research"
dbname.rob <- "rob_research"
# Create a function to connect to the PostgreSQL database
create_conn <- function(host, port, dbname, user, password) {
  conn <- tryCatch({
    dbConnect(RPostgres::Postgres(), dbname=dbname, host=host, port=port, user=user, password=password)
  }, error = function(e) {
    NULL
  })
  
  if (is.null(conn)) {
    warning("Connection unsuccessful. Check settings.")
  } else {
    print("Connected successfully to the database!")
    return(conn)
  }
}
# Create Postgres connections
conn.usw_research <- create_conn(host, port, dbname.usw, user, password)
conn.rob_research <- create_conn(host, port, dbname.rob, user, password)



# 3. ISOCHRONES IMPORT AND PRE-PROCESSING ========================================================================

# Generate SQL queries 
iso_poly_names <- paste0("iso_p", 1:6)  # Example sequence

# Create function to generate SQL queries for each isochrone layer
create_sql_query <- function(iso_poly_name) {
  sprintf("SELECT * FROM isochrones.%s WHERE stop_id IN (SELECT stop_id FROM bus.stops_all WHERE date_added = '2403')", iso_poly_name)
}
# Generate a list of SQL queries for each isochrone layer
qry_iso <- lapply(iso_poly_names, function(name) create_sql_query(name))

# Function for reading and renaming data
read_and_rename <- function(qry_iso, conn) {
  st_read(conn, query = qry_iso)  %>%  # Read spatial data from the database using the provided query and connection
    rename(the_geom = geom) |>  # Rename the geometry column to 'the_geom'
    mutate(the_geom = st_make_valid(the_geom)) %>%  # Ensure the geometry is valid
    {
      if(st_crs(.)$epsg != 27700) {  # Check if the coordinate reference system (CRS) is not EPSG:27700
        st_transform(., 27700)  # If not, transform the CRS to EPSG:27700
      } else {
        .  # If the CRS is already EPSG:27700, do nothing
      }
    } |> 
    filter(st_geometry_type(the_geom) %in% c("POLYGON", "MULTIPOLYGON")) %>%  # Keep only 'POLYGON' and 'MULTIPOLYGON' geometries
    mutate(area_m2 = st_area(the_geom)) %>%  # Calculate the area of the geometries in square meters
    dplyr::rename(id_iso = stop_id) %>%  # Rename the 'stop_id' column to 'id_iso'
    dplyr::select(id_iso, area_m2)  # Select only the 'id_iso' and 'area_m2' columns for the final output
}

# Execute read_and_rename function on each query
iso_list <- lapply(qry_iso, function(qry) read_and_rename(qry, conn.usw_research))
# Naming the elements of iso_list for easier access
names(iso_list) <- paste0("iscrn", 1:length(iso_list))

# Identify null polygons (particular issue in isochrone 5) - remove them and also remove other polys from all layers with same ID to avoid later issues with analysis (e.g. Jaccard comparisions) - only removeS 500 or so polys from each layer of 20,000 - so sample is still plenty big enough
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
  sf_layer |> 
    # Convert the area_m2 to numeric if it has units
    mutate(area_m2_numeric = as.numeric(area_m2)) |> 
    # Filter based on the numeric value
    filter(area_m2_numeric >= 1) |> 
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
# Rename filtered list to "iso_list" for further processing
iso_list <- iso_list_filtered
rm(iso_list_filtered)



# 4. OD MATRIX IMPORT AND PRE-PROCESSING ========================================================================

# Note from Mitch - "Column nwd is the computed network distance, from the bus stop in field stop_id  to the postcode in field postcode. We may add a second column, say nwd2 that also adds the perpendicular snap distance to the network, once I’ve computed it"

# SQL query to read in the OD matrix
qry_OD <- "SELECT * FROM bus.od_ef_stops_all_pcd_swabi_850_nwd2"
# Read into R as dataframe
OD <- dbGetQuery(conn.usw_research, qry_OD)
# Remove rows where distance from bus stop to postcode is over 400 metres
OD <- OD |> 
  filter(nwd2 <= 400)
# Keep only the rows with matching "stop_ID" in isochrone layers (using "common_ids" from above)
OD <- OD |> 
  filter(stop_id %in% common_ids) |> 
  select(stop_id, postcode, nwd2) 
# Trim all spaces and  white space from postcode column
OD$postcode <- gsub(" ", "", OD$postcode)
OD$postcode <- trimws(OD$postcode)



# 5. BUS STOPS IMPORT AND PRE-PROCESSING ========================================================================

# MAY NOT NEED THIS BUT IMPORT ANYWAY
# SQL query to read in bus stops
qry_BS <- "SELECT * FROM  bus.stops_all"
BS <- st_read(conn.usw_research, query = qry_BS) |> 
  st_transform(27700) # Transform to EPSG:27700
# Keep only the bus stops with matching "stop_ID" in isochrone layers (using "common_ids" from above)
BS <- BS |> 
  filter(stop_id %in% common_ids) |> 
  select(stop_id) 



# 6. POSTCODES IMPORT AND PRE-PROCESSING ========================================================================

# Import postcodes
qry_PC <- "SELECT * FROM  bus.pcd_swabi"
PC <- st_read(conn.usw_research, query = qry_PC) |> 
  select(postcode) |> 
  st_transform(27700) # Transform to EPSG:27700
# Trim all space and white space from postcode column
PC$postcode <- gsub(" ", "", PC$postcode)
PC$postcode <- trimws(PC$postcode)

# Close the database connections
dbDisconnect(conn.usw_research)
dbDisconnect(conn.rob_research)



# 7. INTERSECT ISOCHRONES WITH POSTCODES ========================================================================

# Aim is to generate a list of postcodes which intersect with each polygon in the isochrone layers
# Function to perform analysis for all isochrone layers
fun_iso_pcodes <- function(isochrone) {
  # Perform spatial intersection using st_interects (to need to return geometry with st_intersection)
  int_PC <- sf::st_join(isochrone, PC, join = st_intersects)
  # Remove geom (convert to dataframe) for further non-spatial processing
  int_PC <- int_PC |> 
    select(-the_geom, -area_m2) |> 
    as.data.frame()
  # Group by  isochrone polygon ID and summarise the intersecting postcode points
  result <- int_PC |> 
    select(-the_geom) |>
    group_by(id_iso) |> 
    summarise(postcodes = list(postcode)) # New column of nested postcodes for each polygon
  return(result)
  }
# Apply the function to each isochrone layer in the list
list_iso_pcodes <- map(iso_list, fun_iso_pcodes)
# View the result
print(list_iso_pcodes)



# 8. PREPARE OD MATRIX DATA FOR ANALYSIS ========================================================================

# Create a nested column of the postcodes within 400m of each bus stop as calculated in the OD matrix
OD_pcodes <- OD |> 
  select(stop_id, postcode)|>
  group_by(stop_id)|> 
  summarise(postcodes = list(postcode))



# 9. PERFORM POSTCODE ANALYSIS ========================================================================

# Unnest postcodes in OD matrix 
OD_pcodes_unnested <- OD_pcodes %>%
  unnest(postcodes)

# Function to calculate postcode stats for each isochrone layer
fun_calcs <- function(isochrone) {
  # Unnest the list columns for easier comparison
    iso_unnested <- isochrone %>%
    unnest(postcodes)
  # Join the data frames based on matching postcodes
  matches <- iso_unnested %>%
    inner_join(OD_pcodes_unnested, by = c("id_iso" = "stop_id", "postcodes"))
  # Nest the matches back into a list column
  Iso_result <- matches |> 
    group_by(id_iso) |> 
    summarise(postcodes_match = list(postcodes)) %>%
    right_join(isochrone, by = "id_iso") %>%
    mutate(postcodes_match = if_else(is.na(postcodes_match), list(character(0)), postcodes_match))
  # Join the corresponding OD_pcodes postcodes for each id_iso
  Iso_result <- Iso_result |> 
    left_join(OD_pcodes |>  rename(id_iso = stop_id), by = "id_iso", suffix = c("", "_od")) |> 
    rename(postcodes_iso = postcodes) |> 
    select(id_iso, postcodes_iso, postcodes_od, postcodes_match)
  # Create a column for non-matching postcodes in Iso layer but not in OD layer
  Iso_result <- Iso_result |> 
    mutate(postcodes_iso_not_od = map2(postcodes_iso, postcodes_od, setdiff),
           postcodes_od_not_iso = map2(postcodes_od, postcodes_iso, setdiff))
  # Add columns that count the number of elements in each list column
  Iso_result <- Iso_result %>%
    mutate(
      count_postcodes_iso = map_int(postcodes_iso, length),
      count_postcodes_od = map_int(postcodes_od, length),
      count_postcodes_match = map_int(postcodes_match, length),
      count_postcodes_iso_not_od = map_int(postcodes_iso_not_od, length),
      count_postcodes_od_not_iso = map_int(postcodes_od_not_iso, length)
    )
  return(Iso_result)
}

# Run above function on all isochrone layers, creating a list of isochone results
list_iso_results <- map(list_iso_pcodes, fun_calcs)

# Create a single data frame to hold results for each isochrone layer, adding a new column to identify the isochrone layer
df_results <- bind_rows(list_iso_results, .id = "iso_layer_id")

# Create version for export without postcode character columns
df_csv_export <- df_results %>%
  mutate(across(where(is.list), ~ map_chr(., ~ paste(.x, collapse = ","))))
# Export df_results as a CSV file
write_csv(df_csv_export, here("Out", "7_Postcode_Analysis", "iso_pcode_analysis_raw_results.csv"))



# 10. VISUALISE RESULTS  ========================================================================


# Create a custom theme for consistency with plotting
my_custom_theme <- theme_bw() + 
  theme(
    text = element_text(family = "Arial", color = "#333333"),
    plot.background = element_rect(fill = "white", color = NA), # Set plot background to white
    panel.background = element_rect(fill = "white", color = NA), # Set panel background to white
    # remove legend title
    legend.title = element_blank()
  )
# Apply the theme globally 
theme_set(my_custom_theme)

# Custom function to save plots with a default size
save_my_plot <- function(plot, filename, width = 8, height = 5, dpi = 300) {
  ggsave(plot = plot, filename = filename, width = width, height = height, dpi = dpi)
} 

# Function to replace legend labels for group level plots
replace_legend_labels <- function(labels) {
  labels <- gsub("count_postcodes_match", "Accurate", labels)
  labels <- gsub("count_postcodes_iso_not_od", "Commission error", labels)
  labels <- gsub("count_postcodes_od_not_iso", "Omission error", labels)
  return(labels)
}

# Custom scale function to apply the replacement function
custom_scale_fill <- function() {
  scale_fill_manual(
    values = brewer.pal(3, "Set2"),
    labels = replace_legend_labels
  )
}


# PREPARE DATA FOR PLOTTING

# Create version of results without postcode character columns for plotting
data <- df_results %>%
  select(-postcodes_iso, -postcodes_od, -postcodes_match, -postcodes_iso_not_od, -postcodes_od_not_iso)
# Melt the data for ggplot
data_melted <- melt(data, id.vars = "iso_layer_id", measure.vars = c("count_postcodes_match", "count_postcodes_iso_not_od", "count_postcodes_od_not_iso"))
# Convert 'variable' column to factor with specified levels
data_melted$variable <- factor(data_melted$variable, levels = rev(c("count_postcodes_match", "count_postcodes_od_not_iso", "count_postcodes_iso_not_od")))

# Show sum of each variable for each isochrone layer
data_sums <- data_melted |> 
  group_by(iso_layer_id, variable) |> 
  summarise(sum_value = sum(value)) |> 
  mutate(proportion = sum_value / sum(sum_value))
# Export to CSV
write_csv(data_sums, here("Out", "7_Postcode_Analysis", "iso_pcode_analysis_totals.csv"))


# ISCHONE LAYER COMPARISONS

# Stacked bar chart
plot_stacked <- ggplot(data_melted, aes(x = iso_layer_id, y = value, fill = variable)) +
  geom_bar(stat = "identity", position = "fill") +
  labs(title = "Isochrone postcode analysis", y = "Proportion (postcodes)", x = "Isochrone layer") +
  custom_scale_fill()
plot_stacked
# Export plot
save_my_plot(plot_stacked, here("Out", "7_Postcode_Analysis", "Plot_pcode_analysis_stacked.png"))

# Grouped bar chart
plot_grouped <- ggplot(data_sums, aes(x = iso_layer_id, y = sum_value, fill = variable)) +
  geom_bar(stat = "identity", position = "dodge") +
  labs(title = "Isochrone postcode analysis", y = "Count (postcodes)", x = "Isochrone Layer") +
  scale_y_continuous(labels = scales::unit_format(unit = "K", scale = 1e-3)) +
  custom_scale_fill()
  # custom_scale_fill()
plot_grouped
# Export plot
save_my_plot(plot_grouped, here("Out", "7_Postcode_Analysis", "Plot_pcode_analysis_grouped_bar.png"))


# DISTRIBUTION PLOTS

# Faceted violin plots for count_postcodes_match
plot_violin_accurate <- ggplot(data, aes(x = iso_layer_id, y = count_postcodes_match, fill = iso_layer_id)) +
  geom_violin() +
 # Log-transform the y-axis
  labs(title = "Violin plot of accurate postcodes", x = "Isochrone layer", y = "Count of postcodes") +
  theme_bw() +
  theme(legend.position = "none")  # Remove legend
plot_violin_accurate
# Export plot
save_my_plot(plot_violin_accurate, here("Out", "7_Postcode_Analysis", "Plot_pcode_analysis_violin_accurate.png"))


# Violin plots for count_postcodes_iso_not_od
plot_violin_commission <- ggplot(data, aes(x = iso_layer_id, y = count_postcodes_iso_not_od, fill = iso_layer_id)) +
  geom_violin() +
  # log10 scale for y-axis
  scale_y_log10() +
  labs(title = "Violin plot of commission errors", x = "Isochrone layer", y = "Count of postcodes (log10)") +
  theme_bw() +
  theme(legend.position = "none")  # Remove legend
plot_violin_commission
# Export plot
save_my_plot(plot_violin_commission, here("Out", "7_Postcode_Analysis", "Plot_pcode_analysis_violin_commission.png"))

# Violin plots for count_postcodes_od_not_iso
plot_violin_omission <- ggplot(data, aes(x = iso_layer_id, y = count_postcodes_od_not_iso, fill = iso_layer_id)) +
  geom_violin() +
  # log10 scale for y-axis
  scale_y_log10() +
  labs(title = "Violin plot of omission errors", x = "Isochrone layer", y = "Count of postcodes (log10)") +
  theme_bw() +
  theme(legend.position = "none")  # Remove legend
plot_violin_omission
# Export plot
save_my_plot(plot_violin_omission, here("Out", "7_Postcode_Analysis", "Plot_pcode_analysis_violin_omission.png"))



# 11. SUMMARY STATS  ========================================================================

# Generate summary statistics for each numeric column in raw results "data", grouped by iso_layer_id
summary_stats <- data %>%
  group_by(iso_layer_id) %>%
  summarise(across(where(is.numeric), list(
    count = ~sum(!is.na(.)),
    mean = ~mean(., na.rm = TRUE),
    sd = ~sd(., na.rm = TRUE),
    min = ~min(., na.rm = TRUE),
    q25 = ~quantile(., 0.25, na.rm = TRUE),
    median = ~median(., na.rm = TRUE),
    q75 = ~quantile(., 0.75, na.rm = TRUE),
    max = ~max(., na.rm = TRUE)
  )))

# Print the summary statistics
print(summary_stats)
# Export to CSV
write_csv(summary_stats, here("Out", "7_Postcode_Analysis", "iso_pcode_analysis_summary_stats.csv"))



# 12. SAVE WORKSPACE  ========================================================================

# Save workspace
save.image(here("Workspace_backups", "iso_pcode_analysis.RData"))

# Capture end time
end_time <- Sys.time()
# Calculate runtime in minutes and save to the environment
runtime_minutes <- as.numeric(difftime(end_time, start_time, units = "mins"))
runtime_minutes <- round(runtime_minutes, digits = 1)
# Beep to alert that the script has finished
beepr::beep(3)
# Print the runtime
print(paste("Script completed in", runtime_minutes, "minutes"))





































