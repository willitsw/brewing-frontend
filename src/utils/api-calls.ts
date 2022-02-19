import { BrewSettings } from "../types/brew-settings";
import { Recipe } from "../types/recipe";
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

// BREW SETTInGS ENDPOINTS

export const getBrewSettings = async (): Promise<BrewSettings> => {
  return await makeRequest("/brew-settings", "GET");
};

export const deleteBrewSettings = async (id: string): Promise<void> => {
  return await makeRequest(`/brew-settings/${id}`, "DELETE");
};

export const createUpdateBrewSettings = async (
  brewSettings: BrewSettings
): Promise<BrewSettings> => {
  return await makeRequest("/brew-settings", "POST", brewSettings);
};
