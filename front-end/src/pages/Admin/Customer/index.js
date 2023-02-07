import { Button, Input, Space, Tag, Image } from "antd";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import HeadPage from "../components/HeadPage";
import { Modal, Popover, Select } from "antd";
import {
  SearchOutlined,
  LockOutlined,
  UnlockOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import TableAntd from "../components/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  getListUserAdminAction,
  putLockAccountAdminAction,
  putUnlockAccountAdminAction,
} from "store/user/users.action";
import { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import openNotificationWithIcon from "utils/notification";
import useDebounce from "hooks/useDebounce";
import { Fragment } from "react";

const columns = [
  {
    title: "Avatar",
    dataIndex: "avatar",
    key: "avatar",
    align: "center",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    width: 150,
  },
];

function Customer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const listUser = useSelector((state) => state.usersSlice.listUser);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [typeForm, setTypeForm] = useState("");
  const [statusAccount, setStatusAccount] = useState("");
  const [idUser, setIdUser] = useState("");
  const [roleIdUser, setRoleIdUser] = useState("");
  const [valueSearch, setValueSearch] = useState("");

  const valueSearchDebounce = useDebounce(valueSearch, 500);

  useEffect(() => {
    dispatch(
      getListUserAdminAction({
        name: valueSearchDebounce,
      })
    );
  }, [dispatch, valueSearchDebounce]);

  const showModal = (isActive) => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    let res;
    if (typeForm === "delete") {
      if (statusAccount) {
        //handle lock account
        res = await dispatch(
          putLockAccountAdminAction({
            id: idUser,
          })
        );
      } else {
        //handle unlock account
        res = await dispatch(
          putUnlockAccountAdminAction({
            id: idUser,
          })
        );
      }
    } else {
      // handle set permission for user
    }
    if (!isEmpty(res.payload)) {
      openNotificationWithIcon("success", res.payload.message);
    }
    await dispatch(
      getListUserAdminAction({
        name: valueSearchDebounce,
      })
    );
    setTypeForm("");
    setIdUser("");
    setStatusAccount("");
    setStatusAccount("");
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setTypeForm("");
    setIdUser("");
    setStatusAccount("");
    setStatusAccount("");
    setIsModalOpen(false);
  };

  const renderDataSource = () => {
    return listUser.data?.data?.map((item, index) => {
      return {
        key: index,
        avatar: (
          <Image
            src={
              item?.Profile?.avatar ||
              "https://static.thenounproject.com/png/5034901-200.png"
            }
            height={46}
          />
        ),
        name: item.userName,
        email: item.email,
        phone: item.phone ? item.phone : "empty",
        role: item?.Role?.type,
        status: (
          <Tag color={item.isActive ? "success" : "error"}>
            {item.isActive ? "Active" : "Blocked"}
          </Tag>
        ),
        action: (
          <Space>
            <Button
              icon={item.isActive ? <LockOutlined /> : <UnlockOutlined />}
              onClick={() => {
                setIdUser(item.id);
                setTypeForm("delete");
                setStatusAccount(item.isActive);
                showModal();
              }}
              danger={!item.isActive ? false : true}
            />
            {/* <Popover
              placement="bottomRight"
              content={
                <>
                  <Button
                    type="link"
                    onClick={() => {
                      setIdUser(item.id);
                      setRoleIdUser(item?.RoleId);
                      setTypeForm("permission");
                      showModal();
                    }}
                  >
                    Set permission
                  </Button>
                </>
              }
              trigger="click"
            >
              <Button icon={<MoreOutlined />} />
            </Popover> */}
          </Space>
        ),
      };
    });
  };
  return (
    <>
      <HeadPage title="Customers" actionMenu={<></>} isBack={0} />

      <div className="box-ad-page wrapper-box-admin-page">
        <div className="wrapper-filter-page-admin">
          <div className="container-filter-page-admin-left">
            <div>
              <Input
                placeholder="Search customer name ..."
                prefix={<SearchOutlined />}
                style={{ width: "300px" }}
                onChange={(e) => {
                  setValueSearch(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="container-filter-page-admin-right">
            {/* <div>
              <Button>Sắp xếp</Button>
            </div> */}
          </div>
        </div>
        <TableAntd
          data={renderDataSource()}
          tableHead={columns}
          loading={listUser.load}
        />
      </div>
      <Modal
        title={typeForm === "delete" ? "Status account" : "Set permission"}
        centered
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {typeForm === "delete" && (
          <Fragment>
            {statusAccount
              ? "Do you want to lock this account ?"
              : "Do you want to unlock this account ?"}
          </Fragment>
        )}
        {typeForm === "permission" && (
          <Fragment>
            <Select
              defaultValue="lucy"
              style={{
                width: 120,
              }}
              // onChange={handleChange}
              options={[
                {
                  value: "jack",
                  label: "Jack",
                },
                {
                  value: "lucy",
                  label: "Lucy",
                },
                {
                  value: "disabled",
                  disabled: true,
                  label: "Disabled",
                },
                {
                  value: "Yiminghe",
                  label: "yiminghe",
                },
              ]}
            />
          </Fragment>
        )}
      </Modal>
    </>
  );
}

export default Customer;
