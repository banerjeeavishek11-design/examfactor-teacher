import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { useTheme } from '@/theme';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeWorkTab from '@/screens/Activate/HomeWorkTab';
import DiagnosticTab from '@/screens/Activate/DiagnosticTab';
import ClassWorkTab from '@/screens/Activate/ClassWorkTab';

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
  return (
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
              borderBottomWidth: 4,
              borderBottomColor: colors.lineBackgroundColor,
            },
          ]}
          onPress={() => {
            props.navigation.jumpTo('ActivateHomeWorkTab');
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
                borderBottomWidth: props.state.index === 0 ? 4 : 0,
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
            { width: '35%' },
            props.state.index !== 1 && {
              borderBottomWidth: 4,
              borderBottomColor: colors.lineBackgroundColor,
            },
          ]}
          onPress={() => {
            props.navigation.jumpTo('ActivateDiagnosticTab');
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
                borderBottomWidth: props.state.index === 1 ? 4 : 0,
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
            { width: '37%' },
            props.state.index !== 2 && {
              borderBottomWidth: 4,
              borderBottomColor: colors.lineBackgroundColor,
            },
          ]}
          onPress={() => {
            props.navigation.jumpTo('ActivateClassWorkTab');
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
                borderBottomWidth: props.state.index === 2 ? 4 : 0,
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
  );
};

const ActivateTopTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tab.Screen name="ActivateHomeWorkTab" component={HomeWorkTab} />
      <Tab.Screen name="ActivateDiagnosticTab" component={DiagnosticTab} />
      <Tab.Screen name="ActivateClassWorkTab" component={ClassWorkTab} />
    </Tab.Navigator>
  );
};

export default ActivateTopTabNavigator;
