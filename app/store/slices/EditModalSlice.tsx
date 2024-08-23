import { createSlice } from "@reduxjs/toolkit";

interface EditModalState {
  isOpen: boolean;
}

const initialState: EditModalState = {
  isOpen: false,
};

const registerModalSlice = createSlice({
  name: "editModal",
  initialState,
  reducers: {
    onClose: (state) => {
      state.isOpen = false;
    },
    onOpen: (state) => {
      state.isOpen = true;
    },
  },
});

export const { onClose, onOpen } = registerModalSlice.actions;
export default registerModalSlice.reducer;
