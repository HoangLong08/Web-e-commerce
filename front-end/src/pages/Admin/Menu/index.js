import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMenuAdminAction } from "store/menu/menus.action";
import HeadPage from "../components/HeadPage";
import { Space, Button, Modal } from "antd";
import TreeviewItem from "./TreeviewItem";
import { PlusOutlined } from "@ant-design/icons";
import "./style.css";
import FormItemMenu from "./FormItemMenu";
import { v4 } from "uuid";
import { addItemMenuParent } from "store/menu/menus.reducer";

function Menu() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const listMenuAdmin = useSelector((state) => state.menusSlice.listMenuAdmin);

  const valueFormItemMenuTitle = useSelector(
    (state) => state.menusSlice.valueFormItemMenu.title
  );

  const valueFormItemMenuUrl = useSelector(
    (state) => state.menusSlice.valueFormItemMenu.url
  );
  useEffect(() => {
    dispatch(getMenuAdminAction());
  }, [dispatch]);

  const handleCancel = () => {
    setOpen(false);
  };

  const handleOk = async () => {
    dispatch(
      addItemMenuParent({
        id: v4(),
        title: valueFormItemMenuTitle,
        url: valueFormItemMenuUrl,
        children: [],
        icon: "",
      })
    );
  };

  return (
    <>
      <HeadPage
        title="Management menu"
        actionMenu={
          <Space>
            <Button type="primary" ghost>
              Xem trước
            </Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setOpen(!open)}
            >
              Tạo item
            </Button>
            <Button type="primary">Cập nhật</Button>
          </Space>
        }
        isBack={0}
      />
      <div>
        <ul className="treeview">
          {listMenuAdmin?.data?.map((item) => (
            <TreeviewItem key={item.id} item={item} />
          ))}
        </ul>
      </div>
      <Modal
        open={open}
        title={"Add item menu"}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <FormItemMenu type={"add"} />
      </Modal>
    </>
  );
}

export default Menu;
