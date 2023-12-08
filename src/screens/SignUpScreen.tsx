import React, {useState} from 'react';
import {margin} from '../utils/utils';
import {StyleSheet, ScrollView, View, Alert} from 'react-native';
import {
  Container,
  PageContainer,
  AppInput,
  Button,
  AddressViewInput,
  PickerViewInput,
  DateTimeInput,
} from '../view';
import {Text} from '@rneui/themed';
import {Card} from '@rneui/base';
import {
  confirmPasswordValidation,
  emailValidation,
  passwordValidation,
} from './helpers/validations.helper';
import ArrowIcon from '../icons/ArrowIcon';
import useAuthApis from '../hooks/useAuthApis';
import {CompanySignUpModel} from '../hooks/useAuthUser';
import AddressModalPicker from '../view/AddressSearchView';
import {useLoader} from '../context/appContext/AppContext+StateHooks';

export default function CompanySignUpScreen(props: any) {
  const {verifyEmail} = props.route?.params;
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState(verifyEmail);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dotNumber, setDotNumber] = useState('');
  const [mcaNumber, setMcaNumber] = useState('');
  const [taxId, setTaxId] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [address, setAddress] = useState('');
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [irpExpiryDate, setIrpExpiryDate] = useState('');
  const [clearingHouse, setClearingHouse] = useState('');
  const [callBeforeClearing, setCallBeforeClearing] = useState('');
  const [askMvr, setAskMvr] = useState('');
  const [showError, setShowError] = useState(false);

  const {
    registerMutation: {mutate: register},
  } = useAuthApis();
  const {showLoader} = useLoader();

  const registerAction = async () => {
    setShowError(true);
    console.log(`IrpExpiryDate ${irpExpiryDate}`);
    if (
      emailValidation(email).valid &&
      passwordValidation(password).valid &&
      confirmPasswordValidation(confirmPassword, password).valid &&
      type.length !== 0 &&
      name.length !== 0 &&
      phoneNumber.length !== 0 &&
      address.length !== 0 &&
      city.length !== 0 &&
      state.length !== 0 &&
      taxId.length !== 0 &&
      dotNumber.length !== 0 &&
      mcaNumber.length !== 0 &&
      irpExpiryDate.length !== 0 &&
      clearingHouse.length !== 0 &&
      callBeforeClearing.length !== 0 &&
      askMvr.length !== 0
    ) {
      let data: CompanySignUpModel = {
        comptype: type,
        company_name: name,
        company_email: email,
        company_password: password,
        company_phone: phoneNumber,
        company_address: address,
        company_city: city,
        company_state: state,
        company_zip: zipCode,
        company_tax_id: taxId,
        company_dto: dotNumber,
        company_mca: mcaNumber,
        irp_exp_date: irpExpiryDate,
        clearing_house: clearingHouse,
        call_before_clearing: callBeforeClearing,
        ask_mvr: askMvr,
        level: 'guest',
      };

      if (type.length > 0) {
        data.comptype = type;
      }
      if (name.length > 0) {
        data.company_name = name;
      }
      if (email.length > 0) {
        data.company_email = email;
      }
      if (password.length > 0) {
        data.company_password = password;
      }
      if (phoneNumber.length > 0) {
        data.company_phone = phoneNumber;
      }
      if (address.length > 0) {
        data.company_address = address;
      }
      if (city.length > 0) {
        data.company_city = city;
      }
      if (state.length > 0) {
        data.company_state = state;
      }
      if (zipCode.length > 0) {
        data.company_zip = zipCode;
      }
      if (taxId.length > 0) {
        data.company_tax_id = taxId;
      }
      if (dotNumber.length > 0) {
        data.company_dto = dotNumber;
      }
      if (mcaNumber.length > 0) {
        data.company_mca = mcaNumber;
      }
      if (irpExpiryDate.length > 0) {
        data.irp_exp_date = irpExpiryDate;
      }
      if (clearingHouse.length > 0) {
        data.clearing_house = clearingHouse;
      }
      if (callBeforeClearing.length > 0) {
        data.call_before_clearing = callBeforeClearing;
      }
      if (askMvr.length > 0) {
        data.ask_mvr = askMvr;
      }
      try {
        showLoader(true);
        const res = await register(data);
        showLoader(false);
        if (res.success === true) {
          Alert.alert(
            'Thank You!',
            'You have been successfully signed up as company but your account is not active yet. Admin will review your account and you will receive an email when your account is activated.',
          );
          props.navigation.pop();
        }
      } catch (error) {
        showLoader(false);
      }
    }
  };

  return (
    <PageContainer safeAreaView>
      <ScrollView>
        <View style={styles.backIconContainer}>
          <ArrowIcon direction="left" onPress={props.navigation.goBack} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.heading}>Company Sign Up</Text>
          <Text style={styles.subtitle} numberOfLines={2}>
            {'Enter the details below to get started'}
          </Text>
        </View>
        <Card>
          <PickerViewInput
            title="Select Company Type"
            options={[]}
            onSelection={item => {
              setType(item.key);
            }}
            value={type}
            useTitle={false}
          />
          <AppInput
            title="Name"
            value={name}
            onChangeText={value => setName(value)}
            errorMessage={
              showError && name.length === 0 ? 'Please enter Name' : undefined
            }
          />
          <AppInput
            title="Email Address"
            editable={false}
            selectTextOnFocus={false}
            disabled={true}
            value={email}
            onChangeText={value => setEmail(value)}
            keyboardType="email-address"
            errorMessage={
              showError ? emailValidation(email).message : undefined
            }
          />
          <AppInput
            title="Password"
            value={password}
            onChangeText={value => setPassword(value)}
            errorMessage={
              showError ? passwordValidation(password).message : undefined
            }
            secureTextEntry
          />

          <AppInput
            title="Confirm Password"
            value={confirmPassword}
            onChangeText={value => setConfirmPassword(value)}
            errorMessage={
              showError
                ? confirmPasswordValidation(confirmPassword, password).message
                : undefined
            }
            secureTextEntry
          />

          <AppInput
            title="Phone number"
            value={phoneNumber}
            keyboardType="phone-pad"
            onChangeText={value => setPhoneNumber(value)}
            errorMessage={
              showError && phoneNumber.length === 0
                ? 'Please enter Phone Number'
                : undefined
            }
          />

          <AddressViewInput
            defaultValue={{
              city,
              state,
              address,
              zip: zipCode,
              lat,
              lng,
              formatted_address: '',
            }}
            title="Address"
            onSelection={adrs => {
              setLat(adrs.lat);
              setLng(adrs.lng);
              setAddress(adrs.address);
              setCity(adrs.city);
              setState(adrs.state);
              setZipCode(adrs.zip);
            }}
            error={
              showError
                ? {
                    address:
                      address.length === 0
                        ? 'Please select address'
                        : undefined,
                    city: city.length === 0 ? 'Please select city' : undefined,
                    state:
                      state.length === 0 ? 'Please select state' : undefined,
                    zip:
                      zipCode.length === 0
                        ? 'Please select zip code'
                        : undefined,
                  }
                : undefined
            }
            errorMessage={
              showError &&
              (address.length === 0 ||
                city.length === 0 ||
                state.length === 0 ||
                zipCode.length === 0)
                ? 'Please Select Complete address'
                : undefined
            }
          />

          <AppInput
            title="Tax Id"
            keyboardType="number-pad"
            value={taxId}
            maxLength={9}
            onChangeText={value => setTaxId(value)}
            errorMessage={
              (showError && taxId.length < 9) || taxId.length > 9
                ? 'Please enter 9 digit Tax Id'
                : undefined
            }
          />

          <AppInput
            title="DOT number"
            keyboardType="number-pad"
            value={dotNumber}
            maxLength={7}
            onChangeText={value => setDotNumber(value)}
            errorMessage={
              (showError && dotNumber.length < 7) || dotNumber.length > 7
                ? 'Please enter 7 digit DOT number'
                : undefined
            }
          />

          <AppInput
            title="MCA number"
            keyboardType="number-pad"
            value={mcaNumber}
            maxLength={7}
            onChangeText={value => setMcaNumber(value)}
            errorMessage={
              (showError && mcaNumber.length < 7) || mcaNumber.length > 7
                ? 'Please enter 7 digit MCA number'
                : undefined
            }
          />

          <DateTimeInput
            title="IRP Expiry Date"
            value={irpExpiryDate}
            // maximumDate={new Date()}
            onChangeText={value => setIrpExpiryDate(value)}
            errorMessage={
              showError && irpExpiryDate.length === 0
                ? 'Please enter Irp Expiry Date'
                : undefined
            }
          />

          <PickerViewInput
            title="Clearing House"
            options={[]}
            onSelection={item => {
              setClearingHouse(item.key);
            }}
            value={clearingHouse}
            useTitle={false}
          />

          <PickerViewInput
            title="Call Before Clearing"
            options={[]}
            onSelection={item => {
              setCallBeforeClearing(item.key);
            }}
            value={callBeforeClearing}
            useTitle={false}
          />

          <PickerViewInput
            title="Ask Mvr"
            options={[]}
            onSelection={item => {
              setAskMvr(item.key);
            }}
            value={askMvr}
            useTitle={false}
          />
          <View style={styles.button}>
            <Button title={'Sign up'} onPress={registerAction} />
          </View>
        </Card>
        <Container style={styles.forgotPasswordContainer}>
          <Button
            style={styles.button}
            title={'Already have an account? Sign in now.'}
            onPress={() => {
              props.navigation.pop();
            }}
            type="clear"
          />
        </Container>
      </ScrollView>
      <AddressModalPicker visible={false} />
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  backIconContainer: {
    marginLeft: margin(1),
  },
  container: {
    marginTop: margin(2),
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
    marginTop: 2,
  },
  title: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
});
