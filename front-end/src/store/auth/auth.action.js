import { createAsyncThunk } from "@reduxjs/toolkit";
import auth from "../../api/auth";

const loginAdmin = createAsyncThunk(
  "auth/loginAdmin",
  async (params, thunkAPI) => {
    try {
      const { email, password } = params;
      const res = await auth.loginAdmin(email, password).then((response) => {
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

const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (params, thunkAPI) => {
    try {
      const { email, password } = params;
      const res = await auth.loginUser(email, password).then((response) => {
        if (response && response?.data) {
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

const loginUserWithGoogle = createAsyncThunk(
  "auth/loginUserWithGoogle",
  async (params, thunkAPI) => {
    try {
      const { email, username, avatar } = params;
      const res = await auth
        .loginUserWithGoogle(email, username, avatar)
        .then((response) => {
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

const loginUserWithFacebook = createAsyncThunk(
  "auth/loginUserWithFacebook",
  async (params, thunkAPI) => {
    try {
      const { email, username, avatar } = params;
      const res = await auth
        .loginUserWithFacebook(email, username, avatar)
        .then((response) => {
          console.log("response: ", response);
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

const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (params, thunkAPI) => {
    try {
      const { username, email, password } = params;
      const res = await auth
        .registerUser(username, email, password)
        .then((response) => {
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

const forgotPasswordByEmailAction = createAsyncThunk(
  "auth/forgotPasswordByEmailAction",
  async (params, thunkAPI) => {
    try {
      const { email } = params;
      const res = await auth.forgotPasswordByEmail(email).then((response) => {
        if (response && response?.data) {
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

export {
  loginAdmin,
  loginUser,
  loginUserWithGoogle,
  loginUserWithFacebook,
  registerUser,
  forgotPasswordByEmailAction,
};
