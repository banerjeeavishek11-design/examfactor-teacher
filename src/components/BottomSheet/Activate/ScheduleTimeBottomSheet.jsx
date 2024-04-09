import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useTheme } from "@/theme";

const fromTimeData = [
  { id: 1, time: "11:00 am" },
  { id: 2, time: "11:30 am" },
  { id: 3, time: "12:00 am" },
  { id: 4, time: "12:30 am" },
  { id: 5, time: "1:00 pm" },
  { id: 6, time: "1:30 am" },
  { id: 7, time: "2:00 am" },
];
const toTimeData = [
  { id: 1, time: "11:30 am" },
  { id: 2, time: "12:00 am" },
  { id: 3, time: "12:30 am" },
  { id: 4, time: "1:00 am" },
  { id: 5, time: "1:30 pm" },
  { id: 6, time: "2:00 am" },
  { id: 7, time: "2:30 am" },
];

const ScheduleTimeBottomSheet = (props) => {
  const {
    fromModalVisible,
    setFromModalVisible,
    setSelectedToTime,
    toModalVisible,
    setSelectedFromTime,
    setToModalVisible,
  } = props;
  const { layout, fonts, colors } = useTheme();

  const handleFromTimeSelection = (time) => {
    setSelectedToTime(time);
    setFromModalVisible(false);
  };

  const handleToTimeSelection = (time) => {
    setSelectedFromTime(time);
    setToModalVisible(false);
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={fromModalVisible}
      >
        <View style={styles.fromModalView}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {fromTimeData?.map((ele) => {
              return (
                <View
                  key={ele.id}
                  style={{
                    width: 150,
                    backgroundColor: "#22222F",
                    height: 42,
                    borderRadius: 12,
                    marginTop: "3%",
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => handleFromTimeSelection(ele.time)}
                  >
                    <Text
                      style={[
                        fonts.size_12,
                        fonts.fontWeignt_600,
                        { color: colors.white, left: 8 },
                      ]}
                    >
                      {ele.time}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </Modal>
      <Modal animationType="slide" transparent={true} visible={toModalVisible}>
        <View style={styles.toModalView}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {toTimeData?.map((ele) => {
              return (
                <View
                  key={ele.id}
                  style={{
                    width: 150,
                    backgroundColor: "#22222F",
                    height: 42,
                    borderRadius: 12,
                    marginTop: "3%",
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => handleToTimeSelection(ele.time)}
                  >
                    <Text
                      style={[
                        fonts.size_12,
                        fonts.fontWeignt_600,
                        { color: colors.white, left: 8 },
                      ]}
                    >
                      {ele.time}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default ScheduleTimeBottomSheet;

const styles = StyleSheet.create({
  fromModalView: {
    margin: '4%',
    width: 194,
    height: 300,
    backgroundColor: "#000000",
    borderRadius: 20,
    padding: "4%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginTop: "84%",
  },
  toModalView: {
    margin: '48%',
    width: 194,
    height: 300,
    // backgroundColor: "#000000",
    backgroundColor: "#000000",
    borderRadius: 20,
    padding: "4%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginTop: "84%",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
