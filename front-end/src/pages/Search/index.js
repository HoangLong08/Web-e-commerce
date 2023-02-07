import {
  Col,
  InputNumber,
  Row,
  Slider,
  Space,
  Checkbox,
  Spin,
  Empty,
  Pagination,
} from "antd";
import useBackToTop from "hooks/useBackToTop";
import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, createSearchParams } from "react-router-dom";
import { getListProductBySearchAction } from "store/product/products.action";
import removeVietnameseTones from "utils/removeVietnameseTones";
import CartProduct from "../../layouts/CartProduct";
import { formatCash } from "../../utils";
import "./style.css";

const getQueryParams = (query) =>
  window.location.search
    .replace("?", "")
    .split("&")
    .map((e) => e.split("=").map(decodeURIComponent))
    // eslint-disable-next-line no-sequences
    .reduce((r, [k, v]) => ((r[k] = v), r), {});

const limit = 20;
const maxPrice = 99000000;

function SearchPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  //?keyword=wer
  const listProductBySearch = useSelector(
    (state) => state.productsSlice.listProductBySearch
  );
  const formatter = (value) => `${formatCash(value)}`;

  const [brands, setBrands] = useState([]);
  const [priceValue, setPriceValue] = useState({
    priceGte: 0,
    priceLte: maxPrice,
  });
  const [page, setPage] = useState(1);
  const [paramUrl, setParamUrl] = useState({});
  const [isCheckedPrice, setIsCheckedPrice] = useState({
    type: "",
  });

  useBackToTop(location.search);
  useEffect(() => {
    if (!isEmpty(location.search)) {
      const paramFromUrl = getQueryParams(location.search);
      setBrands(paramFromUrl?.brands?.split(",") || []);
      setPriceValue({
        priceGte: paramFromUrl.priceGte || 0,
        priceLte: paramFromUrl.priceLte || maxPrice,
      });
      setIsCheckedPrice({
        type: paramFromUrl?.order,
      });
      setPage(paramFromUrl.page || 1);
      dispatch(getListProductBySearchAction({ queryString: location.search }));
      setParamUrl(paramFromUrl);
    } else {
      // navigate("/404");
      dispatch(getListProductBySearchAction({ queryString: "" }));
    }
  }, [location.search, navigate, dispatch]);

  const handleChangePage = (page) => {
    navigate({
      pathname: "/catalog",
      search: `?${createSearchParams({
        ...paramUrl,
        page: page,
      })}`,
    });
  };

  return (
    <>
      <Row gutter={[8, 8]}>
        <Col md={6}>
          <div className="box-ad-page box-page-search ">
            <p className="subtitle-search box-page-search-margin">Khoảng giá</p>
            <Space>
              <InputNumber
                style={{
                  width: "125px",
                }}
                value={priceValue.priceGte}
                formatter={(value) =>
                  `đ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                disabled
              />
              <InputNumber
                style={{
                  width: "125px",
                }}
                value={priceValue.priceLte}
                formatter={(value) =>
                  `đ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                disabled
              />
            </Space>
            <Slider
              range
              min={0}
              max={maxPrice}
              step={1000000}
              tooltip={{
                formatter,
              }}
              onChange={(value) => {
                setParamUrl({
                  ...paramUrl,
                  priceGte: value[0],
                  priceLte: value[1],
                });
                navigate({
                  pathname: "/catalog",
                  search: `?${createSearchParams({
                    ...paramUrl,
                    priceGte: value[0],
                    priceLte: value[1],
                  })}`,
                });
                setPriceValue({
                  ...priceValue,
                  priceGte: value[0],
                  priceLte: value[1],
                });
              }}
              value={[priceValue.priceGte, priceValue.priceLte]}
            />
          </div>
          <div className="box-ad-page box-page-search box-page-search-margin">
            <p className="subtitle-search box-page-search-margin">
              Thương hiệu
            </p>
            <Checkbox.Group
              style={{
                width: "100%",
              }}
              value={brands}
              onChange={(checkedValues) => {
                setBrands(checkedValues);
                setParamUrl({
                  ...paramUrl,
                  brands: checkedValues.join(","),
                });
                navigate({
                  pathname: "/catalog",
                  search: `?${createSearchParams({
                    ...paramUrl,
                    brands: checkedValues.join(","),
                  })}`,
                });
              }}
            >
              <Row>
                <Col span={24}>
                  <Checkbox value="Apple">Apple</Checkbox>
                </Col>
                <Col span={24}>
                  <Checkbox value="Samsung">Samsung</Checkbox>
                </Col>
                <Col span={24}>
                  <Checkbox value="Xiami">Xiami</Checkbox>
                </Col>
                <Col span={24}>
                  <Checkbox value="Oppo">Oppo</Checkbox>
                </Col>
                <Col span={24}>
                  <Checkbox value="Sony">Sony</Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </div>
        </Col>
        <Col md={18}>
          <div className="box-ad-page box-page-search-margin">
            <Space>
              <p className="subtitle-search">Sắp xếp theo</p>
              <div
                className={
                  isCheckedPrice.type === "desc"
                    ? "wrapper-sort border-button-checked"
                    : "wrapper-sort"
                }
                onClick={() => {
                  if (isCheckedPrice.type === "desc") {
                    setIsCheckedPrice({
                      type: "",
                    });
                  } else {
                    setIsCheckedPrice({
                      type: "desc",
                    });
                    navigate({
                      pathname: "/catalog",
                      search: `?${createSearchParams({
                        ...paramUrl,
                        order: "desc",
                      })}`,
                    });
                  }
                }}
              >
                <p>Giá giảm dần</p>
                {isCheckedPrice.type === "desc" && (
                  <>
                    <div className="wrapper-checked-button"></div>
                    <span className="checked-button">✓</span>
                  </>
                )}
              </div>
              <div
                className={
                  isCheckedPrice.type === "asc"
                    ? "wrapper-sort border-button-checked"
                    : "wrapper-sort"
                }
                onClick={() => {
                  if (isCheckedPrice.type === "asc") {
                    setIsCheckedPrice({
                      type: "",
                    });
                  } else {
                    setIsCheckedPrice({
                      type: "asc",
                    });
                    navigate({
                      pathname: "/catalog",
                      search: `?${createSearchParams({
                        ...paramUrl,
                        order: "asc",
                      })}`,
                    });
                  }
                }}
              >
                <p>Giá tăng dần</p>
                {isCheckedPrice.type === "asc" && (
                  <>
                    <div className="wrapper-checked-button"></div>
                    <span className="checked-button">✓</span>
                  </>
                )}
              </div>
            </Space>
          </div>
          <div>
            <Spin spinning={listProductBySearch?.load}>
              <div className="product-list-filter product-list-search-filter">
                {listProductBySearch?.data?.data?.count > 0 &&
                  listProductBySearch?.data?.data?.rows?.map((item, index) => (
                    <CartProduct
                      key={"search-cart-" + index}
                      idProduct={item.id}
                      thumbnail={item.thumbnail}
                      name={item.name}
                      price={item.price}
                      isDiscount={item.isDiscount}
                      discount={item.discount}
                      // link={link}
                      className="product-item search-product-item"
                      category={removeVietnameseTones(
                        item?.Category?.name,
                        "-"
                      )}
                    />
                  ))}
                {listProductBySearch?.data?.data?.count === 0 && (
                  <Empty
                    description={<span>Không tìm thấy sản phẩm nào</span>}
                  />
                )}
              </div>
            </Spin>
          </div>

          {listProductBySearch?.data?.data?.count > limit && (
            <div className="wrapper-pagination">
              <Pagination
                current={parseInt(page)}
                defaultPageSize={limit}
                total={listProductBySearch?.data?.data?.count}
                onChange={handleChangePage}
              />
            </div>
          )}
        </Col>
      </Row>
    </>
  );
}

export default SearchPage;
