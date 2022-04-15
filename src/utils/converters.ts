import { BrewingTypes as BT } from "brewing-shared";

export const gallonsToLiters = (gallons: number): number => {
  const rawLiters = gallons * 3.78541;
  return parseFloat(rawLiters.toFixed(2));
};

export const litersToGallons = (liters: number): number => {
  const rawGallons = liters / 3.78541;
  return parseFloat(rawGallons.toFixed(2));
};

export const poundsToKilograms = (pounds: number): number => {
  const rawKg = pounds / 2.205;
  return parseFloat(rawKg.toFixed(2));
};

export const kilogramsToPounds = (kilograms: number): number => {
  const rawLb = kilograms * 2.205;
  return parseFloat(rawLb.toFixed(2));
};

export const ouncesToGrams = (ounces: number): number => {
  const rawGrams = ounces * 28.35;
  return parseFloat(rawGrams.toFixed(2));
};

export const gramsToOunces = (grams: number): number => {
  const rawOz = grams / 28.35;
  return parseFloat(rawOz.toFixed(2));
};

export const quartPoundsToLiterKilos = (quartPounds: number) => {
  const rawLiterKilos = quartPounds * 2.086;
  return parseFloat(rawLiterKilos.toFixed(1));
};

export const literKilosToQuartPounds = (literKilos: number) => {
  const rawQuartPounds = literKilos / 2.086;
  return parseFloat(rawQuartPounds.toFixed(1));
};

export const recipeToMetric = (recipe: BT.Recipe): BT.Recipe => {
  recipe.ingredients.forEach((ingredient) => {
    if (ingredient.type === "Hop" && ingredient.amountType === "oz") {
      ingredient.amount = ouncesToGrams(ingredient.amount);
    } else if (
      ingredient.type === "Fermentable" &&
      ingredient.amountType === "lb"
    ) {
      ingredient.amount = poundsToKilograms(ingredient.amount);
    }
  });

  return {
    ...recipe,
    batchSize:
      recipe.measurementType === "metric"
        ? recipe.batchSize
        : gallonsToLiters(recipe.batchSize),
  };
};

export const recipeToImperial = (recipe: BT.Recipe): BT.Recipe => {
  recipe.ingredients.forEach((ingredient) => {
    if (ingredient.type === "Hop" && ingredient.amountType === "g") {
      ingredient.amount = gramsToOunces(ingredient.amount);
    } else if (
      ingredient.type === "Fermentable" &&
      ingredient.amountType === "kg"
    ) {
      ingredient.amount = kilogramsToPounds(ingredient.amount);
    }
  });

  return {
    ...recipe,
    batchSize:
      recipe.measurementType === "imperial"
        ? recipe.batchSize
        : litersToGallons(recipe.batchSize),
  };
};

export const brewSettingsToMetric = (
  imperialBrewSettings: BT.User
): BT.User => {
  return {
    ...imperialBrewSettings,
    batchSize: gallonsToLiters(imperialBrewSettings.batchSize),
    boilOffWaterLossRate: gallonsToLiters(
      imperialBrewSettings.boilOffWaterLossRate
    ),
    fermentorTrubWaterLoss: gallonsToLiters(
      imperialBrewSettings.fermentorTrubWaterLoss
    ),
    kettleTrubWaterLoss: gallonsToLiters(
      imperialBrewSettings.kettleTrubWaterLoss
    ),
    waterLossPerGrain: quartPoundsToLiterKilos(
      imperialBrewSettings.waterLossPerGrain
    ),
    mashThickness: quartPoundsToLiterKilos(imperialBrewSettings.mashThickness),
  };
};

export const brewSettingsToImperial = (
  metricBrewSettings: BT.User
): BT.User => {
  return {
    ...metricBrewSettings,
    batchSize: litersToGallons(metricBrewSettings.batchSize),
    boilOffWaterLossRate: litersToGallons(
      metricBrewSettings.boilOffWaterLossRate
    ),
    fermentorTrubWaterLoss: litersToGallons(
      metricBrewSettings.fermentorTrubWaterLoss
    ),
    kettleTrubWaterLoss: litersToGallons(
      metricBrewSettings.kettleTrubWaterLoss
    ),
    waterLossPerGrain: literKilosToQuartPounds(
      metricBrewSettings.waterLossPerGrain
    ),
    mashThickness: literKilosToQuartPounds(metricBrewSettings.mashThickness),
  };
};
