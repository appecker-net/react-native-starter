import React from 'react';
import {Platform} from 'react-native';
import {
  ThemeProvider,
  createTheme,
  lightColors,
  darkColors,
} from '@rneui/themed';

const theme = createTheme({
  lightColors: {
    ...Platform.select({
      default: lightColors.platform.android,
      ios: lightColors.platform.ios,
    }),
    primary: '#e7e7e8',
  },
  darkColors: {
    ...Platform.select({
      default: darkColors.platform.android,
      ios: darkColors.platform.ios,
    }),
    primary: '#000',
  },
});

function AppThemeProvider({children}: any) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default AppThemeProvider;
