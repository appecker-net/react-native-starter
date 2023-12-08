import React from 'react';
import {StyleSheet, Text, TextStyle, View, ViewStyle} from 'react-native';
import {margin} from '../utils/utils';
import AppButton from './Button';
import typography from '../constant/typography';

const EmptyState = ({
  text = 'No information to display.',
  buttonText,
  onButtonPress,
  viewStyle,
  textStyle,
  removeMargins = false,
  visible = true,
}: {
  text?: string;
  buttonText?: string;
  onButtonPress?: () => void;
  viewStyle?: ViewStyle;
  textStyle?: TextStyle;
  removeMargins?: boolean;
  visible: boolean;
}) => {
  return visible ? (
    <View
      style={[
        styles.container,
        !removeMargins && {margin: margin(3)},
        viewStyle,
      ]}>
      <Text
        style={[
          styles.text,
          !removeMargins && {margin: margin(3), fontSize: 18, color: '#000'},
          textStyle,
        ]}>
        {text}
      </Text>
      {buttonText && onButtonPress && (
        <AppButton title={buttonText} onPress={onButtonPress} />
      )}
    </View>
  ) : null;
};
export default EmptyState;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    flex: 1,
    textAlign: 'center',
    paddingBottom: 8,
    ...typography.subTitle,
  },
});
