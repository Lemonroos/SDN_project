import React from "react";
import { Outlet } from "react-router-dom";
import AppHeader from "../Components/header";
import SiderComponent from "../Components/sider";
// import Sider from "../Components/sider";
import AppFooter from "../Components/footer";
export default function AdminLayout() {
  return (
    <>
      {/* <AppHeader /> */}
      <SiderComponent />
      {/* <Sider/> */}
      <Outlet />
      <AppFooter />
    </>
  );
}
