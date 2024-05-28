import { StyleSheet, Text, View, Modal, TouchableOpacity, ActivityIndicator } from 'react-native';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/theme';
import { ImageVariant } from '@/components/atoms';
import { useSelector } from 'react-redux';
import Cross from '@/theme/assets/images/cross.png';
import PrimaryGradient from '@/components/template/LinearGradient/PrimaryGradient';
import ClassSuccessfullySelectedBottomSheet from '../Home/ClassSuccessfullySelectedBottomSheet';
import { activateDiagnosticByTeacher } from '../../../services/activateDiagnosticService';
import { MMKV } from 'react-native-mmkv';
import { notifyMessage } from '../../../utils/error-toast-API';

const storage = new MMKV();

let sectionId;
let gradeId;

const ActivateDiagnosticConfirmationBottomSheet = ({
  visible,
  closeModal,
  selectedChapter,
  unitId,
  chapterId,
  getDiagnostics,
}) => {
  const { fonts, colors, layout } = useTheme();
  const [openClassSuccessfullySelectedBottomSheet, setOpenClassSuccessfullySelectedBottomSheet] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const resFromMMKV = storage.getString('teacherDetails');
  const teacherDetails = resFromMMKV ? JSON.parse(resFromMMKV) : null;
  const sectionName = useSelector((state) => state.selectedSubject.sectionName);
  const subjectId = useSelector((state) => state.selectedSubject.subject);
  const isTablet = useSelector((state) => state.screenDimensions.isTablet);

  useEffect(() => {
    for (let item of teacherDetails) {
      if (item.sectionName === sectionName) {
        gradeId = item.gradeId;
        sectionId = item.id;
      }
    }
  }, [sectionName, teacherDetails]);

  const handleDiagnosticActivate = () => {
    let requiredBody = {
      gradeId: gradeId,
      sectionId: sectionId,
      unitId: unitId,
      subjectId: subjectId,
      chapterId: chapterId,
    };
    setIsLoading(true);
    activateDiagnosticByTeacher(requiredBody)
      .then(() => {
        return new Promise((resolve) => {
          setTimeout(() => {
            getDiagnostics();
            setOpenClassSuccessfullySelectedBottomSheet(true);
            resolve(true);
            setIsLoading(false);
          }, 1000);
        });
      })
      .catch((error) => {
        if (error?.response?.status === 400 || error.code === 'ERR-10') {
          notifyMessage('Topic already assigned');
        }
        if (error?.response?.status === 500) {
          notifyMessage('internal server error 500');
        }
        setIsLoading(false);
      })
      .finally(() => {
        closeModal(false);
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
                width: '50%',
                alignSelf: 'center',
                borderBottomEndRadius: 10,
                borderBottomStartRadius: 10,
              },
              { backgroundColor: colors.bottomSheetBackgroundColor },
            ]}
          >
            <TouchableOpacity
              onPress={closeModal}
              style={[{ position: 'absolute', top: -35, left: '92%' }]}
            >
              <ImageVariant
                testID="brand-img"
                style={{ width: 16, height: 16, tintColor: 'white' }}
                source={Cross}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View style={styles.center}>
              <TouchableOpacity
                style={styles.slideIndicator}
                onPress={closeModal}
              ></TouchableOpacity>
            </View>
            <View style={[layout.paddingForCard, styles.scrollContainer]}>
              <View style={{ width: '80%' }}>
                <Text
                  style={[fonts.size_20, fonts.bold, { color: colors.white, textAlign: 'left' }]}
                >
                  Are you sure you want to activate ?
                </Text>
                <Text
                  style={[
                    fonts.size_16,
                    fonts.fontWeight_small,
                    { color: colors.gray200, marginVertical: '4%' },
                  ]}
                >
                  {selectedChapter}
                </Text>
              </View>
              <View style={[styles.footer, { marginTop: '8%' }]}>
                <TouchableOpacity
                  onPress={closeModal}
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
                  onPress={handleDiagnosticActivate}
                >
                  <PrimaryGradient
                    styleProp={[layout.justifyCenter, { height: '100%', borderRadius: 8 }]}
                  >
                    {isLoading ? (
                      <View>
                        <ActivityIndicator size="small" color={colors.loginBtnTextColor} />
                      </View>
                    ) : (
                      <Text
                        style={[
                          fonts.size_16,
                          fonts.bold,
                          fonts.alignCenter,
                          { color: colors.loginBtnTextColor },
                        ]}
                      >
                        Yes
                      </Text>
                    )}
                  </PrimaryGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <ClassSuccessfullySelectedBottomSheet
        setOpenClassSuccessfullySelectedBottomSheet={setOpenClassSuccessfullySelectedBottomSheet}
        openClassSuccessfullySelectedBottomSheet={openClassSuccessfullySelectedBottomSheet}
        openFrom={'ActivateDiagnosticConfirmationBottomSheet'}
      />
    </View>
  );
};

export default ActivateDiagnosticConfirmationBottomSheet;

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
    height: 300,
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
    backgroundColor: 'transparent', // Change if needed
  },
  footerButton: {
    width: '48%',
    height: 48,
    borderRadius: 8,
  },
});
