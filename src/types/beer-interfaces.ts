import { RecipeType } from "./beer-json";

export interface Recipe extends RecipeType {
  description?: string;
  id: string;
  user: string;
}
