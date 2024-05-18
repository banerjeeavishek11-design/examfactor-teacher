import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { ImageVariant } from '@/components/atoms';
import LeftArrow from '@/theme/assets/images/leftarrow.png';
import UpArrow from '@/theme/assets/images/uparrow.png';
import DownArrow from '@/theme/assets/images/Downarrow.png';
import Star from '@/theme/assets/images/Star.png';

const HomeWorkDetailsScreen = () => {
  const { colors, layout, fonts } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { chapterDetails } = route.params || {};
  const [expandedCards, setExpandedCards] = useState({});

  const toggleContent = (id) => {
    setExpandedCards((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <SafeScreen>
      <View style={[layout.fullWidth, layout.paddingForFullScreen]}>
        <TouchableOpacity
          style={[layout.display, layout.rowHCenter, { paddingBottom: '1%' }]}
          onPress={() =>
            navigation.navigate('StudentWiseReportScreen', {
              chapterDetails: chapterDetails,
            })
          }
        >
          <ImageVariant
            testID="brand-img"
            style={{
              width: 10,
              height: 11,
              tintColor: colors.backButtonColor,
              top: -2,
            }}
            source={LeftArrow}
            resizeMode="contain"
          />
          <Text style={[fonts.size_16, fonts.bold, { color: colors.backButtonColor, left: 5 }]}>
            Chapter Covered
          </Text>
        </TouchableOpacity>
        <ScrollView contentContainerStyle={{ paddingBottom: '15%' }}>
          {chapterDetails?.map((ele, i) => {
            return (
              <TouchableOpacity
                onPress={() => toggleContent(ele.id)}
                key={ele.id}
                style={[
                  layout.fullWidth,
                  layout.paddingForCard,
                  {
                    backgroundColor: colors.cardBackgroundColor,
                    height: expandedCards[ele.id] ? 'auto' : 78,
                    borderRadius: 16,
                    marginTop: '3%',
                  },
                ]}
              >
                <View style={[layout.display, layout.rowHCenter, layout.justifyBetween]}>
                  <View>
                    <Text style={[fonts.size_14, fonts.bold, { color: colors.white }]}>
                      {`C${i + 1}`}: {ele?.chapter}
                    </Text>
                    <Text
                      style={[
                        fonts.size_12,
                        fonts.fontWeight_small,
                        { color: '#FFAB48' },
                        { marginTop: '2%' },
                      ]}
                    >{`${ele?.strongAreaCount} strong & ${ele?.weakAreaCount} weak areas indentified`}</Text>
                  </View>
                  <View style={{ width: '5%' }}>
                    <TouchableOpacity>
                      {expandedCards[ele.id] ? (
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
                </View>
                {expandedCards[ele.id] ? (
                  <>
                    {ele?.topic?.map((topic, i) => {
                      return (
                        <View
                          key={i}
                          style={[
                            layout.fullWidth,
                            layout.paddingForCard,
                            {
                              backgroundColor: colors.bottomSheetBackgroundColor,
                              height: 'auto',
                              borderRadius: 14,
                              marginTop: '4%',
                            },
                          ]}
                        >
                          <Text
                            style={[
                              fonts.size_16,
                              fonts.fontWeight_small,
                              { color: colors.white, marginBottom: '2%' },
                            ]}
                          >
                            {topic.topicName}
                          </Text>
                          {topic.subtopic.map((subtopic, i) => {
                            return (
                              <View key={i} style={[layout.row, layout.itemsCenter, { gap: 5 }]}>
                                <Text
                                  style={[
                                    fonts.size_13,
                                    fonts.fontWeight_small,
                                    { color: colors.backButtonColor, marginVertical: '2%' },
                                  ]}
                                >
                                  {subtopic.name}
                                </Text>
                                {subtopic.important ? (
                                  <Image style={{ width: 14, height: 14 }} source={Star} />
                                ) : null}
                              </View>
                            );
                          })}
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
    </SafeScreen>
  );
};

export default HomeWorkDetailsScreen;
