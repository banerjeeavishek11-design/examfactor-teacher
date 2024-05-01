/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, { useState } from 'react';
import { useTheme } from '@/theme';
import { Controller, useForm } from 'react-hook-form';
import { ImageVariant } from '../../atoms';
import RightArrow from '@/theme/assets/images/rightarrow.png';
import { MMKV } from 'react-native-mmkv';
import { useNavigation } from '@react-navigation/native';
import PrimaryGradient from '../../template/LinearGradient/PrimaryGradient';
import { resetPassword } from '../../../services/loginService';
import { notifyMessage } from '../../../utils/error-toast-API';
import { jwtDecode } from 'jwt-decode';
import { getTeacherDetailsById } from '../../../services/teacherService';

const storage = new MMKV();
const SetNewPasswordBottomSheet = ({
  setOpensetNewPasswordBottomSheet,
  opensetNewPasswordBottomSheet,
}) => {
  const navigation = useNavigation();
  const { layout, colors, fonts } = useTheme();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [textInputValues, setTextInputValues] = useState({
    newPassword: '',
    retypenewPassword: '',
  });

  const handleOutsideTap = () => {
    Keyboard.dismiss();
  };

  const handleSetNewPassword = (data) => {
    const accessToken = storage.getString('access_token');
    const oldPassword = storage.getString('oldPassword');
    let requiredBody = {
      oldPassword: oldPassword,
      newPassword: data.retypenewPassword,
    };
    resetPassword(accessToken, requiredBody)
      .then(() => {
        const accessToken = storage.getString('access_token');
        const decodedPayload = jwtDecode(accessToken);
        getTeacheDetails(decodedPayload.preferred_username);
        setOpensetNewPasswordBottomSheet(false);
      })
      .catch((error) => {
        if (error?.response?.status === 400 || error.code === 'ERR_BAD_REQUEST') {
          notifyMessage('Invalid UserName Or Passowrd');
        }
      });
  };

  const getTeacheDetails = (userName) => {
    const accessToken = storage.getString('access_token');
    getTeacherDetailsById(accessToken, userName)
      .then((res) => {
        storage.set('teacherDetails', JSON.stringify(res.data));
        navigation.reset({
          index: 0,
          routes: [{ name: 'AuthorizedStack' }],
        });
      })
      .catch((error) => {
        if (error?.response?.status === 400 || error.code === 'ERR-10') {
          notifyMessage('unable to fetch teacher details...');
        }
      });
  };

  return (
    <View style={styles.container}>
      <Modal visible={opensetNewPasswordBottomSheet} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={handleOutsideTap}>
            <View
              style={[styles.bottomSheetContent, { backgroundColor: '#1C1827', padding: '4%' }]}
            >
              <View style={styles.center}>
                <TouchableOpacity
                  style={styles.slideIndicator}
                  onPress={() => setOpensetNewPasswordBottomSheet(false)}
                >
                  <Text style={[fonts.size_18, { color: 'white' }]}>-</Text>
                </TouchableOpacity>
              </View>
              <Text style={[fonts.size_18, fonts.bold, { color: 'white', marginTop: '5%' }]}>
                Set a new password
              </Text>

              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                enabled={true}
              >
                <View style={{ marginTop: '2%' }}>
                  <Controller
                    name="newPassword"
                    control={control}
                    rules={{
                      required: 'This field is required',
                      pattern: {
                        value: /^(?=.*[0-9])(?=.*[a-zA-Z]).{6,24}$/,
                        // value: /^(?=.[a-zA-Z])(?=.[0-9])[a-zA-Z0-9]{6,24}$/,
                        message:
                          'Password must be 6 to 24 charactres and contsin at least one numeric digit',
                      },
                    }}
                    render={({ field: { onChange, onBlur } }) => (
                      <View
                        style={[
                          layout.display,
                          layout.row,
                          layout.itemsCenter,
                          styles.mobileNumberInput,
                          {
                            paddingHorizontal: 10,
                            borderColor: errors.newPassword
                              ? '#FF575F'
                              : 'rgba(255, 255, 255, 0.3)',
                          },
                        ]}
                      >
                        <TextInput
                          style={[
                            layout.fullWidth,
                            layout.justifyCenter,
                            fonts.size_16,
                            fonts.fontWeight_small,
                            {
                              color: colors.white,
                              textAlign: 'left',
                              paddingLeft: '0%',
                            },
                          ]}
                          placeholder="New password"
                          placeholderTextColor="#94939B"
                          onBlur={onBlur}
                          onChangeText={(value) => {
                            onChange(value);
                            setTextInputValues((prevState) => ({
                              ...prevState,
                              newPassword: value,
                            }));
                          }}
                          value={textInputValues.newPassword}
                        />
                      </View>
                    )}
                  />
                  {errors.newPassword && (
                    <Text
                      style={{
                        color: '#FF575F',
                      }}
                    >
                      {errors.newPassword.message || null}
                    </Text>
                  )}

                  <Controller
                    name="retypenewPassword"
                    control={control}
                    rules={{
                      required: 'This field is required',
                      pattern: {
                        value: /^(?=.*[0-9])(?=.*[a-zA-Z]).{6,24}$/,
                        message:
                          'Password must be 6 to 24 charactres and contsin at least one numeric digit',
                      },
                    }}
                    render={({ field: { onChange, onBlur } }) => (
                      <View
                        style={[
                          layout.display,
                          layout.row,
                          layout.itemsCenter,
                          styles.mobileNumberInput,
                          {
                            paddingHorizontal: 10,
                            borderColor: errors.retypenewPassword
                              ? '#FF575F'
                              : 'rgba(255, 255, 255, 0.3)',
                          },
                        ]}
                      >
                        <TextInput
                          style={[
                            layout.fullWidth,
                            layout.justifyCenter,
                            fonts.size_16,
                            fonts.fontWeight_small,
                            {
                              color: colors.white,
                              textAlign: 'left',
                              paddingLeft: '0%',
                            },
                          ]}
                          placeholder="Retype new password"
                          placeholderTextColor="#94939B"
                          onBlur={onBlur}
                          onChangeText={(value) => {
                            onChange(value);
                            setTextInputValues((prevState) => ({
                              ...prevState,
                              retypenewPassword: value,
                            }));
                          }}
                          value={textInputValues.retypenewPassword}
                        />
                      </View>
                    )}
                  />
                  {errors.retypenewPassword && (
                    <Text
                      style={{
                        color: '#FF575F',
                      }}
                    >
                      {errors.retypenewPassword.message || null}
                    </Text>
                  )}
                </View>
                <Text style={[fonts.size_14, { color: colors.gray200, width: '66%' }]}>
                  Length : 6-24 characters
                </Text>
                <Text style={[fonts.size_14, { color: colors.gray200, width: '66%' }]}>
                  Contain : At least 1 numeric digit
                </Text>
                <TouchableOpacity onPress={handleSubmit(handleSetNewPassword)}>
                  <PrimaryGradient styleProp={[styles.loginButton, layout.justifyCenter]}>
                    <View style={[layout.display, layout.rowHCenter]}>
                      <Text
                        style={[fonts.size_16, fonts.bold, { color: colors.loginBtnTextColor }]}
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
                  </PrimaryGradient>
                </TouchableOpacity>
              </KeyboardAvoidingView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Modal>
    </View>
  );
};

export default SetNewPasswordBottomSheet;

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
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 2,
    borderColor: '#8F8F94',
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mobileNumberInput: {
    width: '100%',
    height: 48,
    color: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    marginTop: 12,
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
