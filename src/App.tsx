import 'react-native-gesture-handler';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MMKV } from 'react-native-mmkv';
import { Provider } from 'react-redux';
import Base64 from 'react-native-base64';
import { ThemeProvider } from '@/theme';

import ApplicationNavigator from './navigators/Application';
import './translations';
import store from './store/Store';
import Toast from 'react-native-toast-message';
import { toastConfig } from './utils/toast.config';

const queryClient = new QueryClient();

export const storage = new MMKV();

global.atob = Base64.decode;

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider storage={storage}>
          <ApplicationNavigator />
          <Toast config={toastConfig} />
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
