import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { useTheme } from '@/theme';
import { useSelector } from 'react-redux';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeWorkTab from '@/screens/SchoolWork/HomeWorkTab';
import DiagnosticTab from '@/screens/SchoolWork/DiagnosticTab';
import ClassWorkTab from '@/screens/SchoolWork/ClassWorkTab';
import Header from '../components/template/Header/Header';

const Tab = createMaterialTopTabNavigator();
const S = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'black',
    alignItems: 'center',
    marginTop: '5%',
    width: '96%',
  },
});

const TabBar = (props) => {
  const { colors, layout, fonts } = useTheme();
  const isTablet = useSelector((state) => state.screenDimensions.isTablet);

  return (
    <>
      {isTablet && <Header />}
      <View
        style={{
          padding: '4%',
          paddingTop: '0%',
          paddingBottom: '0%',
          alignItems: 'center',
        }}
      >
        <View style={[S.container]}>
          <Pressable
            style={[
              layout.justifyCenter,
              layout.itemsCenter,
              { width: '28%' },
              props.state.index !== 0 && {
                borderBottomWidth: 2,
                borderBottomColor: colors.lineBackgroundColor,
              },
            ]}
            onPress={() => {
              props.navigation.jumpTo('HomeWorkTab');
            }}
          >
            <Text
              style={[
                fonts.size_14,
                fonts.alignCenter,
                {
                  fontWeight: props.state.index === 0 ? '700' : '500',
                  color: props.state.index === 0 ? colors.linearGradientColor : colors.white,
                  lineHeight: 18,
                  borderBottomWidth: props.state.index === 0 ? 3 : 0,
                  borderBottomColor: colors.linearGradientColor,
                  width: '100%',
                  paddingBottom: 5,
                },
              ]}
            >
              Home work
            </Text>
          </Pressable>
          <Pressable
            style={[
              layout.justifyCenter,
              layout.itemsCenter,
              { width: '40%' },
              props.state.index !== 1 && {
                borderBottomWidth: 2,
                borderBottomColor: colors.lineBackgroundColor,
              },
            ]}
            onPress={() => {
              props.navigation.jumpTo('DiagnosticTab');
            }}
          >
            <Text
              style={[
                fonts.size_14,
                fonts.alignCenter,
                {
                  fontWeight: props.state.index === 1 ? '700' : '500',
                  color: props.state.index === 1 ? colors.linearGradientColor : colors.white,
                  lineHeight: 18,
                  borderBottomWidth: props.state.index === 1 ? 3 : 0,
                  borderBottomColor: colors.linearGradientColor,
                  width: '100%',
                  paddingBottom: 5,
                },
              ]}
            >
              Diagnostic
            </Text>
          </Pressable>
          <Pressable
            style={[
              layout.justifyCenter,
              layout.itemsCenter,
              { width: '32%' },
              props.state.index !== 2 && {
                borderBottomWidth: 2,
                borderBottomColor: colors.lineBackgroundColor,
              },
            ]}
            onPress={() => {
              props.navigation.jumpTo('ClassWorkTab');
            }}
          >
            <Text
              style={[
                fonts.size_14,
                fonts.alignCenter,
                {
                  fontWeight: props.state.index === 2 ? '700' : '500',
                  color: props.state.index === 2 ? colors.linearGradientColor : colors.white,
                  lineHeight: 18,
                  borderBottomWidth: props.state.index === 2 ? 3 : 0,
                  borderBottomColor: colors.linearGradientColor,
                  width: '100%',
                  paddingBottom: 5,
                },
              ]}
            >
              Class work
            </Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

const SchoolWorkTopTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <TabBar {...props} />}
      initialRouteName="HomeWorkTab"
    >
      <Tab.Screen name="HomeWorkTab" component={HomeWorkTab} />
      <Tab.Screen name="DiagnosticTab" component={DiagnosticTab} />
      <Tab.Screen name="ClassWorkTab" component={ClassWorkTab} />
    </Tab.Navigator>
  );
};

export default SchoolWorkTopTabNavigator;
