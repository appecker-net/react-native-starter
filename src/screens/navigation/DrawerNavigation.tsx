import * as React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {Alert, Platform, StyleSheet, Text, View} from 'react-native';
import {ScreensNavigationContainer} from './OtherNavigations';
import {margin} from '../../utils/utils';
import useFirebase from '../../hooks/useFirebase';
import colors from '../../constant/colors';
import useAuthApis from '../../hooks/useAuthApis';
import {UserType} from '../../hooks/useAuthUser';
import typography from '../../constant/typography';
import {useLoader} from '../../context/appContext/AppContext+StateHooks';

const drawerOptions: {name: string; screen: string}[] = [
  {name: 'Documents', screen: 'DocumentListScreen'},
  {name: 'Reset Password', screen: 'ResetPasswordScreen'},
];

const Drawer = createDrawerNavigator();

export default function DrawerNavigation({type}: {type: UserType}) {
  const {
    user,
    updateTokenMutation: {mutate: updateToken},
  } = useAuthApis({type});
  const {token, onMessage} = useFirebase();

  React.useEffect(() => {
    if (token && token.length && user) {
      console.log('Token : ', token);
      try {
        updateToken({token, device: Platform.OS});
      } catch (error) {
        console.log(error);
      }
    }
  }, [token, user]);

  React.useEffect(() => {
    return onMessage(msz => {
      Alert.alert(
        msz.notification?.title || 'New Notification',
        msz.notification?.body ||
          'You received a notification. check your request section for udpates.',
      );
    });
  }, []);

  return (
    <Drawer.Navigator
      initialRouteName="HomeNavigation"
      screenOptions={{headerShown: false}}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        key={'drawerScreen'}
        name={'DrawerScreens'}
        component={ScreensNavigationContainer}
        options={{
          drawerActiveTintColor: colors.tint,
          drawerInactiveTintColor: colors.tint,
        }}
      />
    </Drawer.Navigator>
  );
}

function CustomDrawerContent(props: any) {
  const {
    signOutMutation: {mutate: signOut},
    user,
  } = useAuthApis({});
  const {showLoader} = useLoader();
  const logOutAction = () => {
    Alert.alert('Please Confirm', 'do you want to logout?', [
      {
        text: 'Cancel',
        onPress: () => {
          props.navigation.toggleDrawer();
        },
        style: 'cancel',
      },
      {
        text: 'Logout',
        onPress: async () => {
          props.navigation.closeDrawer();
          showLoader(true);
          await signOut();
          showLoader(false);
        },
        style: 'destructive',
      },
    ]);
  };
  return (
    <DrawerContentScrollView
      {...props}
      style={{backgroundColor: colors.primary}}>
      <View style={{width: '100%'}}>
        <View style={styles.profileViewContainer}>
          <Text style={styles.nameText}>{user?.name}</Text>
          <Text style={styles.emailText}>{`✉ ${user?.email}`}</Text>
          <Text style={styles.emailText}>{`📞 ${user?.phone}`}</Text>
          <Text
            style={
              styles.addressText
            }>{`📍 ${user?.address}, ${user?.city}, ${user?.state}`}</Text>
        </View>
        {drawerOptions.map((option, index) => (
          <DrawerItem
            focused={index === 0}
            inactiveTintColor={colors.tint}
            activeTintColor={colors.tint}
            activeBackgroundColor={'rgba(255,255,255,0.1)'}
            label={option.name}
            onPress={() => {
              props.navigation.navigate(option.screen, {});
            }}
          />
        ))}
        <DrawerItem
          inactiveTintColor={colors.tint}
          label="Logout"
          onPress={logOutAction}
        />
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  profileViewContainer: {
    marginBottom: margin(2),
    padding: margin(2),
    backgroundColor: colors.primary,
    borderBottomColor: colors.light60,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  nameText: {
    ...typography.font,
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: margin(1),
    color: colors.tint,
  },
  emailText: {
    ...typography.font,
    fontSize: 15,
    fontWeight: 'normal',
    lineHeight: 25,
    color: colors.tint,
  },
  addressText: {
    ...typography.font,
    fontSize: 15,
    fontWeight: 'normal',
    lineHeight: 25,
    color: colors.tint,
  },
});
