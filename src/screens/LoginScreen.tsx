import React, {useEffect, useRef, useState} from 'react';
import {
  LayoutAnimation,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import Images from '../constant/Images';
import {margin} from '../utils/utils';
import {Button, AppInput, PageContainer, Thumbnail, Container} from '../view';
import {
  emailValidation,
  passwordValidation,
} from './helpers/validations.helper';
import {Text} from '@rneui/themed';
import useAuthApis from '../hooks/useAuthApis';
import colors from '../constant/colors';
import typography from '../constant/typography';
import {Input} from '@rneui/base';
import {useRoute} from '@react-navigation/native';
import {useLoader} from '../context/appContext/AppContext+StateHooks';
import {showAlert} from '../utils/alert.helper';

export default function LoginScreen(props: any) {
  const route = useRoute<any>();

  const passwordInputRef = useRef<Input>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);

  const {
    loginMutation: {mutate: login},
    restoreUserDetails,
  } = useAuthApis();
  const {showLoader} = useLoader();

  const [timePassed, setTimePassed] = useState(false);

  useEffect(() => {
    restoreUserDetails();
    setTimeout(function () {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
      setTimePassed(true);
    }, 1000);
  }, []);

  const loginAction = async () => {
    setShowError(true);
    if (emailValidation(email).valid && passwordValidation(password).valid) {
      try {
        showLoader(true);
        await login({email, password});
        showLoader(false);
      } catch (error) {
        showLoader(false);
        showAlert({message: error as string, title: 'Error'});
      }
    }
  };

  return (
    <PageContainer style={styles.container}>
      <StatusBar hidden />
      <ScrollView style={{flex: 1}} contentContainerStyle={{flex: 1}}>
        <View>
          <>
            <View
              style={[
                styles.outerContainer,
                !timePassed && {
                  height: '100%',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  backgroundColor: colors.background,
                },
              ]}>
              <View style={styles.logoContainer}>
                <Thumbnail source={Images.LOGO} size={timePassed ? 150 : 300} />
              </View>
            </View>
            {timePassed && (
              <View style={styles.fieldsOuterView}>
                <View style={{marginBottom: 8}}>
                  <Text style={styles.heading}>{`Login`}</Text>
                  <Text style={styles.subtitle} numberOfLines={2}>
                    Enter the email and password.
                  </Text>
                </View>
                <View style={styles.fieldContainer}>
                  <AppInput
                    title="Email"
                    value={email}
                    onChangeText={value => setEmail(value)}
                    keyboardType="email-address"
                    errorMessage={
                      showError ? emailValidation(email).message : undefined
                    }
                    inputTitleStyle={{color: colors.tint}}
                    inputStyle={{color: colors.tint}}
                    errorStyle={{color: colors.tint}}
                    onSubmitEditing={() => {
                      passwordInputRef?.current?.focus();
                    }}
                    returnKeyType="next"
                  />
                  <AppInput
                    ref={passwordInputRef}
                    title="Password"
                    value={password}
                    onChangeText={value => setPassword(value)}
                    errorMessage={
                      showError
                        ? passwordValidation(password).message
                        : undefined
                    }
                    secureTextEntry
                    inputTitleStyle={{color: colors.tint}}
                    inputStyle={{color: colors.tint}}
                    errorStyle={{color: colors.tint}}
                    returnKeyType="go"
                    onSubmitEditing={() => {
                      loginAction();
                    }}
                  />

                  <Button
                    style={styles.button}
                    color={colors.tint}
                    title={'Sign in'}
                    onPress={loginAction}
                    titleStyle={styles.buttonText}
                  />
                </View>
              </View>
            )}
          </>
          <Container style={styles.forgotPasswordContainer}>
            <Button
              style={styles.button}
              title={'Forgot Password'}
              onPress={() => {
                props.navigation.navigate('ForgotScreen', {
                  type: 'company',
                });
              }}
              type="clear"
            />
          </Container>
          <Container style={styles.registerContainer}>
            <Button
              style={styles.button}
              title={"Don't have an Account? Sign up Now."}
              onPress={() => {
                setShowError(false);
                props.navigation.navigate('EmailVerificationScreen');
              }}
              type="clear"
            />
          </Container>
        </View>
      </ScrollView>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    padding: 0,
  },
  fieldsOuterView: {
    margin: 16,
    paddingVertical: 16,
    borderRadius: 20,
    borderColor: colors.light60,
    justifyContent: 'center',
    backgroundColor: colors.primary,
    shadowColor: colors.grayDark,
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 60,
  },
  outerContainer: {
    paddingTop: 40,
    backgroundColor: colors.background,
  },
  logoContainer: {
    alignSelf: 'center',
    marginTop: margin(3),
    shadowColor: '#fff',
    shadowOpacity: 0.2,
  },
  button: {
    marginTop: margin(4),
  },
  buttonText: {
    ...typography.title,
    color: colors.primary,
  },
  typeContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  typeOption: {
    flex: 1,
    paddingVertical: 8,
  },
  typeOptionText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    paddingVertical: 8,
    fontWeight: '500',
  },
  fieldContainer: {
    padding: 16,
  },
  forgotPasswordContainer: {
    marginTop: -10,
  },
  registerContainer: {
    marginTop: -10,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  heading: {
    ...typography.font,
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
    marginRight: 20,
    marginLeft: 20,
    color: colors.tint,
  },
  subtitle: {
    ...typography.font,
    fontSize: 15,
    fontWeight: 'normal',
    color: colors.tint,
    marginTop: 2,
    marginRight: 20,
    marginLeft: 20,
  },
});
