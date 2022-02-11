import { RecipeGrain, RecipeHop, RecipeYeast } from "../pages/recipe-detail";

export const calculateSrm = (
  batchSizeGallons: number,
  grains: RecipeGrain[]
): number | null => {
  if (!batchSizeGallons || !grains) {
    return null;
  }
  let srm = 0;
  grains.forEach((grain) => {
    if (grain.color && grain.amount) {
      srm += (grain.amount * grain.color) / batchSizeGallons;
    }
  });

  srm = 1.4922 * srm ** 0.6859;

  srm = Math.round(srm);

  return srm;
};

export const calculateOg = (
  grains: RecipeGrain[],
  batchSizeGallons: number,
  efficiency: number
): number | null => {
  if (!batchSizeGallons || grains.length === 0 || !efficiency) {
    return null;
  }
  const unadjustedOg = grains.reduce((og, { gravity, amount }) => {
    if (gravity <= 0 || amount <= 0) {
      return og;
    }
    const points = gravity - 1;
    return (og += points * amount);
  }, 0);

  const actualEfficiency = efficiency / 100;

  const efficiencyOg = unadjustedOg * actualEfficiency;

  const adjustedOg = efficiencyOg / batchSizeGallons + 1;

  return Math.round(adjustedOg * 1000) / 1000;
};

export const calculateFg = (
  og: number | null,
  yeasts: RecipeYeast[]
): number | null => {
  if (!og || yeasts.length === 0) {
    return null;
  }

  const ogPercentage = og - 1;

  const averageAttenuation =
    yeasts.reduce((att, yeast) => {
      return (att += yeast.attenuation / 100);
    }, 0) / yeasts.length;

  const averageNotAttenuated = 1 - averageAttenuation;

  const rawFg = ogPercentage * averageNotAttenuated + 1;

  return Math.round(rawFg * 1000) / 1000;
};

export const calculateAbv = (
  og: number | null,
  fg: number | null
): number | null => {
  if (!og || !fg) {
    return null;
  }
  const rawAbv = (og - fg) * 131.25;
  return Math.round(rawAbv * 10) / 10;
};

export const calculateIbu = (
  og: number | null,
  hops: RecipeHop[],
  batchSize: number
): number | null => {
  if (!og) {
    return null;
  }

  const bignessFactor = 1.65 * 0.000125 ** (og - 1);

  let totalIbu = 0;

  hops.forEach((hop) => {
    if (hop.minutes && hop.amount) {
      const boilTimeFactor = (1 - Math.E ** (-0.04 * hop.minutes)) / 4.15;
      const aaUtilization = bignessFactor * boilTimeFactor;
      const mgLtrAa = ((hop.alpha / 100) * hop.amount * 7490) / batchSize;
      const ibu = aaUtilization * mgLtrAa;
      totalIbu += ibu;
    }
  });

  return Math.round(totalIbu);
};
