import authHeader from "../configs/authHeader";
import instance from "../configs/axios";

const orders = {
  addOrderByUserId(
    idUser,
    name,
    phone,
    address,
    note,
    listProduct,
    idCity,
    idDistrict,
    idStreet
  ) {
    const url = "/api/v1/orders";
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
      },
      { headers: authHeader() }
    );
  },

  getListOrderAdmin(nameUser) {
    const url = "/api/v1/orders/admin?nameUser=" + nameUser;
    return instance.get(url, { headers: authHeader() });
  },

  getListOrderByUserId(idUser) {
    const url = "/api/v1/users/orders-user/" + idUser;
    return instance.get(url, { headers: authHeader() });
  },

  getOrderById(idOrder) {
    const url = "/api/v1/orders/" + idOrder;
    return instance.get(url, { headers: authHeader() });
  },
};

export default orders;
