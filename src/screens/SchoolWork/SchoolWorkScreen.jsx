import { Image, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { SafeScreen } from '@/components/template';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@/theme';
import leftArrow from '../../theme/assets/images/gradientlefttarrow.png';
import rightArrow from '../../theme/assets/images/gradientrightarrow.png';
import { getChaptersBySubjectId } from '../../services/chapterListService';
import { notifyMessage } from '../../utils/error-toast-API';
import {
  selectChapterIdAction,
  selectChapterAction,
  // selectChapterIndexAction,
} from '../../store/redux-slice/SelectedChapterSlice';

import SchoolWorkTopTabNavigator from '@/navigators/SchoolWorkTopTabNavigator';

const SchoolWorkScreen = () => {
  const { colors, layout, fonts } = useTheme();
  const dispatch = useDispatch();
  const selectedSubjectId = useSelector((state) => state.selectedSubject.subject);
  const [showChapterName, setShowChapterName] = useState();
  // const [chapterId, setChapterId] = useState();
  const [chapList, setChapList] = useState([]);
  const [chapListIndex, setChapListIndex] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      getAllChaptersDetails(selectedSubjectId);
      // dispatch(selectChapterIndexAction(0));
      setChapListIndex(0);
    }, [selectedSubjectId])
  );

  useFocusEffect(
    React.useCallback(() => {
      setShowChapterName(chapList[chapListIndex]?.chapterDesc);
    }, [chapList[chapListIndex]])
  );

  const getAllChaptersDetails = (subjectId) => {
    // setIsLoading(true);
    getChaptersBySubjectId(subjectId)
      .then((res) => {
        res.data.chapters.sort((a, b) => a.displaySeq - b.displaySeq);
        setChapList(res.data.chapters);
        dispatch(selectChapterAction(res.data.chapters));
        dispatch(selectChapterIdAction(res.data.chapters[0].chapterId));
        // setChapterId(res.data.chapters[0].chapterId);
        // setIsLoading(false);
      })
      .catch((error) => {
        if (error?.response?.status === 400 || error.code === 'ERR-10') {
          notifyMessage('unabled to get chapter details');
        }
        // setIsLoading(false);
      });
  };

  const handleChapterChangePress = (type) => {
    const index = chapListIndex;
    if (type === 'right') {
      if (index + 1 >= chapList.length) {
        setChapListIndex(0);
        // dispatch(selectChapterIndexAction(0));
        dispatch(selectChapterIdAction(chapList[0].chapterId));
        // setChapterId(chapList[0].chapterId);
      } else {
        setChapListIndex((prev) => prev + 1);
        // dispatch(selectChapterIndexAction((prev) => prev + 1));
        dispatch(selectChapterIdAction(chapList[index + 1].chapterId));
        // setChapterId(chapList[index + 1].chapterId);
      }
    } else {
      if (index - 1 < 0) {
        setChapListIndex(chapList.length - 1);
        // dispatch(selectChapterIndexAction(chapList.length - 1));
        dispatch(selectChapterIdAction(chapList[chapList.length - 1].chapterId));
        // setChapterId(chapList[chapList.length - 1].chapterId);
      } else {
        setChapListIndex((prev) => prev - 1);
        // dispatch(selectChapterIndexAction((prev) => prev - 1));
        dispatch(selectChapterIdAction(chapList[index - 1].chapterId));
        // setChapterId(chapList[index - 1].chapterId);
      }
    }
  };

  return (
    <SafeScreen>
      <View
        style={[
          layout.row,
          layout.justifyBetween,
          layout.itemsCenter,
          layout.paddingForFullScreen,
          {
            backgroundColor: colors.headerBackgroundColor,
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => handleChapterChangePress('left')}
          disabled={chapListIndex === 0}
          style={{ opacity: chapListIndex === 0 ? 0.5 : 1 }}
        >
          <Image source={leftArrow} style={{ width: 28, height: 16 }} />
        </TouchableOpacity>
        <Text
          style={[
            fonts.size_14,
            fonts.bold,
            { color: colors.white, width: '80%', textAlign: 'center' },
          ]}
        >
          C{chapListIndex + 1} : {showChapterName}
        </Text>
        <TouchableOpacity
          onPress={() => handleChapterChangePress('right')}
          style={{
            opacity: chapListIndex === chapList.length - 1 ? 0.5 : 1,
          }}
          disabled={chapListIndex === chapList.length - 1}
        >
          <Image source={rightArrow} style={{ width: 28, height: 16 }} />
        </TouchableOpacity>
      </View>
      <SchoolWorkTopTabNavigator />
    </SafeScreen>
  );
};

export default SchoolWorkScreen;
