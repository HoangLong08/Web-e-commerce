import React, { useEffect } from "react";
import { formatCash } from "../../utils";
import TableAntd from "../Admin/components/Table";
import { useDispatch, useSelector } from "react-redux";
import { getListOrderByUserIdAction } from "store/order/order.action";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Orders() {
  const { t } = useTranslation("profile");
  const dispatch = useDispatch();
  const authSlice = useSelector((state) => state.authSlice.infoAccount);
  const listOrderByUserId = useSelector(
    (state) => state.orderSlice.listOrderByUserId
  );

  const columns = [
    {
      title: () => t("order code"),
      dataIndex: "idOrder",
      key: "idOrder",
    },
    {
      title: () => t("purchase date"),
      dataIndex: "purchaseDate",
      key: "purchaseDate",
    },
    {
      title: () => t("products"),
      dataIndex: "product",
      key: "product",
      width: 200,
    },
    {
      title: () => t("amount"),
      dataIndex: "sumMoney",
      key: "sumMoney",
    },
    {
      title: () => t("status"),
      dataIndex: "status",
      key: "status",
    },
  ];

  useEffect(() => {
    dispatch(
      getListOrderByUserIdAction({
        idUser: authSlice.idUser,
      })
    );
  }, [dispatch, authSlice]);

  const getNameProduct = (arr) => {
    let res = "";
    arr.forEach((item, index) => {
      if (index === arr?.length - 1) {
        res += item.Product?.name;
      } else {
        res += item.Product?.name + ", ";
      }
    });
    return res;
  };

  const renderDataSource = () => {
    return listOrderByUserId?.data?.data?.map((item, index) => {
      return {
        key: index,
        idOrder: <Link to={`/profile/orders/` + item.id}>{item.id}</Link>,
        purchaseDate: new Date(item.createdAt).toLocaleString(),
        product: getNameProduct(item.OrderDetails),
        sumMoney: formatCash(item.Payments?.[0].amount),
        status: item.status,
      };
    });
  };
  return (
    <>
      <h2 style={{ marginBottom: "12px" }}>Quản lý đơn hàng</h2>
      <div className="box-ad-page">
        <TableAntd
          data={renderDataSource()}
          tableHead={columns}
          loading={listOrderByUserId.load}
        />
      </div>
    </>
  );
}

export default Orders;
