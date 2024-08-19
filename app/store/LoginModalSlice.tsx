import { createSlice } from "@reduxjs/toolkit";

interface LoginModalState {
  isOpen: boolean;
}

const initialState: LoginModalState = {
  isOpen: true,
};

const loginModalSlice = createSlice({
  name: "loginModal",
  initialState,
  reducers: {
    onClose: (state) => {
      state.isOpen = false;
    },
  },
});

export const { onClose } = loginModalSlice.actions;
export default loginModalSlice.reducer;
