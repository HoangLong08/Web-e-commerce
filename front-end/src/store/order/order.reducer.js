import { createSlice } from "@reduxjs/toolkit";
import {
  getListOrderAdminAction,
  getListOrderByUserIdAction,
  getOrderByIdAction,
} from "./order.action";

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    listOrderAdmin: {
      data: [],
      load: false,
      error: "",
    },

    listOrderByUserId: {
      data: [],
      load: false,
      error: "",
    },

    detailOrder: {
      data: {},
      load: false,
      error: "",
    },
  },
  reducers: {},

  extraReducers: {
    [getListOrderAdminAction.pending]: (state) => {
      state.listOrderAdmin.load = true;
      state.listOrderAdmin.data = [];
      state.listOrderAdmin.error = "";
    },
    [getListOrderAdminAction.fulfilled]: (state, action) => {
      state.listOrderAdmin.load = false;
      state.listOrderAdmin.data = action.payload;
      state.listOrderAdmin.error = "";
    },
    [getListOrderAdminAction.rejected]: (state, action) => {
      state.listOrderAdmin.load = false;
      state.listOrderAdmin.error = action.payload.error;
      state.listOrderAdmin.data = [];
    },

    // --------------------------------
    [getListOrderByUserIdAction.pending]: (state) => {
      state.listOrderByUserId.load = true;
      state.listOrderByUserId.data = [];
      state.listOrderByUserId.error = "";
    },
    [getListOrderByUserIdAction.fulfilled]: (state, action) => {
      state.listOrderByUserId.load = false;
      state.listOrderByUserId.data = action.payload;
      state.listOrderByUserId.error = "";
    },
    [getListOrderByUserIdAction.rejected]: (state, action) => {
      state.listOrderByUserId.load = false;
      state.listOrderByUserId.error = action.payload.error;
      state.listOrderByUserId.data = [];
    },

    // --------------------------------
    [getOrderByIdAction.pending]: (state) => {
      state.detailOrder.load = true;
      state.detailOrder.data = {};
      state.detailOrder.error = "";
    },
    [getOrderByIdAction.fulfilled]: (state, action) => {
      state.detailOrder.load = false;
      state.detailOrder.data = action.payload;
      state.detailOrder.error = "";
    },
    [getOrderByIdAction.rejected]: (state, action) => {
      state.detailOrder.load = false;
      state.detailOrder.error = action.payload.error;
      state.detailOrder.data = {};
    },
  },
});

export default orderSlice.reducer;
