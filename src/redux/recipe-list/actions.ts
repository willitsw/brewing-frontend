import { store } from "../store";
import { getRecipeById } from "../../utils/api-calls";

export const handleGetRecipeById = async (id: string) => {
  const recipe = await getRecipeById(id);
  store.dispatch({ type: "recipes/updateWorkingRecipe", payload: recipe });
  return recipe;
};
