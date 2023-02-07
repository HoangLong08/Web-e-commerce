import { openNotificationWithIcon } from "../utils";
import jwt_decode from "jwt-decode";
// import instance from '../configs/axios';
import axios from "axios";
import { isEmpty } from "lodash";
import { rootNavigate } from "App";

const handleError = (error) => {
  if (error) {
    console.log("error of file handle error api");
  } else {
    console.log("error of file handle error api");
  }
};

export const errorException = (error) => {
  const statusCode = error.response?.status || error.message;
  const message = error.response?.data?.message || error.message;
  switch (statusCode) {
    case 400:
      openNotificationWithIcon("error", message);
      break;

    case 401:
      openNotificationWithIcon("error", message);
      if (window.location.href.includes("admin")) {
        localStorage.removeItem("infoAccount");
        rootNavigate("/management/admin/login");
      } else {
        localStorage.removeItem("infoAccount");
        rootNavigate("/login");
      }
      break;

    case 403:
      openNotificationWithIcon("error", message);
      console.log("window.location.href: ", window.location.href);
      if (window.location.href.includes("admin")) {
        setTimeout(async () => {
          const currentDate = new Date();
          const infoAccount = localStorage.getItem("infoAccount");
          const parseInfoAccount = JSON.parse(infoAccount);
          const decodeToken = jwt_decode(parseInfoAccount.accessToken);
          if (decodeToken.exp * 1000 < currentDate.getTime()) {
            try {
              // const res = await axios.post(
              //   process.env.REACT_APP_URL_API +
              //     ":" +
              //     process.env.REACT_APP_PORT_API +
              //     "/auth/refresh",
              //   {
              //     token: parseInfoAccount.refreshToken,
              //   }
              // );
              // if (!isEmpty(res.data)) {
              //   const infoUser = {
              //     email: parseInfoAccount.email,
              //     idUser: parseInfoAccount.idUser,
              //     name: parseInfoAccount.name,
              //     accessToken: res.data.accessToken,
              //     refreshToken: res.data.refreshToken,
              //   };
              //   await localStorage.setItem(
              //     "infoAccount",
              //     JSON.stringify(infoUser)
              //   );
              //   await window.location.reload();
              // }
              localStorage.removeItem("infoAccount");
              rootNavigate("/management/admin/login");
            } catch (error) {
              if (error?.response?.status === 403) {
                localStorage.removeItem("infoAccount");
                rootNavigate("/management/admin/login");
              }
            }
          } else {
            localStorage.removeItem("infoAccount");
            rootNavigate("/management/admin/login");
          }
        }, 500);
      } else {
        localStorage.removeItem("infoAccount");
        rootNavigate("/login");
      }
      break;

    case 404:
      rootNavigate("/404");
      break;

    case 409:
      openNotificationWithIcon("error", message);
      break;

    case 413:
      openNotificationWithIcon("error", message);
      break;

    case 422:
      handleError(error.response?.data);
      break;

    case 500:
      openNotificationWithIcon("error", message || "Lỗi từ server");
      // window.location.href = '/500';
      break;
    case "Network Error":
      openNotificationWithIcon("error", message);
      break;
    case "timeout of 55000ms exceeded":
      openNotificationWithIcon("error", message);
      break;
    default:
      break;
  }

  return Promise.reject(error.response?.data);
};
