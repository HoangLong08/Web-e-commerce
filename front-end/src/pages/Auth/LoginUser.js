import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Input, Button, Divider, Space, Row } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { LogoNoBg } from "assets/index";
import { openNotificationWithIcon, validateInput } from "utils";
import { useTranslation } from "react-i18next";
import {
  loginUser,
  loginUserWithFacebook,
  loginUserWithGoogle,
} from "store/auth/auth.action";
import { LoginSocialGoogle, LoginSocialFacebook } from "reactjs-social-login";
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import "./style.css";

// https://console.cloud.google.com/
function Login() {
  const { t } = useTranslation("auth");
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const pathUrl = location && location.pathname;
  const authSlice = useSelector((state) => state.authSlice.infoAccount);
  const [loading, setLoading] = useState(false);
  const [valueForm, setValueForm] = useState({
    email: "",
    password: "",
  });
  const [errorForm, setErrorForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (authSlice.idUser && authSlice.accessToken) {
      navigate("/");
    }
  }, [authSlice, navigate]);

  const onLoginStart = useCallback(() => {}, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValueForm({
      ...valueForm,
      [name]: value.trim(),
    });
  };

  const handleSubmit = async () => {
    let isValid = true;
    const newError = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    const regexEmail =
      /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const infoFieldEmail = validateInput(
      valueForm.email,
      "email",
      0,
      regexEmail
    );
    let infoFieldPassword = validateInput(
      valueForm.password,
      "password",
      0,
      ""
    );
    if (!infoFieldEmail.isValid) {
      isValid = infoFieldEmail.isValid;
      newError.email = infoFieldEmail.message;
    }

    if (!infoFieldPassword.isValid) {
      isValid = infoFieldPassword.isValid;
      newError.password = infoFieldPassword.message;
    }

    if (isValid) {
      const { email, password } = valueForm;
      setLoading(true);

      const res = await dispatch(loginUser({ email, password }));

      if (res?.payload?.status === "200") {
        openNotificationWithIcon("success", res?.payload?.message);
        if (location.state) {
          navigate(location.state?.url);
        } else {
          navigate("/");
        }
      }

      setValueForm({
        email: "",
        password: "",
      });
      setLoading(false);
    }
    setErrorForm({ ...newError });
  };

  return (
    <div className="container wrapper-auth">
      <div className="content-auth">
        <div className="auth-header">
          <Link to="/">
            <img className="image-logo" src={LogoNoBg} alt="tech store" />
          </Link>
          <p>{t("welcome to website")}</p>
        </div>
        <div className="auth-content">
          <div className="form-group form-group-width">
            <Input
              status={errorForm.email.length > 0 ? "error" : ""}
              size="large"
              placeholder="Email"
              allowClear
              onChange={handleChange}
              name="email"
              value={valueForm.email || ""}
            />
            {errorForm.email.length > 0 && (
              <small className="form-error">{t(errorForm.email)}</small>
            )}
          </div>
          <div className="form-group form-group-width">
            <Input.Password
              status={errorForm.password.length > 0 ? "error" : ""}
              size="large"
              placeholder={t("password")}
              allowClear
              onChange={handleChange}
              name="password"
              value={valueForm.password || ""}
              onPaste={(e) => {
                e.preventDefault();
                return false;
              }}
              onCopy={(e) => {
                e.preventDefault();
                return false;
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
            />
            {errorForm.password.length > 0 && (
              <small className="form-error">{t(errorForm.password)}</small>
            )}
          </div>
          <div className="wrapper-forgot-password">
            <Button
              type="link"
              onClick={() => {
                navigate("/register");
              }}
            >
              {t("sign up")}
            </Button>
            <Button
              type="link"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              {t("forgot password")}
            </Button>
          </div>
          <Button
            type="primary"
            block
            size="large"
            onClick={handleSubmit}
            loading={loading}
          >
            {t("log in")}
          </Button>
          <Divider plain>Or</Divider>
          <Row justify="center">
            <Space direction="vertical" style={{ width: "100%" }}>
              <LoginSocialGoogle
                client_id={
                  process.env.GOOGLE_CLIENT_ID ||
                  "708908431948-oktcodlfimvj784cst1f6rf0dponelma.apps.googleusercontent.com"
                }
                onLoginStart={onLoginStart}
                // redirect_uri={"http://localhost:3000"}
                scope="openid profile email"
                discoveryDocs="claims_supported"
                access_type="offline"
                onResolve={async ({ provider, data }) => {
                  const { email, name, picture } = data;
                  const res = await dispatch(
                    loginUserWithGoogle({
                      email,
                      username: name,
                      avatar: picture,
                    })
                  );
                  if (res?.payload?.status === "200") {
                    openNotificationWithIcon("success", res?.payload?.message);
                    if (location.state) {
                      navigate(location.state?.url);
                    } else {
                      navigate("/");
                    }
                  }
                }}
                onReject={(err) => {
                  openNotificationWithIcon("error", err || "Lỗi");
                }}
                className="custom-login-icon"
              >
                <GoogleLoginButton>
                  <span>{t("login with google")}</span>
                </GoogleLoginButton>
              </LoginSocialGoogle>
              <LoginSocialFacebook
                appId={process.env.FACEBOOK_APP_ID || 3368507550054791}
                fieldsProfile={
                  "id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender"
                }
                onLoginStart={onLoginStart}
                // redirect_uri={"http://localhost:3000"}
                onResolve={async ({ provider, data }) => {
                  // console.log("provider, data: ", provider, data);
                  const { email, name, picture } = data;
                  const res = await dispatch(
                    loginUserWithFacebook({
                      email,
                      username: name,
                      avatar: picture.data?.url,
                    })
                  );
                  if (res?.payload?.status === "200") {
                    openNotificationWithIcon("success", res?.payload?.message);
                    if (location.state) {
                      navigate(location.state?.url);
                    } else {
                      navigate("/");
                    }
                  }
                }}
                onReject={(err) => {
                  openNotificationWithIcon("error", err || "Lỗi");
                }}
                className="custom-login-icon custom-login-icon-facebook"
              >
                <FacebookLoginButton>
                  <span>{t("login with facebook")}</span>
                </FacebookLoginButton>
              </LoginSocialFacebook>
            </Space>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default Login;
