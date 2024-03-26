import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";

import React, { useState } from "react";
import { useTheme } from "@/theme";
import { ImageVariant } from "@/components/atoms";
import Cross from "@/theme/assets/images/cross.png";
import Calender from "@/theme/assets/images/calendar.png";
import PrimaryGradient from "@/components/template/LinearGradient/PrimaryGradient";
import ScheduleTimeBottomSheet from "./ScheduleTimeBottomSheet";
import { Calendar } from "react-native-calendars";
import { custom, date } from "zod";

const ScheduleTestActivationBottomSheet = ({
  visible,
  setActivateConfirmationModalVisible,
  callAfterDialogClose,
}) => {
  const { layout, colors, fonts } = useTheme();
  const [fromModalVisible, setFromModalVisible] = useState(false);
  const [toModalVisible, setToModalVisible] = useState(false);
  const [selectedToTime, setSelectedToTime] = useState(null);
  const [selectedFromTime, setSelectedFromTime] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const today = new Date();

  const topicActivated = (clickedBtnName) => {
    if (clickedBtnName === "YES") {
      setActivateConfirmationModalVisible(false);
      callAfterDialogClose(clickedBtnName);
    } else {
      setActivateConfirmationModalVisible(false);
    }
  };

  const handleCalendarToggle = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateSelect = (date) => {
    const formattedDate = formatDate(date);
    setSelectedDate(formattedDate);
    setShowCalendar(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: "long", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  // const customTheme = {
  //   backgroundColor: "black",
  //   calendarBackground: "black",
  // };

  return (
    <View style={styles.container}>
      <Modal visible={visible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View
            style={[
              styles.bottomSheetContent,
              {
                backgroundColor: colors.bottomSheetBackgroundColor,
                height: showCalendar ? 550 : 350,
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => setActivateConfirmationModalVisible(false)}
              style={[{ position: "absolute", top: -35, left: "92%" }]}
            >
              <ImageVariant
                testID="brand-img"
                style={{ width: 16, height: 16, tintColor: "white" }}
                source={Cross}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View style={styles.center}>
              <TouchableOpacity
                style={styles.slideIndicator}
                onPress={() => setActivateConfirmationModalVisible(false)}
              ></TouchableOpacity>
            </View>
            <View style={[layout.paddingForCard, styles.scrollContainer]}>
              <View style={{ width: "80%" }}>
                <Text
                  style={[
                    fonts.size_20,
                    fonts.bold,
                    { color: colors.white, textAlign: "left" },
                  ]}
                >
                  Schedule Test Activation
                </Text>
                <Text
                  style={[
                    fonts.size_14,
                    fonts.fontWeight_small,
                    { color: "#E2E2E2", marginVertical: "4%" },
                  ]}
                >
                  Test timing : 30 Min
                </Text>
              </View>
              <View>
                {!showCalendar && (
                  <View
                    style={[
                      layout.fullWidth,
                      layout.paddingForCard,
                      layout.display,
                      layout.rowHCenter,
                      layout.justifyBetween,
                      {
                        backgroundColor: colors.screenBackgroundColor,
                        height: 50,
                        borderRadius: 12,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        fonts.size_12,
                        fonts.fontWeignt_600,
                        { color: colors.white },
                      ]}
                    >
                      {selectedDate ? selectedDate : "Select Date"}
                    </Text>

                    <TouchableOpacity onPress={handleCalendarToggle}>
                      <ImageVariant
                        testID="brand-img"
                        style={{ width: 16, height: 16, tintColor: "white" }}
                        source={Calender}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </View>
                )}

                {showCalendar && (
                  <Calendar
                    style={{
                      height: "auto",
                      borderRadius: 12,
                    }}
                    onDayPress={(day) => handleDateSelect(day.dateString)}
                    // theme={customTheme}
                    theme={{
                      backgroundColor: "black",
                      calendarBackground: "black",
                      textSectionTitleColor: "gray",
                      selectedDayBackgroundColor: "#00adf5",
                      selectedDayTextColor: "#ffffff",
                      todayTextColor: "white",
                      dayTextColor: "white",
                      textDisabledColor: "#d9e1e8",
                      dotColor: "#00adf5",
                      selectedDotColor: "#ffffff",
                      arrowColor: "#0084FF",
                      monthTextColor: "white",
                      indicatorColor: "blue",
                      textDayFontFamily: "monospace",
                      textMonthFontFamily: "monospace",
                      textDayHeaderFontFamily: "monospace",
                      textDayFontWeight: "300",
                      textMonthFontWeight: "bold",
                      textDayHeaderFontWeight: "300",
                      textDayFontSize: 16,
                      textMonthFontSize: 16,
                      textDayHeaderFontSize: 16,
                      todayBackgroundColor: "#0084FF",
                    }}
                    // minDate={new Date().toISOString().split('T')[0]}
                    minDate={today.toISOString().split("T")[0]}
                    
                  />
                )}
              </View>

              <View
                style={[
                  layout.display,
                  layout.rowHCenter,
                  layout.justifyBetween,
                  { marginTop: "5%" },
                ]}
              >
                <Pressable
                  style={[
                    layout.justifyCenter,
                    {
                      backgroundColor: colors.screenBackgroundColor,
                      borderRadius: 12,
                      height: 42,
                      width: 130,
                    },
                  ]}
                  onPress={() => setFromModalVisible(true)}
                >
                  <Text style={[fonts.alignCenter, { color: "white" }]}>
                    {selectedToTime ? selectedToTime : "Select From Time"}
                  </Text>
                </Pressable>
                <View
                  style={{
                    width: 10,
                    height: 2,
                    backgroundColor: colors.white,
                  }}
                />
                <Pressable
                  style={[
                    layout.justifyCenter,
                    {
                      backgroundColor: colors.screenBackgroundColor,
                      borderRadius: 12,
                      height: 42,
                      width: 130,
                    },
                  ]}
                  onPress={() => setToModalVisible(true)}
                >
                  <Text style={[fonts.alignCenter, { color: "white" }]}>
                    {selectedFromTime ? selectedFromTime : "Select To Time"}
                  </Text>
                </Pressable>
              </View>

              <View style={styles.footer}>
                <TouchableOpacity
                  onPress={() => topicActivated("NO")}
                  style={[
                    layout.justifyCenter,
                    styles.footerButton,
                    {
                      backgroundColor: colors.cardBackgroundColor,
                    },
                  ]}
                >
                  <Text
                    style={[
                      fonts.size_16,
                      fonts.bold,
                      fonts.alignCenter,
                      { color: colors.termsLinkColor },
                    ]}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    layout.justifyCenter,
                    styles.footerButton,
                    {
                      backgroundColor: colors.termsLinkColor,
                    },
                  ]}
                  onPress={() => {
                    topicActivated("YES");
                  }}
                >
                  <PrimaryGradient
                    styleProp={[
                      layout.justifyCenter,
                      { height: "100%", borderRadius: 8 },
                    ]}
                  >
                    <Text
                      style={[
                        fonts.size_16,
                        fonts.bold,
                        fonts.alignCenter,
                        { color: colors.loginBtnTextColor },
                      ]}
                    >
                      Yes, Schedule
                    </Text>
                  </PrimaryGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <ScheduleTimeBottomSheet
        fromModalVisible={fromModalVisible}
        setFromModalVisible={setFromModalVisible}
        setSelectedToTime={setSelectedToTime}
        toModalVisible={toModalVisible}
        setToModalVisible={setToModalVisible}
        setSelectedFromTime={setSelectedFromTime}
      />
    </View>
  );
};

export default ScheduleTestActivationBottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  bottomSheetContent: {
    height: 550,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderTopWidth: 2,
    borderColor: "gray",
  },
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  slideIndicator: {
    width: 88,
    height: 8,
    backgroundColor: "#2F2B3A",
    borderRadius: 20,
    alignSelf: "center",
    marginTop: "4%",
  },
  line: {
    position: "absolute",
    top: "65%",
    left: 18,
    right: 18,
    borderBottomWidth: 1,
    // borderBottomColor: Colors.textGray,
  },
  button: {
    // backgroundColor: Colors.buttonBackgroundColor,
    padding: 10,
    paddingTop: 11,
    borderRadius: 9,
    alignItems: "center",
  },
  smallBtn: {
    height: 32,
    borderRadius: 9,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
    backgroundColor: "#22222F",
    borderRadius: 12,
    height: 60,
    marginTop: 8,
    width: "100%",
  },
  radioButtonText: {
    marginLeft: 8,
    color: "#fff",
  },
  scrollContainer: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    //   padding: 20,
    paddingBottom: 20,
    paddingTop: 10,
    backgroundColor: "transparent",
    marginTop: "5%",
  },
  footerButton: {
    width: "48%",
    height: 48,
    borderRadius: 8,
  },
});
