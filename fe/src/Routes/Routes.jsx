import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../Layouts/rootLayout";
import Home from "../Pages/homePage";
import News from "../Pages/news";
import DeployedContract from "../Pages/deployedContract";
import AboutUs from "../Pages/aboutUs";
import Login from "../Pages/login";
import Register from "../Pages/register";
import Error from "../Pages/errorPage";
import ContactUs from "../Pages/contact";
import MyContract from "../Pages/Customer/myContract";
import MyContractDetail from "../Pages/Customer/myContractDetail";
import CustomerLayout from "../Layouts/customerLayout";
import Create from "../Pages/Customer/create";
import Checkout from "../Pages/Customer/checkout";
import AdminLayout from "../Layouts/adminLayout";
import Dashboard from "../Pages/Admin/dashBoard";
import Contracts from "../Pages/Admin/contracts";
import ContractDetail from "../Pages/Admin/contractDetail";
export const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,

    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "news",
        element: <News />,
      },
      {
        path: "contracts",
        element: <DeployedContract />,
      },
      {
        path: "aboutus",
        element: <AboutUs />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "contact",
        element: <ContactUs />,
      },
    ],
  },
  {
    path: "/mycontracts",
    element: <CustomerLayout />,

    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <MyContract />,
      },

      {
        path: "details",
        element: <MyContractDetail />,
      },
      {
        path: "create",
        element: <Create />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "contract",
        element: <Contracts />,
        children: [
          {
            path: "details/:id",
            element: <ContractDetail />,
          },
        ],
      },
    ],
  },
]);
