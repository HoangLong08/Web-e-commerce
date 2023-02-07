import { createAsyncThunk } from "@reduxjs/toolkit";
import dashboard from "../../api/dashboard";

const getDashboardAction = createAsyncThunk(
  "dashboard/getDashboardAction",
  async (params, thunkAPI) => {
    try {
      const res = await dashboard.getDashboardAdmin().then((response) => {
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

export { getDashboardAction };
