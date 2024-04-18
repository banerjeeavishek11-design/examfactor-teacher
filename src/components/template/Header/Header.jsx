import { Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import DownArrow from '@/theme/assets/images/Downarrow.png';
import User from '@/theme/assets/images/user.png';
import TabUser from '@/theme/assets/images/tabuser.png';
import { useTheme } from '@/theme';
import { useSelector } from 'react-redux';
import { ImageVariant } from '@/components/atoms';
import SelectClassBottomSheet from '@/components/BottomSheet/Home/SelectClassBottomSheet';

const Header = () => {
  const { colors, layout, fonts } = useTheme();
  const navigation = useNavigation();
  const isTablet = useSelector((state) => state.screenDimensions.isTablet);
  const [openSelectClassBottmSheet, setOpenSelectClassBottomSheet] = useState(false);
  const [showSelecTedClass, setShowSelectedClass] = useState('');

  const handleOpenDrawer = () => {
    if (isTablet) {
      navigation.navigate('SideBarAuthedScreen');
    } else {
      navigation.navigate('SideBarAuthedScreen');
    }
  };

  return (
    <View
      style={{
        backgroundColor: isTablet ? '#191924' : colors.headerBackgroundColor,
        height: isTablet ? 60 : 'auto',
      }}
    >
      <View style={[layout.paddingForFullScreen, { paddingTop: isTablet ? '.5%' : '4%' }]}>
        <View style={[layout.rowHCenter, layout.justifyBetween, layout.display, { width: '100%' }]}>
          <View>
            <TouchableOpacity onPress={() => setOpenSelectClassBottomSheet(true)}>
              <View style={[layout.rowHCenter]}>
                <Text
                  style={[
                    fonts.size_18,
                    fonts.fontWeight_extraSmall,
                    {
                      color: colors.white,
                      maxWidth: 200,
                      minWidth: 100,
                    },
                  ]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  Class {showSelecTedClass.split(' ')[2]}
                </Text>

                <ImageVariant
                  testID="brand-img"
                  style={{ width: 14, height: 9 }}
                  source={DownArrow}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
          </View>
          {isTablet ? (
            <TouchableOpacity onPress={() => handleOpenDrawer()}>
              <ImageVariant
                testID="brand-img"
                style={{ width: 44, height: 44, left: 5, tintColor: '#B6B6BB' }}
                source={TabUser}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ) : (
            <View>
              <TouchableOpacity
                onPress={() => handleOpenDrawer()}
                style={[layout.rowHCenter, layout.justifyBetween, { width: '10%' }]}
              >
                <ImageVariant
                  testID="brand-img"
                  style={{ width: 23, height: 23 }}
                  source={User}
                  resizeMode="contain"
                />
                <ImageVariant
                  testID="brand-img"
                  style={{ width: 10, height: 12, left: 5, tintColor: '#B6B6BB' }}
                  source={DownArrow}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <SelectClassBottomSheet
          openSelectClassBottmSheet={openSelectClassBottmSheet}
          setOpenSelectClassBottomSheet={setOpenSelectClassBottomSheet}
          setShowSelectedClass={setShowSelectedClass}
          showSelecTedClass={showSelecTedClass}
        />
      </View>
    </View>
  );
};

export default Header;
