import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Searchbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@/theme";
import { SafeScreen } from "@/components/template";
import Search from "@/theme/assets/images/search.png";
import Arrow from "@/theme/assets/images/arrow.png";

const studentDetails = [
  {
    id: 1,
    name: "Viney Dua",
    achievableScore: 30,
    progressPercentage: 75,
    activatedTopic: "05",
    subTitle: "Progress is calculated based on the activated topics.",
  },
  {
    id: 2,
    name: "Ratnakar Gautam",
    achievableScore: 40,
    progressPercentage: 60,
    activatedTopic: "05",
    subTitle: "Progress is calculated based on the activated topics.",
  },
  {
    id: 3,
    name: "Sarthak Chadha",
    achievableScore: 80,
    progressPercentage: 50,
    activatedTopic: "05",
    subTitle: "Progress is calculated based on the activated topics.",
  },
  {
    id: 4,
    name: "Ankit",
    achievableScore: 10,
    progressPercentage: 45,
    activatedTopic: "05",
    subTitle: "Progress is calculated based on the activated topics.",
  },
  {
    id: 5,
    name: "Avishek",
    achievableScore: 50,
    progressPercentage: 45,
    activatedTopic: "05",
    subTitle: "Progress is calculated based on the activated topics.",
  },
  {
    id: 6,
    name: "Aman",
    achievableScore: 90,
    progressPercentage: 45,
    activatedTopic: "05",
    subTitle: "Progress is calculated based on the activated topics.",
  },
  {
    id: 7,
    name: "Prasenjit",
    achievableScore: 78,
    progressPercentage: 45,
    activatedTopic: "05",
    subTitle: "Progress is calculated based on the activated topics.",
  },
  {
    id: 8,
    name: "Saikat",
    achievableScore: 98,
    progressPercentage: 45,
    activatedTopic: "05",
    subTitle: "Progress is calculated based on the activated topics.",
  },
  {
    id: 9,
    name: "Saptarshi",
    achievableScore: 43,
    progressPercentage: 45,
    activatedTopic: "05",
    subTitle: "Progress is calculated based on the activated topics.",
  },
  {
    id: 10,
    name: "Subho",
    achievableScore: 66,
    progressPercentage: 45,
    activatedTopic: "05",
    subTitle: "Progress is calculated based on the activated topics.",
  },
];

const StudentLevelScreen = () => {
  const {
    colors,
    layout,
    fonts,
  } = useTheme();
  const navigation = useNavigation();
  const [searchChapterName, setSearchChapterName] = useState([]);

  useEffect(() => {
    setSearchChapterName(studentDetails);
  }, []);

  const onSearchChapters = (search) => {
    const searchItem = studentDetails.filter((ele) =>
      ele.name.toLowerCase().includes(search.toLowerCase())
    );
    setSearchChapterName(searchItem);
  };

  const goToStudentWiseReportScreen=(studentDetails)=>{
    console.log('first')
    navigation.navigate('StudentWiseReportScreen',{studentDetails:studentDetails})
  }

  return (
    <SafeScreen>
      <View style={[layout.paddingForFullScreen, { paddingTop: "0%" }]}>
        <View style={{ width: "100%", marginTop: "4%", paddingBottom: "3%" }}>
          <Searchbar
            placeholder="Search Chapters"
            placeholderTextColor="rgba(275, 275, 275, 0.5)"
            iconColor="rgba(275, 275, 275, 0.5)"
            inputStyle={[
              fonts.size_14,
              fonts.fontWeignt_600,
              { color: colors.white, right: 10 },
            ]}
            icon={() => (
              <Image
                source={Search}
                resizeMode="contain"
                style={{ width: 14, height: 14 }}
              />
            )}
            onChangeText={onSearchChapters}
            style={{
              backgroundColor: "#09070E",
              borderColor: "rgba(275, 275, 275, 0.5)",
              borderWidth: 1,
              borderRadius: 8,
              // fontSize: 20,
            }}
            clearButtonMode="while-editing"
            selectionColor={colors.buttonTextColor}
          />
        </View>
        <ScrollView contentContainerStyle={{ paddingBottom: "50%" }}>
          {searchChapterName?.map((ele) => {
            return (
              <Pressable
                key={ele.id}
                style={[
                  layout.fullWidth,
                  layout.paddingForCard,
                  {
                    backgroundColor: colors.cardBackgroundColor,
                    height: 53,
                    borderRadius: 8,
                    marginTop: "3%",
                  },
                ]}
                onPress={()=>goToStudentWiseReportScreen(ele)}
              >
                <View
                  style={[
                    layout.display,
                    layout.rowHCenter,
                    layout.justifyBetween,
                  ]}
                >
                  <Text
                    style={[
                      fonts.size_14,
                      fonts.fontWeignt_600,
                      { color: colors.white },
                    ]}
                  >
                    {ele.name}
                  </Text>
                  <TouchableOpacity>
                    <Image
                      source={Arrow}
                      resizeMode="contain"
                      style={{
                        width: 10,
                        height: 10,
                        tintColor: colors.termsLinkColor,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    </SafeScreen>
  );
};

export default StudentLevelScreen;

const styles = StyleSheet.create({});
