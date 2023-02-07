import { createSlice } from "@reduxjs/toolkit";
import { getDashboardAction } from "./dashboard.action";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    dashboard: {
      data: {},
      load: false,
      error: "",
    },
  },
  reducers: {},

  extraReducers: {
    [getDashboardAction.pending]: (state) => {
      state.dashboard.load = true;
      state.dashboard.data = {};
      state.dashboard.error = "";
    },
    [getDashboardAction.fulfilled]: (state, action) => {
      state.dashboard.load = false;
      state.dashboard.data = action.payload;
      state.dashboard.error = "";
    },
    [getDashboardAction.rejected]: (state, action) => {
      state.dashboard.load = false;
      state.dashboard.error = action.payload.error;
      state.dashboard.data = {};
    },
  },
});

export default dashboardSlice.reducer;
