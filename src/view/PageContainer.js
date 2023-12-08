import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {margin} from '../utils/utils';

const PageContainer = ({safeAreaView = false, children, style = {}}) => {
  if (safeAreaView === true) {
    return (
      <SafeAreaView style={{...styles.container, ...style}}>
        {children}
      </SafeAreaView>
    );
  }
  return <View style={{...styles.container, ...style}}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: margin(1),
  },
});

export default PageContainer;
