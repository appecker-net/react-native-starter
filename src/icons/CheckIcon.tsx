import React from 'react';
import {TouchableOpacity} from 'react-native';
import SvgCheck from '../../resources/svg/SvgCheck';

type CheckIconProps = {
  size?: number;
  onPress?: () => void;
  disabled?: boolean;
};

export default function CheckIcon({
  size = 24,
  disabled,
  onPress,
}: CheckIconProps) {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{width: size, height: size}}>
      <SvgCheck width={size} height={size} opacity={disabled ? 0.1 : 1} />
    </TouchableOpacity>
  );
}
