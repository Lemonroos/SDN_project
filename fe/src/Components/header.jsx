import React, { useState, useEffect } from "react";
import { Layout, Menu, Dropdown, Button, message } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  HomeOutlined,
  InfoCircleOutlined,
  MailOutlined,
  UserOutlined,
  LogoutOutlined,
  FileTextOutlined,
  PayCircleOutlined,
  ReadOutlined,
} from "@ant-design/icons";
import axios from "axios";
const { Header } = Layout;
const AppHeader = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState(
    sessionStorage.getItem("activeMenu") || "1"
  );

  useEffect(() => {
    sessionStorage.setItem("activeMenu", selectedKey);
  }, [selectedKey]);

  useEffect(() => {
    setSelectedKey(location.pathname);
  }, [location]);

  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:5000/auth/user/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, [!user]);
  const logout = () => {
    axios
      .get("http://localhost:5000/auth/user/logout", { withCredentials: true })
      .then((res) => {
        message.success(res.data);
        localStorage.setItem("success", "false");
        window.location = "/";
      })
      .catch((error) => {
        message.error(error.data);
      });
  };
  const userMenu = (
    <Menu>
      {user ? (
        <>
          <Menu.Item key="profile" icon={<UserOutlined />}>
            <Link to="/profile">Profile</Link>
          </Menu.Item>
          <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item key="login">
            <Link to="/login">Login</Link>
          </Menu.Item>
          <Menu.Item key="register">
            <Link to="/register">Register</Link>
          </Menu.Item>
        </>
      )}
    </Menu>
  );
  return (
    <Header
      style={{
        backgroundColor: "#202020",
        color: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "fixed",
        zIndex: 1,
        width: "100%",
        padding: "0 2%",
        boxSizing: "border-box",
      }}
    >
      <div className="logo" style={{ maxWidth: "10%", marginRight: "2%" }}>
        <img
          src="/shared/homelogo.png"
          alt="house"
          style={{ width: "100%", height: "auto", paddingTop: "20px" }}
        />
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[selectedKey]}
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: "#202020",
        }}
        onClick={({ key }) => setSelectedKey(key)}
      >
        <Menu.Item key="/" icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="/projects" icon={<FileTextOutlined />}>
          <Link to="/projects">Projects</Link>
        </Menu.Item>
        {user && (
          <Menu.Item key="/mycontracts" icon={<FileTextOutlined />}>
            <Link to="/mycontracts">My Contracts</Link>
          </Menu.Item>
        )}
        <Menu.Item key="/aboutus" icon={<InfoCircleOutlined />}>
          <Link to="/aboutus">About us</Link>
        </Menu.Item>
        <Menu.Item key="/news" icon={<ReadOutlined />}>
          <Link to="/news">News</Link>
        </Menu.Item>
        <Menu.Item key="/contact" icon={<MailOutlined />}>
          <Link to="/contact">Contact</Link>
        </Menu.Item>
        <Menu.Item key="/unitprice" icon={<PayCircleOutlined />}>
          <Link to="/unitprice">Pricing</Link>
        </Menu.Item>
      </Menu>
      {user ? (
        <Dropdown overlay={userMenu}>
          <div
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <span style={{ color: "#fff", marginLeft: "10px" }}>
              Welcome, {user.name}
            </span>
          </div>
        </Dropdown>
      ) : (
        <Dropdown overlay={userMenu}>
          <Button
            style={{
              backgroundColor: "#101010",
              borderColor: "#101010",
              color: "#fff",
            }}
          >
            Login / Register <UserOutlined />
          </Button>
        </Dropdown>
      )}
    </Header>
  );
};

export default AppHeader;
