import { createSlice } from "@reduxjs/toolkit";

interface RegisterModalState {
  isOpen: boolean;
}

const initialState: RegisterModalState = {
  isOpen: false,
};

const registerModalSlice = createSlice({
  name: "registerModal",
  initialState,
  reducers: {
    onClose: (state) => {
      state.isOpen = false;
    },
    onOpen: (state) => {
      state.isOpen = true;
    }
  },
});

export const { onClose,onOpen } = registerModalSlice.actions;
export default registerModalSlice.reducer;
