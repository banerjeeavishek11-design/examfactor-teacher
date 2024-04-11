import Toast from 'react-native-toast-message';
export const notifyMessage = (msg) => {
  // checking if msg is an error object, then extract the message
  const finalMessage = msg?.message ? msg.message : msg;
  Toast.show({
    type: 'error',
    text1: 'Error',
    text2: finalMessage,
    position: 'bottom',
  });
};
export const notifyWarningMessage = (msg) => {
  Toast.show({
    type: 'success',
    text1: 'Success',
    text2: msg,
    position: 'bottom',
  });
};

export const notifyInfoMessage = (msg) => {
  Toast.show({
    type: 'info',
    text1: '',
    text2: msg,
    position: 'bottom',
  });
};
