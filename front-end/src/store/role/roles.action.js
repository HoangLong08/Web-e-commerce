import { createAsyncThunk } from "@reduxjs/toolkit";
import users from "../../api/users";

const getListUserAdminAction = createAsyncThunk(
  "users/getListUserAdminAction",
  async (params, thunkAPI) => {
    try {
      const { name } = params;
      const res = await users.getListUserAdmin(name).then((response) => {
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

export { getListUserAdminAction };
