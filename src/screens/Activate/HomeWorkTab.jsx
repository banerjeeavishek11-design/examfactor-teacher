import { Image, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Searchbar } from 'react-native-paper';
import Search from '@/theme/assets/images/search.png';
import { useTheme } from '@/theme';
import { useSelector } from 'react-redux';
import { SafeScreen } from '@/components/template';
import ToggleButton from '@/components/template/ToggleButton/ToggleButton';
import DownArrow from '@/theme/assets/images/Downarrow.png';
import UpArrow from '@/theme/assets/images/uparrow.png';
import ActiveHomeworkConfirmBottomSheet from '@/components/BottomSheet/Activate/ActiveHomeworkConfirmBottomSheet';
import { getChaptersBySubjectId } from '../../services/chapterListService';
import { notifyMessage } from '../../utils/error-toast-API';

import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

const HomeWorkTab = () => {
  const { layout, fonts, colors } = useTheme();
  const selectedSubjectId = useSelector((state) => state.selectedSubject.subject);
  const [activateConfirmationModalVisible, setActivateConfirmationModalVisible] = useState(false);
  const [expandedCards, setExpandedCards] = useState({});
  const [searchChapterName, setSearchChapterName] = useState([]);
  const [chapterDetails, setChapterDetails] = useState([]);
  const [selectedChapterId, setSelectedChapterId] = useState('');
  const [selectedTopicId, setSelectedTopicId] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getAllChaptersDetails(selectedSubjectId);
    // setSearchChapterName(chapterDetails);
  }, [selectedSubjectId]);

  const onSearchChapters = (search) => {
    const searchItem = chapterDetails.filter((ele) =>
      ele.chapterDesc.toLowerCase().includes(search.toLowerCase())
    );
    setSearchChapterName(searchItem);
  };

  const toggleContent = (id) => {
    setExpandedCards((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleToggleClick = (chapterId, topicId, topics) => {
    setActivateConfirmationModalVisible(true);
    setSelectedChapterId(chapterId);
    setSelectedTopicId(topicId);
    setTopics(topics);
  };

  const getAllChaptersDetails = (subjectId) => {
    const access_token = storage.getString('access_token');
    getChaptersBySubjectId(access_token, subjectId)
      .then((res) => {
        setChapterDetails(res.data.chapters);
        setSearchChapterName(res.data.chapters);
      })
      .catch((error) => {
        if (error?.response?.status === 400 || error.code === 'ERR-10') {
          notifyMessage('Failed to get chapter details');
        }
      });
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
        <Text
          style={[
            fonts.size_13,
            fonts.fontWeight_small,
            { color: colors.gray200, marginTop: '4%', marginBottom: '2%' },
          ]}
        >
          Use toggle to activate the homework
        </Text>
        <ScrollView contentContainerStyle={{ paddingBottom: '30%' }}>
          {searchChapterName.map((ele, i) => {
            return (
              <TouchableOpacity
                onPress={() => toggleContent(ele.chapterId)}
                key={ele.chapterId}
                style={[
                  layout.fullWidth,
                  layout.paddingForCard,
                  {
                    backgroundColor: colors.cardBackgroundColor,
                    borderRadius: 14,
                    marginTop: '4%',
                    height: 'auto',
                  },
                ]}
              >
                <View style={[layout.display, layout.rowHCenter, layout.justifyBetween]}>
                  <Text
                    style={[fonts.size_14, fonts.fontWeignt_600, { color: colors.white }]}
                  >{`C${i + 1}: ${ele.chapterDesc}`}</Text>
                  <TouchableOpacity>
                    {expandedCards[ele.chapterId] ? (
                      <Image
                        style={{ width: 12, height: 8 }}
                        source={UpArrow}
                        resizeMode="contain"
                      />
                    ) : (
                      <Image
                        style={{ width: 12, height: 8 }}
                        source={DownArrow}
                        resizeMode="contain"
                      />
                    )}
                  </TouchableOpacity>
                </View>
                {expandedCards[ele.chapterId] ? (
                  <>
                    {ele.topics.map((item) => {
                      return (
                        <View key={item.topicId}>
                          <View
                            style={[
                              layout.display,
                              layout.rowHCenter,
                              layout.justifyBetween,
                              {
                                borderTopColor: colors.gray400,
                                borderTopWidth: 1,
                                paddingVertical: '5%',
                                marginTop: '2%',
                              },
                            ]}
                          >
                            <View style={{ width: '70%' }}>
                              <Text
                                style={[
                                  fonts.size_16,
                                  fonts.fontWeight_small,
                                  { color: colors.gray200 },
                                ]}
                              >
                                {item.topicDesc}
                              </Text>
                            </View>
                            <View style={{ width: '0%' }}>
                              <ToggleButton
                                chapterId={ele.chapterId}
                                topicId={item.topicId}
                                topics={ele.topics}
                                onToggleClick={(chapterId, topicId, topics) =>
                                  handleToggleClick(chapterId, topicId, topics)
                                }
                                isEnabled={isEnabled}
                              />
                            </View>
                          </View>
                        </View>
                      );
                    })}
                  </>
                ) : null}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      <ActiveHomeworkConfirmBottomSheet
        visible={activateConfirmationModalVisible}
        setActivateConfirmationModalVisible={setActivateConfirmationModalVisible}
        chapterId={selectedChapterId}
        topicId={selectedTopicId}
        setIsEnabled={setIsEnabled}
        topics={topics}
      />
    </SafeScreen>
  );
};

export default HomeWorkTab;
