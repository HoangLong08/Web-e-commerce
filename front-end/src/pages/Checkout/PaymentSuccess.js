import { Button } from "antd";
import useBackToTop from "hooks/useBackToTop";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeAllCart } from "../../store/shoppingCart/shoppingCart.reducer";
import "./style.css";

function PaymentSuccess() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authSlice = useSelector((state) => state.authSlice.infoAccount);

  useBackToTop();

  useEffect(() => {
    if (!authSlice || !authSlice.accessToken || !authSlice.idUser) {
      navigate("/login");
    }
  }, [authSlice, navigate]);

  useEffect(() => {
    dispatch(removeAllCart([]));
  }, [dispatch]);

  return (
    <div>
      <div className="wrap-payment-success">
        <div className="icon-payment-success">
          <i className="far fa-check-circle"></i>
        </div>
        <h1>Đặt hàng thành công</h1>
        <div>
          <span style={{ margin: "12px 0", display: "inline-block" }}>
            Cảm ơn bạn đã mua hàng tại:{" "}
          </span>
          <p className="text-payment-success">Tech store</p>
        </div>
        <Button type="primary" onClick={() => navigate(`/`)}>
          Tiếp mua sắm{" "}
        </Button>
      </div>
    </div>
  );
}

export default PaymentSuccess;
