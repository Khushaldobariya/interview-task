import { configureStore } from "@reduxjs/toolkit";

import dialogReducer from "./dialog/dialogSlice";
import productReducer from "./Products/ProductSlice";
export const store = configureStore({
  reducer: {
    product: productReducer,
    dialog: dialogReducer,
  },
});
