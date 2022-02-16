import { configureStore } from "@reduxjs/toolkit";
import RecipesReducer from "./recipe-list/slice";
import UserReducer from "./user/slice";
import BrewSettingsReducer from "./brew-settings/slice";
import GlobalModalsReducer from "./global-modals/slice";
import MiscReducer from "./misc/slice";

export const store = configureStore({
  reducer: {
    recipes: RecipesReducer,
    user: UserReducer,
    brewSettings: BrewSettingsReducer,
    globalModals: GlobalModalsReducer,
    misc: MiscReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
