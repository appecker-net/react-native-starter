import React from 'react';
import {TouchableOpacity} from 'react-native';
import SvgPencil from '../../resources/svg/SvgPencil';

type PencilIconProps = {
  size?: number;
  onPress?: () => void;
  disabled?: boolean;
};

export default function PencilIcon({
  size = 24,
  onPress,
  disabled = false,
}: PencilIconProps) {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{width: size, height: size}}>
      <SvgPencil
        width={size}
        height={size}
        fill={disabled ? '#d3d3d3' : '#000000'}
      />
    </TouchableOpacity>
  );
}
