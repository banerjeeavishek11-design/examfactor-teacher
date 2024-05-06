import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ActivateScreen, HomeScreen, ReportsScreen, SchoolWorkScreen } from '@/screens';
import { useTheme } from '@/theme';
import HomeTab from '@/theme/assets/images/Hometab.png';
import SchoolWorkTab from '@/theme/assets/images/Schoolworktab.png';
import ReportsTab from '@/theme/assets/images/Reportstab.png';
import ActivateTab from '@/theme/assets/images/Activatetab.png';
import { ImageVariant } from '@/components/atoms';
import Header from '../components/template/Header/Header';
import { useSelector } from 'react-redux';

const Tab = createBottomTabNavigator();
const S = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 72,
    backgroundColor: '#1C1827',
    alignItems: 'center',
    // borderTopColor:'red',
    // borderWidth:1
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1C1827',
    height: 50,
  },
  activeIcon: { tintColor: 'blue' },
  activeLabel: { color: 'red' },
});

const TabBar = (props) => {
  const userRole = useSelector((state) => state.login.userRole);
  const { layout, fonts } = useTheme();
  return (
    <View style={S.container}>
      <TouchableOpacity
        style={[
          layout.justifyCenter,
          layout.itemsCenter,
          { width: userRole === 'TEACHER' ? '25%' : '33.3%' },
        ]}
        onPress={() => {
          props.navigation.jumpTo('HomeTab');
        }}
      >
        <ImageVariant
          testID="brand-img"
          style={{
            width: 30,
            height: 30,
            tintColor: props.state.index === 0 ? '#fff' : '#77747D',
          }}
          source={HomeTab}
          resizeMode="contain"
        />
        <Text
          style={[
            fonts.size_12,
            fonts.alignCenter,
            {
              fontWeight: props.state.index === 0 ? '700' : '500',
              color: props.state.index === 0 ? '#fff' : '#77747D',

              lineHeight: 18,
            },
          ]}
        >
          Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          layout.justifyCenter,
          layout.itemsCenter,
          { width: userRole === 'TEACHER' ? '25%' : '33.3%' },
        ]}
        onPress={() => {
          props.navigation.jumpTo('SchoolWorkTab');
        }}
      >
        <ImageVariant
          testID="brand-img"
          style={{
            width: 30,
            height: 30,
            tintColor: props.state.index === 1 ? '#fff' : '#77747D',
          }}
          source={SchoolWorkTab}
          resizeMode="contain"
        />
        <Text
          style={[
            fonts.size_12,
            fonts.alignCenter,
            {
              fontWeight: props.state.index === 1 ? '700' : '500',
              color: props.state.index === 1 ? '#fff' : '#77747D',

              lineHeight: 18,
            },
          ]}
        >
          School Work
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          layout.justifyCenter,
          layout.itemsCenter,
          { width: userRole === 'TEACHER' ? '25%' : '33.3%' },
        ]}
        onPress={() => {
          props.navigation.jumpTo('ReportsTab');
        }}
      >
        <ImageVariant
          testID="brand-img"
          style={{
            width: 30,
            height: 30,
            tintColor: props.state.index === 2 ? '#fff' : '#77747D',
          }}
          source={ReportsTab}
          resizeMode="contain"
        />
        <Text
          style={[
            fonts.size_12,
            fonts.alignCenter,
            {
              fontWeight: props.state.index === 2 ? '700' : '500',
              color: props.state.index === 2 ? '#fff' : '#77747D',
              lineHeight: 18,
            },
          ]}
        >
          Reports
        </Text>
      </TouchableOpacity>
      {userRole === 'TEACHER' && (
        <TouchableOpacity
          style={[layout.justifyCenter, layout.itemsCenter, { width: '25%' }]}
          onPress={() => {
            props.navigation.jumpTo('ActivateTab');
          }}
        >
          <ImageVariant
            testID="brand-img"
            style={{
              width: 30,
              height: 30,
              tintColor: props.state.index === 3 ? '#fff' : '#77747D',
            }}
            source={ActivateTab}
            resizeMode="contain"
          />
          <Text
            style={[
              fonts.size_12,
              fonts.alignCenter,
              {
                fontWeight: props.state.index === 4 ? '700' : '500',
                color: props.state.index === 3 ? '#fff' : '#77747D',
                lineHeight: 18,
              },
            ]}
          >
            Activate
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const BottomTabNavigator = () => {
  return (
    <>
      <Header />
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          lazy: false,
        }}
        tabBar={(props) => <TabBar {...props} />}
      >
        <Tab.Screen name="HomeTab" component={HomeScreen} />
        <Tab.Screen name="SchoolWorkTab" component={SchoolWorkScreen} />
        <Tab.Screen name="ReportsTab" component={ReportsScreen} />
        <Tab.Screen name="ActivateTab" component={ActivateScreen} />
      </Tab.Navigator>
    </>
  );
};

export default BottomTabNavigator;
