import { Post } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PostsState {
  data: Post[];
}

const initialState: PostsState = {
  data: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<Post[]>) {
      state.data = action.payload;
    },
    addPost(state, action: PayloadAction<Post>) {
      state.data.unshift(action.payload);
    },
  },
});

export const { setPosts, addPost } = postsSlice.actions;
export default postsSlice.reducer;
