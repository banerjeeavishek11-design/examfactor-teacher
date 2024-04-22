import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  subject: {},
  sectionName: {},
};

const selectedSubjectSlice = createSlice({
  name: 'selectedSubject',
  initialState,
  reducers: {
    selectSubjectAction: (state, action) => {
      state.subject = action.payload;
    },
    selectSectionName: (state, action) => {
      state.sectionName = action.payload;
    },
  },
});

export const { selectSubjectAction, selectSectionName } = selectedSubjectSlice.actions;
export default selectedSubjectSlice.reducer;
