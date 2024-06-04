import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './redux-slice/LoginSlice';
import screenDimensionsSlice from './redux-slice/ScreenDimensionsSlice';
import teacherClassSlice from './redux-slice/TeacherClassSlice';
import selectedSubjectSlice from './redux-slice/SelectedSubjectSlice';
import selectedChapterSlice from './redux-slice/SelectedChapterSlice';

const store = configureStore({
  reducer: {
    login: loginSlice,
    screenDimensions: screenDimensionsSlice,
    teacherClass: teacherClassSlice,
    selectedSubject: selectedSubjectSlice,
    selectedChapter: selectedChapterSlice,
  },
});
export default store;
