import styles from "./index.module.css";
import { LoadingOutlined } from "@ant-design/icons";

interface LoadingProps {
  isLoading: boolean;
  children: React.ReactNode;
}

const Loading = ({ isLoading, children }: LoadingProps) => {
  if (isLoading) {
    return (
      <div className={styles.loading}>
        <LoadingOutlined />
      </div>
    );
  }
  return <>{children}</>;
};

export default Loading;
