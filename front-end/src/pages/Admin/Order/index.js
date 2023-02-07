import { Input, Space, Select } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import HeadPage from "../components/HeadPage";
import TableAntd from "../components/Table";
import { SearchOutlined } from "@ant-design/icons";
import { getListOrderAdminAction } from "store/order/order.action";
import { useState, useEffect } from "react";
import useDebounce from "hooks/useDebounce";
import { updateStatusOrderByOrderIdAction } from "store/payment/payment.action";
import openNotificationWithIcon from "utils/notification";

const columns = [
  {
    title: "Mã đơn hàng",
    dataIndex: "orderID",
    key: "orderID",
  },
  {
    title: "Tên khách hàng",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Số điện thoại",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Thời gian đặt hàng",
    dataIndex: "time",
    key: "time",
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

function Order() {
  const dispatch = useDispatch();
  const listOrderAdmin = useSelector(
    (state) => state.orderSlice.listOrderAdmin
  );

  const [valueSearch, setValueSearch] = useState("");

  const valueSearchDebounce = useDebounce(valueSearch, 500);

  useEffect(() => {
    dispatch(
      getListOrderAdminAction({
        name: valueSearchDebounce,
      })
    );
  }, [dispatch, valueSearchDebounce]);

  const handleChange = async (value, idOrder) => {
    console.log(`selected ${value}`);
    const updateStatusOrder = await dispatch(
      updateStatusOrderByOrderIdAction({
        idOrder: idOrder,
        status: value,
      })
    );

    if (updateStatusOrder?.payload?.status === "200") {
      openNotificationWithIcon("success", updateStatusOrder?.payload?.message);
      await dispatch(
        getListOrderAdminAction({
          name: valueSearchDebounce,
        })
      );
    }
  };

  const renderDataSource = () => {
    return listOrderAdmin?.data?.data?.map((item, index) => {
      return {
        key: index,
        orderID: item.id,
        name: item.User.userName,
        email: item.User.email,
        phone: item.numberPhoneRecipient,
        time: new Date(item.createdAt)?.toLocaleString(),
        status: item.status,
        action: (
          <Space>
            <Select
              placeholder="Trạng thái"
              style={{
                width: 150,
              }}
              onChange={(e) => handleChange(e, item.id)}
              options={[
                {
                  value: "Shipping",
                  label: "Shipping",
                },
                {
                  value: "Delivered",
                  label: "Delivered",
                },
                {
                  value: "Cancel delivery",
                  label: "Cancel delivery",
                },
              ]}
            />
          </Space>
        ),
      };
    });
  };
  return (
    <div>
      <HeadPage title="Order" actionMenu={<></>} isBack={0} />
      <div className="box-ad-page wrapper-box-admin-page">
        <div className="wrapper-filter-page-admin">
          <div className="container-filter-page-admin-left">
            <div>
              <Input
                placeholder="Tìm kiếm tên khách hàng hoặc email ...."
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
          loading={false}
        />
      </div>
    </div>
  );
}

export default Order;
