import React, {useEffect} from 'react';
import AppContextProvider from './context/appContext/AppContext';
import AppThemeProvider from './context/AppThemeContext';
import AppNavigationContainer from './screens/navigation/AppNavigationContainer';
import Loader from './view/Loader';
import KeyboardManager from 'react-native-keyboard-manager';
import {Platform, StatusBar, AppState, UIManager} from 'react-native';
import {
  focusManager,
  onlineManager,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import NetInfo from '@react-native-community/netinfo';
import colors from './constant/colors';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const queryClient = new QueryClient({
  logger: {
    log: (...args) => {
      // Log debugging information
    },
    warn: (...args) => {
      // Log warning
    },
    error: (...args) => {
      // Log error
    },
  },
});

function App() {
  function onAppStateChange(status) {
    if (Platform.OS !== 'web') {
      focusManager.setFocused(status === 'active');
    }
  }

  useEffect(() => {
    if (Platform.OS === 'ios' && KeyboardManager) {
      KeyboardManager.setEnable(true);
    }

    onlineManager.setEventListener(setOnline => {
      return NetInfo.addEventListener(state => {
        setOnline(!!state.isConnected);
      });
    });

    const subscription = AppState.addEventListener('change', onAppStateChange);
    return () => subscription.remove();
  }, []);

  return (
    <>
      <StatusBar barStyle={'light-content'} backgroundColor={colors.primary} />
      <QueryClientProvider client={queryClient}>
        <AppContextProvider>
          <AppThemeProvider>
            <>
              <AppNavigationContainer />
              <Loader />
            </>
          </AppThemeProvider>
        </AppContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
