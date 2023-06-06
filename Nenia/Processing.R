#> Load required code libraries (R packages)
library(tidyverse) # data munging 
library(here) # relative file path management

#> Get path to main input data folder
project.folder <- here("In")
#> Get paths to sub-folders (one for each variable to process)
main.folders <- list.dirs(project.folder, recursive = FALSE)

#> Loop through the folders 
for(i in 1:length(main.folders)){
  #> Target folder as variable
  fold.in <- main.folders[i]
  #> Get name of folder
  fold.name  <- basename(fold.in)
  #> List input CSVs, read-in, and bind together into a single table
  files <- list.files(fold.in, include.dirs = F, full.names = T, recursive = T)

#> Empty list to populate
files.list <- list()

#> Loop through each file and bind into single table
for(i in 1:length(files)){
  x <- read.csv(files[i])
  files.list[[i]] <- x
  }

#> Bind the list of cleaned data frames into a single table
data <- do.call(rbind.data.frame, files.list)
#> Get duplicates based on first tow columns
dupes <- data |> 
  group_by(Source, Target) %>%
  filter(n() > 1) |> 
  summarise(Weight = sum(Weight), Label = sum(Label)) |> 
  ungroup()

# Remove rows that are duplicates based on the first two columns
unique.data <- data[!(duplicated(data[1:2])|duplicated(data[1:2], fromLast=TRUE)),]
#> Merge the two tables
data.final <- rbind(dupes, unique.data)
#> Sort
data.final <- data.final |> 
  arrange(Source)
#> Export
write_csv(data.final, here("Out", paste0("Processed_", fold.name, ".csv")))

#> Close outer loop
}

















