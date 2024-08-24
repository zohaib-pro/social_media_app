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
    updateData(state, action: PayloadAction<User>) {
      const targetUser = state.data.find(item => item.id == action.payload.id);
      if (targetUser){
        targetUser.email = action.payload.email;
      }
    }
  },
});

export const { setUsers, updateData } = usersSlice.actions;
export default usersSlice.reducer;
