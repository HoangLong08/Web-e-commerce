import React from "react";
import {
  Space,
  Button,
  Row,
  Col,
  Typography,
  Image,
  Divider,
  Spin,
} from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderByIdAction } from "store/order/order.action";
import useBackToTop from "hooks/useBackToTop";
import { useEffect } from "react";
import { formatCash } from "utils/formatCash";
import { useTranslation } from "react-i18next";

const { Title, Text } = Typography;

function DetailOrder() {
  const { t } = useTranslation("profile");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { idOrder } = useParams();
  const detailOrder = useSelector((state) => state.orderSlice.detailOrder);
  console.log("detailOrder: ", detailOrder);
  useBackToTop(idOrder);

  useEffect(() => {
    dispatch(getOrderByIdAction({ idOrder }));
  }, [dispatch, idOrder]);

  console.log("detailOrder.data?.data: ", detailOrder.data?.data?.Payments);

  return (
    <Spin spinning={detailOrder.load}>
      <Space style={{ marginBottom: "12px" }}>
        <Button
          icon={<LeftOutlined />}
          onClick={() => {
            navigate("/profile/orders");
          }}
        />
        <h2>
          {" "}
          {t("order")}: {idOrder}
        </h2>
      </Space>
      <Row gutter={[12, 12]}>
        <Col md={12}>
          <div className="box-ad-page" style={{ height: "100%" }}>
            <Title level={4} style={{ marginBottom: "12px" }}>
              {t("receiver information")}
            </Title>
            <p style={{ marginBottom: "6px" }}>
              <Text strong level={5}>
                {t("receiver")}:{" "}
              </Text>
              {detailOrder.data?.data?.recipient}
            </p>
            <p style={{ marginBottom: "6px", lineHeight: "24px" }}>
              <Text strong level={5}>
                {t("address")}:{" "}
              </Text>
              {`${detailOrder.data?.data?.address}-${detailOrder.data?.data?.Street?.street}-${detailOrder.data?.data?.District?.district}-${detailOrder.data?.data?.City?.city}`}
            </p>
            <p style={{ marginBottom: "6px" }}>
              <span>
                <Text strong level={5}>
                  {t("phone")}:{" "}
                </Text>
                {detailOrder.data?.data?.numberPhoneRecipient}
              </span>
            </p>
          </div>
        </Col>
        <Col md={12}>
          <div className="box-ad-page" style={{ height: "100%" }}>
            <Title level={4} style={{ marginBottom: "12px" }}>
              {t("order information")}
            </Title>
            <p style={{ marginBottom: "6px" }}>
              <span>
                <Text strong level={5}>
                  {t("order status")}:{" "}
                </Text>
                {detailOrder.data?.data?.status}
              </span>
            </p>
            <p style={{ marginBottom: "6px" }}>
              <span>
                <Text strong level={5}>
                  {t("created")}:{" "}
                </Text>
                {new Date(detailOrder.data?.data?.createdAt).toLocaleString()}
              </span>
            </p>
          </div>
        </Col>
      </Row>
      <div className="box-ad-page" style={{ marginTop: "12px" }}>
        <Row justify="space-between">
          <Col span={4}>
            <Title level={4} style={{ marginBottom: "12px" }}>
              {t("products")}
            </Title>
          </Col>
          <Col span={8} align={"right"}>
            <p>
              <span>{t("order status")}:</span> {detailOrder.data?.data?.status}
            </p>
          </Col>
        </Row>
        {detailOrder.data?.data?.OrderDetails?.map((item, index) => {
          return (
            <Row justify="space-between" key={`item-order-checkout-` + index}>
              <Col span={18}>
                <Space>
                  <Image width={80} src={item.Product?.thumbnail} />
                  <div style={{ marginLeft: "12px" }}>
                    <p>
                      <Text>{item.Product?.name}</Text>
                    </p>
                    <p>
                      <Text type="secondary">{t("Provided by")} tech shop</Text>
                    </p>
                  </div>
                </Space>
              </Col>
              <Col span={4} align={"right"}>
                <p className="product-price-show">
                  {formatCash(
                    (item.Product?.price * (100 - item.Product?.discount)) / 100
                  )}
                </p>
                {item.Product?.isDiscount !== 0 ? (
                  <p className="product-price-through">
                    {formatCash(item.Product?.price)}
                  </p>
                ) : (
                  <></>
                )}
              </Col>
              {index !== detailOrder.data?.data?.OrderDetails?.length - 1 && (
                <Divider style={{ margin: "6px 0" }} />
              )}
            </Row>
          );
        })}
        <Space style={{ width: "100%", justifyContent: "end" }}>
          <Title level={5}>{t("amount")}: </Title>
          <Title level={2} type="danger">
            {formatCash(detailOrder.data?.data?.Payments?.[0]?.amount)}
          </Title>
        </Space>
      </div>
      <div className="box-ad-page" style={{ marginTop: "12px" }}>
        <Title level={4} style={{ marginBottom: "12px" }}>
          {t("method payment")}
        </Title>
        <Space style={{ width: "100%", justifyContent: "space-between" }}>
          <Title level={5}>
            {detailOrder.data?.data?.Payments?.[0]?.PaymentMethod?.type}{" "}
          </Title>
          <Title level={5}>
            {formatCash(detailOrder.data?.data?.Payments?.[0]?.amount)}
          </Title>
        </Space>
      </div>
    </Spin>
  );
}

export default DetailOrder;
