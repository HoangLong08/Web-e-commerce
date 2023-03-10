import { Button, Col, Row, Select, Modal, Spin, Space, Empty } from "antd";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useBackToTop from "../../hooks/useBackToTop";
import FormInput from "../../layouts/FormInput";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import { validateInput } from "../../utils";
import { isEmpty } from "lodash";
import { formatCash } from "utils/formatCash";
import {
  getAllCityAction,
  getListDistrictByIdCityAction,
  getListStreetByIdDistrictAction,
} from "store/address/address.action";
import { setListDistrict, setListStreet } from "store/address/address.reducer";
import {
  createOrderByUserIdAction,
  createPaymentIntentAction,
  deleteOrderByOrderIdAction,
} from "store/payment/payment.action";
import "./style.css";

const { Option } = Select;

// const stripeTestPromise = loadStripe(`${process.env.PUBLIC_KEY_STRIPE}`);
const stripeTestPromise = loadStripe(
  "pk_test_51M6WndDaFRwojde9sbqGGiAO7aGhEyNVASgFyTCisNQrByNbLwVijggVG8Wso1dEZS0mDhObDsEOnf17vPuaOoBh00kq5KjvZZ"
);

function CheckOut() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [clientSecret, setClientSecret] = useState("");
  const shoppingCart = useSelector(
    (state) => state.shoppingCartSlice.shoppingCart
  );
  const authSlice = useSelector((state) => state.authSlice.infoAccount);
  const listCity = useSelector((state) => state.addressSlice.listCity);
  const listDistrict = useSelector((state) => state.addressSlice.listDistrict);
  const listStreet = useSelector((state) => state.addressSlice.listStreet);

  const [valueCity, setValueCity] = useState("defaultCity");
  const [valueDistrict, setValueDistrict] = useState("defaultDistrict");
  const [valueStreet, setValueStreet] = useState("defaultStreet");

  const [idOrder, setIdOrder] = useState();
  const [totalMoneyCart, setTotalMoneyCart] = useState(0);
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [isOpenPopupPayment, setIsOpenPopupPayment] = useState(false);

  const [valueForm, setValueForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    note: "",
  });
  const [errorForm, setErrorForm] = useState({
    fullName: "",
    phone: "",
    address: "",
  });

  useBackToTop();

  useEffect(() => {
    dispatch(getAllCityAction());
  }, [dispatch]);

  useEffect(() => {
    let sum = 0;
    shoppingCart.forEach((item) => {
      if (item.discount > 0) {
        sum += ((item.price * (100 - item.discount)) / 100) * item.quantity;
      } else {
        sum += item.price * item.quantity;
      }
    });
    setTotalMoneyCart(sum);
  }, [shoppingCart]);

  useEffect(() => {
    if (isEmpty(authSlice) || !authSlice?.idUser) {
      navigate("/login");
    }
  }, [authSlice, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValueForm({
      ...valueForm,
      [name]: value,
    });
  };

  const handelPayment = async () => {
    let isValid = true;
    const newError = {
      fullName: "",
      phone: "",
      address: "",
    };
    let infoFieldFullName = validateInput(
      valueForm.fullName,
      "h??? v?? t??n",
      0,
      ""
    );
    let infoFieldPhone = validateInput(
      valueForm.phone,
      "s??? ??ii???n tho???i",
      0,
      ""
    );
    let infoFieldAddress = validateInput(valueForm.address, "?????a ch???", 0, "");

    if (!infoFieldFullName.isValid) {
      isValid = infoFieldFullName.isValid;
      newError.fullName = infoFieldFullName.message;
    }

    if (!infoFieldPhone.isValid) {
      isValid = infoFieldPhone.isValid;
      newError.phone = infoFieldPhone.message;
    }

    if (!infoFieldAddress.isValid) {
      isValid = infoFieldAddress.isValid;
      newError.address = infoFieldAddress.message;
    }

    if (valueCity === "defaultCity") {
      isValid = false;
    } else {
      isValid = true;
    }

    if (valueDistrict === "defaultDistrict") {
      isValid = false;
    } else {
      isValid = true;
    }

    if (valueStreet === "defaultStreet") {
      isValid = false;
    } else {
      isValid = true;
    }

    if (isValid) {
      setLoadingOrder(true);
      // setIsOpenPopupPayment(!isOpenPopupPayment);

      const createOrder = await dispatch(
        createPaymentIntentAction({ totalMoneyCart: totalMoneyCart })
      );
      // console.log("createOrder: ", createOrder);
      if (createOrder?.payload?.status === "200") {
        // setLoadingOrder(false);
        setClientSecret(createOrder?.payload?.data?.key || "");

        const addOrder = await dispatch(
          createOrderByUserIdAction({
            idUser: authSlice?.idUser,
            name: valueForm.fullName,
            phone: valueForm.phone,
            address: valueForm.address,
            note: valueForm.note,
            listProduct: shoppingCart,
            idCity: valueCity,
            idDistrict: valueDistrict,
            idStreet: valueStreet,
            totalMoneyCart: totalMoneyCart,
            idPayment: createOrder?.payload?.data?.id,
          })
        );

        if (addOrder?.payload?.status === "200") {
          setIdOrder(addOrder?.payload?.data?.id);
          setIsOpenPopupPayment(!isOpenPopupPayment);
          setLoadingOrder(false);
        }
      }
    }

    setErrorForm({ ...newError });
  };

  const handleOk = async () => {
    // e.preventDefault()
    setIsOpenPopupPayment(false);
  };
  const handleCancel = async () => {
    // delete order by id when the client clicks cancel without payment
    await dispatch(
      deleteOrderByOrderIdAction({
        idOrder: idOrder,
      })
    );
    await setIsOpenPopupPayment(false);
  };

  const handleChangeAddress = async (e, type) => {
    if (type === "city") {
      if (e !== "defaultCity") {
        await dispatch(getListDistrictByIdCityAction({ idCity: e }));
      } else {
        await dispatch(setListDistrict([]));
        await dispatch(setListStreet([]));
      }
      await setValueCity(e);
      await setValueDistrict("defaultDistrict");
      await setValueStreet("defaultStreet");
    } else if (type === "district") {
      if (e !== "defaultDistrict") {
        await dispatch(
          getListStreetByIdDistrictAction({
            idDistrict: e,
          })
        );
      }
      await setValueDistrict(e);
      await setValueStreet("defaultStreet");
    } else {
      await setValueStreet(e);
    }
  };

  const renderListCart =
    shoppingCart.length > 0 ? (
      shoppingCart.map((item, index) => {
        return (
          <div className="payment-cart" key={index}>
            <div height="80" width="80" className="payment-cart-img">
              <img alt="product" src={item.thumbnail} loading="lazy" />
            </div>
            <div className="cart-infor">
              <a target="_blank" href={item.location} rel="noreferrer">
                <div className="payment-cart-name">{item.name}</div>
              </a>
              <div className="payment-cart-number">
                S??? l?????ng: {item.quantity}
              </div>
              <span className="payment-cart-price">
                <p className="sale-price" style={{ color: "black" }}>
                  {formatCash((item.price * (100 - item.discount)) / 100)}
                </p>
                {item.discount > 0 && (
                  <>
                    <p className="regular-price">{formatCash(item.price)}</p>
                  </>
                )}
              </span>
            </div>
          </div>
        );
      })
    ) : (
      <div>
        <p style={{ textAlign: "center", marginBottom: "12px" }}>
          Gi??? h??ng ch??a c?? s???n ph???m n??o
        </p>
        <Button className="btn-payment" block onClick={() => navigate(`/`)}>
          H??y mua s???m n??o
        </Button>
      </div>
    );

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={16} md={16} sm={24} xs={24}>
          {shoppingCart.length > 0 && (
            <>
              <div className="info-delivery common-background-border">
                <h3 className="title-checkout-cart">Th??ng tin kh??ch h??ng</h3>
                <div>
                  <FormInput
                    title="H??? v?? t??n"
                    htmlFor="fullName"
                    type=""
                    placeholder="H??? v?? t??n"
                    name="fullName"
                    value={valueForm.fullName || ""}
                    onChange={handleChange}
                    onKeyDown=""
                    className=""
                    error={errorForm.fullName}
                  />
                  <FormInput
                    title="S??? ??i???n tho???i"
                    htmlFor="phone"
                    type=""
                    placeholder="S??? ??i???n tho???i"
                    name="phone"
                    value={valueForm.phone || ""}
                    onChange={handleChange}
                    onKeyDown=""
                    className=""
                    error={errorForm.phone}
                  />
                  <Space>
                    <FormInput
                      title="Th??nh ph???"
                      content={
                        <>
                          <Select
                            style={{
                              width: 220,
                            }}
                            onChange={(e) => handleChangeAddress(e, "city")}
                            defaultValue={"defaultCity"}
                            loading={listCity.load}
                          >
                            <Option value="defaultCity">Ch???n th??nh ph???</Option>
                            {listCity.data?.data?.map((item, index) => {
                              return (
                                <Option
                                  key={"item-city-" + index}
                                  value={item.id}
                                >
                                  {item.city}
                                </Option>
                              );
                            })}
                          </Select>
                          {valueCity === "defaultCity" && (
                            <small className="form-error">Ch???n th??nh ph???</small>
                          )}
                        </>
                      }
                    />
                    <FormInput
                      title="Qu???n/Huy???n"
                      content={
                        <>
                          <Select
                            style={{
                              width: 220,
                            }}
                            onChange={(e) => handleChangeAddress(e, "district")}
                            defaultValue={"defaultDistrict"}
                            loading={listDistrict.load}
                            value={valueDistrict}
                          >
                            <Option value="defaultDistrict">
                              Ch???n qu???n huy???n
                            </Option>
                            {listDistrict?.data?.data?.map((item, index) => {
                              return (
                                <Option
                                  key={"item-district-" + index}
                                  value={item.id}
                                >
                                  {item.district}
                                </Option>
                              );
                            })}
                          </Select>
                          {valueDistrict === "defaultDistrict" && (
                            <small className="form-error">Ch???n huy???n</small>
                          )}
                        </>
                      }
                    />
                    <FormInput
                      title="Ph?????ng/X??"
                      content={
                        <>
                          <Select
                            style={{
                              width: 220,
                            }}
                            onChange={(e) => handleChangeAddress(e, "street")}
                            defaultValue={"defaultStreet"}
                            loading={listStreet.load}
                            value={valueStreet}
                          >
                            <Option value="defaultStreet">
                              Ch???n ph?????ng x??
                            </Option>
                            {listStreet?.data?.data?.map((item, index) => {
                              return (
                                <Option
                                  key={"item-street-" + index}
                                  value={item.id}
                                >
                                  {item.street}
                                </Option>
                              );
                            })}
                          </Select>
                          {valueStreet === "defaultStreet" && (
                            <small className="form-error">
                              Ch???n ph?????ng / x??
                            </small>
                          )}
                        </>
                      }
                    />
                  </Space>
                  <FormInput
                    title="?????a ch??? c??? th???"
                    htmlFor="address"
                    type=""
                    placeholder="S??? nh??, ng??, t??n ???????ng, ..."
                    name="address"
                    value={valueForm.address || ""}
                    onChange={handleChange}
                    onKeyDown=""
                    className=""
                    error={errorForm.address}
                  />
                </div>
              </div>
              <div className="note-order common-background-border">
                <h3 className="title-checkout-cart">Ghi ch?? cho ????n h??ng</h3>
                <div className="form-group-note">
                  <textarea
                    type="text"
                    name="note"
                    value={valueForm.note}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Nh???p th??ng tin ghi ch?? cho nh?? b??n h??ng"
                  />
                </div>
              </div>
            </>
          )}
          {shoppingCart.length === 0 && (
            <Empty
              description={
                <span>Hi???n t???i ch??a c?? s???n ph???m n??o trong gi??? h??ng</span>
              }
            />
          )}
        </Col>
        <Col span={8} md={8} sm={24} xs={24}>
          <div className="infor-order common-background-border">
            <h3 className="title-checkout-cart">Th??ng tin ????n h??ng</h3>
            <div className="list-cart">{renderListCart}</div>
          </div>
          {shoppingCart.length > 0 && (
            <div className="content-payment ppay-ment common-background-border">
              <div className="info-payment">
                <div style={{ marginBottom: "12px" }}>
                  <h3 className="title-checkout-cart">Th??nh ti???n</h3>
                  <p className="sumary-money">
                    {totalMoneyCart.toLocaleString("vi", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                </div>
                <Button
                  type="primary"
                  block
                  onClick={() => {
                    handelPayment();
                  }}
                >
                  Thanh to??n ngay
                </Button>
              </div>
            </div>
          )}
        </Col>
      </Row>
      <Modal
        title="Thanh to??n"
        open={isOpenPopupPayment}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            H???y
          </Button>,
        ]}
      >
        <Spin spinning={loadingOrder}>
          {!loadingOrder && stripeTestPromise && clientSecret && (
            <Elements stripe={stripeTestPromise} options={{ clientSecret }}>
              <PaymentForm
                isOpen={isOpenPopupPayment}
                idOrder={idOrder}
                totalMoneyCart={totalMoneyCart}
              />
            </Elements>
          )}
        </Spin>
      </Modal>
    </>
  );
}

export default CheckOut;
