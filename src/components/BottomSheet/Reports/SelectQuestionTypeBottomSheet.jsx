import { StyleSheet, Text, View, Modal, TouchableOpacity, ScrollView } from 'react-native';

import React, { useState } from 'react';
import { useTheme } from '@/theme';
import { useSelector } from 'react-redux';
import { ImageVariant } from '@/components/atoms';
import RadioButton from '../../RadioButton/RadioButton';
import Cross from '@/theme/assets/images/cross.png';
import PrimaryGradient from '@/components/template/LinearGradient/PrimaryGradient';

const questionType = [
  { id: 'DIAGNOSTIC', questionType: 'Diagnostic' },
  { id: 'PRACTICE', questionType: 'Practice' },
  { id: 'TEST', questionType: 'Test' },
];

const SelectQuestionTypeBottomSheet = ({
  visible,
  closeModal,
  changeQuestionType,
  setQuestionActivityType,
  setSelectedValue,
}) => {
  const { fonts, layout, colors } = useTheme();
  const isTablet = useSelector((state) => state.screenDimensions.isTablet);
  const [option, setOption] = useState('first');
  const [selectedType, setSelectedType] = useState('DIAGNOSTIC');
  const handleOptionChange = (op, type) => {
    setOption(op);
    setSelectedType(type);
  };
  const handleApply = () => {
    setSelectedValue(option);
    setQuestionActivityType(selectedType);
    changeQuestionType(option);
    closeModal();
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
                style={{ width: 16, height: 16, tintColor: colors.gray200 }}
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
              <Text
                style={[fonts.size_20, fonts.bold, { color: colors.white, paddingBottom: '2%' }]}
              >
                Select Question Type
              </Text>
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: '5%' }}
              >
                {questionType?.map((ele) => (
                  <TouchableOpacity
                    key={ele.id}
                    style={styles.radioButtonContainer}
                    onPress={() => handleOptionChange(ele.questionType, ele.id)}
                    activeOpacity={1}
                  >
                    <View style={{ marginLeft: 10 }}>
                      <RadioButton isActive={option === ele.questionType} />
                    </View>
                    <Text style={[styles.radioButtonText, fonts.size_14, fonts.fontWeignt_600]}>
                      {ele.questionType}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <View style={styles.footer}>
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
        </View>
      </Modal>
    </View>
  );
};

export default SelectQuestionTypeBottomSheet;

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
    height: 400,
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
