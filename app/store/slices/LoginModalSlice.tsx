import { createSlice } from "@reduxjs/toolkit";

interface LoginModalState {
  isOpen: boolean;
}

const initialState: LoginModalState = {
  isOpen: false,
};

const loginModalSlice = createSlice({
  name: "loginModal",
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

export const { onClose, onOpen} = loginModalSlice.actions;
export default loginModalSlice.reducer;
