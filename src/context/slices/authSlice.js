import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem("user-data"))
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user-data", JSON.stringify(action.payload))
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user-data")
    },
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;