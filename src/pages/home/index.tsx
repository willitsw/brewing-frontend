import { Button, Space, Typography } from "antd";
import { getAuth, signOut } from "firebase/auth";
import { useState } from "react";
import Content from "../../components/content";
import CreateNewAccountModal from "../../components/modals/create-new-account";
import LoginModal from "../../components/modals/login";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser, userIsAuthenticated } from "../../redux/user/slice";

const HomePage = () => {
  const auth = getAuth();
  const [showCreateAccountModal, setShowCreateAccountModal] =
    useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const isAuthenticated = useAppSelector(userIsAuthenticated);
  const currentUser = useAppSelector(selectCurrentUser);
  return (
    <Content pageTitle="What ales you">
      {isAuthenticated ? (
        <>
          <Typography.Title level={4}>
            Welcome {currentUser?.displayName ?? currentUser?.email}
          </Typography.Title>
          <Button type="primary" onClick={() => signOut(auth)}>
            Log out
          </Button>
        </>
      ) : (
        <>
          <Typography.Title level={4}>
            Please sign up or log in:
          </Typography.Title>
          <Space>
            <Button
              type="primary"
              onClick={() => setShowCreateAccountModal(true)}
            >
              Create an Account
            </Button>
            <Button type="primary" onClick={() => setShowLoginModal(true)}>
              Login
            </Button>
          </Space>
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
