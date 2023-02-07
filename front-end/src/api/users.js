import authHeader from "../configs/authHeader";
import instance from "../configs/axios";

const categories = {
  // admin
  getListUserAdmin(name) {
    const url = "/api/v1/users/admin" + "?name=" + name;
    return instance.get(url, { headers: authHeader() });
  },

  putLockAccountAdmin(id) {
    const url = "/api/v1/users/admin/lock";
    return instance.put(url, { id }, { headers: authHeader() });
  },

  putUnlockAccountAdmin(id) {
    const url = "/api/v1/users/admin/unlock";
    return instance.put(url, { id }, { headers: authHeader() });
  },

  getDetailUserByUserId(id) {
    const url = "/api/v1/users/" + id;
    return instance.get(url, { headers: authHeader() });
  },

  putUpdateInfoUserById(idUser, username, email, fullName, phone, gender) {
    const url = "/api/v1/users";
    return instance.put(
      url,
      { idUser, username, email, fullName, phone, gender },
      { headers: authHeader() }
    );
  },

  putUpdateAvatarUserById(idUser, avatar) {
    const url = "/api/v1/users/avatar";
    return instance.put(url, { idUser, avatar }, { headers: authHeader() });
  },

  putUpdatePasswordUserById(idUser, oldPassword, newPassword) {
    const url = "/api/v1/users/change-password";
    return instance.put(
      url,
      { idUser, oldPassword, newPassword },
      { headers: authHeader() }
    );
  },
};

export default categories;
