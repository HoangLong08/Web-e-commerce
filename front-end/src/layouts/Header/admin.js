import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Popover, Space } from "antd";
import { removeAuth } from "store/auth/auth.reducer";
import "./style.css";

function HeaderAdmin() {
  const dispatch = useDispatch();
  const authSlice = useSelector((state) => state.authSlice.infoAccount);
  const [open, setOpen] = useState(false);
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const handleLogout = () => {
    dispatch(removeAuth({}));
  };

  return (
    <div className="wrapper-header-admin">
      <Link to="/">My store</Link>
      <div>
        <Popover
          content={<Button onClick={handleLogout}>Đăng xuất</Button>}
          title=""
          trigger="click"
          open={open}
          onOpenChange={handleOpenChange}
        >
          <Space>
            <p className="header-admin-name">{authSlice?.username}</p>
          </Space>
        </Popover>
      </div>
    </div>
  );
}

export default HeaderAdmin;
