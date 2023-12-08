import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {useLoader} from '../context/appContext/AppContext+StateHooks';

export const Loader = () => {
  const {loading} = useLoader();
  if (!loading) {
    return null;
  }
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: '#000',
        opacity: 0.4,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <ActivityIndicator loading={true} size={'large'} color="#fff" />
    </View>
  );
};

export default Loader;
