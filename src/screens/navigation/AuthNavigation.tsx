import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../LoginScreen';
import ForgotPasswordScreen from '../ForgotPasswordScreen';
import CompanySignUpScreen from '../SignUpScreen';
import EmailVerificationScreen from '../EmailVerificationScreen';

const Stack = createNativeStackNavigator();

export default function AppAuthNavigationContainer() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerBackTitle: '',
        headerTintColor: '#000',
      }}>
      <Stack.Screen name="AuthScreen" component={LoginScreen} />
      <Stack.Screen name="ForgotScreen" component={ForgotPasswordScreen} />
      <Stack.Screen
        name="EmailVerificationScreen"
        component={EmailVerificationScreen}
      />
      <Stack.Screen
        name="CompanySignUpScreen"
        component={CompanySignUpScreen}
      />
    </Stack.Navigator>
  );
}
