import authHeader from "configs/authHeader";
import instance from "../configs/axios";

const rs = {
  getProductsSpecSimilar(specs, idProduct) {
    const url = "/api/v1/rs/similar-product-spec";
    return instance.post(url, { specs: specs, idProduct: idProduct });
  },

  getProductsRatingSimilar(idUser) {
    const url = "/api/v1/rs/similar-product-rating/" + idUser;
    return instance.get(url, { headers: authHeader() });
  },
};

export default rs;
