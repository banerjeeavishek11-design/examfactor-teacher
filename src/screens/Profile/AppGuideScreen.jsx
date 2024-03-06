import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useTheme } from "@/theme";
import LeftArrow from "@/theme/assets/images/leftarrow.png";
import { ImageVariant } from "@/components/atoms";
import { SafeScreen } from "@/components/template";
import Youtube from "@/theme/assets/images/youtubeVideo.png";
import UpArrow from "@/theme/assets/images/UpArrow.png";
import DownArrow from "@/theme/assets/images/Downarrow.png";
import RightArrow from '@/theme/assets/images/rightarrow.png'
import PracticeActive from "@/theme/assets/images/practiceactive.png";

const AppGuideScreen = ({ navigation }) => {
  const [allAccordian, setAllAccordian] = useState({
    buttonDetails: [
      {
        id: 1,
        title: "What is NEO?",
        subTitle:
          "The test has questions varying in levels from Easy to moderate to difficult. Live test will be scheduled online. These tests will be available till 3 months from unlocking the test. 1 Mock & 1 Diagnostic is already Live",
        isExpand: true,
      },
      {
        id: 2,
        title: "What is ExamFactor?",
        subTitle:
          "Registration for the CUET 2024 is expected to begin in the first week of February 2024.",
        isExpand: false,
      },
      {
        id: 3,
        title: "Difference b/w Assessment v/s Practice?",
        subTitle:
          "The test has questions varying in levels from Easy to moderate to difficult. Live test will be scheduled online. These tests will be available till 3 months from unlocking the test. 1 Mock &amp; 1 Diagnostic is already Live",
        isExpand: false,
      },
      {
        id: 4,
        title: "How can i improve my exam preparedness?",
        subTitle:
          "The test has questions varying in levels from Easy to moderate to difficult. Live test will be scheduled online. These tests will be available till 3 months from unlocking the test. 1 Mock &amp; 1 Diagnostic is already Live",
        isExpand: false,
      },
    ],
  });
  const toggleExpanded = (id, isExpand) => {
    let obj = {
      ...allAccordian,
    };
    let selectedAccordianIndex = obj.buttonDetails.findIndex(
      (ele) => ele.id == id
    );
    obj.buttonDetails[selectedAccordianIndex].isExpand = !isExpand;
    setAllAccordian(obj);
  };
  const { layout, fonts, colors } = useTheme();
  return (
    <SafeScreen>
      <View style={[styles.container]}>
        <StatusBar backgroundColor="#0D0D1B" barStyle="light-content" />
        <View style={{ padding: "4%" }}>
          <View
            style={[
              layout.row,
              layout.justifyBetween,
              layout.itemsCenter,
              { display: "flex" },
            ]}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View style={[layout.rowHCenter, layout.display]}>
                <ImageVariant
                  testID="brand-img"
                  style={{ width: 7, height: 11 }}
                  source={LeftArrow}
                  resizeMode="contain"
                />
                <Text
                  style={[
                    fonts.size_16,
                    fonts.bold,
                    { color: colors.backButtonColor, left: 5 },
                  ]}
                >
                  App Guide
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView>
          <View style={[layout.paddingForFullScreen, { paddingTop: "4%" }]}>
            {allAccordian.buttonDetails.map((ele, index) => (
              <View
                style={[
                  styles.arrowView,
                  { backgroundColor: colors.cardBackgroundColor },
                ]}
                key={ele.id}
              >
                <TouchableOpacity
                  onPress={() => toggleExpanded(ele.id, ele.isExpand)}
                >
                  <View style={[layout.row, layout.justifyBetween, layout.itemsCenter]}>
                    {index == 0 ? (
                      <ImageVariant
                        source={PracticeActive}
                        style={{ width: 40, height: 40 }}
                      />
                    ) : null}
                    <View style={{ width: "60%" }}>
                      <Text
                        style={[
                          fonts.size_16,
                          fonts.bold,
                          { color: colors.white },
                          
                            index == 0 ? {marginLeft: -30} : null
                          
                        ]}
                      >
                        {ele.title}
                      </Text>
                    </View>
                    {ele.isExpand ? (
                      <ImageVariant
                        style={{ width: 10, height: 11 }}
                        source={UpArrow}
                        resizeMode="contain"
                      />
                    ) : (
                      <ImageVariant
                        style={{ width: 10, height: 11 }}
                        source={DownArrow}
                        resizeMode="contain"
                      />
                    )}
                  </View>
                  <View>
                    {ele.isExpand ? (
                      <View style={{ marginTop: 12 }}>
                        {index == 0 ? (
                          <View>
                            <Image style={{marginBottom: '4%',borderRadius: 20,width: "100%",alignSelf: 'center'}} source={Youtube} />
                            <TouchableOpacity
                            style={[layout.row, layout.justifyBetween]}
                              onPress={()=>{}}
                            >
                              <Text
                                style={[
                                  fonts.size_14,
                                  fonts.bold,
                                  { color: colors.termsLinkColor },
                                ]}
                              >
                                GO TO NEO JOURNEY
                              </Text>
                              <ImageVariant style={{width:25, height:16, tintColor: colors.termsLinkColor}} source={RightArrow}/>
                            </TouchableOpacity>
                          </View>
                        ) : (
                          <Text
                            style={[
                              fonts.size_14,
                              fonts.fontWeight_small,
                              { color: colors.white, opacity: 0.7 },
                            ]}
                          >
                            {ele.subTitle}
                          </Text>
                        )}
                      </View>
                    ) : null}
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeScreen>
  );
};

export default AppGuideScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#09070E",
    width: "100%",
  },
  arrowView: {
    borderRadius: 16,
    overflow: "hidden",
    width: "100%",
    height: "auto",
    borderWidth: 1,
    padding: "4%",
    marginTop: "3%",
  },
});
