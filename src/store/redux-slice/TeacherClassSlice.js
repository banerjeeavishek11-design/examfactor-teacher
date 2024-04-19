import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  classesDataContainer: [],
};

const teacherClassesSlice = createSlice({
  name: 'classes',
  initialState,
  reducers: {
    showSelectedClasses: (state, action) => {
      state.classesDataContainer = action.payload;
    },
  },
});

export const { showSelectedClasses } = teacherClassesSlice.actions;
export default teacherClassesSlice.reducer;
