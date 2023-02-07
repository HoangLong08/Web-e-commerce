import { createSlice } from "@reduxjs/toolkit";
import { getListUserAdminAction } from "./roles.action";

const userSlice = createSlice({
  name: "users",
  initialState: {
    listRole: {
      data: [],
      load: false,
      error: "",
    },
  },
  reducers: {},

  extraReducers: {
    [getListUserAdminAction.pending]: (state) => {
      state.listRole.load = true;
      state.listRole.data = [];
      state.listRole.error = "";
    },
    [getListUserAdminAction.fulfilled]: (state, action) => {
      state.listRole.load = false;
      state.listRole.data = action.payload;
      state.listRole.error = "";
    },
    [getListUserAdminAction.rejected]: (state, action) => {
      state.listRole.load = false;
      state.listRole.error = action.payload.error;
      state.listRole.data = [];
    },
  },
});

export default userSlice.reducer;
