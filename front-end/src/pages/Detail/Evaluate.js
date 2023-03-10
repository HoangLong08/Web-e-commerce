import {
  Button,
  Col,
  Modal,
  Progress,
  Rate,
  Row,
  Input,
  Spin,
  Space,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  getListEvaluateByProductIdAction,
  postEvaluateByProductIdAction,
} from "store/evaluate/evaluates.action";
import { useTranslation } from "react-i18next";
import FormInput from "layouts/FormInput";
import { openNotificationWithIcon, validateInput } from "utils";

const { TextArea } = Input;

const getQueryParams = (query) =>
  window.location.search
    .replace("?", "")
    .split("&")
    .map((e) => e.split("=").map(decodeURIComponent))
    // eslint-disable-next-line no-sequences
    .reduce((r, [k, v]) => ((r[k] = v), r), {});

const sharpen = (num) => {
  const rem = num % 1;
  if (rem < 0.5) {
    return Math.ceil(num / 0.5) * 0.5;
  } else {
    return Math.floor(num / 0.5) * 0.5;
  }
};

function Evaluate() {
  const { t } = useTranslation("detail");
  const location = useLocation();
  // console.log("location.search: ", location, location.search);
  const paramFromUrl = getQueryParams(location.search);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const evaluateSlice = useSelector(
    (state) => state.evaluateSlice.listEvaluate
  );

  const authSlice = useSelector((state) => state.authSlice.infoAccount);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [idProduct, setIdProduct] = useState(paramFromUrl.id);
  const [loading, setLoading] = useState(false);
  const [sum, setSum] = useState({
    counts: {},
    sumComment: 0,
    avgComment: 0,
  });
  const [valueForm, setValueForm] = useState({
    content: "",
    numberStars: 0,
  });
  const [errorForm, setErrorForm] = useState({
    content: "",
    numberStars: 0,
  });

  useEffect(() => {
    dispatch(getListEvaluateByProductIdAction({ idProduct }));
  }, [dispatch, idProduct]);

  useEffect(() => {
    setIdProduct(paramFromUrl.id);
  }, [paramFromUrl]);

  useEffect(() => {
    var counts = {};
    for (var i = 0; i < evaluateSlice?.data?.length; i++) {
      var num = evaluateSlice?.data?.[i];
      counts[num?.rating] = counts[num?.rating] ? counts[num?.rating] + 1 : 1;
    }

    setSum({
      counts: counts,
      sumComment:
        parseInt(counts[5] !== undefined ? counts[5] : 0) +
        parseInt(counts[4] !== undefined ? counts[4] : 0) +
        parseInt(counts[3] !== undefined ? counts[3] : 0) +
        parseInt(counts[2] !== undefined ? counts[2] : 0) +
        parseInt(counts[1] !== undefined ? counts[1] : 0),
      avgComment:
        parseInt(counts[5] !== undefined ? counts[5] : 0) * 5 +
        parseInt(counts[4] !== undefined ? counts[4] : 0) * 4 +
        parseInt(counts[3] !== undefined ? counts[3] : 0) * 3 +
        parseInt(counts[2] !== undefined ? counts[2] : 0) * 2 +
        parseInt(counts[1] !== undefined ? counts[1] : 0),
    });
  }, [evaluateSlice?.data]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleChange = (e) => {
    if (typeof e === "number") {
      setValueForm({
        ...valueForm,
        numberStars: e,
      });
    } else {
      const { name, value } = e?.target;
      setValueForm({
        ...valueForm,
        [name]: value,
      });
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getFirstWord = (str) => {
    var splitStr = str?.toLowerCase().split(" ");
    for (var i = 0; i < splitStr?.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase();
    }
    return splitStr?.join("");
  };

  const handleOk = async () => {
    let isValid = true;
    const newError = {
      content: "",
      numberStars: 0,
    };
    const infoFieldContent = validateInput(
      valueForm.content,
      "n???i dung",
      0,
      ""
    );
    if (valueForm.numberStars === 0) {
      isValid = false;
      newError.numberStars = "Vui l??ng ch???n s??? sao ????? ????nh gi??";
    } else {
      newError.numberStars = "";
    }

    if (!infoFieldContent.isValid) {
      isValid = infoFieldContent.isValid;
      newError.content = infoFieldContent.message;
    }
    if (isValid) {
      const { content, numberStars } = valueForm;
      await setLoading(true);
      const res = await dispatch(
        postEvaluateByProductIdAction({
          idUser: authSlice.idUser,
          idProduct: idProduct,
          content: content,
          rating: numberStars,
        })
      );
      if (res?.payload?.status === "200") {
        openNotificationWithIcon("success", "????nh gi?? th??nh c??ng");
        dispatch(getListEvaluateByProductIdAction({ idProduct }));
        setValueForm({
          content: "",
          numberStars: 0,
        });
        setIsModalVisible(false);
      }
      await setLoading(false);
    }
    setErrorForm({ ...newError });
  };

  return (
    <Spin spinning={false}>
      <Row gutter={[16, 16]}>
        <Col md={8} xs={12} span={8}>
          <div style={{ textAlign: "center" }}>
            <p className="small-para">{t("average rating")}</p>
            <h1 style={{ fontSize: "32px" }}>
              {sum.sumComment !== 0
                ? (sum.avgComment / sum.sumComment)?.toFixed(1)
                : 5}
              /5
            </h1>
            <Rate
              disabled
              allowHalf
              // defaultValue={5}
              value={sharpen(
                sum.sumComment !== 0
                  ? (sum.avgComment / sum.sumComment)?.toFixed(1)
                  : 5
              )}
            />
          </div>
        </Col>
        <Col md={8} xs={12} span={8}>
          <div style={{ textAlign: "center" }}>
            {[5, 4, 3, 2, 1].map((item, index) => {
              return (
                <div className="row-star" key={`row-stars-` + index}>
                  <span className="number-comment">{item}</span>
                  <Rate disabled defaultValue={1} count={1} />
                  <Progress
                    percent={
                      sum.counts[item] !== undefined
                        ? (sum.counts[item] / sum.sumComment) * 100
                        : 0
                    }
                    showInfo={false}
                  />
                  <span className="number-comment">
                    {sum.counts[item] !== undefined ? sum.counts[item] : 0}
                  </span>
                </div>
              );
            })}
          </div>
        </Col>
        <Col md={8} xs={24} span={8}>
          <div style={{ textAlign: "center" }}>
            <p className="small-para">{t("have you used this product?")}</p>
            <Button type="primary" onClick={showModal}>
              {t("evaluate")}
            </Button>
          </div>
        </Col>
      </Row>
      <div className="wrap-render-list-comment">
        <Space style={{ marginBottom: "24px" }}>
          <p className="text-comment"> {t("comment")}</p>
          <Button type="primary" ghost>
            {t("all")}
          </Button>
          {[5, 4, 3, 2, 1, "with images"].map((item, index) => (
            <Button key={`a-` + item}>
              {t(item)} {item !== "with images" ? t("star") : ""}{" "}
              {`(${sum.counts[item] !== undefined ? sum.counts[item] : 0})`}
            </Button>
          ))}
        </Space>
        {evaluateSlice?.data?.map((item, index) => (
          <div className="comment" key={"item-comment-" + index}>
            <div className="comment-avatar">
              {getFirstWord(item?.User?.userName)}
            </div>
            <div className="comment-content">
              <div className="comment-name">{item?.User?.userName}</div>
              <div className="comment-star">
                <Rate disabled defaultValue={item.rating} allowHalf />
                <span className="comment-time">
                  {new Date(item.updatedAt).toLocaleString()}
                </span>
              </div>
              <div className="comment-text">{item.content}</div>
            </div>
          </div>
        ))}
      </div>
      <Modal
        title="Nh???n x??t s???n ph???m"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            H???y
          </Button>,
          authSlice?.accessToken && (
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={handleOk}
            >
              ????nh gi??
            </Button>
          ),
        ]}
      >
        {authSlice?.accessToken ? (
          <>
            <div className="evaluate-star">
              <span>Ch???n ????nh gi?? c???a b???n </span>
              <Rate
                defaultValue={0}
                value={valueForm.numberStars}
                onChange={handleChange}
                name="stars"
              />
              {errorForm.numberStars?.length > 0 && (
                <div>
                  <small className="form-error">{errorForm.numberStars}</small>
                </div>
              )}
            </div>
            <FormInput
              title="????nh gi?? chi ti???t"
              htmlFor="detailEvaluate"
              content={
                <TextArea
                  rows={4}
                  placeholder="M???i s???n ph???m ?????u c?? ??u / nh?????c ri??ng. Chia s??? chi ti???t cho m???i ng?????i v??? s???n ph???m nh??"
                  onChange={handleChange}
                  name="content"
                  value={valueForm.content}
                />
              }
              error={errorForm.content}
            />
          </>
        ) : (
          <Button
            onClick={() =>
              navigate("/login", {
                state: {
                  url: location.pathname + location.search,
                },
              })
            }
          >
            ????ng nh???p
          </Button>
        )}
      </Modal>
    </Spin>
  );
}

export default Evaluate;
