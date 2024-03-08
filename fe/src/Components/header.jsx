import React from "react";
import { Layout, Menu, Dropdown, Button, Avatar } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  InfoCircleOutlined,
  MailOutlined,
  UserOutlined,
  LogoutOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

const { Header } = Layout;

const username = "User";

const AppHeader = () => {
  const isLoggedIn = false;
  const userMenu = (
    <Menu>
      {isLoggedIn ? (
        <>
          <Menu.Item key="profile" icon={<UserOutlined />}>
            <Link to="/profile">Profile</Link>
          </Menu.Item>
          <Menu.Item key="logout" icon={<LogoutOutlined />}>
            {/* Logout logic will go here */}
            <Link to="/logout">Logout</Link>
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item key="login">
            <Link to="/login">Login</Link>
            {/* <p onClick={setIsLoggedIn(true)}>Login</p> */}
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
        backgroundColor: "#000000",
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
        defaultSelectedKeys={["1"]}
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: "#000000",
        }}
      >
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        {isLoggedIn && (
          <Menu.Item key="contracts" icon={<FileTextOutlined />}>
            <Link to="/contracts">Contracts</Link>
          </Menu.Item>
        )}
        <Menu.Item key="2" icon={<InfoCircleOutlined />}>
          <Link to="/aboutus">About us</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/news">News</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<MailOutlined />}>
          <Link to="/contact">Contact</Link>
        </Menu.Item>
      </Menu>
      {isLoggedIn ? (
        <Dropdown overlay={userMenu}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <Avatar
              style={{ backgroundColor: "#87d068" }}
              icon={<UserOutlined />}
            />
            <span style={{ color: "#fff", marginLeft: "10px" }}>
              Welcome, {username}
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
