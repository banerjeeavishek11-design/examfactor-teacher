import { StatusBar, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useTheme } from '@/theme';
import LeftArrow from '@/theme/assets/images/leftarrow.png';
import { ImageVariant } from '@/components/atoms';
import { SafeScreen } from '@/components/template';
import UpArrow from '@/theme/assets/images/supportUpArrow.png';
import DownArrow from '@/theme/assets/images/supportDownArrow.png';
import { DrawerActions } from '@react-navigation/native';

const SupportScreen = ({ navigation }) => {
  const [allAccordian, setAllAccordian] = useState({
    name: 'FREQUENTLY ASKED QUESTIONS',
    buttonDetails: [
      {
        id: 1,
        title: 'What kind of question will be there?',
        subTitle:
          'The test has questions varying in levels from Easy to moderate to difficult. Live test will be scheduled online. These tests will be available till 3 months from unlocking the test. 1 Mock & 1 Diagnostic is already Live',
        isExpand: true,
      },
      {
        id: 2,
        title: 'How long is this course?',
        subTitle:
          'Registration for the CUET 2024 is expected to begin in the first week of February 2024.',
        isExpand: false,
      },
      {
        id: 3,
        title: 'Will there be a report after completion?',
        subTitle:
          'The test has questions varying in levels from Easy to moderate to difficult. Live test will be scheduled online. These tests will be available till 3 months from unlocking the test. 1 Mock &amp; 1 Diagnostic is already Live',
        isExpand: false,
      },
      {
        id: 4,
        title: 'How long is this course?',
        subTitle:
          'The test has questions varying in levels from Easy to moderate to difficult. Live test will be scheduled online. These tests will be available till 3 months from unlocking the test. 1 Mock &amp; 1 Diagnostic is already Live',
        isExpand: false,
      },
      {
        id: 5,
        title: 'Will there be a report after completion?',
        subTitle:
          'The test has questions varying in levels from Easy to moderate to difficult. Live test will be scheduled online. These tests will be available till 3 months from unlocking the test. 1 Mock &amp; 1 Diagnostic is already Live',
        isExpand: false,
      },
      {
        id: 6,
        title: 'How long is this course?',
        subTitle:
          'The test has questions varying in levels from Easy to moderate to difficult. Live test will be scheduled online. These tests will be available till 3 months from unlocking the test. 1 Mock &amp; 1 Diagnostic is already Live',
        isExpand: false,
      },
    ],
  });
  const toggleExpanded = (id, isExpand) => {
    let obj = {
      ...allAccordian,
    };
    let selectedAccordianIndex = obj.buttonDetails.findIndex((ele) => ele.id == id);
    obj.buttonDetails[selectedAccordianIndex].isExpand = !isExpand;
    setAllAccordian(obj);
  };
  const { layout, fonts, colors } = useTheme();
  return (
    <SafeScreen>
      <View style={[layout.paddingForFullScreen]}>
        <StatusBar backgroundColor="#0D0D1B" barStyle="light-content" />
        <View style={[]}>
          <View
            style={[layout.row, layout.justifyBetween, layout.itemsCenter, { display: 'flex' }]}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
                // navigation.dispatch(DrawerActions.openDrawer());
              }}
            >
              <View style={[layout.rowHCenter, layout.display]}>
                <ImageVariant
                  testID="brand-img"
                  style={{ width: 7, height: 11 }}
                  source={LeftArrow}
                  resizeMode="contain"
                />
                <Text
                  style={[fonts.size_16, fonts.bold, { color: colors.backButtonColor, left: 5 }]}
                >
                  Support
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginTop: '10%' }}>
          <View>
            <Text
              style={[
                fonts.size_14,
                fonts.fontWeignt_600,
                { color: colors.white, opacity: 0.4, marginBottom: '2%' },
              ]}
            >
              {allAccordian.name}
            </Text>
          </View>
          {allAccordian.buttonDetails.map((ele) => (
            <View
              style={[styles.arrowView, { backgroundColor: colors.cardBackgroundColor }]}
              key={ele.id}
            >
              <TouchableOpacity onPress={() => toggleExpanded(ele.id, ele.isExpand)}>
                <View style={[layout.row, layout.justifyBetween]}>
                  <View style={{ width: '95%' }}>
                    <Text style={[fonts.size_14, fonts.fontWeight_small, { color: colors.white }]}>
                      {ele.title}
                    </Text>
                  </View>
                  {ele.isExpand ? (
                    <ImageVariant source={UpArrow} resizeMode="contain" />
                  ) : (
                    <ImageVariant source={DownArrow} resizeMode="contain" />
                  )}
                </View>
                <View>
                  {ele.isExpand ? (
                    <View style={{ marginTop: 12 }}>
                      <Text
                        style={[
                          fonts.size_14,
                          fonts.fontWeight_small,
                          { color: colors.white, opacity: 0.7 },
                        ]}
                      >
                        {ele.subTitle}
                      </Text>
                    </View>
                  ) : null}
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </SafeScreen>
  );
};

export default SupportScreen;

const styles = StyleSheet.create({
  arrowView: {
    borderRadius: 16,
    overflow: 'hidden',
    width: '100%',
    height: 'auto',
    borderWidth: 1,
    padding: '4%',
    marginTop: '3%',
  },
});
