import { createSlice } from "@reduxjs/toolkit";
import {
  getListUserAdminAction,
  getDetailUserByUserIdAction,
} from "./users.action";

const userSlice = createSlice({
  name: "users",
  initialState: {
    listUser: {
      data: [],
      load: false,
      error: "",
    },

    detailUser: {
      data: {},
      load: false,
      error: "",
    },
  },
  reducers: {},

  extraReducers: {
    [getListUserAdminAction.pending]: (state) => {
      state.listUser.load = true;
      state.listUser.data = [];
      state.listUser.error = "";
    },
    [getListUserAdminAction.fulfilled]: (state, action) => {
      state.listUser.load = false;
      state.listUser.data = action.payload;
      state.listUser.error = "";
    },
    [getListUserAdminAction.rejected]: (state, action) => {
      state.listUser.load = false;
      state.listUser.error = action.payload.error;
      state.listUser.data = [];
    },

    // -----------------------
    [getDetailUserByUserIdAction.pending]: (state) => {
      state.detailUser.load = true;
      state.detailUser.data = {};
      state.detailUser.error = "";
    },
    [getDetailUserByUserIdAction.fulfilled]: (state, action) => {
      state.detailUser.load = false;
      state.detailUser.data = action.payload;
      state.detailUser.error = "";
    },
    [getDetailUserByUserIdAction.rejected]: (state, action) => {
      state.detailUser.load = false;
      state.detailUser.error = action.payload.error;
      state.detailUser.data = {};
    },
  },
});

export default userSlice.reducer;
