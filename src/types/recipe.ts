import { MeasurementType } from "./brew-settings";

export type RecipeType = "Other" | "Extract" | "Partial mash" | "All grain";

export interface Recipe {
  id: string;
  user: string;
  description?: string;
  name: string;
  type: RecipeType;
  author: string;
  createdDate?: string;
  updatedDate?: string;
  measurementType: MeasurementType;
  batchSize: number;
  efficiency: number;
  fermentables: Fermentable[];
  hops: Hop[];
  cultures: Culture[];
}

export type FermentableType =
  | "Other"
  | "Liquid extract"
  | "Dry extract"
  | "Grain"
  | "Sugar"
  | "Fruit"
  | "Juice"
  | "Honey";

export interface Fermentable {
  name: string;
  lovibond: number;
  type: FermentableType;
  gravity: number;
  amount: number;
}

export type HopUsageType = "Boil" | "Flame out" | "Dry hop";

export interface Hop {
  name: string;
  alphaAcid: number;
  timing: number;
  use: HopUsageType;
  amount: number;
}

export type CultureForm = "Liquid" | "Dry";

export interface Culture {
  name: string;
  attenuation: number;
  form: CultureForm;
  notes: string;
}
