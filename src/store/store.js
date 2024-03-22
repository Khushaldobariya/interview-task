import { configureStore } from "@reduxjs/toolkit";

import dialogReducer from "./dialog/dialogSlice";
import EmployeeReducer from "./Employee/EmployeeSlice";
export const store = configureStore({
  reducer: {
    employee: EmployeeReducer,
    dialog: dialogReducer,
  },
});
