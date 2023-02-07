import React, { useState } from "react";
import { Affix, Button, Space, Alert, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import HeadPage from "../components/HeadPage";
import FormProduct from "./Form";
import {
  setBrand,
  setCategory,
  setDescription,
  setDiscount,
  setEmptyImages,
  setErrorField,
  setIsDiscount,
  setName,
  setPrice,
  setSpecifications,
  setThumbnail,
} from "store/product/form.reducer";
import useBackToTop from "hooks/useBackToTop";
import { postProductAdminAction } from "store/product/products.action";
import { isEmpty } from "lodash";
import openNotificationWithIcon from "utils/notification";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ProductPreview from "./ProductPreview";

function AddProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const infoForm = useSelector((state) => state.formProductsSlice);
  const errorFields = useSelector((state) => state.formProductsSlice.errors);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  console.log("errorFields: ", errorFields);

  useBackToTop(errorFields.length);

  useEffect(() => {
    dispatch(setName(""));
    dispatch(setCategory("default"));
    dispatch(setBrand("default"));
    dispatch(setThumbnail({}));
    dispatch(setEmptyImages([]));
    dispatch(setPrice(""));
    dispatch(setIsDiscount(false));
    dispatch(setDiscount(""));
    dispatch(setSpecifications([]));
    dispatch(setDescription(""));
    dispatch(setErrorField([]));
  }, [dispatch]);

  const handleSubmit = async () => {
    let isValid = true;
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
    setLoading(true);

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
        postProductAdminAction({
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

    setLoading(false);
  };

  return (
    <>
      <HeadPage
        title="Thêm sản phẩm"
        actionMenu={
          <Affix offsetTop={82}>
            <Space>
              <Button
                type="primary"
                ghost
                onClick={() => {
                  setOpen(true);
                }}
              >
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
      <FormProduct type="add" />
      <Modal
        title="Thông tin sản phẩm"
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

export default AddProduct;
