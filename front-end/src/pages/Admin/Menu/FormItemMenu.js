import FormInput from "layouts/FormInput/index";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setValueFormItemMenuTitle,
  setValueFormItemMenuUrl,
} from "store/menu/menus.reducer";

function FormItemMenu({ type, id }) {
  const dispatch = useDispatch();
  const valueFormItemMenuTitle = useSelector(
    (state) => state.menusSlice.valueFormItemMenu.title
  );
  console.log("valueFormItemMenuTitle: ", valueFormItemMenuTitle);
  const valueFormItemMenuUrl = useSelector(
    (state) => state.menusSlice.valueFormItemMenu.url
  );

  return (
    <div>
      <FormInput
        title="Tiêu đề"
        htmlFor="title"
        type=""
        placeholder="title"
        name="title"
        value={valueFormItemMenuTitle || ""}
        onChange={(e) => {
          const { value } = e.target;
          dispatch(setValueFormItemMenuTitle(value));
        }}
        onKeyDown=""
        className=""
        error=""
      />
      <FormInput
        title="Liên kết"
        htmlFor="url"
        type=""
        placeholder="/abc/def"
        name="url"
        value={valueFormItemMenuUrl || ""}
        onChange={(e) => {
          const { value } = e.target;
          dispatch(setValueFormItemMenuUrl(value));
        }}
        onKeyDown=""
        className=""
        error=""
      />
    </div>
  );
}

export default FormItemMenu;
