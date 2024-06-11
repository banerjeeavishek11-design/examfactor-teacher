import { useTheme } from '@/theme';
import React, { useEffect, useState } from 'react';
import { View, Modal, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Cross from '@/theme/assets/images/cross.png';
import { useDispatch } from 'react-redux';
import { ImageVariant } from '../../atoms';
import RadioButton from '../../RadioButton/RadioButton';
import { useSelector } from 'react-redux';
import Teacher from '@/theme/assets/images/teacher.png';
import ClassTeacher from '@/theme/assets/images/classteacher.png';
import PrimaryGradient from '../../template/LinearGradient/PrimaryGradient';
import { updateUserRole } from '../../../store/redux-slice/LoginSlice';
import { changeTeacherViewMode } from '../../../services/teacherService';

const ChangeRoleBottomSheet = (props) => {
  const { setChangeRoleBottomSheetVisible, changeRoleBottomSheetVisible, setUserRole } = props;
  const { colors, layout, fonts } = useTheme();
  const isTablet = useSelector((state) => state.screenDimensions.isTablet);
  const dispatch = useDispatch();
  const initialUserRole = useSelector((state) => state.login.userRole);
  const [option, setOption] = useState();
  const [selectedViewMode, setSelectedViewMode] = useState();

  useEffect(() => {
    setOption(initialUserRole);
  }, [initialUserRole]);

  // useEffect(() => {
  //   changeViewMode();
  // }, [selectedViewMode]);

  const changeViewMode = () => {
    const reqBody = {
      viewMode: selectedViewMode,
    };

    changeTeacherViewMode(reqBody)
      .then((res) => {
        console.log('res', res.data);
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  const handleSlideDown = () => {
    setChangeRoleBottomSheetVisible(false);
    setOption(initialUserRole);
  };

  const handleOptionChange = (op) => {
    setOption(op);
    setSelectedViewMode(op);
  };

  const handleApply = () => {
    setChangeRoleBottomSheetVisible(false);
    setUserRole(option);
    dispatch(updateUserRole(option));
    changeViewMode();
  };

  return (
    <View style={styles.container}>
      <Modal visible={changeRoleBottomSheetVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View
            style={[
              styles.bottomSheetContent,
              isTablet && {
                width: '50%',
                alignSelf: 'center',
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
                Select Your Role
              </Text>

              <View>
                <TouchableOpacity
                  style={styles.radioButtonContainer}
                  onPress={() => handleOptionChange('TEACHER')}
                  activeOpacity={1}
                >
                  <View style={{ marginLeft: 10 }}>
                    <RadioButton isActive={option === 'TEACHER'} />
                  </View>
                  <ImageVariant
                    testID="brand-img"
                    style={{ width: 15, height: 20, left: 8 }}
                    source={Teacher}
                    resizeMode="contain"
                  />
                  <Text style={styles.radioButtonText}>Teacher</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.radioButtonContainer}
                  onPress={() => handleOptionChange('CLASS_TEACHER')}
                  activeOpacity={1}
                >
                  <View style={{ marginLeft: 10 }}>
                    <RadioButton isActive={option === 'CLASS_TEACHER'} />
                  </View>
                  <ImageVariant
                    testID="brand-img"
                    style={{ width: 19, height: 23, left: 8 }}
                    source={ClassTeacher}
                    resizeMode="contain"
                  />
                  <Text style={styles.radioButtonText}>Class Teacher</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.footer}>
              <TouchableOpacity
                onPress={handleSlideDown}
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
                    fonts.fontWeignt_600,
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
                      fonts.fontWeignt_600,
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
  bottomSheetContent: {
    height: 350,
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
    marginLeft: 15,
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

export default ChangeRoleBottomSheet;
