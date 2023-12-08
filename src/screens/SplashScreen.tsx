import React, {useEffect, useState} from 'react';
import Images from '../constant/Images';
import {LayoutAnimation, StyleSheet, View} from 'react-native';
import {PageContainer, Thumbnail} from '../view';
import {StackActions} from '@react-navigation/native';
import useAuthApis from '../hooks/useAuthApis';
import colors from '../constant/colors';

export default function SplashScreen({navigation}: any) {
  const {restoreUserDetails, user} = useAuthApis({});
  const [timePassed, setTimePassed] = useState(false);

  const resetNavigation = (screen: string) => {
    navigation.dispatch(StackActions.replace(screen));
  };

  useEffect(() => {
    restoreUserDetails();
    setTimeout(function () {
      setTimePassed(true);
    }, 1000);
  }, []);

  useEffect(() => {
    if (timePassed && !user) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      resetNavigation('AuthScreen');
    }
  }, [timePassed, user]);

  return (
    <PageContainer safeAreaView style={styles.container}>
      <View>
        <Thumbnail source={Images.LOGO} size={300} />
      </View>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: colors.background,
  },
});
