import { gallonsToLiters, recipeToImperial } from "./converters";
import { BrewingTypes as BT, RecipeUtils } from "brewing-shared";

export const calculateSrm = (
  batchSizeGallons: number,
  fermentables: BT.Fermentable[]
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
  fermentables: BT.Fermentable[],
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
  cultures: BT.Culture[]
): number | null => {
  if (!og || cultures.length === 0) {
    return null;
  }

  const ogPercentage = og - 1;

  const averageAttenuation =
    cultures.reduce((att, culture) => {
      if (culture && culture.attenuation) {
        return (att += culture.attenuation / 100);
      } else {
        return att;
      }
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
  hops: BT.Hop[],
  batchSize: number
): number | null => {
  if (!og) {
    return null;
  }

  const bignessFactor = 1.65 * 0.000125 ** (og - 1);

  let totalIbu = 0;

  const actualHops = hops.filter((hop) => !!hop);

  actualHops.forEach((hop) => {
    if (hop.timing && hop.amount && hop.alphaAcid) {
      const boilTimeFactor = (1 - Math.E ** (-0.04 * hop.timing)) / 4.15;
      const aaUtilization = bignessFactor * boilTimeFactor;
      const mgLtrAa = ((hop.alphaAcid / 100) * hop.amount * 7490) / batchSize;
      const ibu = aaUtilization * mgLtrAa;
      totalIbu += ibu;
    }
  });

  return Math.round(totalIbu);
};

const getGrainPounds = (grains: BT.Fermentable[]): number => {
  return grains.reduce((pounds, currentFermentable) => {
    if (
      !currentFermentable ||
      !currentFermentable.amount ||
      currentFermentable.fermentableType !== "Grain"
    ) {
      return pounds;
    }
    return pounds + currentFermentable.amount;
  }, 0);
};

export const calculateWaterLoss = (
  brewSettings: BT.BrewSettings,
  fermentables: BT.Fermentable[]
) => {
  let waterLoss = 0;

  waterLoss += brewSettings.fermentorTrubWaterLoss;
  waterLoss += brewSettings.kettleTrubWaterLoss;

  const boilHours = brewSettings.boilTime / 60;
  const evaporationLoss = brewSettings.boilOffWaterLossRate * boilHours;
  waterLoss += evaporationLoss;

  const grainPounds = getGrainPounds(fermentables);
  const quartsLostFromGrain = grainPounds * brewSettings.waterLossPerGrain;
  waterLoss += quartsLostFromGrain / 4;

  return waterLoss;
};

export const calculateStrikeWater = (
  brewSettings: BT.BrewSettings,
  waterLoss: number,
  fermentables: BT.Fermentable[],
  batchSize: number
) => {
  if (!brewSettings.sparge) {
    return batchSize + waterLoss;
  }

  const grainPounds = getGrainPounds(fermentables);
  const quartsNeeded = grainPounds * brewSettings.mashThickness;
  return quartsNeeded / 4;
};

export const calculateHotLiquor = (
  recipe: BT.Recipe,
  brewSettings: BT.BrewSettings,
  strikeWater: number,
  waterLoss: number
) => {
  if (!brewSettings.sparge) return 0;

  const totalWater = recipe.batchSize + waterLoss;

  return totalWater - strikeWater;
};

export const getStats = (
  recipe: BT.Recipe,
  brewSettings: BT.BrewSettings
): BT.Stats => {
  const isMetric = recipe.measurementType === "metric";

  if (isMetric) {
    recipe = recipeToImperial(recipe);
  }

  const { Hop, Fermentable, Culture } =
    RecipeUtils.sortIngredientsByType(recipe);

  const srm = calculateSrm(recipe.batchSize, Fermentable);
  const og = calculateOg(Fermentable, recipe.batchSize, recipe.efficiency);
  const fg = calculateFg(og, Culture);
  const abv = calculateAbv(og, fg);
  const ibu = calculateIbu(og, Hop, recipe.batchSize);

  const waterLoss = calculateWaterLoss(brewSettings, Fermentable);
  const strikeWater = calculateStrikeWater(
    brewSettings,
    waterLoss,
    Fermentable,
    recipe.batchSize
  );
  const hotLiquor = calculateHotLiquor(
    recipe,
    brewSettings,
    strikeWater,
    waterLoss
  );

  return {
    srm,
    og,
    fg,
    abv,
    ibu,
    strikeWater: isMetric ? gallonsToLiters(strikeWater) : strikeWater,
    hotLiquor: isMetric ? gallonsToLiters(hotLiquor) : hotLiquor,
    waterLoss: isMetric ? gallonsToLiters(waterLoss) : waterLoss,
  };
};
