import { Image, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Searchbar } from 'react-native-paper';
import Search from '@/theme/assets/images/search.png';
import { useTheme } from '@/theme';
import { useSelector } from 'react-redux';
import { SafeScreen } from '@/components/template';
import ToggleButton from '@/components/template/ToggleButton/ToggleButton';
import ActivateDiagnosticConfirmationBottomSheet from '@/components/BottomSheet/Activate/ActivateDiagnosticConfirmationBottomSheet';
import { MMKV } from 'react-native-mmkv';
import { getSubjectsBySubjectId } from '../../services/chapterListService';
import { notifyMessage } from '../../utils/error-toast-API';
import leftArrow from '../../theme/assets/images/gradientlefttarrow.png';
import rightArrow from '../../theme/assets/images/gradientrightarrow.png';

const storage = new MMKV();

const DiagnosticTab = () => {
  const { layout, fonts, colors } = useTheme();
  const [activateConfirmationModalVisible, setActivateConfirmationModalVisible] = useState(false);
  const [searchChapterName, setSearchChapterName] = useState([]);
  const [chapListIndex, setChapListIndex] = useState(0);
  const [chapList, setChapList] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState();
  const [unitId, setUnitId] = useState('');
  const [selectedChapterId, setSelectedChapterId] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');
  const selectedSubjectId = useSelector((state) => state.selectedSubject.subject);

  useEffect(() => {
    getAllChaptersDetails(selectedSubjectId);
  }, []);

  useEffect(() => {
    if (chapList[chapListIndex]?.unitId) {
      setUnitId(chapList[chapListIndex]?.unitId);
      chapList[chapListIndex].chapters.sort((a, b) => a.displaySeq - b.displaySeq);
      setSelectedTopic(chapList[chapListIndex].chapters);
      setSearchChapterName(chapList[chapListIndex].chapters);
    }
  }, [chapList, chapListIndex]);

  const handleChapterChangePress = (type) => {
    const index = chapListIndex;
    if (type === 'right') {
      if (index + 1 >= chapList.length) {
        setChapListIndex(0);
      } else {
        setChapListIndex((prev) => prev + 1);
      }
    } else {
      if (index - 1 < 0) {
        setChapListIndex(chapList.length - 1);
      } else {
        setChapListIndex((prev) => prev - 1);
      }
    }
  };

  const getAllChaptersDetails = (subjectId) => {
    const access_token = storage.getString('access_token');
    getSubjectsBySubjectId(access_token, subjectId)
      .then((res) => {
        res.data.units.sort((a, b) => a.displaySeq - b.displaySeq);
        setChapList(res.data.units);
      })
      .catch((error) => {
        if (error?.response?.status === 400 || error.code === 'ERR-10') {
          notifyMessage('unabled to get chapter details');
        }
      });
  };

  const handleToggleClick = (chapterId) => {
    setActivateConfirmationModalVisible(true);
    setSelectedChapterId(chapterId);
  };

  const onSearchChapters = (search) => {
    const searchItem = selectedTopic.filter((ele) =>
      ele.chapterDesc.toLowerCase().includes(search.toLowerCase())
    );
    setSearchChapterName(searchItem);
  };

  return (
    <SafeScreen>
      <View style={[layout.paddingForFullScreen]}>
        <Searchbar
          placeholder="Search Chapter"
          placeholderTextColor="rgba(275, 275, 275, 0.5)"
          iconColor="rgba(275, 275, 275, 0.5)"
          inputStyle={[fonts.size_14, fonts.fontWeignt_600, { color: colors.white, right: 10 }]}
          icon={() => (
            <Image source={Search} resizeMode="contain" style={{ width: 14, height: 14 }} />
          )}
          onChangeText={onSearchChapters}
          style={{
            backgroundColor: '#09070E',
            borderColor: 'rgba(275, 275, 275, 0.5)',
            borderWidth: 1,
            borderRadius: 8,
          }}
          clearButtonMode="while-editing"
          selectionColor={colors.buttonTextColor}
        />
        <View style={[layout.row, layout.justifyBetween, { marginTop: '4%' }]}>
          <TouchableOpacity
            onPress={() => handleChapterChangePress('left')}
            disabled={chapListIndex === 0}
            style={{ opacity: chapListIndex === 0 ? 0.5 : 1 }}
          >
            <Image source={leftArrow} style={{ width: 28, height: 16 }} />
          </TouchableOpacity>
          <Text
            style={[
              fonts.size_13,
              fonts.bold,
              { color: colors.white, width: '80%', textAlign: 'center' },
            ]}
          >
            Unit {chapListIndex + 1} : {chapList[chapListIndex]?.displayNames[0].name}
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
        <Text
          style={[
            fonts.size_13,
            fonts.fontWeight_small,
            { color: colors.gray200, marginTop: '4%' },
          ]}
        >
          Use toggle to activate the homework
        </Text>
        <ScrollView contentContainerStyle={{ paddingBottom: '30%' }}>
          <View
            style={[
              layout.fullWidth,
              layout.paddingForCard,
              {
                backgroundColor: colors.cardBackgroundColor,
                borderRadius: 14,
                marginTop: '3%',
                marginBottom: '2%',
              },
            ]}
          >
            {searchChapterName?.map((ele, index) => {
              return (
                <View
                  style={{
                    borderBottomWidth: index + 1 != selectedTopic.length ? 1 : 0,
                    borderBottomColor: index + 1 != selectedTopic.length ? colors.gray400 : null,
                    marginVertical: '3%',
                  }}
                  key={ele.chapterId}
                >
                  <View style={[layout.row, layout.justifyBetween, layout.itemsCenter]}>
                    <View style={[{ marginBottom: '4%', width: '70%' }]}>
                      <Text style={[fonts.size_16, fonts.fontWeignt_600, { color: colors.white }]}>
                        {`C${index + 1}`}: {ele.chapterDesc}
                      </Text>
                    </View>
                    <View style={{ width: '0%' }}>
                      <ToggleButton
                        setActivateConfirmationModalVisible={setActivateConfirmationModalVisible}
                        chapterId={ele.chapterId}
                        // unitId={unitId}
                        // topics={ele.topics}
                        onToggleClick={(chapterId) => {
                          handleToggleClick(chapterId);
                          setSelectedChapter(`C${index + 1} : ${ele.chapterDesc}`);
                        }}
                        // isEnabled={isEnabled}
                      />
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
      <ActivateDiagnosticConfirmationBottomSheet
        visible={activateConfirmationModalVisible}
        closeModal={setActivateConfirmationModalVisible}
        selectedChapter={selectedChapter}
        unitId={unitId}
        chapterId={selectedChapterId}
      />
    </SafeScreen>
  );
};

export default DiagnosticTab;
