import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chapterId: '',
  chapList: [],
  chapListIndex: 0,
};

const selectedChapterSlice = createSlice({
  name: 'selectedChapter',
  initialState,
  reducers: {
    selectChapterAction: (state, action) => {
      state.chapList = action.payload;
    },
    selectChapterIndexAction: (state, action) => {
      state.chapListIndex = action.payload;
    },
    selectChapterIdAction: (state, action) => {
      state.chapterId = action.payload;
    },
  },
});

export const { selectChapterAction, selectChapterIndexAction, selectChapterIdAction } =
  selectedChapterSlice.actions;
export default selectedChapterSlice.reducer;
