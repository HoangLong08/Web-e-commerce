import React, { useState } from "react";
import {
  Avatar,
  Button,
  Row,
  Col,
  Select,
  Upload,
  Spin,
  message,
  Typography,
  Space,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../../layouts/FormInput";
import { UserOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { openNotificationWithIcon, validateInput } from "../../utils";
import { isEmpty } from "lodash";
import authHeader from "configs/authHeader";
import {
  getDetailUserByUserIdAction,
  putUpdateAvatarUserByIdAction,
  putUpdateInfoUserByIdAction,
} from "store/user/users.action";
import { useTranslation } from "react-i18next";

const { Option } = Select;
const { Text } = Typography;

function InfoPersonal() {
  const { t } = useTranslation("profile");
  const dispatch = useDispatch();
  const authSlice = useSelector((state) => state.authSlice.infoAccount);
  const detailUser = useSelector((state) => state.usersSlice.detailUser);
  const [thumbnail, setThumbnail] = useState("");

  const [valueForm, setValue] = useState({
    username: "",
    email: "",
    fullName: "",
    phone: "",
    gender: "default",
  });

  const [errorForm, setErrorForm] = useState({
    username: "",
    fullName: "",
    phone: "",
    gender: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getDetailUserByUserIdAction({ idUser: authSlice.idUser }));
  }, [dispatch, authSlice]);

  useEffect(() => {
    setValue({
      username: detailUser.data?.data?.userName,
      email: detailUser.data?.data?.email,
      fullName: detailUser.data?.data?.Profile?.fullName || "",
      phone: detailUser.data?.data?.Profile?.phone || "",
      gender: detailUser.data?.data?.Profile?.gender || "default",
    });
    setThumbnail(detailUser.data?.data?.Profile?.avatar);
  }, [detailUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue({
      ...valueForm,
      [name]: value,
    });
  };

  const props = {
    name: "file",
    action: "http://localhost:5000/api/v1/uploads/admin/single",
    headers: {
      ...authHeader(),
    },
    async onChange(info) {
      if (info.file.status !== "uploading") {
        // console .log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        if (info.file.response?.status === "200") {
          // setThumbnail(info.file.response?.data);
          const updateAvatar = await dispatch(
            putUpdateAvatarUserByIdAction({
              idUser: authSlice.idUser,
              avatar: info.file.response?.data,
            })
          );
          if (updateAvatar?.payload?.status === "200") {
            openNotificationWithIcon("success", "Cập nhật avatar thành công");
            setThumbnail(info.file.response?.data);
          }
        }
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    showUploadList: false,
  };

  const handleSubmit = async () => {
    let isValid = true;
    const newError = {
      username: "",
      fullName: "",
      phone: "",
    };
    const infoFieldUserName = validateInput(
      valueForm.username,
      "username",
      0,
      ""
    );
    const infoFieldFullName = validateInput(
      valueForm.fullName,
      "họ và tên",
      0,
      ""
    );
    const infoFieldPhone = validateInput(
      valueForm.phone,
      "số điện thoại",
      0,
      ""
    );

    if (!infoFieldUserName.isValid) {
      isValid = infoFieldUserName.isValid;
      newError.username = infoFieldUserName.message;
    }

    if (!infoFieldFullName.isValid) {
      isValid = infoFieldFullName.isValid;
      newError.fullName = infoFieldFullName.message;
    }

    if (!infoFieldPhone.isValid) {
      isValid = infoFieldPhone.isValid;
      newError.phone = infoFieldPhone.message;
    }

    if (isValid) {
      setLoading(true);
      const res = await dispatch(
        putUpdateInfoUserByIdAction({
          ...valueForm,
          idUser: authSlice.idUser,
        })
      );

      if (!isEmpty(res.payload)) {
        openNotificationWithIcon("success", "Cập nhập thông tin thành công");
        dispatch(getDetailUserByUserIdAction({ idUser: authSlice.idUser }));
      }
      setErrorForm({ ...newError });
    } else {
      setErrorForm({ ...newError });
    }
    setLoading(false);
  };

  return (
    <>
      <Spin spinning={detailUser.load}>
        <h2 style={{ marginBottom: "12px" }}>{t("personal information")}</h2>
        <div className="box-ad-page">
          <Row gutter={[16, 16]}>
            <Col md={12}>
              <div className="form-group form-group-width">
                <FormInput
                  title={t("username")}
                  htmlFor="username"
                  type=""
                  placeholder={t("username")}
                  name="username"
                  value={valueForm.username || ""}
                  onChange={handleChange}
                  onKeyDown=""
                  className=""
                  error={t(errorForm.username)}
                />
              </div>
              <div className="form-group form-group-width">
                <FormInput
                  title={t("full name")}
                  htmlFor="fullName"
                  type=""
                  placeholder={t("full name")}
                  name="fullName"
                  value={valueForm.fullName || ""}
                  onChange={handleChange}
                  onKeyDown=""
                  className=""
                  error={t(errorForm.fullName)}
                />
              </div>
              <div className="form-group form-group-width">
                <FormInput
                  title="Email"
                  htmlFor="email"
                  type=""
                  placeholder="Email"
                  name="email"
                  value={valueForm.email || ""}
                  onChange={() => {}}
                  onKeyDown=""
                  className=""
                  error={""}
                  disabled
                />
              </div>

              <div className="form-group form-group-width">
                <FormInput
                  title={t("phone")}
                  htmlFor="phone"
                  type=""
                  placeholder={t("phone")}
                  name="phone"
                  value={valueForm.phone || ""}
                  onChange={handleChange}
                  onKeyDown=""
                  className=""
                  error={t(errorForm.phone)}
                />
              </div>
              <FormInput
                title={t("gender")}
                content={
                  <Select
                    style={{
                      width: 220,
                    }}
                    onChange={async (e) => {
                      setValue({
                        ...valueForm,
                        gender: e,
                      });
                    }}
                    name="gender"
                    value={valueForm.gender}
                  >
                    <Option value="default">{t("choose gender")}</Option>
                    <Option value="Nam">{t("male")}</Option>
                    <Option value="Nu">{t("female")}</Option>
                    <Option value="Khac">{t("other")}</Option>
                  </Select>
                }
              />
            </Col>
            <Col md={12} align="center">
              <Avatar
                size={256}
                icon={<UserOutlined />}
                src={thumbnail || ""}
              />
              <Space direction="vertical" style={{ marginTop: "12px" }}>
                <Upload {...props}>
                  <Button type="primary" icon={<UploadOutlined />}>
                    {t("upload avatar")}
                  </Button>
                </Upload>
                <div>
                  <Text type="secondary">
                    Dụng lượng file tối đa 1 MB Định dạng:.JPEG, .PNG
                  </Text>
                </div>
              </Space>
            </Col>
          </Row>

          <div>
            <Button type="primary" loading={loading} onClick={handleSubmit}>
              {t("update")}
            </Button>
          </div>
        </div>
      </Spin>
    </>
  );
}

export default InfoPersonal;
