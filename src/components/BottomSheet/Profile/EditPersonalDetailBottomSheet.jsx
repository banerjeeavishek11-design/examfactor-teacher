import {
  Keyboard,
  TouchableWithoutFeedback,
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  // Image,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useTheme } from '@/theme';
import { useSelector } from 'react-redux';
import rightArrow from '@/theme/assets/images/rightarrow.png';
import { Formik } from 'formik';
import { ImageVariant } from '../../atoms';
import Cross from '@/theme/assets/images/cross.png';
import moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';
// import Calender from '@/theme/assets/images/calendar.png';
import PrimaryGradient from '../../template/LinearGradient/PrimaryGradient';
import { editTeacherDetails, getUserDetailsByUserId } from '../../../services/teacherService';
import { notifyWarningMessage } from '../../../utils/error-toast-API';
import { MMKV } from 'react-native-mmkv';
import * as yup from 'yup';

const storage = new MMKV();

const validationSchema = yup.object().shape({
  mobileNumber: yup
    .string()
    .matches(/^\d{10}$/, 'Mobile number must be exactly 10 digits')
    .required('Mobile number is required'),
  emergencyContactNumber: yup
    .string()
    .matches(/^\d{10}$/, 'Emergency contact number must be exactly 10 digits')
    .required('Emergency contact number is required'),
});

const EditPersonalDetailBottomSheet = ({
  personalDetailBottomSheetVisible,
  closeModal,
  profileData,
  setProfileData,
}) => {
  const { fonts, colors, layout } = useTheme();
  const teacherId = storage.getString('username');
  const sectionName = useSelector((state) => state.selectedSubject.sectionName);
  const resFromMMKV = storage.getString('teacherDetails');
  const teacherDetails = resFromMMKV ? JSON.parse(resFromMMKV) : null;
  const [openCalender, setOpenCalender] = useState(false);
  const [selectedDob, setSelectedDob] = useState('');
  const [sectionId, setSectionId] = useState(null);

  const handleOutsideTap = () => {
    Keyboard.dismiss();
  };

  const [formValues, setFormValues] = useState({
    firstName: '',
    // dob: '',
    gender: '',
    emailId: '',
    mobileNumber: '',
    emergencyContactNumber: '',
    address: '',
  });

  useEffect(() => {
    if (teacherDetails && teacherDetails.length > 0) {
      for (let item of teacherDetails) {
        if (item.sectionName === sectionName) {
          setSectionId(item.id);
          return;
        }
      }
    }
  }, [sectionName, teacherDetails]);

  useEffect(() => {
    if (profileData) {
      const formattedDate = profileData.dob ? moment(profileData.dob).format('DD/MM/YYYY') : '';
      setSelectedDob(formattedDate);
      setFormValues({
        firstName: profileData.firstName || '',
        dob: formattedDate,
        gender: profileData.gender || '',
        emailId: profileData.emailId || '',
        mobileNumber: profileData.mobileNumber || '',
        emergencyContactNumber: profileData.emergencyContactNumber || '',
        address: profileData.address || '',
      });
    }
  }, [profileData]);

  const handleSubmit = (values) => {
    // console.log('values', values);
    let requiredBody = {
      id: teacherId,
      serialNumber: 0,
      mobileNumber: values.mobileNumber,
      emailId: values.emailId,
      firstName: values.firstName,
      // middleName: 'string',
      // lastName: 'string',
      sectionId: sectionId,
      dob: moment(selectedDob, 'DD-MM-YYYY')
        .set({
          hour: 15,
          minute: 14,
          second: 50,
          millisecond: 520,
        })
        .toISOString(),
      gender: values.gender,
      teacherRole: 'TEACHER',
      emergencyContactNumber: values.emergencyContactNumber,
      temporary: true,
    };
    editTeacherDetails(requiredBody, teacherId)
      .then((res) => {
        notifyWarningMessage(res.data.status);
        getUserDetailsByUserId(teacherId)
          .then((res) => {
            setProfileData(res.data);
          })
          .catch(() => {});
        closeModal();
      })
      .catch((err) => {
        console.log('error', err);
      });
  };
  return (
    <Modal visible={personalDetailBottomSheetVisible} animationType="slide" transparent={true}>
      <TouchableWithoutFeedback onPress={handleOutsideTap}>
        <View style={[styles.modalContainer, { marginBottom: '8%' }]}>
          <View
            style={[
              styles.bottomSheetContent,
              {
                padding: '4%',
                backgroundColor: colors.bottomSheetBackgroundColor,
                height: '90%',
              },
            ]}
          >
            <TouchableOpacity
              onPress={closeModal}
              style={{ position: 'absolute', top: -35, left: '98%' }}
            >
              <ImageVariant
                style={{ width: 18, height: 18, tintColor: colors.gray200 }}
                source={Cross}
              />
            </TouchableOpacity>
            <Text style={[fonts.size_18, fonts.bold, { color: colors.white }]}>
              Edit personal details
            </Text>
            <Formik
              initialValues={formValues}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              {({ handleChange, handleSubmit, values, errors, touched }) => {
                return (
                  <View style={{ marginTop: '8%' }}>
                    <ScrollView showsVerticalScrollIndicator={false} style={{ height: '90%' }}>
                      <View style={styles.inputContainer}>
                        <Text
                          style={[
                            fonts.size_18,
                            {
                              color: colors.white,
                              marginBottom: '2%',
                              opacity: 0.8,
                            },
                          ]}
                        >
                          Full Name
                        </Text>
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
                              backgroundColor: colors.bottomTabBackground,
                            },
                          ]}
                          editable={false}
                          placeholder={profileData.firstName}
                          placeholderTextColor={colors.gray200}
                          value={values?.firstName}
                        />
                      </View>

                      <View style={styles.inputContainer}>
                        <Text
                          style={[
                            fonts.size_18,
                            {
                              color: colors.white,
                              marginBottom: '2%',
                              opacity: 0.8,
                            },
                          ]}
                        >
                          DOB
                        </Text>
                        <View
                          style={[
                            layout.row,
                            layout.itemsCenter,
                            layout.justifyBetween,
                            styles.inputField,
                          ]}
                        >
                          <TextInput
                            style={[
                              layout.justifyCenter,
                              fonts.size_16,
                              {
                                color: colors.gray200,
                                textAlign: 'left',
                                paddingLeft: '3%',
                                width: '90%',
                              },
                            ]}
                            editable={false}
                            placeholder={profileData.dob}
                            placeholderTextColor={colors.gray400}
                            value={selectedDob}
                            // onChangeText={handleChange('dob')}
                          />
                          {/* <TouchableOpacity
                            onPress={() => {
                              setOpenCalender(true);
                            }}
                          >
                            <Image
                              source={Calender}
                              style={{
                                width: 20,
                                height: 20,
                                marginLeft: '5%',
                              }}
                            />
                          </TouchableOpacity> */}
                          <DateTimePicker
                            mode="date"
                            onConfirm={(date) => {
                              setSelectedDob(moment(date).format('DD/MM/YYYY'));
                              setOpenCalender(false);
                            }}
                            isVisible={openCalender}
                            onCancel={() => {
                              setOpenCalender(false);
                            }}
                          />
                        </View>
                      </View>

                      <View style={styles.inputContainer}>
                        <Text
                          style={[
                            fonts.size_18,
                            {
                              color: colors.white,
                              marginBottom: '2%',
                              opacity: 0.8,
                            },
                          ]}
                        >
                          Gender
                        </Text>
                        <View style={[layout.row, layout.justifyBetween, { marginTop: '2%' }]}>
                          <TouchableOpacity
                            style={[
                              layout.justifyCenter,
                              layout.itemsCenter,
                              {
                                backgroundColor:
                                  profileData.gender === 'Male'
                                    ? '#2F2B39'
                                    : colors.bottomTabBackground,
                                width: '45%',
                                paddingVertical: 12,
                                paddingHorizontal: 12,
                                borderRadius: 14,
                                borderWidth: 1,
                                borderColor:
                                  profileData.gender === 'Male' ? colors.gray400 : 'transparent',
                              },
                            ]}
                            onPress={() => {}}
                          >
                            <Text
                              style={[
                                fonts.size_14,
                                fonts.bold,
                                layout.textCenter,
                                {
                                  color: profileData.gender === 'Male' ? '#7AF4FC' : '#7A7A82',
                                },
                              ]}
                            >
                              Male
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[
                              layout.justifyCenter,
                              layout.itemsCenter,
                              {
                                backgroundColor:
                                  profileData.gender !== 'Male'
                                    ? '#2F2B39'
                                    : colors.bottomTabBackground,
                                width: '45%',
                                paddingHorizontal: 12,
                                borderRadius: 14,
                                borderWidth: 1,
                                borderColor:
                                  profileData.gender !== 'Male' ? colors.gray400 : 'transparent',
                              },
                            ]}
                            onPress={() => {}}
                          >
                            <Text
                              style={[
                                fonts.size_14,
                                fonts.bold,
                                layout.textCenter,
                                {
                                  color: profileData.gender !== 'Male' ? '#7AF4FC' : '#7A7A82',
                                },
                              ]}
                            >
                              Female
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>

                      <View style={styles.inputContainer}>
                        <Text
                          style={[
                            fonts.size_18,
                            {
                              color: colors.white,
                              marginBottom: '2%',
                              opacity: 0.8,
                            },
                          ]}
                        >
                          Email
                        </Text>
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
                              backgroundColor: colors.bottomTabBackground,
                            },
                          ]}
                          editable={false}
                          placeholder={profileData.emailId}
                          placeholderTextColor={colors.gray200}
                          value={values?.emailId}
                        />
                      </View>
                      <View style={styles.inputContainer}>
                        <Text
                          style={[
                            fonts.size_18,
                            {
                              color: colors.white,
                              marginBottom: '2%',
                              opacity: 0.8,
                            },
                          ]}
                        >
                          Mobile Number
                        </Text>
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
                            },
                          ]}
                          keyboardType="phone-pad"
                          placeholder={profileData.mobileNumber}
                          placeholderTextColor={colors.gray400}
                          onChangeText={(text) => {
                            const cleanedText = text.replace(/[^0-9]/g, '');
                            if (cleanedText.length <= 10) {
                              handleChange('mobileNumber')(cleanedText);
                            }
                          }}
                          value={values.mobileNumber}
                        />
                        {errors.mobileNumber && touched.mobileNumber && (
                          <Text style={{ color: 'red' }}>{errors.mobileNumber}</Text>
                        )}
                      </View>

                      <View style={styles.inputContainer}>
                        <Text
                          style={[
                            fonts.size_18,
                            {
                              color: colors.white,
                              marginBottom: '2%',
                              opacity: 0.8,
                            },
                          ]}
                        >
                          Emergency Contact Number
                        </Text>
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
                            },
                          ]}
                          keyboardType="phone-pad"
                          placeholder={profileData.emergencyContactNumber}
                          placeholderTextColor={colors.gray400}
                          onChangeText={(text) => {
                            const cleanedText = text.replace(/[^0-9]/g, '');
                            if (cleanedText.length <= 10) {
                              handleChange('emergencyContactNumber')(cleanedText);
                            }
                          }}
                          value={values.emergencyContactNumber}
                        />
                        {errors.emergencyContactNumber && touched.emergencyContactNumber && (
                          <Text style={{ color: 'red' }}>{errors.emergencyContactNumber}</Text>
                        )}
                      </View>

                      <View style={styles.inputContainer}>
                        <Text
                          style={[
                            fonts.size_18,
                            {
                              color: colors.white,
                              marginBottom: '2%',
                              opacity: 0.8,
                            },
                          ]}
                        >
                          Address
                        </Text>
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
                            },
                          ]}
                          placeholder={profileData?.address}
                          placeholderTextColor={colors.gray400}
                          onChangeText={handleChange('address')}
                          value={values?.address}
                        />
                      </View>
                    </ScrollView>

                    <TouchableOpacity onPress={handleSubmit}>
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
                            source={rightArrow}
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
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default EditPersonalDetailBottomSheet;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputField: {
    height: 48,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 12,
  },
  bottomSheetContent: {
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    borderTopWidth: 2,
    borderColor: '#8F8F94',
  },
  loginButton: {
    height: 48,
    width: '100%',
    borderRadius: 9,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
