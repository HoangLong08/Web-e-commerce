import authHeader from "../configs/authHeader";
import instance from "../configs/axios";

const products = {
  getListProduct() {
    const url = "/api/v1/products";
    return instance.get(url);
  },

  getDetailProduct(idProduct) {
    const url = "/api/v1/products/detail/" + idProduct;
    return instance.get(url);
  },

  getListProductByCategoryId(idCategory) {
    const url = "/api/v1/products/similar-by-category?id=" + idCategory;
    return instance.get(url);
  },

  getListProductBySearch(queryString) {
    const url = "/api/v1/products/catalog" + queryString;
    return instance.get(url);
  },

  // admin
  getListProductAdmin(name) {
    const url = "/api/v1/products/admin" + `?name=` + name;
    return instance.get(url, { headers: authHeader() });
  },

  postProductAdmin(
    name,
    price,
    thumbnail,
    listImage,
    isDiscount,
    discount,
    specifications,
    description,
    categoryId,
    brandId
  ) {
    const url = "/api/v1/products/admin";
    return instance.post(
      url,
      {
        name,
        price,
        thumbnail,
        listImage,
        isDiscount,
        discount,
        specifications,
        description,
        categoryId,
        brandId,
      },
      { headers: authHeader() }
    );
  },

  putProductByIdAdmin(
    idProduct,
    name,
    price,
    thumbnail,
    listImage,
    isDiscount,
    discount,
    specifications,
    description,
    categoryId,
    brandId
  ) {
    const url = "/api/v1/products/admin";
    return instance.put(
      url,
      {
        idProduct,
        name,
        price,
        thumbnail,
        listImage,
        isDiscount,
        discount,
        specifications,
        description,
        categoryId,
        brandId,
      },
      { headers: authHeader() }
    );
  },

  deleteProductByIdAdmin(idProduct) {
    const url = "/api/v1/products/admin/" + idProduct;
    return instance.delete(url, { headers: authHeader() });
  },

  deleteMultipleProductByIdAdmin(listIdProduct) {
    const url = "/api/v1/products/admin/delete-multiple-product";
    return instance.post(
      url,
      {
        listIdProduct,
      },
      { headers: authHeader() }
    );
  },
};

export default products;
