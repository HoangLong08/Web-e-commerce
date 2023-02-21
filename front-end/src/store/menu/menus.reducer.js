import { createSlice } from "@reduxjs/toolkit";
import { getMenuAdminAction } from "./menus.action";

function addChildById(array, id, child) {
  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    if (item.id === id) {
      item.children.push(child);
      return true;
    } else if (item.children.length > 0) {
      const result = addChildById(item.children, id, child);
      if (result) {
        return true;
      }
    }
  }
  return false;
}

const newChild = {
  id: "8",
  title: "task8",
  icon: null,
  url: "task8title",
  children: [],
  level: 2,
};

// addChildById(yourArray, "7", newChild);

const menusSlice = createSlice({
  name: "menus",
  initialState: {
    listMenuAdmin: {
      data: [],
      load: false,
      error: "",
    },
    valueFormItemMenu: {
      title: "",
      url: "",
    },
  },
  reducers: {
    setValueFormItemMenuTitle: (state, action) => {
      state.valueFormItemMenu.title = action.payload;
    },

    setValueFormItemMenuUrl: (state, action) => {
      state.valueFormItemMenu.url = action.payload;
    },

    addItemMenuParent: (state, action) => {
      console.log("action.payload: ", action.payload);
      state.listMenuAdmin.data = [...state.listMenuAdmin.data, action.payload];
      // state.listMenuAdmin.data.push(action.payload);
    },

    addItemMenu: (state, action) => {
      state.listMenuAdmin = action.payload;
    },
  },

  extraReducers: {
    [getMenuAdminAction.pending]: (state) => {
      state.listMenuAdmin.load = true;
      state.listMenuAdmin.data = [];
      state.listMenuAdmin.error = "";
    },
    [getMenuAdminAction.fulfilled]: (state, action) => {
      state.listMenuAdmin.load = false;
      state.listMenuAdmin.data = action.payload;
      state.listMenuAdmin.error = "";
    },
    [getMenuAdminAction.rejected]: (state, action) => {
      state.listMenuAdmin.load = false;
      state.listMenuAdmin.error = action.payload.error;
      state.listMenuAdmin.data = [];
    },
  },
});

export const {
  setValueFormItemMenuTitle,
  setValueFormItemMenuUrl,
  addItemMenuParent,
  addItemMenu,
} = menusSlice.actions;

export default menusSlice.reducer;
