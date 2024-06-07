import { Text, View, Image } from 'react-native';
import Logo from '@/theme/assets/images/examfactorlogo.png';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';
import { ActivateScreen, HomeScreen, ReportsScreen, SchoolWorkScreen } from '@/screens';
import { useTheme } from '@/theme';
import HomeTab from '@/theme/assets/images/Hometab.png';
import SchoolWorkTab from '@/theme/assets/images/Schoolworktab.png';
import ReportsTab from '@/theme/assets/images/Reportstab.png';
import ActivateTab from '@/theme/assets/images/Activatetab.png';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { useSelector } from 'react-redux';

const TabSideBarNavigator = () => {
  const { fonts, colors } = useTheme();
  const Drawer = createDrawerNavigator();
  const userRole = useSelector((state) => state.login.userRole);

  return (
    <>
      <Drawer.Navigator
        drawerContent={(props) => <CustomSideBar {...props} />}
        screenOptions={{
          drawerType: 'permanent',
          drawerPosition: 'left',
          headerShown: false,
          drawerActiveBackgroundColor: '#191924',
          drawerActiveTintColor: colors.termsLinkColor,
          drawerInactiveTintColor: colors.gray100,
          drawerLabelStyle: [fonts.size_13, { marginLeft: moderateScale(-10) }],
          drawerStyle: {
            backgroundColor: colors.cardBackgroundColor,
            width: moderateScale(160),
          },
        }}
      >
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{
            drawerIcon: ({ focused }) => (
              <Image
                source={HomeTab}
                style={[
                  styles.drawerIcons,
                  {
                    tintColor: focused ? colors.termsLinkColor : colors.gray100,
                  },
                ]}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="School Work"
          component={SchoolWorkScreen}
          options={{
            drawerIcon: ({ focused }) => (
              <Image
                source={SchoolWorkTab}
                style={[
                  styles.drawerIcons,
                  {
                    tintColor: focused ? colors.termsLinkColor : colors.gray100,
                  },
                ]}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Reports"
          component={ReportsScreen}
          options={{
            drawerIcon: ({ focused }) => (
              <Image
                source={ReportsTab}
                style={[
                  styles.drawerIcons,
                  {
                    tintColor: focused ? colors.termsLinkColor : colors.gray100,
                  },
                ]}
              />
            ),
          }}
        />
        {userRole === 'TEACHER' && (
          <Drawer.Screen
            name="Activate"
            component={ActivateScreen}
            options={{
              drawerIcon: ({ focused }) => (
                <Image
                  source={ActivateTab}
                  style={[
                    styles.drawerIcons,
                    {
                      tintColor: focused ? colors.termsLinkColor : colors.gray100,
                    },
                  ]}
                />
              ),
            }}
          />
        )}
      </Drawer.Navigator>
    </>
  );
};

const CustomSideBar = (props) => {
  const { fonts } = useTheme();
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.sideBarLogoContainer}>
        <Image style={styles.sideBarLogo} source={Logo} />
        <Text style={[fonts.size_16, fonts.bold, { color: 'white' }]}>Examfactor</Text>
      </View>
      <DrawerContentScrollView style={{ marginTop: '5%' }} {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  );
};

export default TabSideBarNavigator;

const styles = ScaledSheet.create({
  sideBarLogo: {
    height: '29@vs',
    width: '23@s',
    marginRight: '5@s',
  },
  sideBarLogoContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: '10@ms',
  },
  drawerIcons: {
    marginLeft: '15@s',
    width: 25,
    height: 25,
  },
});
