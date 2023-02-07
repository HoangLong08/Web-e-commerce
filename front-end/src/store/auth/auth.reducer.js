import { createSlice } from "@reduxjs/toolkit";
import {
  loginAdmin,
  loginUser,
  loginUserWithFacebook,
  loginUserWithGoogle,
} from "./auth.action";
import { isEmpty } from "lodash";
const infoAccount = JSON.parse(localStorage.getItem("infoAccount"));

const authSlice = createSlice({
  name: "auth",
  initialState: {
    infoAccount: infoAccount || {},
  },
  reducers: {
    removeAuth: (state, action) => {
      state.infoAccount = action.payload;
      localStorage.setItem("infoAccount", JSON.stringify(action.payload));
    },
  },

  extraReducers: {
    [loginAdmin.pending]: (state) => {
      state.infoAccount = {};
    },
    [loginAdmin.fulfilled]: (state, action) => {
      state.infoAccount = action.payload?.data || "";
      localStorage.setItem(
        "infoAccount",
        JSON.stringify(action.payload?.data || "")
      );
    },
    [loginAdmin.rejected]: (state, action) => {
      state.infoAccount = {};
    },

    // --------------------

    [loginUserWithGoogle.pending]: (state) => {
      state.infoAccount = {};
    },
    [loginUserWithGoogle.fulfilled]: (state, action) => {
      console.log("action.payload?.data: ", action.payload?.data);
      state.infoAccount = action.payload?.data || "";
      localStorage.setItem(
        "infoAccount",
        JSON.stringify(action.payload?.data || "")
      );
    },
    [loginUserWithGoogle.rejected]: (state, action) => {
      state.infoAccount = {};
    },

    // -------------------

    [loginUserWithFacebook.pending]: (state) => {
      state.infoAccount = {};
    },
    [loginUserWithFacebook.fulfilled]: (state, action) => {
      console.log("action.payload?.data: ", action.payload?.data);
      state.infoAccount = action.payload?.data || "";
      localStorage.setItem(
        "infoAccount",
        JSON.stringify(action.payload?.data || "")
      );
    },
    [loginUserWithFacebook.rejected]: (state, action) => {
      state.infoAccount = {};
    },

    // -------------------

    [loginUser.pending]: (state) => {
      state.infoAccount = {};
    },
    [loginUser.fulfilled]: (state, action) => {
      if (!isEmpty(action.payload)) {
        let res = {
          ...action.payload.data,
          accessToken: action.payload.data?.accessToken,
          // refreshToken: action.payload.data?.refreshToken,
        };
        state.infoAccount = res;
        localStorage.setItem("infoAccount", JSON.stringify(res));
      } else {
        state.infoAccount = {};
        localStorage.setItem("infoAccount", JSON.stringify(""));
      }
    },
    [loginUser.rejected]: (state, action) => {
      state.infoAccount = {};
    },
  },
});

export const { removeAuth } = authSlice.actions;

export default authSlice.reducer;
