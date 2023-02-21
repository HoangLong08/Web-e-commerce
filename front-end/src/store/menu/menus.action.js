import { createAsyncThunk } from "@reduxjs/toolkit";
import menus from "../../api/menus";

const getMenuAdminAction = createAsyncThunk(
  "menus/getMenuAdminAction",
  async (params, thunkAPI) => {
    try {
      const res = await menus.getMenuAdmin().then((response) => {
        if (response && response?.data) {
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

export { getMenuAdminAction };
