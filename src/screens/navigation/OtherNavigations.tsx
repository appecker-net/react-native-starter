import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import colors from '../../constant/colors';

const ScreenStack = createNativeStackNavigator();

export function ScreensNavigationContainer() {
  return (
    <ScreenStack.Navigator
      screenOptions={{
        headerBackTitle: 'Back',
        headerTintColor: colors.background,
        headerShadowVisible: false,
        headerTitleStyle: {fontFamily: 'Aeonik', fontWeight: 'bold'},
        headerStyle: {backgroundColor: colors.primary},
      }}>
      <ScreenStack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{title: 'SignUp'}}
      />
      <ScreenStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{title: 'Login'}}
      />
    </ScreenStack.Navigator>
  );
}
