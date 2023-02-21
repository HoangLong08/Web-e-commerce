import React, { useEffect, useState } from "react";
import { Select, Checkbox, Space, Button, Spin } from "antd";
import {
  PlusOutlined,
  CloseOutlined,
  RestOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { isEmpty } from "lodash";
import FormInput from "layouts/FormInput";
import CKeditor from "layouts/CKeditor";
import { useDispatch, useSelector } from "react-redux";
import { getListCategoryAdminAction } from "store/category/categories.action";
import { postListBrandByIdCategoryAdminAction } from "store/brand/brands.action";
import {
  setAddSpecifications,
  setBrand,
  setCategory,
  setDeleteImage,
  setDescription,
  setDiscount,
  setImages,
  setIsDiscount,
  setName,
  setPrice,
  setRemoveSpecifications,
  setThumbnail,
  setValueSpecifications,
} from "../../../store/product/form.reducer";
import { setListBrandByCategoryIdAdmin } from "store/brand/brands.reducer";
import {
  uploadMultiImagesAction,
  uploadSingleImageAction,
} from "store/upload/upload.action";

const { Option } = Select;
const regexNumber = /^\d+$/;
// const regexCurrency = /^(\d*\.\d{1,2}|\d+)$/;

function FormProduct({ type, idProduct }) {
  const dispatch = useDispatch();

  const listCategoryAdmin = useSelector(
    (state) => state.categoriesSlice.listCategoryAdmin
  );
  const listBrandByCategoryIdAdmin = useSelector(
    (state) => state.brandSlice.listBrandByCategoryIdAdmin
  );

  const idCategory = useSelector((state) => state.formProductsSlice.category);
  const idBrand = useSelector((state) => state.formProductsSlice.brand);
  const name = useSelector((state) => state.formProductsSlice.name);
  const thumbnail = useSelector((state) => state.formProductsSlice.thumbnail);
  const listImages = useSelector((state) => state.formProductsSlice.images);
  const isDiscount = useSelector((state) => state.formProductsSlice.isDiscount);
  const discount = useSelector((state) => state.formProductsSlice.discount);
  const price = useSelector((state) => state.formProductsSlice.price);
  const specifications = useSelector(
    (state) => state.formProductsSlice.specifications
  );
  const description = useSelector(
    (state) => state.formProductsSlice.description
  );

  const [typeUpload, setTypeUpload] = useState("");
  const [thumbnailState, setThumbnailState] = useState({});
  const [listOnchangeImage, setListOnchangeImage] = useState({}); // handle onChange image when upload images
  const [loadingSingle, setLoadingSingle] = useState(false);
  const [loadingMultiple, setLoadingMultiple] = useState(false);

  useEffect(() => {
    dispatch(
      getListCategoryAdminAction({
        name: "",
      })
    );
  }, [dispatch]);

  const onFileChange = (e, type) => {
    if (type === "multiple") {
      setListOnchangeImage({ imgsCollection: e.target.files });
    } else {
      setThumbnailState({ imgCollection: e.target.files?.[0] });
    }
  };

  const onSubmitFile = async (typeUpload) => {
    let formData = new FormData();
    if (typeUpload === "multiple") {
      await setLoadingMultiple(true);
      for (const key of Object.keys(listOnchangeImage.imgsCollection)) {
        formData.append("files", listOnchangeImage.imgsCollection[key]);
        try {
          const res = await dispatch(
            uploadMultiImagesAction({ formData: formData })
          );
          if (res.payload?.status === "200") {
            dispatch(setImages(res.payload.data));
          }
          await setLoadingMultiple(false);
        } catch (error) {
          throw new Error(error);
        }
      }
      setListOnchangeImage({});
    } else {
      await setLoadingSingle(true);
      formData.append("file", thumbnailState.imgCollection);
      try {
        const res = await dispatch(
          uploadSingleImageAction({ formData: formData })
        );

        if (res?.payload?.status === "200") {
          dispatch(setThumbnail(res.payload.data));
        }
        await setLoadingSingle(false);
      } catch (error) {
        throw new Error(error);
      }
      setThumbnailState({});
    }
  };

  return (
    <Spin spinning={false}>
      <div className="box-ad-page box-ad-margin">
        <Space>
          <FormInput
            title="Loại sản phẩm"
            content={
              <Select
                defaultValue="default"
                style={{
                  width: 220,
                }}
                onChange={async (e) => {
                  if (e !== "default") {
                    await dispatch(
                      postListBrandByIdCategoryAdminAction({ idCategory: e })
                    );
                  } else {
                    await dispatch(setListBrandByCategoryIdAdmin([]));
                  }
                  await dispatch(setCategory(e));
                  await dispatch(setBrand("default"));
                }}
                name="category"
                value={idCategory}
                loading={listCategoryAdmin.load}
              >
                <Option value="default">Chọn loại sản phẩm</Option>
                {listCategoryAdmin?.data?.data?.map((item, index) => {
                  return (
                    <Option key={"item-category-" + index} value={item.id}>
                      {item.name}
                    </Option>
                  );
                })}
              </Select>
            }
          />
          <FormInput
            title="Hãng sản xuất"
            content={
              <Select
                defaultValue="default"
                style={{
                  width: 220,
                }}
                value={idBrand}
                loading={listCategoryAdmin.load}
                onChange={async (e) => {
                  await dispatch(setBrand(e));
                }}
              >
                <Option value="default">Chọn hãng sản xuất</Option>
                {listBrandByCategoryIdAdmin?.data?.data?.map((item, index) => {
                  return (
                    <Option key={"item-brand-" + index} value={item.id}>
                      {item.name}
                    </Option>
                  );
                })}
              </Select>
            }
          />
        </Space>
        <FormInput
          title="Tên sản phẩm"
          htmlFor="nameProduct"
          type=""
          placeholder="Tên sản phẩm"
          name="nameProduct"
          value={name || ""}
          onChange={(e) => {
            dispatch(setName(e.target.value));
          }}
          onKeyDown=""
          className=""
          error=""
        />
      </div>
      <div className="box-ad-page box-ad-margin">
        <div>
          <FormInput
            title="Hình ảnh"
            htmlFor="image"
            content={
              <Spin tip="Loading..." spinning={loadingSingle}>
                <div className="upload-images-product">
                  <div style={{ width: "350px", display: "flex", gap: "12px" }}>
                    <input
                      type="file"
                      name="imgCollection"
                      onChange={(e) => {
                        onFileChange(e, "single");
                      }}
                      accept="image/*"
                      style={{ marginBottom: "12px" }}
                    />
                    <Button
                      type="primary"
                      onClick={() => {
                        onSubmitFile("single");
                      }}
                      disabled={isEmpty(thumbnailState)}
                    >
                      Upload
                    </Button>
                  </div>
                  {!isEmpty(thumbnail) ? (
                    <div className="product-thumbnail">
                      <p>Thumbnail</p>
                      <img
                        alt={thumbnail?.name || ""}
                        src={thumbnail?.url || thumbnail}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </Spin>
            }
          />
          <FormInput
            title="Những hình ảnh kèm theo của sản phẩm"
            htmlFor="images"
            content={
              <Spin tip="Loading..." spinning={loadingMultiple}>
                <div className="upload-images-product">
                  <div style={{ width: "350px", display: "flex", gap: "12px" }}>
                    <input
                      type="file"
                      name="imgsCollection"
                      onChange={(e) => {
                        onFileChange(e, "multiple");
                      }}
                      multiple
                      accept="image/*"
                      style={{ marginBottom: "12px" }}
                    />
                    <Button
                      type="primary"
                      onClick={() => {
                        onSubmitFile("multiple");
                      }}
                      disabled={isEmpty(listOnchangeImage)}
                    >
                      Upload
                    </Button>
                  </div>
                  <div className="list-form-item-image-product">
                    {listImages?.map((item, index) => {
                      return (
                        <div
                          key={"item-image-product-" + index}
                          className="form-item-image-product"
                        >
                          <img src={item.url} alt={item.name} />
                          <span
                            style={{
                              lineHeight: "60px",
                              minWidth: "180px",
                              display: "block",
                            }}
                          >
                            {item.name}
                          </span>
                          <div className="form-item-image-product-delete">
                            <Space>
                              {/* <Button
                                size="small"
                                type="primary"
                                onClick={() => {
                                  dispatch(setThumbnail(item));
                                }}
                              >
                                Thumbnail
                              </Button> */}
                              {/* <Button
                                size="middle"
                                type="primary"
                                danger
                                icon={<RestOutlined />}
                                onClick={() => {
                                  dispatch(setDeleteImage(index));
                                }}
                              /> */}
                            </Space>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Spin>
            }
          />
        </div>
      </div>
      <div className="box-ad-page box-ad-margin">
        <Space>
          <FormInput
            content={
              <Checkbox
                onChange={() => {
                  dispatch(setIsDiscount(!isDiscount));
                }}
                checked={isDiscount}
              >
                Sản phẩm giảm giá ( % )
              </Checkbox>
            }
          />
        </Space>
        <FormInput
          title="Giá sản phẩm (chưa tính giảm giá)"
          placeholder="Giá gốc của sản phẩm"
          htmlFor="price"
          type=""
          name="price"
          value={price || ""}
          onChange={(e) => {
            const { value } = e.target;
            if (regexNumber.test(value)) {
              dispatch(setPrice(value));
            } else {
              dispatch(setPrice(""));
            }
          }}
          onKeyDown=""
          className=""
          error=""
        />
        {isDiscount && ( // check product have discount
          <FormInput
            title="Giảm giá (%)"
            htmlFor=""
            type=""
            placeholder="Giảm giá (%)"
            name=""
            value={discount || ""}
            onChange={(e) => {
              const { value } = e.target;
              if (regexNumber.test(value)) {
                dispatch(setDiscount(e.target.value));
              } else {
                dispatch(setDiscount(""));
              }
            }}
            onKeyDown=""
            className=""
            error=""
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
        )}
      </div>
      <div className="box-ad-page box-ad-margin">
        <FormInput
          title="Thông số kỹ thuật"
          content={
            <>
              <div style={{ marginBottom: "12px" }}>
                <Space>
                  <Button
                    icon={<PlusOutlined />}
                    onClick={() => {
                      dispatch(
                        setAddSpecifications({
                          label: "",
                          value: "",
                        })
                      );
                    }}
                  />
                  <p>Thêm thông số kỹ thuật cho sản phẩm</p>
                </Space>
              </div>
              <Space wrap="true">
                {specifications?.map((item, index) => (
                  <Space
                    align="end"
                    key={"item-specifications-" + index}
                    style={{ marginRight: "24px" }}
                  >
                    <FormInput
                      title="Label"
                      className="w-300"
                      value={item.label || ""}
                      onChange={(e) => {
                        dispatch(
                          setValueSpecifications({
                            indexSpec: index,
                            valueLabel: e.target.value,
                            valueSpec: item.value,
                          })
                        );
                      }}
                      placeholder="Bộ nhớ trong, tần số quét ...."
                    />
                    <FormInput
                      title="Value"
                      className="w-300"
                      value={item.value || ""}
                      onChange={(e) => {
                        dispatch(
                          setValueSpecifications({
                            indexSpec: index,
                            valueLabel: item.label,
                            valueSpec: e.target.value,
                          })
                        );
                      }}
                      placeholder="32 GB, 60Hz, ..."
                    />
                    <FormInput
                      title=""
                      content={
                        <Button
                          danger
                          icon={<CloseOutlined />}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            dispatch(setRemoveSpecifications(index));
                          }}
                        />
                      }
                    />
                  </Space>
                ))}
              </Space>
            </>
          }
        />
      </div>
      <div className="box-ad-page box-ad-margin">
        <FormInput
          title="Mô tả"
          content={
            <div style={{ height: "500px", overflow: "auto" }}>
              <CKeditor
                valueEditor={description || ""}
                onChangeEditor={(e) => {
                  dispatch(setDescription(e));
                }}
              />
            </div>
          }
        />
      </div>
    </Spin>
  );
}

export default FormProduct;
