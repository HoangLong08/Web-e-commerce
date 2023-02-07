import { createAsyncThunk } from "@reduxjs/toolkit";
import payments from "../../api/payment";

const createPaymentIntentAction = createAsyncThunk(
  "payment/createPaymentIntent",
  async (params, thunkAPI) => {
    try {
      const { totalMoneyCart } = params;
      const res = await payments
        .createPaymentIntent(totalMoneyCart)
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

const createOrderByUserIdAction = createAsyncThunk(
  "payment/createOrderByUserIdAction",
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
        totalMoneyCart,
        idPayment,
      } = params;
      const res = await payments
        .createOrderByUserId(
          idUser,
          name,
          phone,
          address,
          note,
          listProduct,
          idCity,
          idDistrict,
          idStreet,
          totalMoneyCart,
          idPayment
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

const updateStatusOrderByOrderIdAction = createAsyncThunk(
  "payment/updateStatusOrderByOrderIdAction",
  async (params, thunkAPI) => {
    try {
      const { idOrder, status } = params;
      const res = await payments
        .updateStatusOrderByOrderId(idOrder, status)
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

const createPaymentOrderAction = createAsyncThunk(
  "payment/createPaymentOrderAction",
  async (params, thunkAPI) => {
    try {
      const { amount, idOrder } = params;
      const res = await payments
        .createPaymentOrder(amount, idOrder)
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

const deleteOrderByOrderIdAction = createAsyncThunk(
  "payment/deleteOrderByOrderIdAction",
  async (params, thunkAPI) => {
    try {
      const { idOrder } = params;
      const res = await payments
        .deleteOrderByOrderId(idOrder)
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
  createPaymentIntentAction,
  updateStatusOrderByOrderIdAction,
  createOrderByUserIdAction,
  deleteOrderByOrderIdAction,
  createPaymentOrderAction,
};
