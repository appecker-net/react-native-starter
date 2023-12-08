import React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      fill={"#000"}
      viewBox="0 0 210 210"
      width={'100%'}
      height={'100%'}
      {...props}>
      <Path d="M75 0H15C6.716 0 0 6.716 0 15v60c0 8.284 6.716 15 15 15h60c8.284 0 15-6.716 15-15V15c0-8.284-6.716-15-15-15zM75 120H15c-8.284 0-15 6.716-15 15v60c0 8.284 6.716 15 15 15h60c8.284 0 15-6.716 15-15v-60c0-8.284-6.716-15-15-15zM195 0h-60c-8.284 0-15 6.716-15 15v60c0 8.284 6.716 15 15 15h60c8.284 0 15-6.716 15-15V15c0-8.284-6.716-15-15-15zM195 120h-60c-8.284 0-15 6.716-15 15v60c0 8.284 6.716 15 15 15h60c8.284 0 15-6.716 15-15v-60c0-8.284-6.716-15-15-15z" />
    </Svg>
  );
}

export default SvgComponent;
