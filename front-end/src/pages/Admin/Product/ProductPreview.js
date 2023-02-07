import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Rate, Row, Col, Button, Spin } from "antd";
import ImageMagnifier from "./ImageMagnifier";
import { formatCash, openNotificationWithIcon } from "utils";
import {
  getDetailProductAction,
  getListProductByCategoryIdAction,
} from "store/product/products.action";
import { useTranslation } from "react-i18next";
import {
  addCart,
  incrementCart,
} from "store/shoppingCart/shoppingCart.reducer";
import "./style.css";

function ProductPreview({ dataSource }) {
  const dispatch = useDispatch();
  const { t } = useTranslation("detail");
  let navigate = useNavigate();
  console.log("dataSource: ", dataSource);
  const detailProductSlice = dataSource;
  const listProductByCategoryId = useSelector(
    (state) => state.productsSlice.listProductByCategoryId
  );
  const evaluateSlice = useSelector(
    (state) => state.evaluateSlice.listEvaluate
  );

  // const [optionActive, setOptionActive] = useState([]); // save the first option of product
  const [detailProduct, setDetailProduct] = useState({});
  const [thumbnailDetail, setThumbnailDetail] = useState("");

  useEffect(() => {
    setDetailProduct(dataSource);
    setThumbnailDetail(dataSource.thumbnail);
  }, [detailProductSlice, dispatch]);

  const createMarkup = (_des) => {
    return { __html: _des };
  };

  return (
    <div className="wrapper-detail-product">
      <div className="detail-product-header">
        <div className="detail-product-name">
          <h1>{detailProduct?.name}</h1>
        </div>
        <div className="detail-product-rate">
          <Rate defaultValue={3} disabled style={{ color: "#f59e0b" }} />
        </div>
      </div>
      <hr className="detail-product-line" />
      <Row gutter={[16, 16]}>
        <Col sm={24}>
          <div className="detail-product-box">
            <Row gutter={[16, 16]}>
              <Col sm={14}>
                <div>
                  <div className="detail-product-thumbnail">
                    <ImageMagnifier width={"100%"} src={thumbnailDetail} />
                  </div>
                </div>
                <div className="detail-product-list-image-small">
                  {detailProduct?.images?.map((item, index) => (
                    <div
                      className="detail-product-image-small"
                      key={"item-detail-product-image-" + index}
                      onClick={() => {
                        setThumbnailDetail(item.url);
                      }}
                    >
                      <img src={item.url} alt="" />
                    </div>
                  ))}
                </div>
              </Col>
              <Col sm={10}>
                <div className="detail-product-price">
                  <p className="detail-product-price-show">
                    {formatCash(
                      (detailProduct?.price * (100 - detailProduct?.discount)) /
                        100
                    )}
                  </p>
                  {detailProduct?.isDiscount === 1 ? (
                    <p className="detail-product-price-through">
                      {formatCash(detailProduct?.price)}
                    </p>
                  ) : (
                    <></>
                  )}
                </div>

                <Row gutter={[16, 16]}>
                  <Col sm={24}>
                    <Button block>{t("add to cart")}</Button>
                  </Col>
                  <Col sm={24}>
                    <Button block type="primary">
                      {t("Buy now")}
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col sm={16}>
          <div className="detail-product-box">
            <p className="detail-product-title"> {t("product description")}</p>
            {detailProduct?.description?.length > 0 ? (
              <div
                className="detail-product-block-content"
                dangerouslySetInnerHTML={createMarkup(
                  detailProduct?.description
                )}
              />
            ) : (
              <p>{t("Chưa có thông tin")}</p>
            )}
          </div>
        </Col>
        <Col sm={8}>
          <div className="detail-product-box">
            <p className="detail-product-title">{t("specifications")}</p>
            <div className="detail-product-technical-content">
              {detailProduct?.specifications?.length === 0 && (
                <p>{t("Chưa có thông tin")}</p>
              )}
              {detailProduct?.specifications?.length > 0 &&
                detailProduct?.specifications?.map((item, index) => {
                  return (
                    <div
                      className="technical-content-item"
                      key={"item-specifications-" + index}
                    >
                      <p className="technical-content-item-label">
                        {item.label}
                      </p>
                      <p className="technical-content-item-value">
                        {item.value}
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ProductPreview;
