import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/auth.reducer";
import addressSlice from "./address/address.reducer";
import productsSlice from "./product/products.reducer";
import formProductsSlice from "./product/form.reducer";
import categoriesSlice from "./category/categories.reducer";
import brandSlice from "./brand/brands.reducer";
import shoppingCartSlice from "./shoppingCart/shoppingCart.reducer";
import usersSlice from "./user/users.reduce";
import evaluateSlice from "./evaluate/evaluates.reducer";
import dashboardSlice from "./dashboard/dashboard.reducer";
import rsSlice from "./rs/rs.reducer";
import orderSlice from "./order/order.reducer";

const store = configureStore({
  reducer: {
    authSlice,
    addressSlice,
    productsSlice,
    formProductsSlice,
    categoriesSlice,
    brandSlice,
    shoppingCartSlice,
    usersSlice,
    evaluateSlice,
    dashboardSlice,
    rsSlice,
    orderSlice,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
