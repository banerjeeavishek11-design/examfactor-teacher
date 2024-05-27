import { StyleSheet, Text, View, Modal, TouchableOpacity, Pressable } from 'react-native';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/theme';
import { ImageVariant } from '@/components/atoms';
import { useSelector } from 'react-redux';
import Cross from '@/theme/assets/images/cross.png';
import Calender from '@/theme/assets/images/calendar.png';
import PrimaryGradient from '@/components/template/LinearGradient/PrimaryGradient';
import ScheduleTimeBottomSheet from './ScheduleTimeBottomSheet';
import { Calendar } from 'react-native-calendars';
import ClassSuccessfullySelectedBottomSheet from '../Home/ClassSuccessfullySelectedBottomSheet';
import { MMKV } from 'react-native-mmkv';
import moment from 'moment';
import { activateClassworkByTeacher } from '../../../services/ActivateServices/activeClassworkServices';
import { notifyMessage } from '../../../utils/error-toast-API';

const storage = new MMKV();
const ScheduleTestActivationBottomSheet = ({
  visible,
  setActivateConfirmationModalVisible,
  totalTime,
  assessmentId,
  assessmentName,
  totalQuestions,
  chapterId,
  getClassworks,
  setForDate,
}) => {
  const { layout, colors, fonts } = useTheme();
  const sectionName = useSelector((state) => state.selectedSubject.sectionName);
  const subjectId = useSelector((state) => state.selectedSubject.subject);
  const userName = storage.getString('username');
  const resFromMMKV = storage.getString('teacherDetails');
  const teacherDetails = resFromMMKV ? JSON.parse(resFromMMKV) : null;
  const isTablet = useSelector((state) => state.screenDimensions.isTablet);
  const [fromModalVisible, setFromModalVisible] = useState(false);
  const [toModalVisible, setToModalVisible] = useState(false);
  const [selectedToTime, setSelectedToTime] = useState(null);
  const [selectedFromTime, setSelectedFromTime] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [gradeId, setGradeId] = useState(null);
  const [partnerSectionId, setPartnerSectionId] = useState(null);
  const [openClassSuccessfullySelectedBottomSheet, setOpenClassSuccessfullySelectedBottomSheet] =
    useState(false);
  const today = new Date();

  useEffect(() => {
    if (teacherDetails && teacherDetails.length > 0) {
      for (let item of teacherDetails) {
        if (item.sectionName === sectionName) {
          setGradeId(item.gradeId);
          setPartnerSectionId(item.id);
          return;
        }
      }
    }
  }, [sectionName, teacherDetails]);

  const handleCalendarToggle = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateSelect = (date) => {
    const formattedDate = formatDate(date);
    setSelectedDate(formattedDate);
    setForDate(date);
    setShowCalendar(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  // Combine the date and time strings
  const fromDateTimeString = `${selectedDate} ${selectedFromTime}`;
  const toDateTimeString = `${selectedDate} ${selectedToTime}`;

  // Format the combined date and time strings using moment
  const startTestDateTime = moment(fromDateTimeString, 'dddd, MMMM D h:mm a').toISOString();
  const endTestDateTime = moment(toDateTimeString, 'dddd, MMMM D h:mm a').toISOString();

  const topicActivated = () => {
    const requiredBody = {
      gradeId: gradeId,
      partnerSectionId: partnerSectionId,
      subjectId: subjectId,
      chapterId: chapterId,
      teacherId: userName,
      assessmentId: assessmentId,
      startTestDateTime: startTestDateTime,
      endTestDateTime: endTestDateTime,
      startTimeStr: selectedFromTime,
      assessmentName: assessmentName,
      totalTime: totalTime,
      totalQuestions: totalQuestions,
    };

    setActivateConfirmationModalVisible(false);
    setSelectedDate(null);
    setSelectedFromTime(null);
    setSelectedToTime(null);
    activateClassworkByTeacher(requiredBody)
      .then(() => {
        return new Promise((resolve) => {
          setTimeout(() => {
            getClassworks();
            setOpenClassSuccessfullySelectedBottomSheet(true);
            resolve(true);
          }, 1000);
        });
      })
      .catch((error) => {
        if (error?.response?.status === 400 || error.code === 'ERR-10') {
          notifyMessage('error fetching classworks' + error);
        }
      });
  };

  return (
    <View style={styles.container}>
      <Modal visible={visible} animationType="slide" transparent={true}>
        <View style={isTablet ? styles.modalTabContainer : styles.modalContainer}>
          <View
            style={[
              styles.bottomSheetContent,
              isTablet && {
                width: '55%',
                alignSelf: 'center',
                borderBottomEndRadius: 10,
                borderBottomStartRadius: 10,
              },
              {
                backgroundColor: colors.bottomSheetBackgroundColor,
                height: showCalendar ? 550 : 350,
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => setActivateConfirmationModalVisible(false)}
              style={[{ position: 'absolute', top: -35, left: '92%' }]}
            >
              <ImageVariant
                testID="brand-img"
                style={{ width: 16, height: 16, tintColor: colors.gray200 }}
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
              <View style={{ width: '80%' }}>
                <Text
                  style={[fonts.size_20, fonts.bold, { color: colors.white, textAlign: 'left' }]}
                >
                  Schedule Test Activation
                </Text>
                <Text
                  style={[
                    fonts.size_14,
                    fonts.fontWeight_small,
                    { color: '#E2E2E2', marginVertical: isTablet ? '1%' : '4%' },
                  ]}
                >
                  Test timing : {totalTime} Min
                </Text>
              </View>
              <View style={isTablet && [layout.row, { gap: 20 }]}>
                <View style={isTablet && { marginTop: '5%' }}>
                  {!showCalendar && (
                    <View
                      style={[
                        !isTablet && layout.fullWidth,
                        layout.paddingForCard,
                        layout.display,
                        layout.rowHCenter,
                        layout.justifyBetween,
                        {
                          backgroundColor: colors.screenBackgroundColor,
                          height: !isTablet && 50,
                          padding: isTablet && 12,
                          gap: isTablet && 10,
                          borderRadius: 12,
                        },
                      ]}
                    >
                      <Text style={[fonts.size_12, fonts.fontWeignt_600, { color: colors.white }]}>
                        {selectedDate ? selectedDate : 'Select Date'}
                      </Text>

                      <TouchableOpacity onPress={handleCalendarToggle}>
                        <ImageVariant
                          testID="brand-img"
                          style={{ width: 16, height: 16, tintColor: 'white' }}
                          source={Calender}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                    </View>
                  )}

                  {showCalendar && (
                    <Calendar
                      style={{
                        height: 'auto',
                        borderRadius: 12,
                      }}
                      onDayPress={(day) => handleDateSelect(day.dateString)}
                      // theme={customTheme}
                      theme={{
                        backgroundColor: 'black',
                        calendarBackground: 'black',
                        textSectionTitleColor: 'gray',
                        selectedDayBackgroundColor: '#00adf5',
                        selectedDayTextColor: '#ffffff',
                        todayTextColor: 'white',
                        dayTextColor: 'white',
                        textDisabledColor: '#d9e1e8',
                        dotColor: '#00adf5',
                        selectedDotColor: '#ffffff',
                        arrowColor: '#0084FF',
                        monthTextColor: 'white',
                        indicatorColor: 'blue',
                        textDayFontFamily: 'monospace',
                        textMonthFontFamily: 'monospace',
                        textDayHeaderFontFamily: 'monospace',
                        textDayFontWeight: '300',
                        textMonthFontWeight: 'bold',
                        textDayHeaderFontWeight: '300',
                        textDayFontSize: 16,
                        textMonthFontSize: 16,
                        textDayHeaderFontSize: 16,
                        todayBackgroundColor: '#0084FF',
                      }}
                      // minDate={new Date().toISOString().split('T')[0]}
                      minDate={today.toISOString().split('T')[0]}
                    />
                  )}
                </View>

                <View
                  style={[
                    layout.display,
                    layout.rowHCenter,
                    layout.justifyBetween,
                    isTablet && { gap: 20 },
                    { marginTop: '5%' },
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
                    <Text style={[fonts.alignCenter, { color: 'white' }]}>
                      {selectedFromTime ? selectedFromTime : 'Select from Time'}
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
                    <Text style={[fonts.alignCenter, { color: 'white' }]}>
                      {selectedToTime ? selectedToTime : 'Select to Time'}
                    </Text>
                  </Pressable>
                </View>
              </View>

              <View style={styles.footer}>
                <TouchableOpacity
                  onPress={() => setActivateConfirmationModalVisible(false)}
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
                    topicActivated();
                  }}
                >
                  <PrimaryGradient
                    styleProp={[layout.justifyCenter, { height: '100%', borderRadius: 8 }]}
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
      <ClassSuccessfullySelectedBottomSheet
        setOpenClassSuccessfullySelectedBottomSheet={setOpenClassSuccessfullySelectedBottomSheet}
        openClassSuccessfullySelectedBottomSheet={openClassSuccessfullySelectedBottomSheet}
        openFrom={'ActivateScheduleConfirmationBottomTab'}
      />
    </View>
  );
};

export default ScheduleTestActivationBottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  modalTabContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  bottomSheetContent: {
    height: 550,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderTopWidth: 2,
    borderColor: 'gray',
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slideIndicator: {
    width: 88,
    height: 8,
    backgroundColor: '#2F2B3A',
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: '4%',
  },
  line: {
    position: 'absolute',
    top: '65%',
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
    alignItems: 'center',
  },
  smallBtn: {
    height: 32,
    borderRadius: 9,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    backgroundColor: '#22222F',
    borderRadius: 12,
    height: 60,
    marginTop: 8,
    width: '100%',
  },
  radioButtonText: {
    marginLeft: 8,
    color: '#fff',
  },
  scrollContainer: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //   padding: 20,
    paddingBottom: 20,
    paddingTop: 10,
    backgroundColor: 'transparent',
    marginTop: '5%',
  },
  footerButton: {
    width: '48%',
    height: 48,
    borderRadius: 8,
  },
});
