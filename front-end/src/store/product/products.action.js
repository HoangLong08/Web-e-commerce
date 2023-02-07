import { createAsyncThunk } from "@reduxjs/toolkit";
import products from "../../api/products";

// list product at homepage
const getListProductAction = createAsyncThunk(
  "products/getListProductAction",
  async (params, thunkAPI) => {
    try {
      const res = await products.getListProduct().then((response) => {
        if (response) {
          return response;
        }
        return [];
      });
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const getDetailProductAction = createAsyncThunk(
  "products/getDetailProductAction",
  async (params, thunkAPI) => {
    try {
      const { idProduct } = params;
      const res = await products
        .getDetailProduct(idProduct)
        .then((response) => {
          if (response) {
            return response;
          }
          return {};
        });
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// get the list of similar products at the detail page
const getListProductByCategoryIdAction = createAsyncThunk(
  "products/getListProductByCategoryIdAction",
  async (params, thunkAPI) => {
    try {
      const { idCategory } = params;
      const res = await products
        .getListProductByCategoryId(idCategory)
        .then((response) => {
          if (response) {
            return response;
          }
          return [];
        });
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const getListProductAdminAction = createAsyncThunk(
  "products/getListProductAdminAction",
  async (params, thunkAPI) => {
    try {
      const { name } = params;
      const res = await products.getListProductAdmin(name).then((response) => {
        if (response) {
          return response;
        }
        return [];
      });
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const getListProductBySearchAction = createAsyncThunk(
  "products/getListProductBySearchAction",
  async (params, thunkAPI) => {
    try {
      const { queryString } = params;
      const res = await products
        .getListProductBySearch(queryString)
        .then((response) => {
          if (response) {
            return response;
          }
          return [];
        });
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const postProductAdminAction = createAsyncThunk(
  "products/postProductAdminAction",
  async (params, thunkAPI) => {
    try {
      const {
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
      } = params;
      const res = await products
        .postProductAdmin(
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
        )
        .then((response) => {
          if (response) {
            return response;
          }
          return {};
        });
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const putProductByIdAdminAction = createAsyncThunk(
  "products/putProductByIdAdminAction",
  async (params, thunkAPI) => {
    try {
      const {
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
      } = params;
      const res = await products
        .putProductByIdAdmin(
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
        )
        .then((response) => {
          if (response) {
            return response;
          }
          return {};
        });
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const deleteProductByIdAdminAction = createAsyncThunk(
  "products/deleteProductByIdAction",
  async (params, thunkAPI) => {
    try {
      const { idProduct } = params;
      const res = await products
        .deleteProductByIdAdmin(idProduct)
        .then((response) => {
          if (response) {
            return response;
          }
          return {};
        });
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const deleteMultipleProductByIdAdminAction = createAsyncThunk(
  "products/deleteProductByIdAction",
  async (params, thunkAPI) => {
    try {
      const { listIdProduct } = params;
      const res = await products
        .deleteMultipleProductByIdAdmin(listIdProduct)
        .then((response) => {
          if (response) {
            return response;
          }
          return {};
        });
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export {
  getListProductAction,
  getDetailProductAction,
  getListProductByCategoryIdAction,
  getListProductBySearchAction,
  getListProductAdminAction,
  postProductAdminAction,
  putProductByIdAdminAction,
  deleteProductByIdAdminAction,
  deleteMultipleProductByIdAdminAction,
};
