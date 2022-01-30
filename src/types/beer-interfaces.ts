import { RecipeType } from "./beer-json";

export type DbType = { id: string; user: string };

export interface Recipe extends RecipeType, DbType {
  description?: string;
}
