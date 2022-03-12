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

export const recipeToMetric = (imperialRecipe: BT.Recipe): BT.Recipe => {
  const metricHops: BT.Hop[] = imperialRecipe.hops.map((hop) => {
    return {
      ...hop,
      amount: ouncesToGrams(hop.amount),
    };
  });

  const metricFermentables: BT.Fermentable[] = imperialRecipe.fermentables.map(
    (fermentable) => {
      return {
        ...fermentable,
        amount: poundsToKilograms(fermentable.amount),
      };
    }
  );

  return {
    ...imperialRecipe,
    batchSize: gallonsToLiters(imperialRecipe.batchSize),
    measurementType: "metric",
    hops: metricHops,
    fermentables: metricFermentables,
  };
};

export const recipeToImperial = (metricRecipe: BT.Recipe): BT.Recipe => {
  const metricHops: BT.Hop[] = metricRecipe.hops.map((hop) => {
    return {
      ...hop,
      amount: gramsToOunces(hop.amount),
    };
  });

  const metricFermentables: BT.Fermentable[] = metricRecipe.fermentables.map(
    (fermentable) => {
      return {
        ...fermentable,
        amount: kilogramsToPounds(fermentable.amount),
      };
    }
  );

  return {
    ...metricRecipe,
    batchSize: litersToGallons(metricRecipe.batchSize),
    measurementType: "imperial",
    hops: metricHops,
    fermentables: metricFermentables,
  };
};

export const brewSettingsToMetric = (
  imperialBrewSettings: BT.BrewSettings
): BT.BrewSettings => {
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
  metricBrewSettings: BT.BrewSettings
): BT.BrewSettings => {
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
