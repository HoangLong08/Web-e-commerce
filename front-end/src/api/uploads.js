import authHeader from "../configs/authHeader";
import instance from "../configs/axios";

const uploads = {
  uploadMultipleImages(formData) {
    const url = "/api/v1/uploads/admin/multiple";
    return instance.post(url, formData, {
      headers: {
        "content-type": "multipart/form-data",
        "Content-Type": "application/json",
        ...authHeader(),
      },
    });
  },

  uploadSingleImage(formData) {
    const url = "/api/v1/uploads/admin/single";
    return instance.post(url, formData, {
      headers: {
        "content-type": "multipart/form-data",
        "Content-Type": "application/json",
        ...authHeader(),
      },
    });
  },
};

export default uploads;
