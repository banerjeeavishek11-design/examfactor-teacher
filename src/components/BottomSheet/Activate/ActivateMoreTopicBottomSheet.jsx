import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTheme } from '@/theme';
import { ImageVariant } from '@/components/atoms';
import Cross from '@/theme/assets/images/cross.png';
import tick from '../../../theme/assets/images/tickMark.png';
import PrimaryGradient from '@/components/template/LinearGradient/PrimaryGradient';
import { activateHomeworkByTeacher } from '../../../services/activateHomeworkService';
import { Searchbar } from 'react-native-paper';
import Search from '@/theme/assets/images/search.png';
import { MMKV } from 'react-native-mmkv';
import { notifyMessage } from '../../../utils/error-toast-API';
import ClassSuccessfullySelectedBottomSheet from '../ClassSuccessfullySelectedBottomSheet';

const storage = new MMKV();

const ActivateMoreTopicBottomSheet = ({
  setOpenClassSuccessfullySelectedBottomSheet,
  openClassSuccessfullySelectedBottomSheet,
  visible,
  closeModal,
  topics,
  requiredBody,
  getHomeworks,
}) => {
  const { layout, fonts, colors } = useTheme();

  const [selectedTopics, setSelectedTopics] = useState([]);
  const [searchTopicName, setSearchTopicName] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const toggleTopicSelection = (topicId) => {
    const isSelected = selectedTopics.includes(topicId);
    if (isSelected) {
      setSelectedTopics(selectedTopics.filter((id) => id != topicId));
    } else {
      setSelectedTopics([...selectedTopics, topicId]);
    }
  };

  useEffect(() => {
    setSearchTopicName(topics);
  }, [topics]);

  const handleActivateMoreTopics = () => {
    let reqBody = { ...requiredBody, topicIds: selectedTopics };
    const accessToken = storage.getString('access_token');
    setIsLoading(true);
    activateHomeworkByTeacher(accessToken, reqBody)
      .then(() => {
        return new Promise((resolve) => {
          setTimeout(() => {
            getHomeworks();
            setOpenClassSuccessfullySelectedBottomSheet(true);
            setIsLoading(false);
            resolve(true);
          }, 1000);
        });
      })
      .catch((error) => {
        if (error?.response?.status === 400 || error.code === 'ERR-10') {
          notifyMessage('Topic already assigned');
        }
        setIsLoading(false);
      })
      .finally(() => {
        setSelectedTopics([]);
        closeModal(false);
      });
  };

  const onSearchTopics = (search) => {
    const searchItem = topics?.filter((ele) =>
      ele.topicDesc.toLowerCase().includes(search.toLowerCase())
    );
    setSearchTopicName(searchItem);
  };

  return (
    <View style={styles.container}>
      <Modal visible={visible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View
            style={[
              styles.bottomSheetContent,
              { backgroundColor: colors.bottomSheetBackgroundColor },
            ]}
          >
            <TouchableOpacity
              onPress={() => {
                closeModal(false);
                setSelectedTopics([]);
              }}
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
              <View style={{ width: '80%' }}>
                <Text
                  style={[fonts.size_20, fonts.bold, { color: colors.white, textAlign: 'left' }]}
                >
                  Activate More Home Work.
                </Text>
                <Text
                  style={[
                    fonts.size_14,
                    fonts.fontWeight_small,
                    { color: colors.gray200, marginVertical: '4%' },
                  ]}
                >
                  Number of topics selected: {selectedTopics.length}
                </Text>
              </View>
              <Searchbar
                placeholder="Search Topics"
                placeholderTextColor="rgba(275, 275, 275, 0.5)"
                iconColor="rgba(275, 275, 275, 0.5)"
                inputStyle={[
                  fonts.size_14,
                  fonts.fontWeignt_600,
                  { color: colors.white, right: 10 },
                ]}
                icon={() => (
                  <Image source={Search} resizeMode="contain" style={{ width: 14, height: 14 }} />
                )}
                onChangeText={onSearchTopics}
                style={{
                  backgroundColor: colors.bottomSheetBackgroundColor,
                  borderColor: 'rgba(275, 275, 275, 0.5)',
                  borderWidth: 1,
                  borderRadius: 8,
                }}
                clearButtonMode="while-editing"
                selectionColor={colors.buttonTextColor}
              />
              <ScrollView>
                {searchTopicName?.map((topic) => {
                  return (
                    <TouchableOpacity
                      key={topic.topicId}
                      style={[
                        layout.fullWidth,
                        layout.paddingForCard,
                        {
                          backgroundColor: colors.cardBackgroundColor,
                          borderRadius: 14,
                          marginTop: '3%',
                          marginBottom: '2%',
                        },
                      ]}
                    >
                      <View style={[layout.row, layout.itemsCenter, { gap: 8 }]}>
                        <TouchableOpacity
                          onPress={() => toggleTopicSelection(topic.topicId)}
                          activeOpacity={0.8}
                        >
                          {selectedTopics.includes(topic.topicId) ? (
                            <Image source={tick} style={{ height: 20, width: 20 }} />
                          ) : (
                            <View
                              style={[
                                styles.checkbox,
                                layout.justifyCenter,
                                layout.itemsCenter,
                                { color: colors.white },
                              ]}
                            ></View>
                          )}
                        </TouchableOpacity>
                        <Text
                          style={[fonts.size_14, fonts.fontWeight_small, { color: colors.white }]}
                        >
                          {topic.topicDesc}
                        </Text>
                      </View>
                    </TouchableOpacity>
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
                  disabled={selectedTopics.length == 0}
                  style={[
                    layout.justifyCenter,
                    styles.footerButton,
                    {
                      backgroundColor: colors.termsLinkColor,
                    },
                  ]}
                  onPress={handleActivateMoreTopics}
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
                          {
                            color:
                              selectedTopics.length == 0
                                ? colors.gray200
                                : colors.loginBtnTextColor,
                          },
                        ]}
                      >
                        Confirm
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
        openFrom={'ActivateMoreTopicConfirmationBottomTab'}
      />
    </View>
  );
};

export default ActivateMoreTopicBottomSheet;

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
    // marginTop: 10,
  },
});
