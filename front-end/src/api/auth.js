import instance from "../configs/axios";

const auth = {
  loginUser(email, password) {
    const url = "/api/v1/auth/login";
    return instance.post(url, {
      email,
      password,
    });
  },

  loginUserWithGoogle(email, username, avatar) {
    const url = "/api/v1/auth/login-with-google";
    return instance.post(url, { email, username, avatar });
  },

  loginUserWithFacebook(email, username, avatar) {
    const url = "/api/v1/auth/login-with-facebook";
    return instance.post(url, { email, username, avatar });
  },

  registerUser(username, email, password) {
    const url = "/api/v1/auth/register";
    return instance.post(url, {
      username,
      email,
      password,
    });
  },

  loginAdmin(email, password) {
    const url = "/api/v1/auth/admin/login";
    return instance.post(url, {
      email: email,
      password: password,
    });
  },

  forgotPasswordByEmail(email) {
    const url = "/api/v1/auth/forgot-password";
    return instance.post(url, {
      email: email,
    });
  },
};

export default auth;
