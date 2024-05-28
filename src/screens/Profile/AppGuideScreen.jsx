import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import { useTheme } from '@/theme';
import LeftArrow from '@/theme/assets/images/leftarrow.png';
import { ImageVariant } from '@/components/atoms';
import { SafeScreen } from '@/components/template';
import UpArrow from '@/theme/assets/images/uparrow.png';
import DownArrow from '@/theme/assets/images/Downarrow.png';
import PracticeActive from '@/theme/assets/images/practiceactive.png';
import { useFocusEffect } from '@react-navigation/native';
import { getSupportFAQDetails } from '../../services/FAQ/FaqService';
import { notifyMessage } from '../../utils/error-toast-API';

const AppGuideScreen = ({ navigation }) => {
  const { layout, fonts, colors } = useTheme();
  const [allAccordian, setAllAccordian] = useState();
  const [expandCardId, setExpandedCardId] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      getAppGuideFAQ();
    }, [])
  );

  const getAppGuideFAQ = () => {
    setIsLoading(true);
    let params = {
      active: true,
      status: 'ACTIVE',
      originType: 'B2B',
      questionType: 'APP_GUIDE',
    };
    getSupportFAQDetails(params)
      .then((res) => {
        setAllAccordian(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        notifyMessage('Something went wrong while fetching APP Guide FAQ', error);
        setIsLoading(false);
      });
  };

  const toggleExpanded = (id) => {
    setExpandedCardId(id);
  };

  return (
    <SafeScreen>
      <View style={[layout.paddingForFullScreen]}>
        <StatusBar backgroundColor="#0D0D1B" barStyle="light-content" />
        <View style={[]}>
          <View
            style={[layout.row, layout.justifyBetween, layout.itemsCenter, { display: 'flex' }]}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
                // navigation.dispatch(DrawerActions.openDrawer());
              }}
            >
              <View style={[layout.rowHCenter, layout.display]}>
                <ImageVariant
                  testID="brand-img"
                  style={{ width: 7, height: 11 }}
                  source={LeftArrow}
                  resizeMode="contain"
                />
                <Text
                  style={[fonts.size_16, fonts.bold, { color: colors.backButtonColor, left: 5 }]}
                >
                  App Guide
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {isLoading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color={colors.termsLinkColor} />
          </View>
        ) : (
          <View style={{ marginTop: '5%' }}>
            {allAccordian?.map((ele, index) => (
              <View
                style={[styles.arrowView, { backgroundColor: colors.cardBackgroundColor }]}
                key={ele.id}
              >
                <TouchableOpacity onPress={() => toggleExpanded(ele.id, ele.isExpand)}>
                  <View style={[layout.row, layout.justifyBetween, layout.itemsCenter]}>
                    {ele?.displaySeq == 1 ? (
                      <ImageVariant source={PracticeActive} style={{ width: 40, height: 40 }} />
                    ) : null}
                    <View style={{ width: '60%' }}>
                      <Text
                        style={[
                          fonts.size_16,
                          fonts.bold,
                          { color: colors.white },

                          index == 0 ? { marginLeft: -30 } : null,
                        ]}
                      >
                        {ele?.question}
                      </Text>
                    </View>
                    {expandCardId === ele.id ? (
                      <Image
                        style={{ width: 10, height: 11 }}
                        source={UpArrow}
                        resizeMode="contain"
                      />
                    ) : (
                      <Image
                        style={{ width: 10, height: 11 }}
                        source={DownArrow}
                        resizeMode="contain"
                      />
                    )}
                  </View>
                  <View>
                    <View>
                      {expandCardId === ele?.id ? (
                        <View style={{ marginTop: 12 }}>
                          <Text
                            style={[
                              fonts.size_14,
                              fonts.fontWeight_small,
                              { color: colors.white, opacity: 0.7 },
                            ]}
                          >
                            {ele?.answer}
                          </Text>
                        </View>
                      ) : null}
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </View>
    </SafeScreen>
  );
};

export default AppGuideScreen;

const styles = StyleSheet.create({
  arrowView: {
    borderRadius: 16,
    overflow: 'hidden',
    width: '100%',
    height: 'auto',
    borderWidth: 1,
    padding: '4%',
    marginTop: '3%',
  },
  loader: {
    marginTop: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '5%',
  },
});
