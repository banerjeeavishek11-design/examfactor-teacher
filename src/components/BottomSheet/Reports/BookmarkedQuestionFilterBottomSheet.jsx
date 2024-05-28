import { StyleSheet, Text, View, Modal, TouchableOpacity, ScrollView } from 'react-native';

import React from 'react';
import { useTheme } from '@/theme';
import { useSelector } from 'react-redux';

import { ImageVariant } from '@/components/atoms';
import Cross from '@/theme/assets/images/cross.png';
import PrimaryGradient from '@/components/template/LinearGradient/PrimaryGradient';

const chapters = [
  {
    id: 1,
    topic: 'Introduction to Electric Feild',
    subtopics: [
      { id: 1, sub: 'Drift of electrons & origin of resistance.' },
      { id: 2, sub: 'Electric current and voltage.' },
      { id: 3, sub: "Resistivity, and Ohm's law." },
      { id: 4, sub: 'Electric power and DC circuits.' },
      { id: 5, sub: 'Combination of cells.' },
    ],
  },
  {
    id: 2,
    topic: 'T2: Electric Feild',
    subtopics: [
      { id: 1, sub: 'Lorem ipsum dolor sit amet.' },
      { id: 2, sub: 'Lorem ipsum dolor sit.' },
      { id: 3, sub: 'Lorem ipsum dolor sit amet.' },
      { id: 4, sub: 'Lorem, ipsum dolor.' },
      { id: 5, sub: 'Lorem ipsum dolor sit.' },
    ],
  },
  {
    id: 3,
    topic: 'Magnetic feild',
    subtopics: [
      { id: 1, sub: 'Lorem ipsum dolor sit amet.' },
      { id: 2, sub: 'Lorem ipsum dolor sit.' },
      { id: 3, sub: 'Lorem ipsum dolor sit amet.' },
      { id: 4, sub: 'Lorem, ipsum dolor.' },
      { id: 5, sub: 'Lorem ipsum dolor sit.' },
    ],
  },
];

const BookmarkedQuestionFilterBottomSheet = ({ visible, closeModal }) => {
  const { layout, colors, fonts } = useTheme();
  const isTablet = useSelector((state) => state.screenDimensions.isTablet);

  return (
    <View style={styles.container}>
      <Modal visible={visible} animationType="slide" transparent={true}>
        <View style={isTablet ? styles.modalTabContainer : styles.modalContainer}>
          <View
            style={[
              styles.bottomSheetContent,
              isTablet && {
                width: '60%',
                alignSelf: 'center',
                borderBottomEndRadius: 10,
                borderBottomStartRadius: 10,
              },
              { backgroundColor: colors.bottomSheetBackgroundColor },
            ]}
          >
            <TouchableOpacity
              onPress={closeModal}
              style={[{ position: 'absolute', top: -35, left: isTablet ? '96%' : '92%' }]}
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
                Filter by Chapter/Topic
              </Text>
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: '5%' }}
              >
                {chapters.map((chapters) => {
                  return (
                    <View
                      key={chapters.id}
                      style={[
                        layout.fullWidth,
                        layout.paddingForCard,
                        {
                          height: 'auto',
                          backgroundColor: colors.cardBackgroundColor,
                          borderRadius: 16,
                          marginTop: '3%',
                        },
                      ]}
                    >
                      <Text
                        style={[fonts.size_18, fonts.fontWeignt_600, { color: colors.gray100 }]}
                      >
                        {chapters.topic}
                      </Text>
                      <View style={{ marginVertical: '1%' }}>
                        {chapters.subtopics.map((subs) => {
                          return (
                            <View
                              style={[
                                layout.row,
                                layout.justifyBetween,
                                layout.itemsCenter,
                                { marginVertical: '2%' },
                              ]}
                              key={subs.id}
                            >
                              <Text
                                style={[
                                  fonts.size_14,
                                  fonts.fontWeight_small,
                                  { color: colors.gray200 },
                                ]}
                              >
                                {subs.sub}
                              </Text>
                              <TouchableOpacity
                                // onPress={() =>
                                //   handleToggle(
                                //     item.chapterCode,
                                //     topic.topicCode
                                //   )
                                // }
                                activeOpacity={0.8}
                              >
                                <View
                                  style={[
                                    styles.checkbox,
                                    layout.justifyCenter,
                                    layout.itemsCenter,
                                    { color: colors.white },
                                    // selectedItem.includes(topic.topicCode) &&
                                    //   styles.checked,
                                  ]}
                                >
                                  {/* {selectedItem.includes(topic.topicCode) && (
                                    <Ionicons
                                      name="checkmark-outline"
                                      size={18}
                                      color="white"
                                    />
                                  )} */}
                                </View>
                              </TouchableOpacity>
                            </View>
                          );
                        })}
                      </View>
                    </View>
                  );
                })}
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
                  //   onPress={handleApply}
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

export default BookmarkedQuestionFilterBottomSheet;

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
    height: 600,
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
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderColor: 'white',
    borderWidth: 1,
    marginTop: 10,
  },
});
