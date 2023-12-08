import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import {useEffect, useState} from 'react';
import {Alert, PermissionsAndroid, Platform} from 'react-native';

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

const useFirebase = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    const fetchToken = async () => {
      const _token = await getToken();
      setToken(_token);
    };
    fetchToken();
  }, []);

  async function requestUserPermission() {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      return true;
    } else {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      }

      return enabled;
    }
  }
  function onMessage(
    cb: (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => void,
  ) {
    const unsubscribe = messaging().onMessage(cb);
    return unsubscribe;
  }

  async function getToken() {
    const enabled = await requestUserPermission();
    if (enabled) {
      try {
        if (!messaging().isDeviceRegisteredForRemoteMessages) {
          await messaging().registerDeviceForRemoteMessages();
        }
        const token = await messaging().getToken();
        return token;
      } catch (error) {
        console.log(error);
        return '';
      }
    }
    return '';
  }

  return {token, onMessage};
};

export default useFirebase;
