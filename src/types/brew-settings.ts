export interface BrewSettings {
  userId: string; // User Id that owns it
  author: string;
  measurementType: "imperial" | "metric";
  batchSize: number;
  boilTime: number;
  brewhouseEfficiency: number;
  waterLossPerGrain: number;
  fermentorTrubWaterLoss: number;
  kettleTrubWaterLoss: number;
  boilOffWaterLossRate: number;
  displayName: string;
  email: string;
}
