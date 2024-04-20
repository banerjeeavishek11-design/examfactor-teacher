import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import DownArrow from '@/theme/assets/images/Downarrow.png';
import User from '@/theme/assets/images/user.png';
import TabUser from '@/theme/assets/images/tabuser.png';
import { useTheme } from '@/theme';
import { useSelector, useDispatch } from 'react-redux';
import { ImageVariant } from '@/components/atoms';
import SelectClassBottomSheet from '@/components/BottomSheet/Home/SelectClassBottomSheet';
import { MMKV } from 'react-native-mmkv';
import { selectSubjectAction } from '../../../store/redux-slice/SelectedSubjectSlice';

const storage = new MMKV();

const Header = () => {
  const { colors, layout, fonts } = useTheme();
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const isTablet = useSelector((state) => state.screenDimensions.isTablet);
  const dispatch = useDispatch();
  const [openSelectClassBottmSheet, setOpenSelectClassBottomSheet] = useState(false);
  const [showSelecTedClass, setShowSelectedClass] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState();
  // const [selectedSubjectId, setSelectedSubjectId] = useState();

  useEffect(() => {
    const resFromMMKV = storage.getString('teacherDetails');
    const teacherDetails = resFromMMKV ? JSON.parse(resFromMMKV) : null;
    if (teacherDetails && teacherDetails.length > 0) {
      setShowSelectedClass(teacherDetails[0]?.sectionName);
    }
  }, []);

  useEffect(() => {
    const resFromMMKV = storage.getString('teacherDetails');
    const teacherDetails = resFromMMKV ? JSON.parse(resFromMMKV) : null;
    let sectionName = teacherDetails?.filter((ele) => ele.sectionName === showSelecTedClass);
    let subject = sectionName[0]?.subjectList;
    let subjectList = subject?.map((ele) => ({
      subjectName: ele.name,
      subjectId: ele.subjectId,
    }));
    setSubjects(subjectList);
    if (subjectList) {
      setSelectedSubject(subjectList[0].subjectName);
    }
    if (subjectList && subjectList.length > 0) {
      // setSelectedSubjectId(subjectList[0].subjectId);
      dispatch(selectSubjectAction(subjectList[0].subjectId));
    }
  }, [showSelecTedClass]);

  const handleOpenDrawer = () => {
    if (isTablet) {
      navigation.navigate('SideBarAuthedScreen');
    } else {
      navigation.navigate('SideBarAuthedScreen');
    }
  };

  const handleButtonPress = (index, subject) => {
    setSelectedSubject(subject);
    // setSelectedSubjectId(subject);
    dispatch(selectSubjectAction(subject));
    const buttonWidth = 100; // Adjust this value as needed for your button width
    const scrollX = index * buttonWidth; // Calculate the position to scroll to
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: scrollX, y: 0, animated: true });
    }
  };

  return (
    <View
      style={{
        backgroundColor: isTablet ? '#191924' : colors.headerBackgroundColor,
        height: isTablet ? 60 : 'auto',
      }}
    >
      <View style={[layout.paddingForFullScreen, { paddingTop: isTablet ? '.5%' : '4%' }]}>
        <View style={[layout.rowHCenter, layout.justifyBetween, layout.display, { width: '100%' }]}>
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
                  Class {showSelecTedClass?.split(' ')[2]}
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
              <ImageVariant
                testID="brand-img"
                style={{ width: 44, height: 44, left: 5, tintColor: '#B6B6BB' }}
                source={TabUser}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ) : (
            <View>
              <TouchableOpacity
                onPress={() => handleOpenDrawer()}
                style={[layout.rowHCenter, layout.justifyBetween, { width: '10%' }]}
              >
                <ImageVariant
                  testID="brand-img"
                  style={{ width: 23, height: 23 }}
                  source={User}
                  resizeMode="contain"
                />
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
        <View style={{ backgroundColor: isTablet ? '' : colors.headerBackgroundColor }}>
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
              {subjects?.map((ele, i) => (
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
                    handleButtonPress(i, ele.subjectId);
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
              ))}
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

export default Header;
