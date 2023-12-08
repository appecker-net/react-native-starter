import {Alert} from 'react-native';

export const showAlert = async ({
  title,
  message,
}: {
  title?: string;
  message: string;
}) => {
  return new Promise<string | undefined>(res => {
    Alert.alert(
      title || 'Alert',
      message,
      [{text: 'Ok', style: 'default', onPress: res}],
      {
        cancelable: false,
      },
    );
  });
};
