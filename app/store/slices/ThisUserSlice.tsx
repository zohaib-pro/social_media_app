import { User } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserSlice {
  data?: User;
}

const initialState: UserSlice = {
  data: undefined,
};

const userSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setThisUser(state, action: PayloadAction<User>) {
      state.data = action.payload;
    },
  },
});

export const { setThisUser } = userSlice.actions;
export default userSlice.reducer;
