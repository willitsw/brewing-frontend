import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface GlobalModalsState {
  showLoginModal: boolean;
  showCreateAccountModal: boolean;
  pageIsClean: boolean;
}

const initialState: GlobalModalsState = {
  showCreateAccountModal: false,
  showLoginModal: false,
  pageIsClean: true,
};

export const globalModalsSlice = createSlice({
  name: "brew-settings",
  initialState,
  reducers: {
    setShowLoginModal: (state, action: { payload: boolean }) => {
      state.showLoginModal = action.payload;
    },
    setShowCreateAccountModal: (state, action: { payload: boolean }) => {
      state.showCreateAccountModal = action.payload;
    },
    setPageIsClean: (state, action: { payload: boolean }) => {
      state.pageIsClean = action.payload;
    },
  },
});

export const { setShowCreateAccountModal, setShowLoginModal, setPageIsClean } =
  globalModalsSlice.actions;

export const showCreateAccountModal = (state: RootState) =>
  state.globalModals.showCreateAccountModal;
export const showLoginModal = (state: RootState) =>
  state.globalModals.showLoginModal;
export const pageIsClean = (state: RootState) => state.globalModals.pageIsClean;

export default globalModalsSlice.reducer;
