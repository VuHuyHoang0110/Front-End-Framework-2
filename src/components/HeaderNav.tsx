import React, { useState } from "react";
import { Menu } from "antd";
import { HomeOutlined, AppstoreOutlined, SettingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const HeaderNav: React.FC = () => {
  const [current, setCurrent] = useState("home");

  const handleClick = (e: any) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const items = [
   
   
    {
      label: "Navigation One",
      key: "mail",
      icon: <HomeOutlined />,
      children: [
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
        
      ],
    },
    
  ];

  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[current]}
      mode="horizontal"
      theme="light"
      items={items} // Sử dụng 'items' để cấu hình menu
    />
  );
};

export default HeaderNav;
