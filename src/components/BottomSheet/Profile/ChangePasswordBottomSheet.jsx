import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import { useTheme } from '@/theme';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import { ImageVariant } from '../../atoms';
import RightArrow from '@/theme/assets/images/rightarrow.png';
import Cross from '@/theme/assets/images/cross.png';
import { useNavigation } from '@react-navigation/native';
import PrimaryGradient from '../../template/LinearGradient/PrimaryGradient';
import { MMKV } from 'react-native-mmkv';
import { resetPassword } from '../../../services/authService';
import { getUserDetailsByUserId } from '../../../services/teacherService';

const storage = new MMKV();

const handleOutsideTap = () => {
  Keyboard.dismiss();
};

const ChangePasswordBottomSheet = ({ visible, closeModal }) => {
  const navigation = useNavigation();
  const { layout, colors, fonts } = useTheme();
  const isTablet = useSelector((state) => state.screenDimensions.isTablet);

  const [currentPassWrong, setCurrentPassWrong] = useState();
  const [passMatch, setPassMatch] = useState(false);
  const [userDetails, setUserDetails] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (values) => {
    setIsLoading(true);
    setCurrentPassWrong(false);
    setPassMatch(false);
    const oldPassword = storage.getString('oldPassword');
    const teacherId = storage.getString('username');

    if (values.currentPassword !== oldPassword) {
      setCurrentPassWrong(true);
      setIsLoading(false);
      console.log('old pass', oldPassword);
      return;
    }

    if (values.newPassword !== values.retypePassword) {
      setPassMatch(true);
      setIsLoading(false);
      return;
    }
    let requestBody = {
      oldPassword: values.currentPassword,
      newPassword: values.newPassword,
    };
    resetPassword(requestBody)
      .then(() => {
        storage.set('oldPassword', values.newPassword);
        getUserDetailsByUserId(teacherId)
          .then((res) => {
            setUserDetails(res.data);
          })
          .catch(() => {});
        navigation.navigate('NewPasswordStatusScreen', {
          data: 'Updated',
          userDetails: userDetails,
        });
        setIsLoading(false);
        closeModal();
      })
      .catch((error) => {
        setIsLoading(false);
        console.log('error', error);
      });
  };

  return (
    <View style={styles.container}>
      <Modal visible={visible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={handleOutsideTap}>
            <View
              style={[
                styles.bottomSheetContent,
                isTablet && {
                  width: '50%',
                  alignSelf: 'center',
                },
                { backgroundColor: '#1C1827', padding: '4%' },
              ]}
            >
              <TouchableOpacity
                onPress={closeModal}
                style={{ position: 'absolute', top: -35, left: isTablet ? '114%' : '98%' }}
              >
                <ImageVariant
                  style={{ width: 18, height: 18, tintColor: colors.gray200 }}
                  source={Cross}
                />
              </TouchableOpacity>
              <View style={styles.center}>
                <TouchableOpacity style={styles.slideIndicator} onPress={closeModal}>
                  <Text style={[fonts.size_18, { color: 'white' }]}>-</Text>
                </TouchableOpacity>
              </View>
              <Text style={[fonts.size_18, fonts.bold, { color: 'white', marginVertical: '5%' }]}>
                Set a new password
              </Text>
              <Formik
                initialValues={{
                  currentPassword: '',
                  newPassword: '',
                  retypePassword: '',
                }}
                onSubmit={handleSubmit}
              >
                {({ handleChange, handleSubmit, values }) => {
                  return (
                    <View>
                      <View style={{ marginTop: '4%' }}>
                        <View style={styles.inputContainer}>
                          <TextInput
                            style={[
                              styles.inputField,
                              layout.fullWidth,
                              layout.justifyCenter,
                              // Fonts.textCenter,
                              fonts.size_16,
                              {
                                color: colors.gray200,
                                textAlign: 'left',
                                paddingLeft: '3%',
                                backgroundColor: '#22222F',
                              },
                            ]}
                            placeholder="Current Password"
                            placeholderTextColor={colors.gray200}
                            onChangeText={handleChange('currentPassword')}
                            value={values.currentPassword}
                          />
                          {currentPassWrong && (
                            <View>
                              <Text
                                style={{
                                  color: '#FF575F',
                                  marginTop: '2%',
                                }}
                              >
                                Wrong Password
                              </Text>
                            </View>
                          )}
                        </View>
                        <View style={styles.inputContainer}>
                          <TextInput
                            style={[
                              styles.inputField,
                              layout.fullWidth,
                              layout.justifyCenter,
                              // Fonts.textCenter,
                              fonts.size_16,
                              {
                                color: colors.gray200,
                                textAlign: 'left',
                                paddingLeft: '3%',
                                backgroundColor: '#22222F',
                              },
                            ]}
                            placeholder="New Password"
                            placeholderTextColor={colors.gray200}
                            onChangeText={handleChange('newPassword')}
                            value={values.newPassword}
                          />
                        </View>
                        <View style={styles.inputContainer}>
                          <TextInput
                            style={[
                              styles.inputField,
                              layout.fullWidth,
                              layout.justifyCenter,
                              // Fonts.textCenter,
                              fonts.size_16,
                              {
                                color: colors.gray200,
                                textAlign: 'left',
                                paddingLeft: '3%',
                                backgroundColor: '#22222F',
                              },
                            ]}
                            placeholder="Retype new Password"
                            placeholderTextColor={colors.gray200}
                            onChangeText={handleChange('retypePassword')}
                            value={values.retypePassword}
                          />
                          {passMatch && (
                            <View>
                              <Text
                                style={{
                                  color: '#FF575F',
                                  marginTop: '2%',
                                }}
                              >
                                Passwords do not match
                              </Text>
                            </View>
                          )}
                        </View>
                      </View>
                      <Text style={[fonts.size_14, { color: colors.gray200, width: '66%' }]}>
                        Length : 6-24 characters
                      </Text>
                      <Text style={[fonts.size_14, { color: colors.gray200, width: '66%' }]}>
                        Contain : At least 1 numeric digit
                      </Text>

                      <TouchableOpacity
                        onPress={() => {
                          handleSubmit();
                        }}
                      >
                        <PrimaryGradient styleProp={[styles.loginButton, layout.justifyCenter]}>
                          {isLoading ? (
                            <View>
                              <ActivityIndicator size="small" color={colors.loginBtnTextColor} />
                            </View>
                          ) : (
                            <View style={[layout.display, layout.rowHCenter]}>
                              <Text
                                style={[
                                  fonts.size_16,
                                  fonts.bold,
                                  { color: colors.loginBtnTextColor },
                                ]}
                              >
                                Save
                              </Text>
                              <ImageVariant
                                testID="brand-img"
                                style={{ width: 16, height: 9, left: 5 }}
                                source={RightArrow}
                                resizeMode="contain"
                              />
                            </View>
                          )}
                        </PrimaryGradient>
                      </TouchableOpacity>
                    </View>
                  );
                }}
              </Formik>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Modal>
    </View>
  );
};

export default ChangePasswordBottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 1)',
  },
  bottomSheetContent: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderTopWidth: 2,
    borderColor: '#8F8F94',
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
  },
  line: {
    position: 'absolute',
    top: '70%',
    left: 18,
    right: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#8F8F94',
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#7AF4FC',
    padding: 10,
    paddingTop: 11,
    borderRadius: 9,
    alignItems: 'center',
    marginTop: '5%',
  },
  inputField: {
    height: 48,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 12,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#fff',
    color: 'white',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 16,
  },
  loginButton: {
    height: 48,
    width: '100%',
    borderRadius: 9,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '5%',
  },
});
