import { createSlice } from "@reduxjs/toolkit";
// current: immer
const formProductsSlice = createSlice({
  name: "formProduct",
  initialState: {
    thumbnail: {},
    images: [],
    description: "",
    price: "", // if not option price
    specifications: [], // array contain object label and value
    name: "",
    category: "", // idCategory
    brand: "", // idBrand
    isDiscount: false,
    discount: "",
    errors: [],
  },
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },

    setPrice: (state, action) => {
      state.price = action.payload;
    },

    setThumbnail: (state, action) => {
      state.thumbnail = action.payload;
    },

    setDescription: (state, action) => {
      state.description = action.payload;
    },

    setImages: (state, action) => {
      state.images = action.payload;
    },

    setEmptyImages: (state, action) => {
      state.images = [];
    },

    setDeleteImage: (state, action) => {
      state.images = state.images.filter(
        (item, index) => index !== action.payload
      );
    },

    setCategory: (state, action) => {
      state.category = action.payload;
    },

    setBrand: (state, action) => {
      state.brand = action.payload;
    },

    setIsDiscount: (state, action) => {
      state.isDiscount = action.payload;
    },

    setDiscount: (state, action) => {
      state.discount = action.payload;
    },

    setSpecifications: (state, action) => {
      state.specifications = action.payload;
    },

    setAddSpecifications: (state, action) => {
      state.specifications = [...state.specifications, action.payload];
    },

    setRemoveSpecifications: (state, action) => {
      let newArr = [];
      newArr = state.specifications.filter(
        (item, index) => index !== action.payload
      );
      state.specifications = newArr;
    },

    setValueSpecifications: (state, action) => {
      const { indexSpec, valueLabel, valueSpec } = action.payload;
      state.specifications = state.specifications.map((item, index) => {
        if (indexSpec === index) {
          return {
            ...item,
            label: valueLabel,
            value: valueSpec,
          };
        }
        return item;
      });
    },

    setErrorField: (state, action) => {
      state.errors = action.payload;
    },
  },

  extraReducers: {},
});

export const {
  setName,
  setPrice,
  setThumbnail,
  setDescription,
  setImages,
  setEmptyImages,
  setDeleteImage,
  setCategory,
  setBrand,
  setIsDiscount,
  setDiscount,
  setSpecifications,
  setAddSpecifications,
  setRemoveSpecifications,
  setValueSpecifications,
  setErrorField,
} = formProductsSlice.actions;

export default formProductsSlice.reducer;
