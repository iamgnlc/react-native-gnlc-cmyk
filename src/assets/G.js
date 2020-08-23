import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { SvgWrapper } from '../styles/Styles';

const SvgComponent = (props) => {
  return (
    <SvgWrapper>
      <Svg
        height="100%"
        width="100%"
        viewBox="0 0 1312.525 1451.338"
        xmlSpace="preserve"
      >
        <Path
          fill={props.color}
          d="M701.73 911.391V674.927h610.795v559.091c-59.36 57.44-145.374 108.027-258.008 151.733-112.653 43.721-226.747 65.587-342.253 65.587-146.801 0-274.758-30.786-383.895-92.387-109.14-61.587-191.157-149.667-246.037-264.227C27.433 980.178 0 855.551 0 720.881c0-146.147 30.633-276.027 91.907-389.647 61.27-113.587 150.93-200.7 269.014-261.347C450.911 23.307 562.924 0 696.944 0c174.24 0 310.334 36.54 408.313 109.614 97.96 73.086 160.98 174.087 189.074 303l-281.454 52.653c-19.8-68.933-56.974-123.333-111.533-163.22-54.573-39.887-122.707-59.834-204.4-59.834-123.82 0-222.264 39.24-295.341 117.747-73.083 78.5-109.613 194.987-109.613 349.434 0 166.57 37.007 291.504 111.054 374.797 74.03 83.294 171.033 124.934 291.033 124.934 59.354 0 118.86-11.64 178.547-34.933 59.667-23.294 110.887-51.534 153.654-84.733V911.391H701.73z"
        />
      </Svg>
    </SvgWrapper>
  );
};

SvgComponent.displayName = 'G';

export default React.memo(SvgComponent);
