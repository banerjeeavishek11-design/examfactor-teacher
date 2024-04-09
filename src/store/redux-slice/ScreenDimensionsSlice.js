import { createSlice } from '@reduxjs/toolkit';
import { Dimensions } from 'react-native';
const initialState = {
  screenWidth: Dimensions.get('window').width,
  isTablet: Dimensions.get('window').width >= 600,
};
const screenDimensionsSlice = createSlice({
  name: 'screenDimensions',
  initialState,
  reducers: {
    updateScreenDimensions(state) {
      state.screenWidth = Dimensions.get('window').width;
      state.isTablet = Dimensions.get('window').width >= 600;
    },
  },
});
export const { updateScreenDimensions } = screenDimensionsSlice.actions;
export default screenDimensionsSlice.reducer;
