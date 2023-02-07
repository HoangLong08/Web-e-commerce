import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Input, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { LogoNoBg } from "assets/index";
import { openNotificationWithIcon, validateInput } from "../../utils";
import { registerUser } from "../../store/auth/auth.action";
import { useTranslation } from "react-i18next";
import "./style.css";

function RegisterUser() {
  const { t } = useTranslation("auth");
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const pathUrl = location && location.pathname;
  const authSlice = useSelector((state) => state.authSlice.infoAccount);
  const [loading, setLoading] = useState(false);
  const [valueForm, setValueForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorForm, setErrorForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (authSlice.idUser && authSlice.accessToken) {
      navigate("/");
    }
  }, [authSlice, navigate]);

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

    const infoFieldusername = validateInput(
      valueForm.username,
      "username",
      0,
      ""
    );

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

    const infoFieldConfirmPassword = validateInput(
      valueForm.confirmPassword,
      "confirm password",
      0,
      ""
    );

    if (!infoFieldusername.isValid) {
      isValid = infoFieldusername.isValid;
      newError.username = infoFieldusername.message;
    }

    if (!infoFieldEmail.isValid) {
      isValid = infoFieldEmail.isValid;
      newError.email = infoFieldEmail.message;
    }

    if (!infoFieldPassword.isValid) {
      isValid = infoFieldPassword.isValid;
      newError.password = infoFieldPassword.message;
    }

    if (!infoFieldConfirmPassword.isValid) {
      isValid = infoFieldConfirmPassword.isValid;
      newError.confirmPassword = infoFieldConfirmPassword.message;
    } else if (valueForm.confirmPassword !== valueForm.password) {
      isValid = false;
      newError.confirmPassword = "Confirm password does not match";
    } else {
      newError.confirmPassword = "";
    }

    if (isValid) {
      const { username, email, password } = valueForm;
      setLoading(true);

      const res = await dispatch(
        registerUser({
          username,
          email,
          password,
        })
      );
      if (res?.payload?.status === "200") {
        openNotificationWithIcon("success", res?.payload?.message);
        navigate("/login");
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
              status={errorForm.username.length > 0 ? "error" : ""}
              size="large"
              placeholder={t("username")}
              allowClear
              onChange={handleChange}
              name="username"
              value={valueForm.username || ""}
            />
            {errorForm.username.length > 0 && (
              <small className="form-error">{t(errorForm.username)}</small>
            )}
          </div>
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
            />
            {errorForm.password.length > 0 && (
              <small className="form-error">{t(errorForm.password)}</small>
            )}
          </div>
          <div className="form-group form-group-width">
            <Input.Password
              status={errorForm.confirmPassword.length > 0 ? "error" : ""}
              size="large"
              placeholder={t("confirm password")}
              allowClear
              onChange={handleChange}
              name="confirmPassword"
              onPaste={(e) => {
                e.preventDefault();
                return false;
              }}
              onCopy={(e) => {
                e.preventDefault();
                return false;
              }}
              value={valueForm.confirmPassword || ""}
            />
            {errorForm.confirmPassword.length > 0 && (
              <small className="form-error">
                {t(errorForm.confirmPassword)}
              </small>
            )}
          </div>
          <div className="wrapper-forgot-password">
            <Button
              type="link"
              onClick={() => {
                navigate("/login");
              }}
            >
              {t("do you already have an account")}
            </Button>
          </div>
          <Button
            type="primary"
            block
            size="large"
            onClick={handleSubmit}
            loading={loading}
          >
            {t("sign up")}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default RegisterUser;
