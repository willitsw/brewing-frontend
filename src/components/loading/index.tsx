import styles from "./index.module.css";
import { Spin } from "antd";
import React from "react";

interface LoadingProps {
  isLoading: boolean;
  children: React.ReactNode;
}

const Loading = ({ isLoading, children }: LoadingProps) => {
  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Spin size="large" />
      </div>
    );
  }
  return <>{children}</>;
};

export default Loading;
