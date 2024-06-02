import { Text, View, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import DownArrow from '@/theme/assets/images/Downarrow.png';
import User from '@/theme/assets/images/user.png';
import TabUser from '@/theme/assets/images/tabuser.png';
import { useTheme } from '@/theme';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { ImageVariant } from '@/components/atoms';
import SelectClassBottomSheet from '@/components/BottomSheet/Home/SelectClassBottomSheet';
import { getUserDetailsByUserId } from '../../../services/teacherService';
import { MMKV } from 'react-native-mmkv';
import {
  selectSubjectAction,
  selectSectionName,
  selectSubjectName,
} from '../../../store/redux-slice/SelectedSubjectSlice';

const storage = new MMKV();

const Header = () => {
  const { colors, layout, fonts } = useTheme();
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const isTablet = useSelector((state) => state.screenDimensions.isTablet);
  const currentSub = useSelector((state) => state.selectedSubject.subject);
  const currentSection = useSelector((state) => state.selectedSubject.sectionName);
  const dispatch = useDispatch();
  const resFromMMKV = storage.getString('teacherDetails');
  const teacherDetails = resFromMMKV ? JSON.parse(resFromMMKV) : null;
  const [openSelectClassBottmSheet, setOpenSelectClassBottomSheet] = useState(false);
  const [showSelecTedClass, setShowSelectedClass] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [userDetails, setUserDetails] = useState();
  const [selectedSubject, setSelectedSubject] = useState();

  useFocusEffect(
    React.useCallback(() => {
      setSelectedSubject(currentSub);
      setShowSelectedClass(currentSection);
    })
  );

  useFocusEffect(
    React.useCallback(() => {
      getTeacheDetails();
    }, [])
  );

  useEffect(() => {
    if (teacherDetails && teacherDetails.length > 0) {
      setShowSelectedClass(teacherDetails[0]?.sectionName);
      dispatch(selectSectionName(teacherDetails[0]?.sectionName));
    }
  }, []);

  useEffect(() => {
    let sectionName = teacherDetails?.filter((ele) => ele.sectionName === showSelecTedClass);
    let subject = sectionName[0]?.subjectList;
    subject?.sort((a, b) => a.displaySeq - b.displaySeq);
    let subjectList = subject?.map((ele) => ({
      subjectName: ele.name,
      subjectId: ele.subjectId,
    }));
    setSubjects(subjectList);
    if (subjectList) {
      setSelectedSubject(subjectList[0].subjectId);
    }
    if (subjectList && subjectList.length > 0) {
      dispatch(selectSubjectAction(subjectList[0].subjectId));
      dispatch(selectSubjectName(subjectList[0].subjectName));
    }
  }, [showSelecTedClass]);

  const handleOpenDrawer = () => {
    if (isTablet) {
      navigation.navigate('TabProfileScreen');
    } else {
      navigation.navigate('SideBarAuthedScreen');
    }
  };

  const handleButtonPress = (index, subject, subjectName) => {
    setSelectedSubject(subject);
    dispatch(selectSubjectAction(subject));
    dispatch(selectSubjectName(subjectName));
    const buttonWidth = 100;
    const scrollX = index * buttonWidth;
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: scrollX, y: 0, animated: true });
    }
  };

  const getTeacheDetails = () => {
    const userName = storage.getString('username');
    getUserDetailsByUserId(userName)
      .then((res) => {
        setUserDetails(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View
      style={{
        backgroundColor: isTablet ? '#191924' : colors.headerBackgroundColor,
        // height: isTablet ? 120 : 135,
      }}
    >
      <View
        style={[!isTablet && layout.paddingForFullScreen, { paddingTop: isTablet ? '2%' : '4%' }]}
      >
        <View
          style={[
            layout.rowHCenter,
            layout.justifyBetween,
            layout.display,
            { paddingHorizontal: '4%' },
          ]}
        >
          <View>
            <TouchableOpacity onPress={() => setOpenSelectClassBottomSheet(true)}>
              <View style={[layout.rowHCenter, { gap: 5, marginBottom: isTablet && '5%' }]}>
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
                  {showSelecTedClass}
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
          {isTablet ? (
            <TouchableOpacity onPress={() => handleOpenDrawer()}>
              {teacherDetails[0]?.profileImageUrl ? (
                <ImageVariant
                  testID="brand-img"
                  style={{ width: 50, height: 50, left: 5, borderRadius: 100, marginBottom: '8%' }}
                  source={{ uri: teacherDetails[0]?.profileImageUrl }}
                  resizeMode="cover"
                />
              ) : (
                <ImageVariant
                  testID="brand-img"
                  style={{ width: 44, height: 44, left: 5, tintColor: '#B6B6BB' }}
                  source={TabUser}
                  resizeMode="contain"
                />
              )}
            </TouchableOpacity>
          ) : (
            <View>
              <TouchableOpacity
                onPress={() => handleOpenDrawer()}
                style={[layout.rowHCenter, layout.justifyBetween, { width: '10%' }]}
              >
                {userDetails?.profileImageUrl ? (
                  <Image
                    style={[{ width: 23, height: 23, borderRadius: 100 }]}
                    source={{ uri: userDetails?.profileImageUrl }}
                    resizeMode="cover"
                  />
                ) : (
                  <ImageVariant
                    testID="brand-img"
                    style={{ width: 23, height: 23 }}
                    source={User}
                    resizeMode="contain"
                  />
                )}
                <ImageVariant
                  testID="brand-img"
                  style={{ width: 10, height: 12, left: 5, tintColor: '#B6B6BB' }}
                  source={DownArrow}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View
          style={{
            backgroundColor: isTablet ? 'black' : colors.headerBackgroundColor,
            width: '100%',
          }}
        >
          <ScrollView
            ref={scrollViewRef}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[
              layout.paddingForFullScreen,
              { paddingTop: '0%', paddingBottom: '2%', marginTop: isTablet ? '2%' : '8%' },
            ]}
          >
            <View style={[layout.display, layout.rowHCenter]}>
              {subjects?.map((ele, i) => {
                return (
                  <TouchableOpacity
                    key={i}
                    style={[
                      styles.button,
                      {
                        borderColor: selectedSubject === ele.subjectId ? '#27D4FA' : '#22222F',
                        borderWidth: selectedSubject === ele.subjectId ? 2 : 0,
                      },
                    ]}
                    onPress={() => {
                      handleButtonPress(i, ele.subjectId, ele.subjectName);
                    }}
                  >
                    <Text
                      style={[
                        selectedSubject === ele.subjectId ? styles.activeButton : styles.buttonText,
                        fonts.size_14,
                        fonts.bold,
                      ]}
                    >
                      {/* {ele.subjectId.split('_')[1].toLowerCase()} */}
                      {ele.subjectName}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>
        <SelectClassBottomSheet
          openSelectClassBottmSheet={openSelectClassBottmSheet}
          setOpenSelectClassBottomSheet={setOpenSelectClassBottomSheet}
          setShowSelectedClass={setShowSelectedClass}
          showSelecTedClass={showSelecTedClass}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    left: -12,
    height: 49,
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

export default Header;
