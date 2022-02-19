import { Fermentable, Culture, Hop } from "../types/recipe";

export const calculateSrm = (
  batchSizeGallons: number,
  fermentables: Fermentable[]
): number | null => {
  if (!batchSizeGallons || !fermentables) {
    return null;
  }
  let srm = 0;

  const actualFermentables = fermentables.filter((grain) => !!grain);

  actualFermentables.forEach((fermentable) => {
    if (fermentable.lovibond && fermentable.amount && fermentable.gravity) {
      srm += (fermentable.amount * fermentable.lovibond) / batchSizeGallons;
    }
  });

  srm = 1.4922 * srm ** 0.6859;

  srm = Math.round(srm);

  return srm;
};

export const calculateOg = (
  fermentables: Fermentable[],
  batchSizeGallons: number,
  efficiency: number
): number | null => {
  if (!batchSizeGallons || fermentables.length === 0 || !efficiency) {
    return null;
  }

  const actualFermentables = fermentables.filter(
    (fermentable) =>
      !!fermentable &&
      fermentable.gravity &&
      fermentable.amount &&
      fermentable.gravity > 0 &&
      fermentable.amount > 0
  );

  const unadjustedOg = actualFermentables.reduce((og, { gravity, amount }) => {
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
  cultures: Culture[]
): number | null => {
  if (!og || cultures.length === 0) {
    return null;
  }

  const ogPercentage = og - 1;

  const averageAttenuation =
    cultures.reduce((att, culture) => {
      return (att += culture.attenuation / 100);
    }, 0) / cultures.length;

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
  hops: Hop[],
  batchSize: number
): number | null => {
  if (!og) {
    return null;
  }

  const bignessFactor = 1.65 * 0.000125 ** (og - 1);

  let totalIbu = 0;

  const actualHops = hops.filter((hop) => !!hop);

  actualHops.forEach((hop) => {
    if (hop.timing && hop.amount && hop.use === "Boil" && hop.alphaAcid) {
      const boilTimeFactor = (1 - Math.E ** (-0.04 * hop.timing)) / 4.15;
      const aaUtilization = bignessFactor * boilTimeFactor;
      const mgLtrAa = ((hop.alphaAcid / 100) * hop.amount * 7490) / batchSize;
      const ibu = aaUtilization * mgLtrAa;
      totalIbu += ibu;
    }
  });

  return Math.round(totalIbu);
};
