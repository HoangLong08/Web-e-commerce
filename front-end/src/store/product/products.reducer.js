import { createSlice } from "@reduxjs/toolkit";
import {
  getListProductAction,
  getDetailProductAction,
  getListProductAdminAction,
  getListProductByCategoryIdAction,
  getListProductBySearchAction,
} from "./products.action";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    listProductAdmin: {
      data: [],
      load: false,
      error: "",
    },

    listProduct: {
      data: [],
      load: false,
      error: "",
    },

    detailProduct: {
      data: {},
      load: false,
      error: "",
    },

    listProductByCategoryId: {
      data: [],
      load: false,
      error: "",
    },

    listProductBySearch: {
      data: [],
      load: false,
      error: "",
    },
  },
  reducers: {},

  extraReducers: {
    [getListProductAdminAction.pending]: (state) => {
      state.listProductAdmin.load = true;
      state.listProductAdmin.data = [];
      state.listProductAdmin.error = "";
    },
    [getListProductAdminAction.fulfilled]: (state, action) => {
      state.listProductAdmin.load = false;
      state.listProductAdmin.data = action.payload;
      state.listProductAdmin.error = "";
    },
    [getListProductAdminAction.rejected]: (state, action) => {
      state.listProductAdmin.load = false;
      state.listProductAdmin.error = action.payload.error;
      state.listProductAdmin.data = [];
    },

    // -------------------------------
    [getListProductAction.pending]: (state) => {
      state.listProduct.load = true;
      state.listProduct.data = [];
      state.listProduct.error = "";
    },
    [getListProductAction.fulfilled]: (state, action) => {
      state.listProduct.load = false;
      state.listProduct.data = action.payload;
      state.listProduct.error = "";
    },
    [getListProductAction.rejected]: (state, action) => {
      state.listProduct.load = false;
      state.listProduct.error = action.payload.error;
      state.listProduct.data = [];
    },

    // ---------------------------------

    [getDetailProductAction.pending]: (state) => {
      state.detailProduct.load = true;
      state.detailProduct.data = {};
      state.detailProduct.error = "";
    },
    [getDetailProductAction.fulfilled]: (state, action) => {
      state.detailProduct.load = false;
      state.detailProduct.data = action.payload;
      state.detailProduct.error = "";
    },
    [getDetailProductAction.rejected]: (state, action) => {
      state.detailProduct.load = false;
      state.detailProduct.error = action.payload.error;
      state.detailProduct.data = {};
    },

    // --------------------------------

    [getListProductByCategoryIdAction.pending]: (state) => {
      state.listProductByCategoryId.load = true;
      state.listProductByCategoryId.data = [];
      state.listProductByCategoryId.error = "";
    },
    [getListProductByCategoryIdAction.fulfilled]: (state, action) => {
      state.listProductByCategoryId.load = false;
      state.listProductByCategoryId.data = action.payload;
      state.listProductByCategoryId.error = "";
    },
    [getListProductByCategoryIdAction.rejected]: (state, action) => {
      state.listProductByCategoryId.load = false;
      state.listProductByCategoryId.error = action.payload.error;
      state.listProductByCategoryId.data = [];
    },

    // ----------------------------------
    [getListProductBySearchAction.pending]: (state) => {
      state.listProductBySearch.load = true;
      state.listProductBySearch.data = [];
      state.listProductBySearch.error = "";
    },
    [getListProductBySearchAction.fulfilled]: (state, action) => {
      state.listProductBySearch.load = false;
      state.listProductBySearch.data = action.payload;
      state.listProductBySearch.error = "";
    },
    [getListProductBySearchAction.rejected]: (state, action) => {
      state.listProductBySearch.load = false;
      state.listProductBySearch.error = action.payload.error;
      state.listProductBySearch.data = [];
    },
  },
});

export default productsSlice.reducer;
