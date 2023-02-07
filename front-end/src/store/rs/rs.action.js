import { createAsyncThunk } from "@reduxjs/toolkit";
import rs from "../../api/rs";

const getProductsSpecSimilarAction = createAsyncThunk(
  "rs/getProductsSpecSimilarAction",
  async (params, thunkAPI) => {
    const { specs, idProduct } = params;
    try {
      const res = await rs
        .getProductsSpecSimilar(specs, idProduct)
        .then((response) => {
          if (response) {
            return response?.data;
          }
          return [];
        });
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const getProductsRatingSimilarAction = createAsyncThunk(
  "rs/getProductsRatingSimilarAction",
  async (params, thunkAPI) => {
    const { idUser } = params;
    try {
      const res = await rs.getProductsRatingSimilar(idUser).then((response) => {
        if (response) {
          return response?.data;
        }
        return [];
      });
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export { getProductsSpecSimilarAction, getProductsRatingSimilarAction };
