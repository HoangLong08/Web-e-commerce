import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "layouts/FormInput";
import { Button, Space, Spin } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  setAddBrandByCategoryName,
  setDeleteBrandByCategoryName,
  setListBrandByCategory,
  setValueBrandByCategoryName,
  setValueFormCategoryName,
  setValueFormCategoryThumbnail,
} from "store/category/categories.reducer";
import { v4 } from "uuid";
import { isEmpty } from "lodash";
import { uploadSingleImageAction } from "store/upload/upload.action";

function FormCategory({ type, idCategory }) {
  const dispatch = useDispatch();

  const [thumbnailState, setThumbnailState] = useState({});
  const [loadingSingle, setLoadingSingle] = useState(false);

  const detailCategory = useSelector(
    (state) => state.categoriesSlice.detailCategory
  );

  console.log("detailCategory: ", detailCategory);

  const valueFormCategoryName = useSelector(
    (state) => state.categoriesSlice.valueFormCategory.name
  );

  const valueFormCategoryThumbnail = useSelector(
    (state) => state.categoriesSlice.valueFormCategory.thumbnail
  );

  console.log("valueFormCategoryThumbnail: ", valueFormCategoryThumbnail);

  const listBrandByCategory = useSelector(
    (state) => state.categoriesSlice.valueFormCategory.listBrand
  );

  useEffect(() => {
    if (type === "edit") {
      dispatch(setValueFormCategoryName(detailCategory.data?.data?.name));
      dispatch(
        setValueFormCategoryThumbnail(detailCategory.data?.data?.thumbnail)
      );
      dispatch(setListBrandByCategory(detailCategory.data?.data?.Brands));
    } else {
      dispatch(setValueFormCategoryName(""));
      dispatch(setValueFormCategoryThumbnail(""));
      dispatch(setListBrandByCategory([]));
    }
  }, [type, detailCategory, dispatch]);

  const onFileChange = (e, type) => {
    setThumbnailState({ imgCollection: e.target.files?.[0] });
  };

  const onSubmitFile = async (typeUpload) => {
    let formData = new FormData();

    await setLoadingSingle(true);
    formData.append("file", thumbnailState.imgCollection);
    try {
      const res = await dispatch(
        uploadSingleImageAction({ formData: formData })
      );

      if (res?.payload?.status === "200") {
        dispatch(setValueFormCategoryThumbnail(res.payload.data));
      }
      await setLoadingSingle(false);
    } catch (error) {
      throw new Error(error);
    }
    setThumbnailState({});
  };

  return (
    <div>
      <FormInput
        title="Tên thể loại"
        htmlFor="nameCategory"
        type=""
        placeholder="name category"
        name="nameCategory"
        value={valueFormCategoryName || ""}
        onChange={(e) => {
          const { value } = e.target;
          dispatch(setValueFormCategoryName(value));
        }}
        onKeyDown=""
        className=""
        error=""
      />

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
              {!isEmpty(valueFormCategoryThumbnail) ? (
                <div className="category-thumbnail">
                  <p>Thumbnail</p>
                  <img
                    alt={valueFormCategoryThumbnail?.name || ""}
                    src={
                      valueFormCategoryThumbnail?.url ||
                      valueFormCategoryThumbnail
                    }
                  />
                </div>
              ) : (
                <></>
              )}
            </div>
          </Spin>
        }
      />
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => {
          dispatch(setAddBrandByCategoryName({ name: "", id: v4() }));
        }}
        block
      >
        Add brand
      </Button>
      {listBrandByCategory?.map((item, index) => {
        return (
          <Space key={`item-name-brand` + index} style={{ width: "100%" }}>
            <FormInput
              title=""
              htmlFor="nameBrand"
              type=""
              placeholder="Tên thương hiệu"
              name="nameBrand"
              value={item.name || ""}
              onChange={(e) => {
                const { value } = e.target;
                dispatch(
                  setValueBrandByCategoryName({
                    nameBrand: value,
                    id: item.id,
                  })
                );
              }}
              onKeyDown=""
              className=""
              error=""
            />
            <Button
              type="primary"
              icon={<DeleteOutlined />}
              onClick={() => {
                dispatch(setDeleteBrandByCategoryName(item.id));
              }}
              danger
            />
          </Space>
        );
      })}
    </div>
  );
}

export default FormCategory;
