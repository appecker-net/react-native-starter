import React from 'react';
import {View} from 'react-native';
const Container = ({children, style}) => {
  return <View style={style}>{children}</View>;
};

export default Container;
