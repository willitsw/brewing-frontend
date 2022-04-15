import { BrewingTypes as BT } from "brewing-shared";

const getImperialSettings = (): BT.User => {
  return {
    id: "",
    batchSize: 5,
    boilTime: 60,
    brewhouseEfficiency: 70,
    measurementType: "imperial",
    kettleTrubWaterLoss: 0.25,
    fermentorTrubWaterLoss: 0.25,
    boilOffWaterLossRate: 1.5,
    waterLossPerGrain: 0.5,
    displayName: "",
    email: "",
    sparge: false,
    mashThickness: 1.3,
  };
};

const getMetricSettings = (): BT.User => {
  return {
    id: "",
    batchSize: 18.93,
    boilTime: 60,
    brewhouseEfficiency: 70,
    measurementType: "metric",
    kettleTrubWaterLoss: 0.95,
    fermentorTrubWaterLoss: 0.95,
    boilOffWaterLossRate: 5.68,
    waterLossPerGrain: 1,
    displayName: "",
    email: "",
    sparge: false,
    mashThickness: 1.3,
  };
};

export const brewSettingsFixtures = { getMetricSettings, getImperialSettings };
