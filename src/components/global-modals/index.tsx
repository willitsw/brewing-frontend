import ConfirmLeaveModal from "../modals/confirm-leave";
import CreateNewAccountModal from "../modals/create-new-account";
import LoginModal from "../modals/login";

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
