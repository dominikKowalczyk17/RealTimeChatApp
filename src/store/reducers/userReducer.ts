import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  roles: string[];
  isAuthenticated: boolean;
}

const initialState: UserState = {
  roles: [],
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserRoles(state, action: PayloadAction<string[]>) {
      state.roles = action.payload;
      state.isAuthenticated = action.payload.length > 0;
    },
    clearUser(state) {
      state.roles = [];
      state.isAuthenticated = false;
    },
  },
});

export const { setUserRoles, clearUser } = userSlice.actions;
export default userSlice.reducer;
