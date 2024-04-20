import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  subject: {},
};

const selectedSubjectSlice = createSlice({
  name: 'selectedSubject',
  initialState,
  reducers: {
    selectSubjectAction: (state, action) => {
      state.subject = action.payload;
    },
  },
});

export const { selectSubjectAction } = selectedSubjectSlice.actions;
export default selectedSubjectSlice.reducer;
