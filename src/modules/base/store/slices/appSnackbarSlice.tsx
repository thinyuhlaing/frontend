import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type SnackbarType = "error" | "success";

interface AppSnackbarSlice {
  type: SnackbarType;
  open: boolean;
  title: string;
  message: string;
}

const initialState: AppSnackbarSlice = {
  type: "success",
  open: false,
  title: "",
  message: "",
};

export const appSnackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    showSnackbar: (
      state,
      action: PayloadAction<{
        type: SnackbarType;
        title: string;
        message: string;
      }>,
    ) => {
      const { type, message, title } = action.payload;
      state.open = true;
      state.type = type;
      state.title = title;
      state.message = message;
    },
    hideSnackbar: (state) => {
      state.open = false;
    },
  },
});

export const { showSnackbar, hideSnackbar } = appSnackbarSlice.actions;
export default appSnackbarSlice.reducer;
