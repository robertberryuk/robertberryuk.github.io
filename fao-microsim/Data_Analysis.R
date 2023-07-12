
#> Code for FAO project: Implementation of microeconomic simulation to assess the inclusivity and sustainability of agricultural public investments at the territorial level.

#> Libraries
library(tidyverse)
library(broom)
library(here)


#> Load data
data <- readxl::read_excel(here("In", "Microdata", "simulation_minidata 1.xlsx"))

# Subset the data for farmers (farmers = 1)
data_farmers <- data |> 
  filter(farmers == 1) 



#> SCENARIO 1 (UNMODIFIED) ####

# Estimate the translog production function for wheat
model_wheat <- lm(LnQ_wheat ~ LnL_wheat + LnK_wheat + LnM_wheat + LnD_wheat + LnK_LnL_wheat + LnK_LnM_wheat +
                    LnK_LnD_wheat + LnL_LnM_wheat + LnL_LnD_wheat + LnM_LnD_wheat + LnK_wheat2 + LnL_wheat2 +
                    LnM_wheat2 + LnD_wheat2, data = data_farmers)

# Extract the estimated coefficients
coefficients_wheat <- tidy(model_wheat)

# Estimate the translog production function for corn
model_corn <- lm(LnQ_corn ~ LnL_corn + LnK_corn + LnM_corn + LnD_corn + LnK_LnL_corn + LnK_LnM_corn +
                   LnK_LnD_corn + LnL_LnM_corn + LnL_LnD_corn + LnM_LnD_corn + LnK_corn2 + LnL_corn2 +
                   LnM_corn2 + LnD_corn2, data = data_farmers)

# Extract the estimated coefficients
coefficients_corn <- tidy(model_corn)

# Estimate the translog production function for rice
model_rice <- lm(LnQ_rice ~ LnL_rice + LnK_rice + LnM_rice + LnD_rice + LnK_LnL_rice + LnK_LnM_rice +
                   LnK_LnD_rice + LnL_LnM_rice + LnL_LnD_rice + LnM_LnD_rice + LnK_rice2 + LnL_rice2 +
                   LnM_rice2 + LnD_rice2, data = data_farmers)

# Extract the estimated coefficients
coefficients_rice <- tidy(model_rice)

# Predict the values of Ln(Q) for wheat based on input variables
data_farmers$predicted_Q_wheat <- predict(model_wheat, newdata = data_farmers)

# Predict the values of Ln(Q) for corn based on input variables
data_farmers$predicted_Q_corn <- predict(model_corn, newdata = data_farmers)

# Predict the values of Ln(Q) for rice based on input variables
data_farmers$predicted_Q_rice <- predict(model_rice, newdata = data_farmers)





# SCENARIO 2 (minium 2 tractors) ####

# Estimate the translog production function for wheat
model_wheat_s <- lm(LnQ_wheat ~ LnL_wheat + LnK_wheat_s + LnM_wheat + LnD_wheat + LnK_LnL_wheat_s + LnK_LnM_wheat_s +
                    LnK_LnD_wheat_s + LnL_LnM_wheat + LnL_LnD_wheat + LnM_LnD_wheat + LnK_wheat2_s + LnL_wheat2 +
                    LnM_wheat2 + LnD_wheat2, data = data_farmers)
# Extract the estimated coefficients
coefficients_wheat_s <- tidy(model_wheat_s)


# Estimate the translog production function for corn
model_corn_s <- lm(LnQ_corn ~ LnL_corn + LnK_corn_s + LnM_corn + LnD_corn + LnK_LnL_corn_s + LnK_LnM_corn_s +
                   LnK_LnD_corn_s + LnL_LnM_corn + LnL_LnD_corn + LnM_LnD_corn + LnK_corn2_s + LnL_corn2 +
                   LnM_corn2 + LnD_corn2, data = data_farmers)
# Extract the estimated coefficients
coefficients_corn_s <- tidy(model_corn_s)

# Estimate the translog production function for rice
model_rice_s <- lm(LnQ_rice ~ LnL_rice + LnK_rice_s + LnM_rice + LnD_rice + LnK_LnL_rice_s + LnK_LnM_rice_s +
                   LnK_LnD_rice_s + LnL_LnM_rice + LnL_LnD_rice + LnM_LnD_rice + LnK_rice2_s + LnL_rice2 +
                   LnM_rice2 + LnD_rice2, data = data_farmers)

# Extract the estimated coefficients
coefficients_rice_s <- tidy(model_rice_s)

# Predict the values of Ln(Q) for wheat based on input variables
data_farmers$predicted_Q_wheat_s <- predict(model_wheat_s, newdata = data_farmers)

# Predict the values of Ln(Q) for corn based on input variables
data_farmers$predicted_Q_corn_s <- predict(model_corn_s, newdata = data_farmers)

# Predict the values of Ln(Q) for rice based on input variables
data_farmers$predicted_Q_rice_s <- predict(model_rice_s, newdata = data_farmers)


#> Examine final predictions
df_predictions <- data_farmers |> 
  select(hhid, predicted_Q_wheat, predicted_Q_corn, predicted_Q_rice, predicted_Q_wheat_s, predicted_Q_corn_s, predicted_Q_rice_s)

#> Export as CSV
write_csv(df_predictions, here("Out", "translog_crop_predictions.csv"))













