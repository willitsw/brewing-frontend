import { Button, Col, Row, Space, Typography } from "antd";
import { getAuth, signOut } from "firebase/auth";
import Content from "../../components/content";
import { setShowLoginModal } from "../../redux/global-modals/slice";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { selectCurrentUser, userIsAuthenticated } from "../../redux/user/slice";
import React from "react";

const HomePage = () => {
  const auth = getAuth();
  const isAuthenticated = useAppSelector(userIsAuthenticated);
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  return (
    <Content pageTitle="Home">
      <Row>
        <Col span={12}>
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
                  onClick={() => dispatch(setShowLoginModal(true))}
                >
                  Login
                </Button>
              </Space>
            </>
          )}
        </Col>
        <Col span={12}>
          <Typography.Title level={4}>
            Make a Donation Via Paypal
          </Typography.Title>
          <Button
            type="primary"
            href="https://www.paypal.com/donate/?hosted_button_id=UJZ4HJW2BWWLG"
            target="_blank"
          >
            Donate
          </Button>
        </Col>
      </Row>
    </Content>
  );
};

export default HomePage;
