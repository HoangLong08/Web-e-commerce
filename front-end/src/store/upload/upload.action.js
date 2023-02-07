import { createAsyncThunk } from "@reduxjs/toolkit";
import uploads from "../../api/uploads";

const uploadMultiImagesAction = createAsyncThunk(
  "uploads/uploadMultiImagesAction",
  async (params, thunkAPI) => {
    try {
      const res = await uploads
        .uploadMultipleImages(params.formData)
        .then((response) => {
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

const uploadSingleImageAction = createAsyncThunk(
  "uploads/uploadSingleImageAction",
  async (params, thunkAPI) => {
    try {
      const res = await uploads
        .uploadSingleImage(params.formData)
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

export { uploadMultiImagesAction, uploadSingleImageAction };
