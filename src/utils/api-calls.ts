import { Recipe } from "../types/beer-interfaces";
import makeRequest from "./request";

// RECIPE ENDPOINTS

export const getRecipesByUser = async (): Promise<Recipe[]> => {
  return await makeRequest("/recipes", "GET");
};

export const getRecipeById = async (recipeId: string): Promise<Recipe> => {
  return await makeRequest(`/recipes/${recipeId}`, "GET");
};

export const deleteRecipe = async (recipeId: string): Promise<void> => {
  return await makeRequest(`/recipes/${recipeId}`, "DELETE");
};

export const createUpdateRecipe = async (recipe: Recipe): Promise<Recipe> => {
  return await makeRequest("/recipes", "POST", recipe);
};
