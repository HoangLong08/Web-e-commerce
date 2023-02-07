import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Rate, Row, Col, Button, Spin } from "antd";
import ImageMagnifier from "./ImageMagnifier";
import FeaturedProduct from "../Home/FeaturedProduct";
import { formatCash, openNotificationWithIcon } from "utils";
import useBackToTop from "hooks/useBackToTop";
import Evaluate from "./Evaluate";
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

const getQueryParams = (query) =>
  window.location.search
    .replace("?", "")
    .split("&")
    .map((e) => e.split("=").map(decodeURIComponent))
    // eslint-disable-next-line no-sequences
    .reduce((r, [k, v]) => ((r[k] = v), r), {});

function DetailProduct() {
  const dispatch = useDispatch();
  const { t } = useTranslation("detail");
  let navigate = useNavigate();
  const location = useLocation();
  const paramFromUrl = getQueryParams(location.search); // get query params from url

  const detailProductSlice = useSelector(
    (state) => state.productsSlice.detailProduct
  );
  const listProductByCategoryId = useSelector(
    (state) => state.productsSlice.listProductByCategoryId
  );
  const evaluateSlice = useSelector(
    (state) => state.evaluateSlice.listEvaluate
  );

  const [idProduct, setIdProduct] = useState(paramFromUrl.id);
  // const [optionActive, setOptionActive] = useState([]); // save the first option of product
  const [detailProduct, setDetailProduct] = useState({});
  const [thumbnailDetail, setThumbnailDetail] = useState("");

  useBackToTop(idProduct);

  useEffect(() => {
    setIdProduct(paramFromUrl.id);
  }, [paramFromUrl]);

  useEffect(() => {
    dispatch(getDetailProductAction({ idProduct }));
  }, [dispatch, idProduct]);

  useEffect(() => {
    setDetailProduct(detailProductSlice?.data?.data);
    setThumbnailDetail(detailProductSlice?.data?.data?.thumbnail);
    dispatch(
      getListProductByCategoryIdAction({
        idCategory: detailProductSlice?.data?.data?.CategoryId,
      })
    );
  }, [detailProductSlice, dispatch]);

  const createMarkup = (_des) => {
    return { __html: _des };
  };

  const handleAddShoppingCart = async () => {
    const { id, name, price, discount, thumbnail, isDiscount } = detailProduct;

    let infoProduct = {
      id: id,
      name: name,
      price: price,
      thumbnail: thumbnail,
      discount: discount,
      isDiscount: isDiscount,
      location: location?.pathname + location?.search,
    };

    const shoppingCart =
      (await JSON.parse(localStorage.getItem("shoppingCart"))) || [];

    const checkCartExistInCart = await shoppingCart.findIndex(
      (item) => item.id === id
    );
    if (shoppingCart.length === 0) {
      await dispatch(addCart(infoProduct));
    } else {
      if (checkCartExistInCart !== -1) {
        await dispatch(incrementCart(infoProduct));
      } else {
        await dispatch(addCart(infoProduct));
      }
    }
    openNotificationWithIcon("success", "Thêm vào giỏ hàng thành công");
  };

  return (
    <Spin spinning={detailProductSlice.load}>
      {detailProductSlice?.data?.data?.id ? (
        <div className="wrapper-detail-product">
          <div className="detail-product-header">
            <div className="detail-product-name">
              <h1>{detailProduct?.name}</h1>
            </div>
            <div className="detail-product-rate">
              <Rate defaultValue={3} disabled style={{ color: "#f59e0b" }} />
              <p className="detail-product-number-evaluate">
                {evaluateSlice.data?.length} {t("evaluate")}
              </p>
            </div>
          </div>
          <hr className="detail-product-line" />
          <Row gutter={[16, 16]}>
            <Col sm={18}>
              <div className="detail-product-box">
                <Row gutter={[16, 16]}>
                  <Col sm={14}>
                    <div>
                      <div className="detail-product-thumbnail">
                        <ImageMagnifier width={"100%"} src={thumbnailDetail} />
                      </div>
                    </div>
                    <div className="detail-product-list-image-small">
                      {detailProduct?.ImageProducts?.map((item, index) => (
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
                          (detailProduct?.price *
                            (100 - detailProduct?.discount)) /
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
                        <Button block onClick={handleAddShoppingCart}>
                          {t("add to cart")}
                        </Button>
                      </Col>
                      <Col sm={24}>
                        <Button
                          block
                          type="primary"
                          onClick={() => {
                            handleAddShoppingCart();
                            navigate("/cart");
                          }}
                        >
                          {t("Buy now")}
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col sm={6}>
              <div className="box-warranty-info">
                <div className="detail-product-title">
                  {t("product information")}
                </div>
                <p>
                  Máy mới 100% , chính hãng Apple Việt Nam. CellphoneS hiện là
                  đại lý bán lẻ uỷ quyền iPhone chính hãng VN/A của Apple Việt
                  Nam
                </p>
                <p>
                  1 ĐỔI 1 trong 30 ngày nếu có lỗi phần cứng nhà sản xuất. Bảo
                  hành 12 tháng tại trung tâm bảo hành chính hãng
                </p>
              </div>
            </Col>
          </Row>
          <FeaturedProduct
            title={t("similar products")}
            listProduct={listProductByCategoryId?.data?.data?.Products}
            linkAllProduct=""
            category={listProductByCategoryId?.data?.data?.name}
          />
          <Row gutter={[16, 16]}>
            <Col sm={16}>
              <div className="detail-product-box">
                <p className="detail-product-title">
                  {" "}
                  {t("product description")}
                </p>
                {detailProduct?.description?.length > 0 ? (
                  <div
                    className="detail-product-block-content"
                    dangerouslySetInnerHTML={createMarkup(
                      detailProduct?.description
                    )}
                  />
                ) : (
                  <p>{t("updating")}</p>
                )}
              </div>
            </Col>
            <Col sm={8}>
              <div className="detail-product-box">
                <p className="detail-product-title">{t("specifications")}</p>
                <div className="detail-product-technical-content">
                  {detailProduct?.Speciations?.length === 0 && (
                    <p>{t("updating")}</p>
                  )}
                  {detailProduct?.Speciations?.length > 0 &&
                    detailProduct?.Speciations?.map((item, index) => {
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
          <div className="detail-product-box" style={{ marginTop: "16px" }}>
            <Evaluate />
          </div>
        </div>
      ) : (
        <div style={{ height: "100vh" }}></div>
      )}
    </Spin>
  );
}

export default DetailProduct;
