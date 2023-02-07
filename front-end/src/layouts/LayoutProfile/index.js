import React from "react";
import Sidebar from "../Sidebar";
import { useSelector } from "react-redux";
import {
  IdcardOutlined,
  LockOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const arrMenu = [
  {
    icon: <IdcardOutlined />,
    title: "personal information",
    link: "/profile/personal",
  },
  {
    icon: <OrderedListOutlined />,
    title: "order management",
    link: "/profile/orders",
  },
  // {
  //   icon: <PieChartOutlined />,
  //   title: "Đánh giá của ban",
  //   link: "/profile/my-evaluates",
  // },
  {
    icon: <LockOutlined />,
    title: "change password",
    link: "/profile/change-password",
  },
];

function LayoutProfile({ children }) {
  const navigate = useNavigate();
  const authSlice = useSelector((state) => state.authSlice.infoAccount);

  useEffect(() => {
    if (!authSlice || !authSlice.accessToken || !authSlice.idUser) {
      navigate("/login");
    }
  }, [authSlice, navigate]);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar isSidebar={false} type="client" dataMenu={arrMenu} />
      <div style={{ marginLeft: "24px", width: "calc(100% - 240px - 24px)" }}>
        {children}
      </div>
    </div>
  );
}

export default LayoutProfile;
