import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Recipe } from "../../types/beer-interfaces";
import {
  createUpdateRecipe,
  deleteRecipe,
  getRecipesByUser,
} from "../../utils/api-calls";
import { deepCloneObject } from "../../utils/helpers";
import type { RootState } from "../store";

interface RecipeState {
  recipeList: Recipe[];
  currentRecipe: Recipe | null;
}

const initialState: RecipeState = {
  recipeList: [],
  currentRecipe: null,
};

export enum RecipeActionTypes {
  SetRecipeList = "recipes/setRecipeList",
  SetCurrentRecipe = "recipes/setCurrentRecipe",
  SetGrainList = "recipes/setGrainList",
}

export const refreshRecipeList = createAsyncThunk(
  "recipes/refreshRecipeList",
  async () => {
    return await getRecipesByUser();
  }
);

export const processDeleteRecipe = createAsyncThunk(
  "recipes/deleteRecipe",
  async (recipeId: string, { getState, dispatch }) => {
    await deleteRecipe(recipeId);
    const state = getState() as RootState;
    const newRecipes = state.recipes.recipeList.filter(
      (recipe) => recipe.id !== recipeId
    );
    dispatch(setRecipeList(newRecipes));
    dispatch(setCurrentRecipe(null));
  }
);

export const processCreateUpdateRecipe = createAsyncThunk(
  "recipes/createUpdateRecipe",
  async (recipe: Recipe, { getState, dispatch }) => {
    await createUpdateRecipe(recipe);
    const state = getState() as RootState;
    const newRecipeList: Recipe[] = deepCloneObject(state.recipes.recipeList);
    const currentRecipeIndex = newRecipeList.findIndex(
      ({ id }) => id === recipe.id
    );
    if (currentRecipeIndex !== -1) {
      // this is an update - replace old instance of recipe
      newRecipeList[currentRecipeIndex] = recipe;
    } else {
      // this is a create - add it to the list
      newRecipeList.push(recipe);
    }
    dispatch(setRecipeList(newRecipeList));
    dispatch(setCurrentRecipe(recipe));
  }
);

export const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setRecipeList: (state, action) => {
      state.recipeList = action.payload;
    },
    setCurrentRecipe: (state, action) => {
      state.currentRecipe = action.payload;
    },
    setGrainList: (state, action) => {
      if (state.currentRecipe) {
        state.currentRecipe.ingredients.fermentable_additions = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(refreshRecipeList.fulfilled, (state, action) => {
      state.recipeList = action.payload;
    });
  },
});

export const { setRecipeList, setCurrentRecipe } = recipeSlice.actions;

export const selectRecipeList = (state: RootState) => state.recipes.recipeList;
export const selectCurrentRecipe = (state: RootState) =>
  state.recipes.currentRecipe;

export default recipeSlice.reducer;
