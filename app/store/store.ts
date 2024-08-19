"use client";
// app/store.ts

import { configureStore } from "@reduxjs/toolkit";
import loginModalReducer from "./LoginModalSlice";
import RegisterModalReducer from "./RegisterModalSlice";

const store = configureStore({
  reducer: {
    loginModal: loginModalReducer,
    registerModal: RegisterModalReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
