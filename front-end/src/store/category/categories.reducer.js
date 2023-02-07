import { createSlice } from "@reduxjs/toolkit";
import {
  getListCategoryAdminAction,
  getDetailCategoryAction,
} from "./categories.action";

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    listCategoryAdmin: {
      data: [],
      load: false,
      error: "",
    },

    detailCategory: {
      data: {},
      load: false,
      error: "",
    },

    valueFormCategory: {
      name: "",
      listBrand: [],
    },
  },
  reducers: {
    setValueFormCategoryName: (state, action) => {
      state.valueFormCategory.name = action.payload;
    },

    setListBrandByCategory: (state, action) => {
      state.valueFormCategory.listBrand = action.payload;
    },

    setAddBrandByCategoryName: (state, action) => {
      state.valueFormCategory.listBrand = [
        ...state.valueFormCategory.listBrand,
        action.payload,
      ];
    },

    setDeleteBrandByCategoryName: (state, action) => {
      let newArr = [];
      newArr = state.valueFormCategory.listBrand.filter(
        (item, index) => item.id !== action.payload
      );
      state.valueFormCategory.listBrand = newArr;
    },

    setValueBrandByCategoryName: (state, action) => {
      const { nameBrand, id } = action.payload;
      state.valueFormCategory.listBrand = state.valueFormCategory.listBrand.map(
        (item, index) => {
          if (id === item.id) {
            return {
              ...item,
              name: nameBrand,
            };
          }
          return item;
        }
      );
    },
  },

  extraReducers: {
    [getListCategoryAdminAction.pending]: (state) => {
      state.listCategoryAdmin.load = true;
      state.listCategoryAdmin.data = [];
      state.listCategoryAdmin.error = "";
    },
    [getListCategoryAdminAction.fulfilled]: (state, action) => {
      state.listCategoryAdmin.load = false;
      state.listCategoryAdmin.data = action.payload;
      state.listCategoryAdmin.error = "";
    },
    [getListCategoryAdminAction.rejected]: (state, action) => {
      state.listCategoryAdmin.load = false;
      state.listCategoryAdmin.error = action.payload.error;
      state.listCategoryAdmin.data = [];
    },

    // ---------------------------------

    [getDetailCategoryAction.pending]: (state) => {
      state.detailCategory.load = true;
      state.detailCategory.data = {};
      state.detailCategory.error = "";
    },
    [getDetailCategoryAction.fulfilled]: (state, action) => {
      state.detailCategory.load = false;
      state.detailCategory.data = action.payload;
      state.detailCategory.error = "";
    },
    [getDetailCategoryAction.rejected]: (state, action) => {
      state.detailCategory.load = false;
      state.detailCategory.error = action.payload.error;
      state.detailCategory.data = {};
    },
  },
});

export const {
  setValueFormCategoryName,
  setListBrandByCategory,
  setAddBrandByCategoryName,
  setDeleteBrandByCategoryName,
  setValueBrandByCategoryName,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
