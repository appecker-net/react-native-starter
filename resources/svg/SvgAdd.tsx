import React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

function SvgAdd(props: SvgProps) {
  return (
    <Svg
      fill={'#fff'}
      viewBox="0 0 27.963 27.963"
      width={'100%'}
      height={'100%'}
      {...props}>
      <Path
        d="M13.98,0C6.259,0,0,6.26,0,13.982s6.259,13.981,13.98,13.981c7.725,0,13.983-6.26,13.983-13.981
          C27.963,6.26,21.705,0,13.98,0z M21.102,16.059h-4.939v5.042h-4.299v-5.042H6.862V11.76h5.001v-4.9h4.299v4.9h4.939v4.299H21.102z"
      />
    </Svg>
  );
}

export default SvgAdd;
