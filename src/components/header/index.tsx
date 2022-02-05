import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Layout, Menu, Image, Avatar, Dropdown, Button } from "antd";
import styles from "./index.module.css";
import beerIcon from "./beer-icon.png";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser, userIsAuthenticated } from "../../redux/user/slice";
import {
  LoginOutlined,
  LogoutOutlined,
  PlusCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import CreateNewAccountModal from "../modals/create-new-account";
import LoginModal from "../modals/login";
import { getAuth, signOut } from "firebase/auth";

const Header = () => {
  const auth = getAuth();
  const { Header } = Layout;
  const [currentPage, setCurrentPage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useAppSelector(userIsAuthenticated);
  const currentUser = useAppSelector(selectCurrentUser);
  const [showCreateAccountModal, setShowCreateAccountModal] =
    useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setCurrentPage("/home");
    } else if (location.pathname.includes("recipes")) {
      setCurrentPage("/recipes/list");
    } else {
      setCurrentPage("/home");
    }
  }, [location, isAuthenticated]);

  const handleMenuClick = (newMenuItem: any) => {
    setCurrentPage(newMenuItem.key);
    navigate(newMenuItem.key);
  };

  const handleSignOut = () => {
    signOut(auth);
    navigate("/home");
  };

  const getUserMenu = () => {
    if (!isAuthenticated) {
      return (
        <Menu>
          <Menu.Item icon={<LoginOutlined />}>
            <Button type="link" onClick={() => setShowLoginModal(true)}>
              Login
            </Button>
          </Menu.Item>
          <Menu.Item icon={<PlusCircleOutlined />}>
            <Button type="link" onClick={() => setShowCreateAccountModal(true)}>
              Create New Account
            </Button>
          </Menu.Item>
        </Menu>
      );
    } else {
      return (
        <Menu>
          <Menu.Item icon={<LogoutOutlined />}>
            <Button type="link" onClick={handleSignOut}>
              Logout
            </Button>
          </Menu.Item>
        </Menu>
      );
    }
  };

  return (
    <Header className={styles["header-layout"]}>
      <div className={styles["header-left-items"]}>
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
          <Menu.Item key={"/recipes/list"} disabled={!isAuthenticated}>
            Recipes
          </Menu.Item>
        </Menu>
      </div>
      <Dropdown overlay={getUserMenu()} trigger={["click"]}>
        <div className={styles.avatar}>
          {currentUser?.photoUrl ? (
            <Avatar size="large" src={currentUser.photoUrl} />
          ) : (
            <Avatar size="large" icon={<UserOutlined />} />
          )}
        </div>
      </Dropdown>
      <CreateNewAccountModal
        onCancel={() => setShowCreateAccountModal(false)}
        showModal={showCreateAccountModal}
      />
      <LoginModal
        onCancel={() => setShowLoginModal(false)}
        showModal={showLoginModal}
      />
    </Header>
  );
};

export default Header;
