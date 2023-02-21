import { createAsyncThunk } from "@reduxjs/toolkit";
import categories from "../../api/categories";

const getListCategoryAdminAction = createAsyncThunk(
  "categories/getListCategoryAdminAction",
  async (params, thunkAPI) => {
    try {
      const { name } = params;
      const res = await categories
        .getListCategoryAdmin(name)
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

const getDetailCategoryAction = createAsyncThunk(
  "categories/getDetailCategoryAction",
  async (params, thunkAPI) => {
    try {
      const { idCategory } = params;

      const res = await categories
        .getDetailCategory(idCategory)
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

const postCategoryAdminAction = createAsyncThunk(
  "categories/postCategoryAdminAction",
  async (params, thunkAPI) => {
    try {
      const { nameCategory, thumbnail, listBrand } = params;
      const res = await categories
        .postCategoryAdmin(nameCategory, thumbnail, listBrand)
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

const putCategoryAdminAction = createAsyncThunk(
  "categories/putCategoryAdminAction",
  async (params, thunkAPI) => {
    try {
      const { idCategory, nameCategory, thumbnail, listBrand } = params;
      const res = await categories
        .putCategoryAdmin(idCategory, nameCategory, thumbnail, listBrand)
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

const deleteCategoryAdminAction = createAsyncThunk(
  "categories/deleteCategoryAdminAction",
  async (params, thunkAPI) => {
    try {
      const { idCategory } = params;

      const res = await categories
        .deleteCategoryAdmin(idCategory)
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

const putOrderCategoryAdminAction = createAsyncThunk(
  "categories/putOrderCategoryAdminAction",
  async (params, thunkAPI) => {
    try {
      const { listCategory } = params;
      const res = await categories
        .putOrderCategoryAdmin(listCategory)
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

export {
  getListCategoryAdminAction,
  postCategoryAdminAction,
  getDetailCategoryAction,
  putCategoryAdminAction,
  deleteCategoryAdminAction,
  putOrderCategoryAdminAction,
};
