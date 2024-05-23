import { useTheme } from '@/theme';
import React, { useEffect, useState } from 'react';
import { View, Modal, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import Cross from '@/theme/assets/images/cross.png';
import { useFocusEffect } from '@react-navigation/native';
import { ImageVariant } from '../../atoms';
import RadioButton from '../../RadioButton/RadioButton';
import ClassSuccessfullySelectedBottomSheet from './ClassSuccessfullySelectedBottomSheet';
import PrimaryGradient from '../../template/LinearGradient/PrimaryGradient';
import { useDispatch, useSelector } from 'react-redux';
import { MMKV } from 'react-native-mmkv';
import { selectSectionName } from '../../../store/redux-slice/SelectedSubjectSlice';

const storage = new MMKV();
const ReferandearnBottomsheet = (props) => {
  const dispatch = useDispatch();
  const {
    setOpenSelectClassBottomSheet,
    openSelectClassBottmSheet,
    setShowSelectedClass,
    showSelecTedClass,
  } = props;
  const { colors, layout, fonts } = useTheme();
  const isTablet = useSelector((state) => state.screenDimensions.isTablet);
  const currentSection = useSelector((state) => state.selectedSubject.sectionName);
  const [openClassSuccessfullySelectedBottomSheet, setOpenClassSuccessfullySelectedBottomSheet] =
    useState(false);
  // const teacherDetails = useSelector((state) => state.teacherClass.classesDataContainer);
  const [option, setOption] = useState('first');
  const [classes, setClasses] = useState([]);
  const [isFirst, setIsFirst] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      setOption(currentSection);
    }, [currentSection])
  );

  useEffect(() => {
    const resFromMMKV = storage.getString('teacherDetails');
    const teacherDetails = resFromMMKV ? JSON.parse(resFromMMKV) : null;
    if (teacherDetails != null) {
      setClasses(teacherDetails);
      if (isFirst) {
        setOption(teacherDetails[0]?.sectionName);
        setShowSelectedClass(teacherDetails[0]?.sectionName);
        setIsFirst(false);
      }
    }
  }, [openSelectClassBottmSheet]);

  const handleSlideDown = () => {
    setOpenSelectClassBottomSheet(false);
    setOption((prev) => prev);
  };

  const handleOptionChange = (op) => {
    setOption(op);
  };

  const handleApply = () => {
    setOpenSelectClassBottomSheet(false);
    setShowSelectedClass(option);
    dispatch(selectSectionName(option));
    setOpenClassSuccessfullySelectedBottomSheet(true);
  };

  return (
    <View style={styles.container}>
      <Modal visible={openSelectClassBottmSheet} animationType="slide" transparent={true}>
        <View style={isTablet ? styles.modalTabContainer : styles.modalContainer}>
          <View
            style={[
              styles.bottomSheetContent,
              isTablet && {
                width: '50%',
                alignSelf: 'center',
                borderBottomEndRadius: 10,
                borderBottomStartRadius: 10,
              },
              { backgroundColor: colors.bottomSheetBackgroundColor },
            ]}
          >
            <TouchableOpacity
              onPress={handleSlideDown}
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
                onPress={handleSlideDown}
              ></TouchableOpacity>
            </View>
            <View style={[layout.paddingForCard, styles.scrollContainer]}>
              <Text
                style={[fonts.size_20, fonts.bold, { color: colors.white, paddingBottom: '2%' }]}
              >
                Select Class
              </Text>
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: '5%' }}
              >
                {classes.length !== 0 &&
                  classes?.map((ele) => (
                    <TouchableOpacity
                      key={ele.sectionName}
                      style={styles.radioButtonContainer}
                      onPress={() => handleOptionChange(ele.sectionName)}
                      activeOpacity={1}
                    >
                      <View style={{ marginLeft: 10 }}>
                        <RadioButton isActive={option === ele.sectionName} />
                      </View>
                      <Text style={[styles.radioButtonText, fonts.size_14, fonts.fontWeignt_600]}>
                        {ele.sectionName}
                      </Text>
                    </TouchableOpacity>
                  ))}
              </ScrollView>
            </View>
            <View style={styles.footer}>
              <TouchableOpacity
                onPress={() => setOpenSelectClassBottomSheet(false)}
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
                onPress={handleApply}
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
                    Apply
                  </Text>
                </PrimaryGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <ClassSuccessfullySelectedBottomSheet
        setOpenClassSuccessfullySelectedBottomSheet={setOpenClassSuccessfullySelectedBottomSheet}
        openClassSuccessfullySelectedBottomSheet={openClassSuccessfullySelectedBottomSheet}
        showSelecTedClass={showSelecTedClass}
        openFrom={'SelectClassBottomSheet'}
      />
    </View>
  );
};

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
    height: 52,
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
    padding: 20,
    backgroundColor: 'transparent', // Change if needed
  },
  footerButton: {
    width: '48%',
    height: 48,
    borderRadius: 8,
  },
});

export default ReferandearnBottomsheet;
