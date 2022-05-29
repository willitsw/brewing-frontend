import { Button, Col, Row, Space, Typography } from "antd";
import { getAuth, signOut } from "firebase/auth";
import Content from "../../components/content";
import { setShowLoginModal } from "../../redux/global-modals/slice";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { selectCurrentUser, userIsAuthenticated } from "../../redux/user/slice";
import React from "react";
import { useAnalytics } from "../../utils/analytics";
import YoutubeEmbed from "./youtube-container";

const HomePage = () => {
  const auth = getAuth();
  const isAuthenticated = useAppSelector(userIsAuthenticated);
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const { fireAnalyticsEvent } = useAnalytics();

  const handleDonateClicked = () => {
    fireAnalyticsEvent("Donate button clicked", { source: "home page" });
  };

  return (
    <Content pageTitle="Home">
      <Row justify="center">
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
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
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Typography.Title level={4}>
            Make a Donation Via Paypal
          </Typography.Title>
          <Button
            type="primary"
            href="https://www.paypal.com/donate/?hosted_button_id=UJZ4HJW2BWWLG"
            target="_blank"
            onClick={handleDonateClicked}
          >
            Donate
          </Button>
        </Col>
        <Col span={24}>
          <Typography.Paragraph style={{ marginTop: 20 }}>
            What Ales You helps you keep track of your brewing hobby, and gives
            you tools to improve your skills. This app is driven and supported
            by the homebrewing community, and as long as donations support its
            operational costs, there will never be any ads, paywalls, or premium
            tiers.
          </Typography.Paragraph>
        </Col>
        <Col span={24}>
          <Typography.Title level={4}>A Quick Tour:</Typography.Title>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <YoutubeEmbed
            id="6A3X6cWE4zQ"
            title="Build a Recipe"
            description="Build your own recipe."
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <YoutubeEmbed
            id="qcd483dXguc"
            title="Build a Recipe"
            description="Configure your brew settings."
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <YoutubeEmbed
            id="N_0yJX8CTCE"
            title="Build a Recipe"
            description="Record a Brew Log."
          />
        </Col>
      </Row>

      {/* <Typography.Title level={5}>Current Features</Typography.Title>
      <Typography.Paragraph>
        <ul>
          <li>Design recipes</li>
          <li>
            Calculate the following:
            <ul>
              <li>Gravity / ABV</li>
              <li>SRM</li>
              <li>IBU</li>
              <li>Water Usage</li>
            </ul>
          </li>
          <li>Log brew sessions</li>
          <li>Print recipes in a nice format</li>
        </ul>
      </Typography.Paragraph> */}
      <Typography.Paragraph>
        Do you have any great ideas for future functionality? Or would you like
        to contribute to this project as a product manager, designer, or
        developer? Please{" "}
        <a href="mailto:whatalesyouadm@gmail.com">reach out</a> or{" "}
        <a
          target="_blank"
          href="https://github.com/willitsw/brewing-frontend"
          rel="noreferrer"
        >
          check out the codebase
        </a>{" "}
        to get involved!
      </Typography.Paragraph>
    </Content>
  );
};

export default HomePage;
