import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../Layouts/rootLayout";
import Home from "../Pages/homePage";
import News from "../Pages/news";
import Projects from "../Pages/projects";
import AboutUs from "../Pages/aboutUs";
import Login from "../Pages/login";
import Register from "../Pages/register";
import Error from "../Pages/errorPage";
import ContactUs from "../Pages/contact";
import ProjectDetail from "../Pages/projectDetail";
import MyContracts from "../Pages/Customer/myContract";
import MyContractDetail from "../Pages/Customer/myContractDetail";
import CreateContract from "../Pages/Customer/createContract";
import Checkout from "../Pages/Customer/checkout";
import ManagerLayout from "../Layouts/managerLayout";
import CreateProject from "../Pages/createProject";
import QuoteDetails from "../Pages/Customer/quoteDetail";
import Dashboard from "../Pages/Manager/dashBoard";
import Contracts from "../Pages/Manager/contracts";
import ContractDetail from "../Pages/Manager/contractDetail";
import UnitPrice from "../Pages/unitPrice";
export const routes = createBrowserRouter([
  {
    path: "/", //chung
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
        path: "projects",
        element: <Projects />,//
      },
      {
        path: "projects/detail/:id",
        element: <ProjectDetail />,//
      },
      {
        path: "createproject",
        element: <CreateProject />,
      },
      {
        path: "quote/:id",
        element: <QuoteDetails />,
      },
      {
        path: "aboutus",
        element: <AboutUs />,
      },
      {
        path: "login",
        element: <Login />,//
      },
      {
        path: "register",
        element: <Register />,//
      },
      {
        path: "contact",
        element: <ContactUs />,
      },
      {
        path: "unitprice",
        element: <UnitPrice />,
      },
    ],
  },
  {
    path: "/mycontracts", //customer
    element: <RootLayout />,

    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <MyContracts />,
      },
      {
        path: "detail/:id",
        element: <MyContractDetail />,
      },
      {
        path: "createcontracts",
        element: <CreateContract />, 
      },
    ],
  },
  {
    path: "/manager", //manager
    element: <ManagerLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "contracts",
        element: <Contracts />, //table list all
      },
      {
        path: "contracts/detail",
        element: <ContractDetail />, //detail of a contract for approve or denied
      },
    ],
  },
]);
