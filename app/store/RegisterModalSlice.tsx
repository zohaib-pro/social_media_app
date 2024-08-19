import { createSlice } from "@reduxjs/toolkit";

interface RegisterModalState {
  isOpen: boolean;
}

const initialState: RegisterModalState = {
  isOpen: true,
};

const registerModalSlice = createSlice({
  name: "registerModal",
  initialState,
  reducers: {
    onClose: (state) => {
      state.isOpen = false;
    },
  },
});

export const { onClose } = registerModalSlice.actions;
export default registerModalSlice.reducer;
