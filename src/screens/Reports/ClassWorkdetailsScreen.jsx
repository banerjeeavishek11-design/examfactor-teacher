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
          {classworkInsightDetails.length > 0 ? (
            <>
              <Text style={[fonts.size_14, fonts.bold, { color: colors.white, opacity: 0.6 }]}>
                PHYSICS DIAGNOSTIC KIT
              </Text>
              {classworkInsightDetails.map((ele) => {
                return (
                  <View
                    key={ele.id}
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
                    <Text style={[fonts.size_14, fonts.bold, { color: colors.white }]}>
                      {ele.subjectName}
                    </Text>
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
                      {ele.completedDate}
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
                          style={[fonts.size_14, fonts.fontWeight_small, { color: colors.white }]}
                        >
                          {ele.accuracy}
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
                          style={[fonts.size_14, fonts.fontWeight_small, { color: colors.white }]}
                        >
                          {`${ele.score}/100`}
                        </Text>
                      </View>
                    </View>
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
