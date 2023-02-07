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

const putLockAccountAdminAction = createAsyncThunk(
  "users/putLockAccountAdminAction",
  async (params, thunkAPI) => {
    try {
      const { id } = params;
      const res = await users.putLockAccountAdmin(id).then((response) => {
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

const putUnlockAccountAdminAction = createAsyncThunk(
  "users/putUnlockAccountAdminAction",
  async (params, thunkAPI) => {
    try {
      const { id } = params;
      const res = await users.putUnlockAccountAdmin(id).then((response) => {
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

const getDetailUserByUserIdAction = createAsyncThunk(
  "users/getDetailUserByUserIdAction",
  async (params, thunkAPI) => {
    try {
      const { idUser } = params;
      const res = await users.getDetailUserByUserId(idUser).then((response) => {
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

const putUpdateInfoUserByIdAction = createAsyncThunk(
  "users/putUpdateInfoUserByIdAction",
  async (params, thunkAPI) => {
    try {
      const { idUser, username, email, fullName, phone, gender } = params;
      const res = await users
        .putUpdateInfoUserById(idUser, username, email, fullName, phone, gender)
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

const putUpdateAvatarUserByIdAction = createAsyncThunk(
  "users/putUpdateAvatarUserByIdAction",
  async (params, thunkAPI) => {
    try {
      const { idUser, avatar } = params;
      const res = await users
        .putUpdateAvatarUserById(idUser, avatar)
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

const putUpdatePasswordUserByIdAction = createAsyncThunk(
  "users/putUpdatePasswordUserByIdAction",
  async (params, thunkAPI) => {
    try {
      const { idUser, oldPassword, newPassword } = params;
      const res = await users
        .putUpdatePasswordUserById(idUser, oldPassword, newPassword)
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

export {
  getListUserAdminAction,
  putLockAccountAdminAction,
  putUnlockAccountAdminAction,
  getDetailUserByUserIdAction,
  putUpdateInfoUserByIdAction,
  putUpdateAvatarUserByIdAction,
  putUpdatePasswordUserByIdAction,
};
