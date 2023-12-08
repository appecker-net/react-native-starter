import React from 'react';
import {TouchableOpacity} from 'react-native';
import SvgSend from '../../resources/svg/SvgSend';

type SendIconProps = {
  size?: number;
  onPress?: () => void;
  disabled?: boolean;
};

export default function SendIcon({
  size = 24,
  onPress,
  disabled = false,
}: SendIconProps) {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{width: size, height: size}}>
      <SvgSend fill={disabled ? '#d3d3d3' : '#000000'} />
    </TouchableOpacity>
  );
}
