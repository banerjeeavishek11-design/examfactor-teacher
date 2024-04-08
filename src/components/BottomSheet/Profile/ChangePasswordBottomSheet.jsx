import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import { useTheme } from '@/theme';
import { Formik } from 'formik';
import { ImageVariant } from '../../atoms';
import RightArrow from '@/theme/assets/images/rightarrow.png';
import Cross from '@/theme/assets/images/cross.png';
import { useNavigation } from '@react-navigation/native';
import PrimaryGradient from '../../template/LinearGradient/PrimaryGradient';

const handleOutsideTap = () => {
  Keyboard.dismiss();
};

const ChangePasswordBottomSheet = ({ visible, closeModal }) => {
  const navigation = useNavigation();
  const { layout, colors, fonts } = useTheme();
  return (
    <View style={styles.container}>
      <Modal visible={visible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={handleOutsideTap}>
            <View
              style={[styles.bottomSheetContent, { backgroundColor: '#1C1827', padding: '4%' }]}
            >
              <TouchableOpacity
                onPress={closeModal}
                style={{ position: 'absolute', top: -35, left: '98%' }}
              >
                <ImageVariant style={{ width: 18, height: 18 }} source={Cross} />
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
                          closeModal();
                          navigation.navigate('NewPasswordStatusScreen', {
                            data: 'Updated',
                          });
                        }}
                      >
                        <PrimaryGradient styleProp={[styles.loginButton, layout.justifyCenter]}>
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
