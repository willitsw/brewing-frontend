import ConfirmLeaveModal from "../modals/confirm-leave";
import LoginModal from "../modals/login";
import React from "react";

const GlobalModals = () => {
  return (
    <>
      <LoginModal />
      <ConfirmLeaveModal />
    </>
  );
};

export default GlobalModals;
