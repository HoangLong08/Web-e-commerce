import { createAsyncThunk } from "@reduxjs/toolkit";
import brands from "../../api/brands";

const postListBrandByIdCategoryAdminAction = createAsyncThunk(
  "brand/getListBrandAdminAction",
  async (params, thunkAPI) => {
    try {
      const { idCategory } = params;
      const res = await brands
        .postListBrandByIdCategoryAdmin(idCategory)
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

export { postListBrandByIdCategoryAdminAction };
