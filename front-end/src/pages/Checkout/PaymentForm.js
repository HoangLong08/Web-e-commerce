import React, { useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Button } from "antd";
import { openNotificationWithIcon } from "../../utils";
import { useDispatch } from "react-redux";
import {
  createPaymentOrderAction,
  // updateStatusOrderByOrderIdAction,
} from "store/payment/payment.action";
import { useNavigate } from "react-router-dom";

function PaymentForm({ isOpen, idOrder, totalMoneyCart }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setLoading(true);
    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/checkout/payment-success",
      },
      redirect: "if_required",
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      // console.log("result.error.message: ", result.error.message);
      openNotificationWithIcon("error", result.error.message);
    } else {
      if (result?.paymentIntent?.status === "succeeded") {
        // const updateStatusOrder = await dispatch(
        //   updateStatusOrderByOrderIdAction({
        //     idOrder: idOrder,
        //     status: "đã thanh toán",
        //   })
        // );

        // if (updateStatusOrder?.payload?.status === "200") {
        await dispatch(
          createPaymentOrderAction({
            amount: totalMoneyCart,
            idOrder: idOrder,
          })
        );
        await navigate("/checkout/payment-success");
        // }
      }
    }

    setLoading(false);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="FormGroup">
          <PaymentElement />
        </div>
        <Button type="primary" block onClick={handleSubmit} loading={loading}>
          Pay
        </Button>
      </form>
    </div>
  );
}

export default PaymentForm;
