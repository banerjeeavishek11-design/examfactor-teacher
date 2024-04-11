import { BaseToast, ErrorToast, InfoToast } from 'react-native-toast-message';
import React from 'react';

export const toastConfig = {
  /*
      'success' type,
    */
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        borderWidth: 2,
        borderLeftWidth: 5,
        borderColor: '#3DD598',
        borderLeftColor: '#3DD598',
        backgroundColor: '#222230',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 14,
        fontWeight: '400',
        fontFamily: 'poppins',
        color: '#3DD598',
      }}
      text2Style={{
        fontFamily: 'poppins',
        color: '#3DD598',
      }}
    />
  ),
  /*
      'error' type,
    */
  error: (props) => (
    <ErrorToast
      {...props}
      style={{
        borderWidth: 2,
        borderLeftWidth: 5,
        borderColor: '#FF3A44',
        borderLeftColor: '#FF3A44',
        backgroundColor: '#222230',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 14,
        fontWeight: '400',
        fontFamily: 'poppins',
        color: '#FF3A44',
      }}
      text2Style={{
        fontFamily: 'poppins',
        color: '#FF3A44',
      }}
    />
  ),
  /*
      'Info' type,
    */
  info: (props) => (
    <InfoToast
      {...props}
      style={{
        borderWidth: 2,
        borderLeftWidth: 5,
        borderColor: '#FFC727',
        borderLeftColor: '#FFC727',
        backgroundColor: '#222230',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 14,
        fontWeight: '400',
        fontFamily: 'poppins',
        color: '#FFC727',
      }}
      text2Style={{
        fontFamily: 'poppins',
        color: '#FFC727',
      }}
    />
  ),
};
