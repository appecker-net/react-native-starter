import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {memo} from 'react';
const SvgComponent = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 256 256" {...props}>
    <Path
      fill={props.color || '#000'}
      d="M216 72H56a8 8 0 0 1 0-16h136a8 8 0 0 0 0-16H56a24.027 24.027 0 0 0-24 24v128a24.027 24.027 0 0 0 24 24h160a16.018 16.018 0 0 0 16-16V88a16.018 16.018 0 0 0-16-16Zm-36 84a12 12 0 1 1 12-12 12 12 0 0 1-12 12Z"
    />
  </Svg>
);
const SvgWallet = memo(SvgComponent);
export default SvgWallet;
