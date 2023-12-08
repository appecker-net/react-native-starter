import React from 'react';
import {TouchableOpacity} from 'react-native';
import SvgAdd from '../../resources/svg/SvgAdd';

type AddIconProps = {
  size?: number;
  onPress?: () => void;
};

export default function AddIcon({size = 24, onPress}: AddIconProps) {
  return (
    <TouchableOpacity onPress={onPress} style={{width: size, height: size}}>
      <SvgAdd />
    </TouchableOpacity>
  );
}
