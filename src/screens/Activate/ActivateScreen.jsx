import React from 'react';
import { SafeScreen } from '@/components/template';
import ActivateTopTabNavigator from '@/navigators/ActivateTopTabNavigator';

const ActivateScreen = () => {
  return (
    <SafeScreen>
      {/* <View style={{ backgroundColor: isTablet ? '' : colors.headerBackgroundColor }}>
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
      </View> */}
      <ActivateTopTabNavigator />
    </SafeScreen>
  );
};

export default ActivateScreen;
