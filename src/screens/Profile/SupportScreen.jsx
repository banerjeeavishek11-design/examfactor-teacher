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
import UpArrow from '@/theme/assets/images/supportUpArrow.png';
import DownArrow from '@/theme/assets/images/supportDownArrow.png';
import { useFocusEffect } from '@react-navigation/native';
import { getSupportFAQDetails } from '../../services/FAQ/FaqService';
import { notifyMessage } from '../../utils/error-toast-API';

const SupportScreen = ({ navigation }) => {
  const { layout, fonts, colors } = useTheme();
  const [allAccordian, setAllAccordian] = useState();
  const [expandCardId, setExpandedCardId] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      getSupportFAQ();
    }, [])
  );

  const getSupportFAQ = () => {
    setIsLoading(true);
    let params = {
      active: true,
      status: 'ACTIVE',
      originType: 'B2B',
      questionType: 'SUPPORT',
    };
    getSupportFAQDetails(params)
      .then((res) => {
        setAllAccordian(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        notifyMessage('Something went wrong while fetching Support FAQ', error);
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
                  Support
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
            <View>
              <Text
                style={[
                  fonts.size_14,
                  fonts.fontWeignt_600,
                  { color: colors.white, opacity: 0.4, marginBottom: '2%' },
                ]}
              >
                FREQUENTLY ASKED QUESTION
              </Text>
            </View>
            {allAccordian?.map((ele) => (
              <View
                style={[styles.arrowView, { backgroundColor: colors.cardBackgroundColor }]}
                key={ele.id}
              >
                <TouchableOpacity onPress={() => toggleExpanded(ele.id)}>
                  <View style={[layout.row, layout.justifyBetween]}>
                    <View style={{ width: '95%' }}>
                      <Text
                        style={[fonts.size_14, fonts.fontWeight_small, { color: colors.white }]}
                      >
                        {ele?.question}
                      </Text>
                    </View>
                    {expandCardId === ele?.id ? (
                      <Image source={UpArrow} resizeMode="contain" />
                    ) : (
                      <Image source={DownArrow} resizeMode="contain" />
                    )}
                  </View>
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
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </View>
    </SafeScreen>
  );
};

export default SupportScreen;

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
