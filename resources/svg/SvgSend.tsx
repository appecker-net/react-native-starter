import React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

function SvgSend(props: SvgProps) {
  return (
    <Svg
      fill={'#000000'}
      viewBox="0 0 24 24"
      width={'100%'}
      height={'100%'}
      {...props}>
      <Path
        id="70fa6808-131f-4233-9c3a-fc089fd0c1c4"
        data-name="done circle"
        d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0ZM11.52,17L6,12.79l1.83-2.37L11.14,13l4.51-5.08,2.24,2Z"
      />
    </Svg>
  );
}

export default SvgSend;
