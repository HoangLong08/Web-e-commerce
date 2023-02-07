import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { LogoNoBg } from "assets/index";
import { openNotificationWithIcon, validateInput } from "utils";
import { forgotPasswordByEmailAction } from "store/auth/auth.action";
import { useTranslation } from "react-i18next";
import "./style.css";

function ForgotPassword() {
  const { t } = useTranslation("auth");
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const pathUrl = location && location.pathname;
  const [loading, setLoading] = useState(false);
  const [valueForm, setValueForm] = useState({
    email: "",
  });
  const [errorForm, setErrorForm] = useState({
    email: "",
  });

  useEffect(() => {}, [pathUrl]);

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
      email: "",
    };
    const regexEmail =
      /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const infoFieldEmail = validateInput(
      valueForm.email,
      "email",
      0,
      regexEmail
    );
    if (!infoFieldEmail.isValid) {
      isValid = infoFieldEmail.isValid;
      newError.email = infoFieldEmail.message;
    }

    if (isValid) {
      const { email } = valueForm;
      setLoading(true);

      const res = await dispatch(forgotPasswordByEmailAction({ email }));

      if (res?.payload?.status === "200") {
        openNotificationWithIcon("success", res?.payload?.message);
        navigate("/login");
      }

      setValueForm({
        email: "",
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

          <div className="wrapper-forgot-password">
            <Button
              type="link"
              onClick={() => {
                navigate("/login");
              }}
            >
              {t("sign up")}
            </Button>
          </div>
          <Button
            type="primary"
            block
            size="large"
            onClick={handleSubmit}
            loading={loading}
          >
            {t("send forgot password")}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
