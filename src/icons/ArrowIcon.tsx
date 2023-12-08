import React from 'react';
import {TouchableOpacity} from 'react-native';
import SvgArrowIcon from '../../resources/svg/SvgArrow';

type SendIconProps = {
  size?: number;
  onPress?: () => void;
  disabled?: boolean;
  direction: 'left' | 'right';
};

export default function ArrowIcon({
  size = 24,
  onPress,
  disabled = false,
  direction,
}: SendIconProps) {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{width: size, height: size}}>
      <SvgArrowIcon
        direction={direction}
        fill={disabled ? '#d3d3d3' : '#000000'}
        width={size}
        height={size}
      />
    </TouchableOpacity>
  );
}
