import { Button } from "antd";
import { getAuth, signOut } from "firebase/auth";
import { useState } from "react";
import Content from "../../components/content";
import CreateNewAccountModal from "../../components/modals/create-new-account";
import LoginModal from "../../components/modals/login";
import { useAppSelector } from "../../redux/hooks";

const HomePage = () => {
  const auth = getAuth();
  const [showCreateAccountModal, setShowCreateAccountModal] =
    useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  return (
    <Content pageTitle="What ales you">
      Welcome
      {isAuthenticated ? (
        <Button type="primary" onClick={() => signOut(auth)}>
          Log out
        </Button>
      ) : (
        <>
          <Button
            type="primary"
            onClick={() => setShowCreateAccountModal(true)}
          >
            Create an Account
          </Button>
          <Button type="primary" onClick={() => setShowLoginModal(true)}>
            Login
          </Button>
        </>
      )}
      <CreateNewAccountModal
        onCancel={() => setShowCreateAccountModal(false)}
        showModal={showCreateAccountModal}
      />
      <LoginModal
        onCancel={() => setShowLoginModal(false)}
        showModal={showLoginModal}
      />
    </Content>
  );
};

export default HomePage;
