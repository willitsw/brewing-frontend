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
  showLoginModal: boolean;
  showCreateAccountModal: boolean;
}

const initialState: UserState = {
  currentUser: defaultCurrentUser,
  isAuthenticated: !!defaultCurrentUser,
  showCreateAccountModal: false,
  showLoginModal: false,
};

export enum RecipeActionTypes {
  SetUser = "user/setUser",
  ClearUser = "user/clearUser",
}

export const userSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setUser: (state, action: { payload: BeerUser }) => {
      const newUser = constants.useAuth ? action.payload : defaultCurrentUser;
      state.currentUser = newUser;
      state.isAuthenticated = !!newUser;
    },
    clearUser: (state) => {
      const newUser = constants.useAuth ? null : defaultCurrentUser;
      state.currentUser = newUser;
      state.isAuthenticated = !!newUser;
    },
    setShowLoginModal: (state, action: { payload: boolean }) => {
      state.showLoginModal = action.payload;
    },
    setShowCreateAccountModal: (state, action: { payload: boolean }) => {
      state.showCreateAccountModal = action.payload;
    },
  },
});

export const {
  setUser,
  clearUser,
  setShowCreateAccountModal,
  setShowLoginModal,
} = userSlice.actions;

export const selectCurrentUser = (state: RootState) => state.user.currentUser;
export const userIsAuthenticated = (state: RootState) =>
  state.user.isAuthenticated;
export const showCreateAccountModal = (state: RootState) =>
  state.user.showCreateAccountModal;
export const showLoginModal = (state: RootState) => state.user.showLoginModal;

export default userSlice.reducer;
