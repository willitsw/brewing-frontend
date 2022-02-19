import { Fermentable, Hop, Recipe } from "../types/recipe";

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

export const recipeToMetric = (imperialRecipe: Recipe): Recipe => {
  const metricHops: Hop[] = imperialRecipe.hops.map((hop) => {
    return {
      ...hop,
      amount: ouncesToGrams(hop.amount),
    };
  });

  const metricFermentables: Fermentable[] = imperialRecipe.fermentables.map(
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

export const recipeToImperial = (metricRecipe: Recipe): Recipe => {
  const metricHops: Hop[] = metricRecipe.hops.map((hop) => {
    return {
      ...hop,
      amount: gramsToOunces(hop.amount),
    };
  });

  const metricFermentables: Fermentable[] = metricRecipe.fermentables.map(
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
