import { createAsyncThunk } from "@reduxjs/toolkit";
import orders from "../../api/orders";

const addOrderByUserId = createAsyncThunk(
  "orders/addOrderByUserId",
  async (params, thunkAPI) => {
    try {
      const {
        idUser,
        name,
        phone,
        address,
        note,
        listProduct,
        idCity,
        idDistrict,
        idStreet,
      } = params;
      const res = await orders
        .addOrderByUserId(
          idUser,
          name,
          phone,
          address,
          note,
          listProduct,
          idCity,
          idDistrict,
          idStreet
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

const getListOrderAdminAction = createAsyncThunk(
  "orders/getListOrderAdminAction",
  async (params, thunkAPI) => {
    try {
      const { name } = params;
      const res = await orders.getListOrderAdmin(name).then((response) => {
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

const getListOrderByUserIdAction = createAsyncThunk(
  "orders/getListOrderByUserIdAction",
  async (params, thunkAPI) => {
    try {
      const { idUser } = params;
      const res = await orders.getListOrderByUserId(idUser).then((response) => {
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

const getOrderByIdAction = createAsyncThunk(
  "orders/getOrderByIdAction",
  async (params, thunkAPI) => {
    try {
      const { idOrder } = params;
      const res = await orders.getOrderById(idOrder).then((response) => {
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
  addOrderByUserId,
  getListOrderAdminAction,
  getListOrderByUserIdAction,
  getOrderByIdAction,
};
