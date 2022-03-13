import ConfirmLeaveModal from "../modals/confirm-leave";
import CreateNewAccountModal from "../modals/create-new-account";
import LoginModal from "../modals/login";
import React from "react";

const GlobalModals = () => {
  return (
    <>
      <CreateNewAccountModal />
      <LoginModal />
      <ConfirmLeaveModal />
    </>
  );
};

export default GlobalModals;
