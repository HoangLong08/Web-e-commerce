import { createSlice } from "@reduxjs/toolkit";
import { postListBrandByIdCategoryAdminAction } from "./brands.action";

const brandSlice = createSlice({
  name: "brand",
  initialState: {
    listBrandByCategoryIdAdmin: {
      data: [],
      load: false,
      error: "",
    },
  },
  reducers: {
    setListBrandByCategoryIdAdmin: (state, action) => {
      state.listBrandByCategoryIdAdmin.data = action.payload;
    },
  },

  extraReducers: {
    [postListBrandByIdCategoryAdminAction.pending]: (state) => {
      state.listBrandByCategoryIdAdmin.load = true;
      state.listBrandByCategoryIdAdmin.data = [];
      state.listBrandByCategoryIdAdmin.error = "";
    },
    [postListBrandByIdCategoryAdminAction.fulfilled]: (state, action) => {
      state.listBrandByCategoryIdAdmin.load = false;
      state.listBrandByCategoryIdAdmin.data = action.payload;
      state.listBrandByCategoryIdAdmin.error = "";
    },
    [postListBrandByIdCategoryAdminAction.rejected]: (state, action) => {
      state.listBrandByCategoryIdAdmin.load = false;
      state.listBrandByCategoryIdAdmin.error = action.payload.error;
      state.listBrandByCategoryIdAdmin.data = [];
    },
  },
});

export const { setListBrandByCategoryIdAdmin } = brandSlice.actions;

export default brandSlice.reducer;
