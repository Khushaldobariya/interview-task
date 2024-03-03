import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  data: null,
};

export const dialogSlice = createSlice({
    name: "dialog",
    initialState,
    reducers: {
      openDialog: (state, action) => {

        state.isOpen = true;
        state.data = action.payload || null;
      },
      closeDialog: (state) => {


        state.isOpen = false;
        state.data = null;
      },
    },
  });

export const {openDialog, closeDialog} =dialogSlice.actions

export default dialogSlice.reducer
