import { createSlice } from "@reduxjs/toolkit";
import { BeerUser } from "../../types/user";
import type { RootState } from "../store";
import { constants } from "../../constants";

const defaultCurrentUser: BeerUser | null = constants.useAuth
  ? null
  : {
      displayName: "Local Dev User",
      email: "localDevUser@whatalesyou.net",
      photoUrl: null,
      uid: "123456789",
    };
interface UserState {
  currentUser: BeerUser | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  currentUser: defaultCurrentUser,
  isAuthenticated: !!defaultCurrentUser,
};

export enum RecipeActionTypes {
  SetUser = "user/setUser",
  ClearUser = "user/clearUser",
}

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser: (state, action: { payload: BeerUser }) => {
      const newUser = action.payload;
      state.currentUser = newUser;
      state.isAuthenticated = !!newUser;
    },
    clearUser: (state) => {
      const newUser = null;
      state.currentUser = newUser;
      state.isAuthenticated = !!newUser;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const selectCurrentUser = (state: RootState) => state.user.currentUser;
export const userIsAuthenticated = (state: RootState) =>
  state.user.isAuthenticated;

export default userSlice.reducer;
