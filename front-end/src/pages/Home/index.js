import { Spin } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListProductAction } from "store/product/products.action";
// import { getProductsRatingSimilarAction } from "store/rs/rs.action";
import removeVietnameseTones from "utils/removeVietnameseTones";
import Banner from "./Banner";
// import { isEmpty } from "lodash";
import FeaturedProduct from "./FeaturedProduct";
import useBackToTop from "hooks/useBackToTop";

function HomePage() {
  const dispatch = useDispatch();
  const productsSlice = useSelector((state) => state.productsSlice.listProduct);
  // const listProductRatingSimilar = useSelector(
  //   (state) => state.rsSlice.listProductRatingSimilar
  // );
  // const authSlice = useSelector((state) => state.authSlice.infoAccount);
  useBackToTop();

  useEffect(() => {
    dispatch(getListProductAction());
  }, [dispatch]);

  // useEffect(() => {
  //   if (authSlice && authSlice.accessToken && authSlice.idUser) {
  //     dispatch(
  //       getProductsRatingSimilarAction({
  //         idUser: authSlice.idUser,
  //       })
  //     );
  //   }
  // }, [authSlice, dispatch]);

  return (
    <div>
      <Banner />
      {/* {!isEmpty(authSlice) && (
        <Spin spinning={listProductRatingSimilar.load}>
          <FeaturedProduct
            title={"Gợi ý sản phẩm cho bạn"}
            // linkAllProduct={`/${removeVietnameseTones(item.name, "-")}`}
            listProduct={listProductRatingSimilar.data}
            // category={item.Category.name}
            row={2}
          />
        </Spin>
      )} */}
      <Spin spinning={productsSlice.load}>
        {productsSlice.data?.data?.map((item, index) => {
          return (
            <FeaturedProduct
              key={index}
              title={item.name}
              linkAllProduct={`/${removeVietnameseTones(
                item?.name?.toLowerCase(),
                "-"
              )}`}
              listProduct={item.Products}
              category={item.name}
            />
          );
        })}
      </Spin>
    </div>
  );
}

export default HomePage;
