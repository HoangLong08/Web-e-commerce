import authHeader from "../configs/authHeader";
import instance from "../configs/axios";

const brands = {
  postListBrandByIdCategoryAdmin(idCategory) {
    // get list brand by category id
    const url = "/api/v1/brands/admin";
    return instance.post(url, { idCategory }, { headers: authHeader() });
  },
};

export default brands;
