import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { SafeScreen } from '@/components/template';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '@/theme';
import { ImageVariant } from '@/components/atoms';
import LeftArrow from '@/theme/assets/images/leftarrow.png';

const ClassWorkdetailsScreen = () => {
  const { colors, layout, fonts } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { classworkInsightDetails } = route.params || {};
  const assessmentType = classworkInsightDetails?.map((val) => val.productName);
  const uniqueAssessmentType = Array.from(new Set(assessmentType));

  const newData = uniqueAssessmentType?.map((val) => {
    const assessmentData = classworkInsightDetails
      .filter((ele) => ele.productName === val)
      .map((res) => {
        return {
          assessmentName: res.assessmentName,
          subtitle: res.subtitle,
          content: res.content,
          percentage: res.percentage,
          score: res.score,
          fullMark: res.fullMark,
          id: res.id,
          assessmentId: res.assessmentId,
          testEndTimeStamp: res.testEndTimeStamp,
          accuracy: res.accuracy,
        };
      });
    return {
      assessmentType: val,
      assessmentData,
    };
  });

  return (
    <SafeScreen>
      <View style={[layout.fullWidth, layout.paddingForFullScreen]}>
        <TouchableOpacity
          style={[layout.display, layout.rowHCenter, { paddingBottom: '1%' }]}
          onPress={() =>
            navigation.navigate('StudentWiseReportScreen', {
              classworkInsightDetails: classworkInsightDetails,
            })
          }
        >
          <ImageVariant
            testID="brand-img"
            style={{
              width: 10,
              height: 11,
              tintColor: colors.backButtonColor,
              top: -1,
            }}
            source={LeftArrow}
            resizeMode="contain"
          />
          <Text style={[fonts.size_16, fonts.bold, { color: colors.backButtonColor, left: 5 }]}>
            CLASS WORK INSIGHTS
          </Text>
        </TouchableOpacity>
        <ScrollView contentContainerStyle={{ paddingBottom: '10%' }}>
          {newData?.length > 0 ? (
            <>
              <Text style={[fonts.size_14, fonts.bold, { color: colors.white, opacity: 0.6 }]}>
                PHYSICS DIAGNOSTIC KIT
              </Text>
              {newData?.map((ele, i) => {
                return (
                  <View key={i}>
                    {ele.assessmentData?.map((item) => {
                      // Given millisecond timestamp
                      const timestamp = item?.testEndTimeStamp;
                      // Create a Date object using the timestamp
                      const date = new Date(timestamp);
                      // Format the date string
                      const formattedDate = new Intl.DateTimeFormat('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                        // hour: "numeric",
                        // minute: "numeric",
                        // second: "numeric",
                      }).format(date);
                      return (
                        <View
                          key={item.id}
                          style={[
                            layout.fullWidth,
                            layout.paddingForCard,
                            {
                              height: 200,
                              backgroundColor: colors.cardBackgroundColor,
                              borderRadius: 12,
                              marginTop: '4%',
                            },
                          ]}
                        >
                          <View style={{ width: '95%' }}>
                            <Text style={[fonts.size_14, fonts.bold, { color: colors.white }]}>
                              {item?.assessmentName || '-'}
                            </Text>
                          </View>
                          <Text
                            style={[
                              fonts.size_12,
                              fonts.fontWeight_small,
                              {
                                color: colors.white,
                                fontFamily: 'Poppins-Italic',
                                opacity: 0.7,
                              },
                            ]}
                          >
                            Completed on {formattedDate || '-'}
                          </Text>

                          <View style={styles.box}>
                            <View
                              style={[
                                layout.display,
                                layout.row,
                                layout.justifyBetween,
                                { paddingHorizontal: 10, top: '4%' },
                              ]}
                            >
                              <Text
                                style={[
                                  fonts.size_14,
                                  fonts.fontWeight_small,
                                  { color: colors.white, opacity: 0.6 },
                                ]}
                              >
                                Accuracy Percentage
                              </Text>
                              <Text
                                style={[
                                  fonts.size_14,
                                  fonts.fontWeight_small,
                                  { color: colors.white },
                                ]}
                              >
                                {Math.round(item?.accuracy * 100) / 100 || '0.00'}%
                              </Text>
                            </View>
                            <View style={styles.line} />
                            <View
                              style={[
                                layout.display,
                                layout.row,
                                layout.justifyBetween,
                                { paddingHorizontal: 10, top: '13%' },
                              ]}
                            >
                              <Text
                                style={[
                                  fonts.size_14,
                                  fonts.fontWeight_small,
                                  { color: colors.white, opacity: 0.6 },
                                ]}
                              >
                                Score
                              </Text>
                              <Text
                                style={[
                                  fonts.size_14,
                                  fonts.fontWeight_small,
                                  { color: colors.white },
                                ]}
                              >
                                {item?.score || '0'}/{item.fullMark || '-'}
                              </Text>
                            </View>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                );
              })}
            </>
          ) : (
            <>
              <Text
                style={[
                  fonts.size_16,
                  fonts.fontWeight_small,
                  fonts.alignCenter,
                  { color: colors.white, marginTop: '90%' },
                ]}
              >
                No Data Available
              </Text>
            </>
          )}
        </ScrollView>
      </View>
    </SafeScreen>
  );
};

export default ClassWorkdetailsScreen;

const styles = StyleSheet.create({
  box: {
    width: '100%',
    height: 100,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    position: 'relative',
    marginTop: '5%',
  },
  line: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    marginHorizontal: -1,
  },
});
