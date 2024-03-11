import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import AppHeader from "../Components/Manager/header";
import LogoHeader from "../Components/UI/header";
import SiderComponent from "../Components/sider";
import AppFooter from "../Components/footer";

const { Sider, Content } = Layout;

export default function AdminLayout() {
  return (
    <Layout>
      
      <Sider>
        <SiderComponent />
      </Sider>
      <Layout>
        <AppHeader />
        <div
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Content
            style={{
              padding: "30px",
              background: "#ffffff",
              margin: "90px",
              borderRadius: "10px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Outlet />
          </Content>
        </div>
        {/* <Footer style={{background:'#909090'}}> */}
        <AppFooter />
        {/* </Footer> */}
      </Layout>
    </Layout>
  );
}
