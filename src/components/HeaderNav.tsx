import React from "react";
import { Menu } from "antd";
import { HomeOutlined, AppstoreOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const HeaderNav: React.FC = () => {
  return (
    <Menu
      mode="horizontal"
      theme="light"
      items={[
        {
          label: <Link to="/">Home</Link>,
          key: "home",
          icon: <HomeOutlined />,
        },
        {
          label: <Link to="/products">Products</Link>,
          key: "products",
          icon: <AppstoreOutlined />,
        },
      ]}
    />
  );
};

export default HeaderNav;
