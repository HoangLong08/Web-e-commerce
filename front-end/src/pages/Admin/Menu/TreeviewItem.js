import React, { useState } from "react";
import {
  DownOutlined,
  UpOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  LinkOutlined,
  TagOutlined,
} from "@ant-design/icons";
import { isEmpty } from "lodash";
import { Space, Button, Modal } from "antd";
import FormItemMenu from "./FormItemMenu";
import { useDispatch } from "react-redux";
import { addItemMenu } from "store/menu/menus.reducer";
import { v4 } from "uuid";
import "./style.css";

function TreeviewItem({ item }) {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [typeForm, setTypeForm] = useState("");
  const [id, setId] = useState("");

  const handleClick = () => {
    setIsActive(!isActive);
  };

  const handleCancel = () => {
    setTypeForm("");
    setOpen(false);
  };

  const handleOk = async () => {
    let res;
    if (typeForm === "edit") {
    } else if (typeForm === "delete") {
    } else {
      console.log("item: ", item);
      res = await dispatch(
        addItemMenu({
          id: v4(),
        })
      );
    }
    if (!isEmpty(res.payload)) {
    }
  };

  return (
    <>
      <li className="item-menu-admin">
        <div className="flex-item-menu-admin">
          <Space>
            <div onClick={handleClick} className="icon-down-item-menu">
              {item.children.length > 0 && (
                <>{isActive ? <DownOutlined /> : <UpOutlined />}</>
              )}
            </div>
            <p className="title-item-menu-admin">
              <TagOutlined /> <span>{item.title}</span>
            </p>
            <p className="url-item-menu-admin">
              <LinkOutlined /> <span>{item.url}</span>
            </p>
          </Space>
          <Space>
            <Button
              type="primary"
              ghost
              icon={<PlusOutlined />}
              className="btn-add-item-menu"
              onClick={() => {
                setTypeForm("add");
                setOpen(true);
              }}
            />
            <Button
              type="primary"
              ghost
              icon={<EditOutlined />}
              className="btn-edit-item-menu"
              onClick={() => {
                setTypeForm("edit");
                setOpen(true);
              }}
            />
            <Button type="primary" icon={<DeleteOutlined />} danger />
          </Space>
        </div>
        {/* && item.children.length */}
        {item.children && (
          <ul style={{ display: isActive ? "block" : "none" }}>
            {item.children.map((child) => (
              <TreeviewItem key={child.id} item={child} />
            ))}
          </ul>
        )}
      </li>
      <Modal
        open={open}
        title={
          typeForm === "add"
            ? "Add item menu"
            : typeForm === "edit"
            ? "Update item menu"
            : "Delete item menu"
        }
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            // loading={loading}
            onClick={handleOk}
          >
            {typeForm === "add"
              ? "Add"
              : typeForm === "edit"
              ? "Save"
              : "Delete"}
          </Button>,
        ]}
      >
        {typeForm === "delete" ? (
          "Are you sure you want to delete this item menu ?"
        ) : (
          <FormItemMenu type={typeForm} id={id} />
        )}
      </Modal>
    </>
  );
}

export default TreeviewItem;
