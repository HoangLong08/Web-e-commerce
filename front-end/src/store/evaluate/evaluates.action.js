import { createAsyncThunk } from "@reduxjs/toolkit";
import evaluates from "../../api/evaluates";

const getListEvaluateByProductIdAction = createAsyncThunk(
  "evaluates/getListEvaluateByProductIdAction",
  async (params, thunkAPI) => {
    try {
      const { idProduct } = params;
      const res = await evaluates
        .getListEvaluateByProductId(idProduct)
        .then((response) => {
          if (response) {
            return response?.data;
          }
          return {};
        });
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const postEvaluateByProductIdAction = createAsyncThunk(
  "evaluates/postEvaluateByProductIdAction",
  async (params, thunkAPI) => {
    try {
      const { idUser, idProduct, content, rating } = params;
      const res = await evaluates
        .postEvaluateByProductId(idUser, idProduct, content, rating)
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

export { postEvaluateByProductIdAction, getListEvaluateByProductIdAction };
