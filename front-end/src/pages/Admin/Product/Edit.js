import { Affix, Button, Space, Modal, Alert } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { postListBrandByIdCategoryAdminAction } from "store/brand/brands.action";
import {
  setBrand,
  setCategory,
  setDescription,
  setDiscount,
  setErrorField,
  setImages,
  setIsDiscount,
  setName,
  setPrice,
  setSpecifications,
  setThumbnail,
} from "store/product/form.reducer";
import openNotificationWithIcon from "utils/notification";
import { useNavigate } from "react-router-dom";
import {
  getDetailProductAction,
  putProductByIdAdminAction,
} from "store/product/products.action";
import { isEmpty } from "lodash";
import HeadPage from "../components/HeadPage";
import FormProduct from "./Form";
import ProductPreview from "./ProductPreview";

function EditProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { idProduct } = useParams();
  const infoForm = useSelector((state) => state.formProductsSlice);
  const productsSlice = useSelector(
    (state) => state.productsSlice.detailProduct
  );
  const errorFields = useSelector((state) => state.formProductsSlice.errors);

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getDetailProductAction({ idProduct }));
  }, [dispatch, idProduct]);

  useEffect(() => {
    dispatch(setName(productsSlice.data?.data?.name));
    dispatch(setCategory(productsSlice.data?.data?.CategoryId));
    dispatch(
      postListBrandByIdCategoryAdminAction({
        idCategory: productsSlice.data?.data?.CategoryId,
      })
    );
    dispatch(setBrand(productsSlice.data?.data?.BrandId));
    dispatch(setThumbnail(productsSlice.data?.data?.thumbnail));
    dispatch(setImages(productsSlice.data?.data?.ImageProducts || []));
    dispatch(setPrice(productsSlice.data?.data?.price));
    dispatch(setIsDiscount(productsSlice.data?.data?.isDiscount || false));
    dispatch(setDiscount(productsSlice.data?.data?.discount || ""));
    dispatch(setSpecifications(productsSlice.data?.data?.Speciations || []));
    dispatch(setDescription(productsSlice.data?.data?.description));
    dispatch(setErrorField([]));
  }, [dispatch, idProduct, productsSlice]);

  const handleSubmit = async () => {
    const {
      category,
      brand,
      name,
      thumbnail,
      price,
      description,
      images,
      isDiscount,
      discount,
      specifications,
    } = infoForm;

    let isValid = true;
    let error = [];
    if (name.length === 0) {
      isValid = false;
      error.push("Nhập tên sản phẩm");
    }
    if (category === "default") {
      isValid = false;
      error.push("Nhập loại sản phẩm");
    }
    if (brand === "default") {
      isValid = false;
      error.push("Nhập thương hiệu sản phẩm");
    }
    if (Object.keys(thumbnail).length === 0) {
      isValid = false;
      error.push("Chọn ảnh và upload ít nhất một hình ảnh về sản phẩm");
    }
    if (parseInt(discount) >= 100) {
      isValid = false;
      error.push("Giảm giá phải nhỏ hơn 100");
    }
    if (description.length === 0) {
      isValid = false;
      error.push("Nhập mô tả sản phẩm");
    }
    dispatch(setErrorField(error));
    if (isValid) {
      const res = await dispatch(
        putProductByIdAdminAction({
          idProduct: idProduct,
          name,
          price,
          thumbnail: thumbnail,
          listImage: images,
          isDiscount,
          discount,
          specifications,
          description: description,
          categoryId: category,
          brandId: brand,
        })
      );
      if (!isEmpty(res.payload)) {
        openNotificationWithIcon("success", res.payload.message);
        navigate(-1);
      }
    }
  };

  return (
    <>
      <HeadPage
        title="Cập nhật sản phẩm"
        actionMenu={
          <Affix offsetTop={82}>
            <Space>
              <Button type="primary" ghost onClick={() => setOpen(true)}>
                Xem trước
              </Button>
              <Button type="primary" onClick={handleSubmit} loading={loading}>
                Lưu thông tin
              </Button>
            </Space>
          </Affix>
        }
        isBack={1}
      />
      {errorFields.length > 0 && (
        <div style={{ marginBottom: "12px" }}>
          <Space>
            {errorFields?.map((item, index) => {
              return (
                <Alert
                  key={`error-field-` + index}
                  type="error"
                  message={item}
                  showIcon
                />
              );
            })}
          </Space>
        </div>
      )}
      <FormProduct type="edit" />
      <Modal
        title="Modal 1000px width"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <ProductPreview dataSource={infoForm} />
      </Modal>
    </>
  );
}

export default EditProduct;
