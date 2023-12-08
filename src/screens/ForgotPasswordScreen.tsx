import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Images from '../constant/Images';
import {margin} from '../utils/utils';
import AppInput from '../view/Input';
import {emailValidation} from './helpers/validations.helper';
import {Button, Container, PageContainer, Thumbnail} from '../view';
import useAuthApis from '../hooks/useAuthApis';
import {RouteProp, useRoute} from '@react-navigation/native';
import {UserType} from '../hooks/useAuthUser';
import {Card} from '@rneui/base';
import {useLoader} from '../context/appContext/AppContext+StateHooks';
import {showAlert} from '../utils/alert.helper';

const ForgotPasswordScreen = ({navigation}: any) => {
  const {params} = useRoute<RouteProp<{params: {type: UserType}}>>();
  const {
    forgotPasswordMutation: {mutate: forgotPassword},
  } = useAuthApis({
    type: params.type,
  });
  const {showLoader} = useLoader();
  const [email, setEmail] = useState('');
  const [showError, setShowError] = useState(false);

  const forgotPasswordAction = async () => {
    setShowError(true);
    if (emailValidation(email).valid) {
      try {
        showLoader(true);
        const res = await forgotPassword(email);
        showLoader(false);
        await showAlert({message: res.message});
        if (res.success === true) {
          navigation.pop();
        }
      } catch (error) {
        showLoader(false);
        showAlert({message: error as string});
      }
    }
  };

  return (
    <PageContainer safeAreaView>
      <View style={styles.logoContainer}>
        <Thumbnail source={Images.LOGO} size={150} />
      </View>
      <View>
        <Text style={styles.heading}>Forgot Password</Text>
        <Text style={styles.subtitle} numberOfLines={2}>
          Enter the email address associated with your account.
        </Text>
      </View>
      <Card>
        <AppInput
          title="Email"
          value={email}
          onChangeText={value => setEmail(value)}
          keyboardType="email-address"
          errorMessage={showError ? emailValidation(email).message : undefined}
        />
        <Button
          style={styles.button}
          title={'Submit'}
          onPress={forgotPasswordAction}
        />
      </Card>
      <Container style={styles.goBackContainer}>
        <Button
          style={styles.button}
          title={'Cancel'}
          onPress={() => {
            navigation.goBack();
          }}
          type="clear"
        />
      </Container>
    </PageContainer>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoContainer: {
    alignSelf: 'center',
    marginTop: margin(3),
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
    marginRight: 20,
    marginLeft: 20,
  },

  subtitle: {
    fontSize: 15,
    fontWeight: 'normal',
    color: '#848689',
    marginTop: 2,
    marginRight: 20,
    marginLeft: 20,
  },

  button: {
    marginTop: margin(2),
  },
  goBackContainer: {
    paddingHorizontal: margin(2),
  },
});
