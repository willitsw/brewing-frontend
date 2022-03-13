import { Layout } from "antd";
import React from "react";

import styles from "./index.module.css";

const Footer = () => {
  const { Footer } = Layout;
  return (
    <Footer>
      <div className={`${styles.footer} beer-max-width`}>
        &#169; Bill Willits
      </div>
    </Footer>
  );
};

export default Footer;
