import { Layout, Typography, Space } from "antd";
import Loading from "../loading";
import styles from "./index.module.css";
import React from "react";

interface ContentProps {
  pageTitle: string;
  isLoading?: boolean;
  children: React.ReactNode;
  navElement?: React.ReactNode;
}

const Content = ({
  pageTitle,
  children,
  isLoading = false,
  navElement,
}: ContentProps) => {
  const { Content } = Layout;
  const { Title } = Typography;

  return (
    <Content>
      <div className={`${styles["content"]} beer-max-width`}>
        {navElement && navElement}
        <Title className={navElement ? styles["title-with-nav"] : ""} level={2}>
          {pageTitle}
        </Title>
        <Loading isLoading={isLoading}>
          <Space direction="vertical" className={styles["content-area-space"]}>
            {children}
          </Space>
        </Loading>
      </div>
    </Content>
  );
};

export default Content;
