import authHeader from "../configs/authHeader";
import instance from "../configs/axios";

const menus = {
  getMenuAdmin() {
    const url = "/api/v1/menu";
    return instance.get(url);
  },
};

export default menus;
