import React from 'react';
import {ImageProps, ImageStyle, StyleProp} from 'react-native';
import {Image} from '@rneui/themed';

const Thumbnail = ({
  source,
  size = 100,
  style,
  round = false,
  resizeMode = 'contain',
}: ImageProps & {
  size?: number;
  round?: boolean;
  style?: StyleProp<ImageStyle>;
}) => (
  <Image
    source={source}
    style={[
      style,
      {
        height: size,
        width: size,
        borderRadius: round ? size / 2.0 : 0,
      },
    ]}
    resizeMode={resizeMode}
  />
);

export default Thumbnail;
