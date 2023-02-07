import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { IconArrowRightSolid } from "../../assets";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CartProduct from "layouts/CartProduct/index";
import removeVietnameseTones from "utils/removeVietnameseTones";
import { useTranslation } from "react-i18next";
import "./style.css";

function FeaturedProduct({
  title,
  linkAllProduct,
  row = 1,
  listProduct,
  category = "",
}) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 5000,
    rows: row,
  };
  const { t } = useTranslation("home");
  return (
    <>
      {listProduct?.length > 0 && (
        <div className="wrapper-feature-product">
          <div className="product-list-title d-flex justify-content-space-between align-items-center">
            {linkAllProduct ? (
              <Link to={linkAllProduct} className="feature-title">
                <h2>{title}</h2>
              </Link>
            ) : (
              <div className="feature-title">
                <h2>{title}</h2>
              </div>
            )}
            {linkAllProduct && (
              <Link to={linkAllProduct} className="view-all">
                {t("see all")}
                <IconArrowRightSolid className="view-all-icon-right" />
              </Link>
            )}
          </div>
          <Slider {...settings}>
            {listProduct?.map((item, index) => {
              return (
                <CartProduct
                  key={"home-cart-" + index}
                  idProduct={item.id}
                  thumbnail={item.thumbnail}
                  name={item.name}
                  price={item.price}
                  isDiscount={item.isDiscount}
                  discount={item.discount}
                  category={removeVietnameseTones(
                    category?.toLowerCase() ||
                      item.Category?.name?.toLowerCase(),
                    "-"
                  )}
                />
              );
            })}
          </Slider>
        </div>
      )}
    </>
  );
}

export default FeaturedProduct;
