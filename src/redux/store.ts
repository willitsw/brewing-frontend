import { AnyAction, configureStore, Reducer } from "@reduxjs/toolkit";
import RecipesReducer, { RecipeState } from "./recipe-list/slice";
import UserReducer, { UserState } from "./user/slice";
import BrewSettingsReducer, { BrewSettingsState } from "./brew-settings/slice";
import GlobalModalsReducer, { GlobalModalsState } from "./global-modals/slice";
import MiscReducer, { MiscState } from "./misc/slice";
import BrewLogReducer, { BrewLogState } from "./brew-log/slice";

export const store = configureStore({
  reducer: {
    recipes: RecipesReducer as Reducer<RecipeState, AnyAction>,
    user: UserReducer as Reducer<UserState, AnyAction>,
    brewSettings: BrewSettingsReducer as Reducer<BrewSettingsState, AnyAction>,
    globalModals: GlobalModalsReducer as Reducer<GlobalModalsState, AnyAction>,
    misc: MiscReducer as Reducer<MiscState, AnyAction>,
    brewLogs: BrewLogReducer as Reducer<BrewLogState, AnyAction>,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
