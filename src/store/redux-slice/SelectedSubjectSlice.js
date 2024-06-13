import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  subject: {},
  sectionName: '',
  subjectName: [],
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
    selectSubjectName: (state, action) => {
      state.subjectName = action.payload;
    },
  },
});

export const { selectSubjectAction, selectSectionName, selectSubjectName } =
  selectedSubjectSlice.actions;
export default selectedSubjectSlice.reducer;
