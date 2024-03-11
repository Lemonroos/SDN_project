// import React from "react";
// import { Outlet } from "react-router-dom";
// import {
//   LaptopOutlined,
//   NotificationOutlined,
//   UserOutlined,
// } from "@ant-design/icons";
// import { Breadcrumb, Layout, Menu, theme } from "antd";
// const { Header, Content, Footer, Sider } = Layout;
// const items1 = ["1", "2", "3"].map((key) => ({
//   key,
//   label: `nav ${key}`,
// }));
// const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
//   (icon, index) => {
//     const key = String(index + 1);
//     return {
//       key: `sub${key}`,
//       icon: React.createElement(icon),
//       label: `subnav ${key}`,
//       children: new Array(4).fill(null).map((_, j) => {
//         const subKey = index * 4 + j + 1;
//         return {
//           key: subKey,
//           label: `option${subKey}`,
//         };
//       }),
//     };
//   }
// );
// const RootLayout = () => {
//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();
//   return (
//     <Layout>
//       <Header
//         style={{
//           display: "flex",
//           alignItems: "center",
//         }}
//       >
//         <div className="demo-logo" />
//         <Menu
//           theme="dark"
//           mode="horizontal"
//           defaultSelectedKeys={["2"]}
//           items={items1}
//           style={{
//             flex: 1,
//             minWidth: 0,
//           }}
//         />
//       </Header>
//       <Content
//         style={{
//           padding: "0 48px",
//         }}
//       >
//         <Breadcrumb
//           style={{
//             margin: "16px 0",
//           }}
//         >
//           <Breadcrumb.Item>Home</Breadcrumb.Item>
//           <Breadcrumb.Item>List</Breadcrumb.Item>
//           <Breadcrumb.Item>App</Breadcrumb.Item>
//         </Breadcrumb>
//         <Layout
//           style={{
//             padding: "24px 0",
//             background: colorBgContainer,
//             borderRadius: borderRadiusLG,
//           }}
//         >
//           <Sider
//             style={{
//               background: colorBgContainer,
//             }}
//             width={200}
//           >
//             <Menu
//               mode="inline"
//               defaultSelectedKeys={["1"]}
//               defaultOpenKeys={["sub1"]}
//               style={{
//                 height: "100%",
//               }}
//               items={items2}
//             />
//           </Sider>
//           <Content
//             style={{
//               padding: "0 24px",
//               minHeight: 280,
//             }}
//           >
//            <Outlet />
//           </Content>
//         </Layout>
//       </Content>
//       <Footer
//         style={{
//           textAlign: "center",
//         }}
//       >
//         Ant Design ©{new Date().getFullYear()} Created by Ant UED
//       </Footer>
//     </Layout>
//   );
// };
// export default RootLayout;


import React, {useState,useEffect} from "react";
import { Outlet } from "react-router-dom";
import AppHeader from "../Components/header";
// import SiderComponent from "../Components/sider";
import AppFooter from "../Components/footer";
// import MySpin from '../Components/UI/spin';
export default function CustomerLayout() {
  const [user, setUser] = useState(null);
  const [loading,setLoading] = useState(true);
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
          setLoading(!loading);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, [!user && loading]);
  // console.log(user);
  // if(!user && loading) {
  //   <MySpin/>
  // } else
  return (
    <>
      <AppHeader />
      {/* <SiderComponent /> */}
      <div style={{padding:"100px 200px", backgroundColor:"#F9E4BC"}}>

      <Outlet />
      </div>
      <AppFooter />
    </>
  );
}