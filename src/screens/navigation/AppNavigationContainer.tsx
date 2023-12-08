import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppAuthNavigationContainer from './AuthNavigation';
import DrawerNavigation from './DrawerNavigation';
import useAuthUser from '../../hooks/useAuthUser';

export default function AppNavigationContainer() {
  const {user, userType} = useAuthUser();
  return (
    <NavigationContainer>
      {user === undefined || userType.type === undefined ? (
        <AppAuthNavigationContainer />
      ) : (
        <DrawerNavigation type={userType.type} />
      )}
    </NavigationContainer>
  );
}
