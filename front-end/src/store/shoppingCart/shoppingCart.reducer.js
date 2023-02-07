import { createSlice } from "@reduxjs/toolkit";
//current
const shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState: {
    shoppingCart: shoppingCart || [],
  },
  reducers: {
    addCart: (state, action) => {
      let res = [];
      res = [...state.shoppingCart, { ...action.payload, quantity: 1 }];
      state.shoppingCart = res;
      localStorage.setItem("shoppingCart", JSON.stringify(res));
    },

    incrementCart: (state, action) => {
      let tempCart = state.shoppingCart.map((item) => {
        if (item.id === action.payload.id) {
          item = { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      state.shoppingCart = tempCart;
      localStorage.setItem("shoppingCart", JSON.stringify(tempCart));
    },

    decrementCart: (state, action) => {
      let tempCart = state.shoppingCart.map((item) => {
        if (item.id === action.payload.id) {
          item = {
            ...item,
            quantity: item.quantity > 1 ? item.quantity - 1 : 1,
          };
        }
        return item;
      });
      state.shoppingCart = tempCart;
      localStorage.setItem("shoppingCart", JSON.stringify(tempCart));
    },

    removeCart: (state, action) => {
      let res = state.shoppingCart.filter(
        (item, index) => item.id !== action.payload.id
      );
      state.shoppingCart = res;
      localStorage.setItem("shoppingCart", JSON.stringify(res));
    },

    removeAllCart: (state, action) => {
      state.shoppingCart = action.payload;
      localStorage.setItem("shoppingCart", JSON.stringify(action.payload));
    },
  },

  extraReducers: {},
});

export const {
  addCart,
  incrementCart,
  decrementCart,
  removeCart,
  removeAllCart,
} = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;
