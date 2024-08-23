import { User } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UsersState {
  data: User[];
}

const initialState: UsersState = {
  data: [],
};

const usersSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.data = action.payload;
    },
  },
});

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;
