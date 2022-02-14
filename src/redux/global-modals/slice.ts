import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface GlobalModalsState {
  showLoginModal: boolean;
  showCreateAccountModal: boolean;
  showConfirmLeaveModal: boolean;
}

const initialState: GlobalModalsState = {
  showCreateAccountModal: false,
  showLoginModal: false,
  showConfirmLeaveModal: false,
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
    setShowConfirmLeaveModal: (state, action: { payload: boolean }) => {
      state.showConfirmLeaveModal = action.payload;
    },
  },
});

export const {
  setShowCreateAccountModal,
  setShowLoginModal,
  setShowConfirmLeaveModal,
} = globalModalsSlice.actions;

export const showCreateAccountModal = (state: RootState) =>
  state.globalModals.showCreateAccountModal;
export const showLoginModal = (state: RootState) =>
  state.globalModals.showLoginModal;
export const showConfirnLeaveModal = (state: RootState) =>
  state.globalModals.showConfirmLeaveModal;

export default globalModalsSlice.reducer;
