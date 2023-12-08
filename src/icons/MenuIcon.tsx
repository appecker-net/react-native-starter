import React from 'react';
import {TouchableOpacity} from 'react-native';
import SvgMenu from '../../resources/svg/SvgMenu';
import colors from '../constant/colors';

type MenuIconProps = {
  size?: number;
  onPress?: () => void;
};

export default function MenuIcon({size = 24, onPress}: MenuIconProps) {
  return (
    <TouchableOpacity onPress={onPress} style={{width: size, height: size}}>
      <SvgMenu fill={colors.tint} />
    </TouchableOpacity>
  );
}
