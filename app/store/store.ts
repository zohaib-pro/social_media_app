"use client";
// app/store.ts

import { configureStore } from "@reduxjs/toolkit";
import loginModalReducer from "./slices/LoginModalSlice";
import RegisterModalReducer from "./slices/RegisterModalSlice";
import PostsReducer from "./slices/PostsSlice";
import UsersSlice from "./slices/UsersSlice";
import ThisUserSlice from "./slices/ThisUserSlice";
import EditModalSlice from "./slices/EditModalSlice";

const store = configureStore({
  reducer: {
    loginModal: loginModalReducer,
    registerModal: RegisterModalReducer,
    editModal: EditModalSlice,
    posts: PostsReducer,
    users: UsersSlice,
    thisUser: ThisUserSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
