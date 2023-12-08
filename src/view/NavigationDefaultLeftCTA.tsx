import React from 'react';
import MenuIcon from '../icons/MenuIcon';
import {View, Platform} from 'react-native';

type NavigationDefaultLeftCTAProps = {
  route: any;
  navigation?: any;
};

const NavigationDefaultLeftCTA = ({
  route,
  navigation,
}: NavigationDefaultLeftCTAProps) =>
  route?.params?.drawer && navigation ? (
    <View style={{marginRight: Platform.select({ios: 0, android: 16})}}>
      <MenuIcon onPress={() => navigation.toggleDrawer()} />
    </View>
  ) : null;

const getNavigationLeftButtonAction = ({route, navigation}: any) => {
  return route?.params?.drawer && navigation
    ? {
        headerLeft: () => (
          <NavigationDefaultLeftCTA route={route} navigation={navigation} />
        ),
      }
    : {};
};

export default getNavigationLeftButtonAction;
