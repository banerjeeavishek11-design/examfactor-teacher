import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: {},
  userRole: '',
};

const loginAuthSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginAction: (state, action) => {
      state.data = action.payload;
    },
    updateUserRole: (state, action) => {
      state.userRole = action.payload;
    },
  },
});

export const { loginAction, updateUserRole } = loginAuthSlice.actions;
export default loginAuthSlice.reducer;
