import { createSlice } from "@reduxjs/toolkit";
import { getListEvaluateByProductIdAction } from "./evaluates.action";

const evaluateSlice = createSlice({
  name: "evaluate",
  initialState: {
    listEvaluate: {
      data: [],
      load: false,
      error: "",
    },
  },
  reducers: {},

  extraReducers: {
    [getListEvaluateByProductIdAction.pending]: (state) => {
      state.listEvaluate.load = true;
      state.listEvaluate.data = [];
      state.listEvaluate.error = "";
    },
    [getListEvaluateByProductIdAction.fulfilled]: (state, action) => {
      state.listEvaluate.load = false;
      state.listEvaluate.data = action.payload;
      state.listEvaluate.error = "";
    },
    [getListEvaluateByProductIdAction.rejected]: (state, action) => {
      state.listEvaluate.load = false;
      state.listEvaluate.error = action.payload.error;
      state.listEvaluate.data = [];
    },
  },
});

export default evaluateSlice.reducer;
