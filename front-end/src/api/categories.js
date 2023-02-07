import authHeader from "../configs/authHeader";
import instance from "../configs/axios";

const categories = {
  getListCategoryAdmin(name) {
    const url = "/api/v1/categories/admin" + "?name=" + name;
    return instance.get(url, { headers: authHeader() });
  },

  getDetailCategory(idCategory) {
    const url = "/api/v1/categories/" + "?id=" + idCategory;
    return instance.get(url);
  },

  postCategoryAdmin(name, listBrand) {
    const url = "/api/v1/categories/admin";
    return instance.post(
      url,
      {
        name,
        listBrand,
      },
      { headers: authHeader() }
    );
  },

  putCategoryAdmin(idCategory, name, listBrand) {
    const url = "/api/v1/categories/admin";
    return instance.put(
      url,
      {
        idCategory,
        name,
        listBrand,
      },
      { headers: authHeader() }
    );
  },

  deleteCategoryAdmin(idCategory) {
    const url = "/api/v1/categories/admin/" + idCategory;
    return instance.delete(url, { headers: authHeader() });
  },
};

export default categories;
