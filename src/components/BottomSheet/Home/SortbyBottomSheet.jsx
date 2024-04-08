import { View, Modal, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Cross from '@/theme/assets/images/cross.png';
import { ImageVariant } from '../../atoms';
import RadioButton from '../../RadioButton/RadioButton';
import { useTheme } from '@/theme';
import PrimaryGradient from '../../template/LinearGradient/PrimaryGradient';

const sortBy = [
  { id: 1, sortBy: 'Practice Progress: High To Low' },
  { id: 2, sortBy: 'Practice Progress: Low To High' },
  { id: 3, sortBy: 'Achievable Score: High To Low' },
  { id: 4, sortBy: 'Achievable Score: Low to High' },
  { id: 5, sortBy: 'Last Test Score: High To Low' },
  { id: 6, sortBy: 'Last Test Score: Low to High' },
];

const SortbyBottomSheet = ({ visible, closeModal, setSortbyValue }) => {
  const { fonts, layout, colors } = useTheme();
  const [option, setOption] = useState('first');
  const handleOptionChange = (op) => {
    setOption(op);
  };

  const handleApply = () => {
    setSortbyValue(option);
    closeModal();
  };

  return (
    <View style={styles.container}>
      <Modal visible={visible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={[
              styles.bottomSheetContent,

              { backgroundColor: colors.bottomSheetBackgroundColor },
            ]}
          >
            <ImageVariant
              testID="brand-img"
              style={{ width: 16, height: 16, tintColor: colors.gray200 }}
              source={Cross}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View style={styles.center}>
            <TouchableOpacity style={styles.slideIndicator} onPress={closeModal}></TouchableOpacity>
          </View>
          <View style={[layout.paddingForCard, styles.scrollContainer]}>
            <Text style={[fonts.size_20, fonts.bold, { color: colors.white, paddingBottom: '2%' }]}>
              Sort By
            </Text>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: '5%' }}
            >
              {sortBy?.map((ele) => (
                <TouchableOpacity
                  key={ele.id}
                  style={styles.radioButtonContainer}
                  onPress={() => handleOptionChange(ele.sortBy)}
                  activeOpacity={1}
                >
                  <View style={{ marginLeft: 10 }}>
                    <RadioButton isActive={option === ele.sortBy} />
                  </View>
                  <Text style={[styles.radioButtonText, fonts.size_14, fonts.fontWeignt_600]}>
                    {ele.sortBy}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <View style={styles.footer}>
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
              <Text
                style={[fonts.size_20, fonts.bold, { color: colors.white, paddingBottom: '2%' }]}
              >
                Sort By
              </Text>
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: '5%' }}
              >
                {sortBy?.map((ele) => (
                  <TouchableOpacity
                    key={ele.id}
                    style={styles.radioButtonContainer}
                    onPress={() => handleOptionChange(ele.sortBy)}
                    activeOpacity={1}
                  >
                    <View style={{ marginLeft: 10 }}>
                      <RadioButton isActive={option === ele.sortBy} />
                    </View>
                    <Text style={[styles.radioButtonText, fonts.size_14, fonts.fontWeignt_600]}>
                      {ele.sortBy}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            <View style={styles.footer}>
              <TouchableOpacity
                onPress={closeModal}
                style={[
                  fonts.size_16,
                  fonts.fontWeignt_600,
                  { color: colors.termsLinkColor, textAlign: 'center' },
                ]}
              >
                <Text>Cancel</Text>
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

export default SortbyBottomSheet;

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
