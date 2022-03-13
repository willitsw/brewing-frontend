import { Button, Space, Typography } from "antd";
import { getAuth, signOut } from "firebase/auth";
import Content from "../../components/content";
import {
  setShowCreateAccountModal,
  setShowLoginModal,
} from "../../redux/global-modals/slice";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { selectCurrentUser, userIsAuthenticated } from "../../redux/user/slice";
import React from "react";

const HomePage = () => {
  const auth = getAuth();
  const isAuthenticated = useAppSelector(userIsAuthenticated);
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
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
              onClick={() => dispatch(setShowCreateAccountModal(true))}
            >
              Create an Account
            </Button>
            <Button
              type="primary"
              onClick={() => dispatch(setShowLoginModal(true))}
            >
              Login
            </Button>
          </Space>
        </>
      )}
    </Content>
  );
};

export default HomePage;
