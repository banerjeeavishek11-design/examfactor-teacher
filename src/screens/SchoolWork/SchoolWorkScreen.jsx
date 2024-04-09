import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '@/theme';
import { Header, SafeScreen } from '@/components/template';
import SchoolWorkTopTabNavigator from '@/navigators/SchoolWorkTopTabNavigator';
import GradientLeftArrow from '@/theme/assets/images/gradientlefttarrow.png';
import GradientRightArrow from '@/theme/assets/images/gradientrightarrow.png';

const SchoolWorkScreen = () => {
  const { colors, layout, fonts } = useTheme();
  const productScrollRef = useRef(null);
  const scrollViewRef = useRef(null);
  const isTablet = useSelector((state) => state.screenDimensions.isTablet);

  const [subjects, setSubjects] = useState([
    { id: 1, subjectName: 'Physics', isChecked: true },
    { id: 2, subjectName: 'Chemistry', isChecked: false },
    { id: 3, subjectName: 'Mathematics', isChecked: false },
    { id: 4, subjectName: 'Bengali', isChecked: false },
    { id: 5, subjectName: 'English', isChecked: false },
  ]);

  const handleButtonPress = (index) => {
    const updatedSubjects = subjects.map((subject, i) => {
      if (i === index) {
        return { ...subject, isChecked: true };
      } else {
        return { ...subject, isChecked: false };
      }
    });
    setSubjects(updatedSubjects);
    const buttonWidth = 100;
    const scrollX = index * buttonWidth;
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: scrollX, y: 0, animated: true });
    }
    if (productScrollRef.current) {
      productScrollRef.current?.scrollTo({ x: 0, animated: true });
    }
  };

  return (
    <SafeScreen>
      <View style={{ backgroundColor: isTablet ? '' : colors.headerBackgroundColor }}>
        <Header />
        <ScrollView
          ref={scrollViewRef}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[
            layout.paddingForFullScreen,
            { paddingTop: '0%', paddingBottom: '2%', marginTop: '2%' },
          ]}
        >
          <View style={[layout.display, layout.rowHCenter]}>
            {subjects.map((ele, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.button,
                  {
                    borderColor: ele.isChecked ? '#27D4FA' : '#22222F',
                    borderWidth: ele.isChecked ? 2 : 0,
                  },
                ]}
                onPress={() => {
                  handleButtonPress(i, ele);
                }}
              >
                <Text
                  style={[
                    ele.isChecked == true ? styles.activeButton : styles.buttonText,
                    fonts.size_14,
                    fonts.bold,
                  ]}
                >
                  {ele.subjectName}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <View
          style={[
            layout.display,
            layout.rowHCenter,
            layout.justifyBetween,
            { paddingLeft: '4%', paddingRight: '4%' },
          ]}
        >
          <TouchableOpacity>
            <Image
              source={GradientLeftArrow}
              resizeMode="contain"
              style={{ width: 16, height: 9 }}
            />
          </TouchableOpacity>

          <Text
            style={[
              fonts.size_16,
              fonts.bold,
              { color: colors.white, marginRight: isTablet ? '8%' : null },
            ]}
          >
            C1: Motion
          </Text>
          <TouchableOpacity>
            <Image
              source={GradientRightArrow}
              resizeMode="contain"
              style={{ width: 16, height: 9 }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <SchoolWorkTopTabNavigator />
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 45,
    borderRadius: 12,
    backgroundColor: '#22222F',
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  activeButton: {
    color: '#27D4FA',
  },
  buttonText: {
    color: '#7A7A82',
  },
});

export default SchoolWorkScreen;
