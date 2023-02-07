import authHeader from "../configs/authHeader";
import instance from "../configs/axios";

const payments = {
  createPaymentIntent(totalMoneyCart) {
    const url = "/api/v1/payments/create-order";
    return instance.post(
      url,
      {
        amount: totalMoneyCart,
      },
      { headers: authHeader() }
    );
  },

  createOrderByUserId(
    idUser,
    name,
    phone,
    address,
    note,
    listProduct,
    idCity,
    idDistrict,
    idStreet,
    totalMoneyCart,
    idPayment
  ) {
    const url = "/api/v1/payments";
    return instance.post(
      url,
      {
        idUser,
        name,
        phone,
        address,
        note,
        listProduct,
        idCity,
        idDistrict,
        idStreet,
        totalMoneyCart,
        idPayment,
      },
      { headers: authHeader() }
    );
  },

  updateStatusOrderByOrderId(idOrder, status) {
    const url = "/api/v1/payments/update-status";
    return instance.post(
      url,
      {
        idOrder,
        status,
      },
      { headers: authHeader() }
    );
  },

  createPaymentOrder(amount, idOrder) {
    const url = "/api/v1/payments/create-payment";
    return instance.post(
      url,
      {
        amount,
        idOrder,
      },
      { headers: authHeader() }
    );
  },

  deleteOrderByOrderId(idOrder) {
    const url = "/api/v1/payments/" + idOrder;
    return instance.delete(url, { headers: authHeader() });
  },
};

export default payments;
