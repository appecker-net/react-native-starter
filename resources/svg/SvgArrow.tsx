import * as React from 'react';
import Svg, {SvgProps, Path, G} from 'react-native-svg';

const SvgIconLeft = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 16 16" {...props}>
    <Path
      fill="#373737"
      fillOpacity={1}
      fillRule="evenodd"
      stroke="none"
      strokeWidth={1}
      strokeLinecap="butt"
      strokeLinejoin="miter"
      strokeOpacity={1}
      d="M15.464 1044.409v-1.997h-9v-9h-2v11z"
      transform="rotate(45 1254.793 524.438)"
    />
  </Svg>
);

const SvgIconRight = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 16 16" {...props}>
    <Path
      fill="#373737"
      fillOpacity={1}
      fillRule="evenodd"
      stroke="none"
      strokeWidth={1}
      strokeLinecap="butt"
      strokeLinejoin="miter"
      strokeOpacity={1}
      d="M11.532 1048.341H9.536v-9h-9v-2h11z"
      transform="rotate(45 1254.793 524.438)"
    />
  </Svg>
);

const SvgIconDown = (props: SvgProps) => (
  <Svg fill="#000000" width={24} height={24} viewBox="0 0 330 330" {...props}>
    <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
    <G
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"></G>
    <G id="SVGRepo_iconCarrier">
      <Path
        id="XMLID_225_"
        d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"></Path>
    </G>
  </Svg>
);

const SvgArrowIcon = ({
  direction,
  ...props
}: SvgProps & {direction: 'left' | 'right' | 'down'}) => {
  return direction === 'down' ? (
    <SvgIconDown {...props} />
  ) : direction === 'left' ? (
    <SvgIconLeft {...props} />
  ) : (
    <SvgIconRight {...props} />
  );
};

export default SvgArrowIcon;
