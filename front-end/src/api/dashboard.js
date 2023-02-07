import authHeader from "../configs/authHeader";
import instance from "../configs/axios";

const dashboards = {
  getDashboardAdmin(idCategory) {
    const url = "/api/v1/dashboards/admin";
    return instance.get(url, { headers: authHeader() });
  },
};

export default dashboards;
