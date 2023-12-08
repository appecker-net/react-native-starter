import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {margin} from '../utils/utils';
import {Button, AppInput, PageContainer} from '../view';
import {
  confirmPasswordValidation,
  passwordValidation,
} from './helpers/validations.helper';
import getNavigationLeftButtonAction from '../view/NavigationDefaultLeftCTA';
import useAuthApis from '../hooks/useAuthApis';
import {Text} from '@rneui/base';
import {useLoader} from '../context/appContext/AppContext+StateHooks';
import {showAlert} from '../utils/alert.helper';

export default function ResetPasswordScreen({navigation, route}: any) {
  const {
    resetPasswordMutation: {mutate: resetPassword},
  } = useAuthApis({});
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showError, setShowError] = useState(false);

  const {showLoader} = useLoader();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      ...getNavigationLeftButtonAction({route, navigation}),
    });
  }, [navigation, route]);

  const resetPasswordAction = async () => {
    setShowError(true);

    if (
      oldPassword.length === 0 ||
      (passwordValidation(newPassword).valid &&
        confirmPasswordValidation(confirmPassword, newPassword).valid)
    ) {
      try {
        showLoader(true);
        const res = await resetPassword({
          oldPassword,
          newPassword,
          confirmPassword,
        });
        showLoader(false);
        console.log(res);
        if (res.success === true) {
          await showAlert({message: res.message});
          navigation.pop();
        }
      } catch (error) {
        showLoader(false);
        showAlert({message: error as string});
      }
    }
  };

  return (
    <PageContainer style={{margin: 15}}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.heading}>{'Update Password'}</Text>
          <Text style={styles.subtitle}>
            {
              'Your new password must be different from previous used passwords.'
            }
          </Text>
          <View style={{marginTop: 30}}>
            <AppInput
              title="Old Password"
              value={oldPassword}
              onChangeText={value => setOldPassword(value)}
              errorMessage={
                showError && oldPassword.length === 0
                  ? 'Please enter Old Password'
                  : undefined
              }
              secureTextEntry
            />

            <AppInput
              title="New Password"
              value={newPassword}
              onChangeText={value => setNewPassword(value)}
              errorMessage={
                showError ? passwordValidation(newPassword).message : undefined
              }
              secureTextEntry
            />

            <AppInput
              title="Confirm New Password"
              value={confirmPassword}
              onChangeText={value => setConfirmPassword(value)}
              errorMessage={
                showError
                  ? confirmPasswordValidation(confirmPassword, newPassword)
                      .message
                  : undefined
              }
              secureTextEntry
            />

            <Button
              style={styles.button}
              title={'Update'}
              onPress={resetPasswordAction}
            />
          </View>
        </View>
      </ScrollView>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: margin(1),
  },
  button: {
    marginTop: margin(2),
  },
  forgotPasswordContainer: {
    paddingHorizontal: margin(2),
  },
  registerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  titleContainer: {
    marginTop: margin(2),
    marginLeft: 20,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginRight: 20,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: 'normal',
    color: '#848689',
    marginTop: 10,
  },
});
