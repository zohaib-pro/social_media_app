"use client";
// app/store.ts

import { configureStore } from "@reduxjs/toolkit";
import loginModalReducer from "./slices/LoginModalSlice";
import RegisterModalReducer from "./slices/RegisterModalSlice";
import PostsReducer from "./slices/PostsSlice";

const store = configureStore({
  reducer: {
    loginModal: loginModalReducer,
    registerModal: RegisterModalReducer,
    posts: PostsReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
