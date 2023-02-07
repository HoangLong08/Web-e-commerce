import { Button } from "antd";
import React from "react";
import { useState } from "react";
import { validateInput } from "utils/validateInput";
import FormInput from "../../layouts/FormInput";
import { isEmpty } from "lodash";
import openNotificationWithIcon from "utils/notification";
import { useDispatch, useSelector } from "react-redux";
import { putUpdatePasswordUserByIdAction } from "store/user/users.action";
import { useTranslation } from "react-i18next";

function ChangePassword() {
  const { t } = useTranslation("profile");
  const dispatch = useDispatch();
  const authSlice = useSelector((state) => state.authSlice.infoAccount);

  const [loading, setLoading] = useState();
  const [valueForm, setValue] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errorForm, setErrorForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue({
      ...valueForm,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    let isValid = true;
    const newError = {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    };
    const infoFieldOldPassword = validateInput(
      valueForm.oldPassword,
      "old password",
      0,
      ""
    );
    const infoFieldNewPassword = validateInput(
      valueForm.oldPassword,
      "new password",
      0,
      ""
    );
    const infoFieldConfirmPassword = validateInput(
      valueForm.oldPassword,
      "confirm password",
      0,
      ""
    );

    if (!infoFieldOldPassword.isValid) {
      isValid = infoFieldOldPassword.isValid;
      newError.oldPassword = infoFieldOldPassword.message;
    }

    if (!infoFieldNewPassword.isValid) {
      isValid = infoFieldNewPassword.isValid;
      newError.newPassword = infoFieldNewPassword.message;
    }

    if (!infoFieldConfirmPassword.isValid) {
      isValid = infoFieldConfirmPassword.isValid;
      newError.confirmPassword = infoFieldConfirmPassword.message;
    }

    if (isValid) {
      setLoading(true);
      const res = await dispatch(
        putUpdatePasswordUserByIdAction({
          idUser: authSlice.idUser,
          oldPassword: valueForm.oldPassword,
          newPassword: valueForm.newPassword,
        })
      );
      if (!isEmpty(res.payload)) {
        openNotificationWithIcon("success", "Cập nhập mật khẩu thành công");
        setValue({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
      setErrorForm({ ...newError });
    } else {
      setErrorForm({ ...newError });
    }
    setLoading(false);
  };

  return (
    <>
      <h2 style={{ marginBottom: "12px" }}>Thay đổi mật khẩu</h2>
      <div className="box-ad-page">
        <div className="form-group form-group-width">
          <FormInput
            title={t("old password")}
            htmlFor="oldPassword"
            type="password"
            placeholder={t("old password")}
            name="oldPassword"
            value={valueForm.oldPassword}
            onChange={handleChange}
            onKeyDown=""
            className=""
            error={t(errorForm.oldPassword)}
          />
        </div>
        <div className="form-group form-group-width">
          <FormInput
            title={t("new password")}
            htmlFor="newPassword"
            type="password"
            placeholder={t("new password")}
            name="newPassword"
            value={valueForm.newPassword}
            onChange={handleChange}
            onKeyDown=""
            className=""
            error={t(errorForm.newPassword)}
          />
        </div>
        <div className="form-group form-group-width">
          <FormInput
            title={t("confirm password")}
            htmlFor="confirmPassword"
            type="password"
            placeholder={t("confirm password")}
            name="confirmPassword"
            value={valueForm.confirmPassword}
            onChange={handleChange}
            onKeyDown=""
            className=""
            error={t(errorForm.confirmPassword)}
          />
        </div>
        <div>
          <Button type="primary" loading={loading} onClick={handleSubmit}>
            {t("update")}
          </Button>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
