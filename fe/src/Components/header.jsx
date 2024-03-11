import React, { useState, useEffect } from "react";
import { Layout, Menu, Dropdown, Button } from "antd";
import { Link } from "react-router-dom";
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
import MySpin from "./UI/spin";
import axios from "axios";
const { Header } = Layout;

const username = "User";

const AppHeader = () => {
  const [user, setUser] = useState(null);
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
  // console.log(user);
  const logout = () => {
    axios
      .get("http://localhost:5000/auth/user/logout", { withCredentials: true })
      .then((res) => {
        alert(res.data);
        window.location = "/";
      })
      .catch((error) => {
        alert(error.data);
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
            {/* Logout logic will go here */}
            Logout
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
        defaultSelectedKeys={["1"]}
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: "#202020",
        }}
      >
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>

        <Menu.Item key="projects" icon={<FileTextOutlined />}>
          <Link to="/projects">Projects</Link>
        </Menu.Item>

        {user && (
          <Menu.Item key="contracts" icon={<FileTextOutlined />}>
            <Link to="/mycontracts">My Contracts</Link>
          </Menu.Item>
        )}
        <Menu.Item key="2" icon={<InfoCircleOutlined />}>
          <Link to="/aboutus">About us</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<ReadOutlined />}>
          <Link to="/news">News</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<MailOutlined />}>
          <Link to="/contact">Contact</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<PayCircleOutlined />}>
          <Link to="/unitprice">Price</Link>
        </Menu.Item>
      </Menu>
      {user ? (
        <Dropdown overlay={userMenu}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
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
