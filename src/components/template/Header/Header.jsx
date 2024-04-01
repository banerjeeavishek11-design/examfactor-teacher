import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useRef } from "react";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import DownArrow from "@/theme/assets/images/Downarrow.png";
import User from "@/theme/assets/images/user.png";
import { useTheme } from "@/theme";
import { ImageVariant } from "@/components/atoms";
import SelectClassBottomSheet from "@/components/BottomSheet/Home/SelectClassBottomSheet";



const Header = ({ goToCoinScreen, openCategoryBottomSheet, refresh }) => {
  const {
    colors,
    variant,
    changeTheme,
    layout,
    gutters,
    fonts,
    components,
    backgrounds,
  } = useTheme();
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const productScrollRef = useRef(null);

  const [subjects, setSubjects] = useState([
    { id: 1, subjectName: "Physics", isChecked: true },
    { id: 2, subjectName: "Chemistry", isChecked: false },
    { id: 3, subjectName: "Mathematics", isChecked: false },
    { id: 4, subjectName: "Bengali", isChecked: false },
    { id: 5, subjectName: "English", isChecked: false },
  ]);
  const [openSelectClassBottmSheet, setOpenSelectClassBottomSheet] =
    useState(false);
    const [showSelecTedClass,setShowSelectedClass] = useState('10-B')

  const handleOpenDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

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
    <View style={[layout.paddingForFullScreen]}>
      <View
        style={[
          layout.rowHCenter,
          //   layout.justifyBetween,
          layout.justifyBetween,
          layout.display,
          { width: "100%" },
        ]}
      >
        <View>
          <TouchableOpacity onPress={() => setOpenSelectClassBottomSheet(true)}>
            <View style={[layout.rowHCenter]}>
              <Text
                style={[
                  fonts.size_18,
                  fonts.fontWeight_extraSmall,
                  {
                    color: colors.white,
                    maxWidth: 200,
                    minWidth: 100,
                  },
                ]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                Class {showSelecTedClass}
              </Text>

              <ImageVariant
                testID="brand-img"
                style={{ width: 14, height: 9 }}
                source={DownArrow}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => handleOpenDrawer()}
            style={[layout.rowHCenter, layout.justifyBetween, { width: "10%" }]}
          >
            <ImageVariant
              testID="brand-img"
              style={{ width: 23, height: 23 }}
              source={User}
              resizeMode="contain"
            />
            <ImageVariant
              testID="brand-img"
              style={{ width: 10, height: 12, left: 5, tintColor: colors.gray200 }}
              source={DownArrow}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        ref={scrollViewRef}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{}}
      >
        <View style={[layout.display, layout.rowHCenter]}>
          {subjects.map((ele, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.button,
                {
                  borderColor: ele.isChecked ? "#27D4FA" : "#22222F",
                  borderWidth: ele.isChecked ? 2 : 0,
                },
              ]}
              onPress={() => {
                handleButtonPress(i, ele);
              }}
            >
              <Text
                style={[
                  ele.isChecked == true
                    ? styles.activeButton
                    : styles.buttonText,
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
      <SelectClassBottomSheet
        openSelectClassBottmSheet={openSelectClassBottmSheet}
        setOpenSelectClassBottomSheet={setOpenSelectClassBottomSheet}
        setShowSelectedClass={setShowSelectedClass}
        showSelecTedClass={showSelecTedClass}
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  badge: {
    backgroundColor: "#E53777",
    borderRadius: 12,
    minWidth: 20,
    paddingVertical: 2,
    paddingHorizontal: 6,
    justifyContent: "center",
    alignItems: "center",
    top: "5%",
    zIndex: 5,
    position: "relative",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "white",
  },
  button: {
    height: 45,
    borderRadius: 12,
    backgroundColor: "#22222F",
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    marginTop: "3%",
  },
  activeButton: {
    color: "#27D4FA",
  },
  buttonText: {
    color: "#7A7A82",
  },
});
