import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../../../layouts/FormInput";
import { Button, Space } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  setAddBrandByCategoryName,
  setDeleteBrandByCategoryName,
  setListBrandByCategory,
  setValueBrandByCategoryName,
  setValueFormCategoryName,
} from "store/category/categories.reducer";
import { v4 } from "uuid";

function FormCategory({ type, idCategory }) {
  const dispatch = useDispatch();

  const detailCategory = useSelector(
    (state) => state.categoriesSlice.detailCategory
  );

  const valueFormCategoryName = useSelector(
    (state) => state.categoriesSlice.valueFormCategory.name
  );

  const listBrandByCategory = useSelector(
    (state) => state.categoriesSlice.valueFormCategory.listBrand
  );

  useEffect(() => {
    if (type === "edit") {
      dispatch(setValueFormCategoryName(detailCategory.data?.data?.name));
      dispatch(setListBrandByCategory(detailCategory.data?.data?.Brands));
    } else {
      dispatch(setValueFormCategoryName(""));
      dispatch(setListBrandByCategory([]));
    }
  }, [type, detailCategory, dispatch]);

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
