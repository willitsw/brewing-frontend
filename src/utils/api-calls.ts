import { BrewingTypes as BT } from "brewing-shared";
import makeRequest from "./request";

// RECIPE ENDPOINTS

export const getRecipesByUser = async (): Promise<BT.Recipe[]> => {
  return await makeRequest("/recipes", "GET");
};

export const getRecipeById = async (recipeId: string): Promise<BT.Recipe> => {
  return await makeRequest(`/recipes/${recipeId}`, "GET");
};

export const deleteRecipe = async (recipeId: string): Promise<void> => {
  return await makeRequest(`/recipes/${recipeId}`, "DELETE");
};

export const createUpdateRecipe = async (
  recipe: BT.Recipe
): Promise<BT.Recipe> => {
  return await makeRequest("/recipes", "POST", recipe);
};

// BREW SETTInGS ENDPOINTS

export const getBrewSettings = async (): Promise<BT.User> => {
  return await makeRequest("/users", "GET");
};

export const deleteBrewSettings = async (id: string): Promise<void> => {
  return await makeRequest(`/users/${id}`, "DELETE");
};

export const createUpdateBrewSettings = async (
  brewSettings: BT.User
): Promise<BT.User> => {
  return await makeRequest("/users", "POST", brewSettings);
};

// BREW LOG ENDPOINTS

export const getBrewLogsByUser = async (): Promise<BT.BrewLog[]> => {
  return await makeRequest("/brew-logs", "GET");
};

export const getBrewLogById = async (brewLogId: string): Promise<BT.BrewLog> => {
  return await makeRequest(`/brew-logs/${brewLogId}`, "GET");
};

export const deleteBrewLog = async (brewLogId: string): Promise<void> => {
  return await makeRequest(`/brew-logs/${brewLogId}`, "DELETE");
};

export const createUpdateBrewLog = async (
  brewLog: BT.BrewLog
): Promise<BT.BrewLog> => {
  return await makeRequest("/brew-logs", "POST", brewLog);
};