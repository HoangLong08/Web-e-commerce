import { Button } from "antd";
import { RestOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useBackToTop from "../../hooks/useBackToTop";
import { formatCash } from "../../utils";
import { useState, useEffect } from "react";
import { isEmpty } from "lodash";
import {
  decrementCart,
  incrementCart,
  removeCart,
  removeAllCart,
} from "store/shoppingCart/shoppingCart.reducer";
import { CartEmpty } from "assets/index";
import PlayerLoti from "layouts/Player/index";
import { useTranslation } from "react-i18next";
import "./style.css";

function Cart() {
  const { t } = useTranslation("cart");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const shoppingCart = useSelector(
    (state) => state.shoppingCartSlice.shoppingCart
  );
  const authSlice = useSelector((state) => state.authSlice.infoAccount);

  const [totalMoneyCart, setTotalMoneyCart] = useState(0);

  useBackToTop();

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

  return (
    <div className="wrapper-cart-page">
      {shoppingCart?.length === 0 && (
        <div className="wrapper-cart-empty">
          <PlayerLoti
            src={CartEmpty}
            autoplay
            style={{ width: "200px", height: "200px" }}
          />
          <span>{t("your shopping cart is empty")}</span>
          <Button type="link" onClick={() => navigate("/")}>
            {t("purchase now")}
          </Button>
        </div>
      )}
      {shoppingCart?.length > 0 && (
        <>
          <div className="cart-left">
            <div className="cart-header">
              <p className="cart-page-title">{t("cart")}</p>
              {shoppingCart?.length > 0 && (
                <Button
                  type="link"
                  danger
                  onClick={() => dispatch(removeAllCart([]))}
                >
                  {t("delete all")}
                </Button>
              )}
            </div>
            <div className="list-cart">
              {shoppingCart?.length > 0 &&
                shoppingCart?.map((item, index) => (
                  <div
                    className="page-cart-item"
                    key={"page-cart-item" + index}
                  >
                    <div className="cart-item-image">
                      <img src={item.thumbnail} alt="" />
                    </div>
                    <div className="cart-item-info-detail">
                      <Link to={item.location}>
                        <p className="cart-item-name">{item.name}</p>
                      </Link>
                      <div className="cart-item-price">
                        <p className="sale-price">
                          {formatCash(
                            (item.price * (100 - item.discount)) / 100
                          )}
                        </p>
                        {item.discount > 0 && (
                          <>
                            <p className="regular-price">
                              {formatCash(item.price)}
                            </p>
                            <span className="on-sale">
                              {t("discount")} {item.discount} %
                            </span>
                          </>
                        )}
                      </div>
                      <div className="change-quantity">
                        <p>{t("quantity")}</p>
                        <div className="number">
                          <span
                            className="minus"
                            onClick={() => {
                              dispatch(decrementCart({ id: item.id }));
                            }}
                          >
                            -
                          </span>
                          <input
                            type="text"
                            readOnly="readOnly"
                            value={item.quantity || 1}
                          />
                          <span
                            className="plus"
                            onClick={() => {
                              dispatch(incrementCart({ id: item.id }));
                            }}
                          >
                            +
                          </span>
                        </div>
                      </div>
                      <div className="promotion-pack"></div>
                      <div className="wrapper-btn-delete-cart">
                        <Button
                          danger
                          icon={<RestOutlined />}
                          onClick={() => {
                            dispatch(removeCart({ id: item.id }));
                          }}
                        >
                          {t("delete")}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="cart-right">
            <div className="cart-header cart-header-right">
              <Button
                type="link"
                icon={<ArrowLeftOutlined />}
                onClick={() => navigate(-1)}
              >
                {t("back")}
              </Button>
            </div>
            {shoppingCart.length > 0 && (
              <>
                {/* <div className="wrapper-cart-coupon">
              <h6 className="title-box-cart-page">Khuyến mại</h6>
              <div className="container-cart-coupon">
                <Search
                  placeholder="Mã giảm giá"
                  allowClear
                  enterButton="Áp dụng"
                  size="large"
                  onSearch={onSearch}
                />
              </div>
            </div> */}
                <div className="wrapper-cart-coupon">
                  <h6 className="title-box-cart-page">{t("pay")}</h6>
                  <div className="cart-page-money">
                    <p>{t("into money")}</p>
                    <p className="cart-main-money">
                      {formatCash(totalMoneyCart)}
                    </p>
                  </div>
                  <Button
                    type="primary"
                    block
                    style={{ marginBottom: "12px", height: "auto" }}
                    onClick={() => {
                      if (!isEmpty(authSlice)) {
                        navigate("/checkout");
                      } else {
                        navigate("/login", {
                          state: {
                            url: "/cart",
                          },
                        });
                      }
                    }}
                  >
                    {t("proceed to order")}
                    <br />
                    {isEmpty(authSlice) && (
                      <span style={{ textAlign: "center" }}>
                        ( {t("login to pay")} )
                      </span>
                    )}
                  </Button>
                  <Button block onClick={() => navigate("/")}>
                    {t("choose more products")}
                  </Button>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
