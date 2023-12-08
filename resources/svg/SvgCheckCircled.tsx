import * as React from 'react';
import Svg, {SvgProps, Path, Circle} from 'react-native-svg';
import {memo} from 'react';
const SvgComponent = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      stroke={props.color || '#000'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m7 13 3 3 7-7"
    />
    <Circle
      cx={12}
      cy={12}
      r={9}
      stroke={props.color || '#000'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </Svg>
);
const SvgCheckCircled = memo(SvgComponent);
export default SvgCheckCircled;
