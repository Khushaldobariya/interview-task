import { createSlice } from "@reduxjs/toolkit";

let productsArray = [
  {
    id: 1,
    productName: "Product 1",
    vendorName: [
      {
        name: "Vendor 1",
        is_main: true,
        variants: [
          { name: "Variant 1", number: "1" },
          { name: "Variant 2", number: "2" },
          { name: "Variant 3", number: "3" },
        ],
      },
    ],

    description: "Short description of Product 1",
  },
  {
    id: 2,
    productName: "Product 2",
    vendorName: [
      {
        name: "Vendor 2",
        is_main: true,
        variants: [
          { name: "Variant A", number: "1" },
          { name: "Variant B", number: "2" },
          { name: "Variant C", number: "3" },
        ],
      },
    ],

    description: "Short description of Product 2",
  },
  {
    id: 3,
    productName: "Product 3",
    vendorName: [
      {
        name: "Vendor 3",
        is_main: true,
        variants: [
          { name: "Variant X", number: "1" },
          { name: "Variant Y", number: "2" },
          { name: "Variant Z", number: "3" },
        ],
      },
    ],

    description: "Short description of Product 3",
  },
  {
    id: 4,
    productName: "Product 4",
    vendorName: [
      {
        name: "Vendor 4",
        is_main: false,
        variants: [
          { name: "Variant Red", number: "1" },
          { name: "Variant Blue", number: "2" },
          { name: "Variant Green", number: "3" },
        ],
      },
    ],

    description: "Short description of Product 4",
  },
  {
    id: 5,
    productName: "Product 5",
    vendorName: [
      {
        name: "Vendor 5",
        is_main: false,
        variants: [
          { name: "Variant Small", number: "1" },
          { name: "Variant Medium", number: "2" },
          { name: "Variant Large", number: "3" },
        ],
      },
    ],

    description: "Short description of Product 5",
  },
];
const initialState = {
  product: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProduct: (state) => {
      state.product = productsArray;
    },
    createProduct: (state, action) => {
      const newProduct = {
        ...action.payload,
        id: state.product.length + 1,
      };
      state.product.push(newProduct);
    },
    editProduct: (state, action) => {
      state.product = state.product.map((data) => {
        return action.payload.id == data.id ? action.payload.values : data;
      });
    },
    deleteProduct: (state, action) => {
      state.product = state.product.filter(
        (data) => data.id !== action.payload
      );
    },
  },
});

export const { getProduct, createProduct, editProduct, deleteProduct } =
  productSlice.actions;

export default productSlice.reducer;
