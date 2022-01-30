import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Layout, Menu, Image } from "antd";
import styles from "./index.module.css";
import beerIcon from "./beer-icon.png";

const Header = () => {
  const { Header } = Layout;
  const [currentPage, setCurrentPage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("recipes")) {
      setCurrentPage("/recipes/list");
    } else {
      setCurrentPage("/home");
    }
  }, [location]);

  const handleMenuClick = (newMenuItem: any) => {
    setCurrentPage(newMenuItem.key);
    navigate(newMenuItem.key);
  };

  return (
    <Header className={styles["header-layout"]}>
      <div className="logo">
        <Image
          className={styles.icon}
          width={40}
          src={beerIcon}
          preview={false}
        />
      </div>
      <Menu
        className={styles.menu}
        theme="dark"
        mode="horizontal"
        onClick={handleMenuClick}
        selectedKeys={[currentPage]}
      >
        <Menu.Item key={"/home"}>Home</Menu.Item>
        <Menu.Item key={"/recipes/list"}>Recipes</Menu.Item>
      </Menu>
    </Header>
  );
};

export default Header;
