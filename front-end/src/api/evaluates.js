import authHeader from "../configs/authHeader";
import instance from "../configs/axios";

const evaluates = {
  getListEvaluateByProductId(idProduct) {
    const url = `/api/v1/evaluates/${idProduct}/product`;
    return instance.get(url);
  },

  postEvaluateByProductId(idUser, idProduct, content, rating) {
    const url = "/api/v1/evaluates";
    return instance.post(
      url,
      {
        idUser,
        idProduct,
        content,
        rating,
      },
      { headers: authHeader() }
    );
  },
};

export default evaluates;
