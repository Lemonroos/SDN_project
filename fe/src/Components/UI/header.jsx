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
import MySpin from "../UI/spin";
import axios from "axios";
const { Header } = Layout;

const username = "User";

const LogoHeader = () => {
  return (
    <Header
      style={{
        backgroundColor: "#202020",
      
      
      }}
    >
      <div className="logo" style={{ maxWidth: "10%" }}>
        <img
          src="/shared/homelogo.png"
          alt="house"
          style={{ width: "100%", height: "auto", paddingTop: "20px" }}
        />
      </div>
    </Header>
  );
};

export default LogoHeader;
