import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HeaderAdmin from "../Header/admin";
import Sidebar from "../Sidebar";
import { isEmpty } from "lodash";
import {
  BarChartOutlined,
  TagOutlined,
  AppstoreOutlined,
  ContainerOutlined,
  TeamOutlined,
  PieChartOutlined,
  SolutionOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import "./style.css";

const arrMenu = [
  {
    icon: <PieChartOutlined />,
    title: "Dashboard",
    link: "/management/admin/dashboard",
    sub: [],
  },
  // {
  //   icon: <BarChartOutlined />,
  //   title: "Phân tích",
  //   link: "/management/admin/analyst",
  // },
  {
    icon: <TagOutlined />,
    title: "Products",
    link: "/management/admin/products",
    sub: [],
  },
  {
    icon: <AppstoreOutlined />,
    title: "Categories",
    link: "/management/admin/categories",
    sub: [],
  },
  {
    icon: <ContainerOutlined />,
    title: "Orders",
    link: "/management/admin/orders",
    sub: [],
  },
  {
    icon: <TeamOutlined />,
    title: "Customers",
    link: "/management/admin/customers",
    sub: [],
  },
  {
    icon: <SolutionOutlined />,
    title: "Employees",
    link: "/management/admin/employees",
    sub: [
      {
        title: "Employees",
        link: "/management/admin/employees",
      },
    ],
  },
  {
    icon: <UserSwitchOutlined />,
    title: "Roles",
    link: "/management/admin/roles",
    sub: [],
  },
];
/**React router v6 how to use `navigate` redirection in axios interceptor: https://github.com/remix-run/react-router/issues/8264 */
function LayoutAdmin({ children }) {
  const [isSidebar, setIsSidebar] = useState(false);
  const authSlice = useSelector((state) => state.authSlice.infoAccount);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authSlice || !authSlice.accessToken || !authSlice.idUser) {
      navigate("/management/admin/login");
    }
  }, [authSlice, navigate]);

  return (
    <>
      {/* {!isEmpty(authSlice.infoAccount) ? ( */}
      <div className="wrapper-default-layout">
        <Sidebar
          isSidebar={isSidebar}
          onSidebar={setIsSidebar}
          dataMenu={arrMenu}
          type="admin"
        />
        <div
          className={
            isSidebar
              ? "wrapper-content-layout-active"
              : "wrapper-content-layout"
          }
        >
          <HeaderAdmin />
          <div className="wrapper-inner-layout">{children}</div>
        </div>
      </div>
      {/* ) : (
        <></>
      )} */}
    </>
  );
}

export default LayoutAdmin;
