import { createSlice } from "@reduxjs/toolkit";
import {
  getProductsSpecSimilarAction,
  getProductsRatingSimilarAction,
} from "./rs.action";

const rsSlice = createSlice({
  name: "rs",
  initialState: {
    listProductSpecSimilar: {
      data: [],
      load: false,
      error: "",
    },

    listProductRatingSimilar: {
      data: [],
      load: false,
      error: "",
    },
  },
  reducers: {},

  extraReducers: {
    [getProductsSpecSimilarAction.pending]: (state) => {
      state.listProductSpecSimilar.load = true;
      state.listProductSpecSimilar.data = [];
      state.listProductSpecSimilar.error = "";
    },
    [getProductsSpecSimilarAction.fulfilled]: (state, action) => {
      state.listProductSpecSimilar.load = false;
      state.listProductSpecSimilar.data = action.payload;
      state.listProductSpecSimilar.error = "";
    },
    [getProductsSpecSimilarAction.rejected]: (state, action) => {
      state.listProductSpecSimilar.load = false;
      state.listProductSpecSimilar.error = action.payload.error;
      state.listProductSpecSimilar.data = [];
    },

    // -------------------------------
    [getProductsRatingSimilarAction.pending]: (state) => {
      state.listProductRatingSimilar.load = true;
      state.listProductRatingSimilar.data = [];
      state.listProductRatingSimilar.error = "";
    },
    [getProductsRatingSimilarAction.fulfilled]: (state, action) => {
      state.listProductRatingSimilar.load = false;
      state.listProductRatingSimilar.data = action.payload;
      state.listProductRatingSimilar.error = "";
    },
    [getProductsRatingSimilarAction.rejected]: (state, action) => {
      state.listProductRatingSimilar.load = false;
      state.listProductRatingSimilar.error = action.payload.error;
      state.listProductRatingSimilar.data = [];
    },
  },
});

export default rsSlice.reducer;
