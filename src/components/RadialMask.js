import * as React from 'react';
import { Svg, Defs, RadialGradient, Stop, Rect } from 'react-native-svg';
import { Dimensions } from 'react-native';
import PropTypes from 'prop-types';

import { GradientWrapper } from '../styles/Styles';

const RadialMask = (props) => {
  function getDimensions() {
    const { width, height } = Dimensions.get('window');
    return { width, height };
  }

  function getColors() {
    return props.colorScheme === 'dark'
      ? { color: '#000', opacity: 0.25 }
      : { color: '#fff', opacity: 0.15 };
  }

  const [dimensions, setDimensions] = React.useState(getDimensions());

  return (
    <GradientWrapper
      zIndex={10}
      pointerEvents="none"
      onLayout={() => setDimensions(getDimensions())}
    >
      <Svg height="100%" width="100%">
        <Defs>
          <RadialGradient
            id="gradient"
            cx="50%"
            cy="50%"
            rx="80%"
            ry="80%"
            fx="50%"
            fy="50%"
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset={0} stopColor={getColors().color} stopOpacity={0} />
            <Stop
              offset={1}
              stopColor={getColors().color}
              stopOpacity={getColors().opacity}
            />
          </RadialGradient>
        </Defs>
        <Rect
          x={0}
          y={0}
          width={dimensions.width}
          height={dimensions.height}
          fill="url(#gradient)"
        />
      </Svg>
    </GradientWrapper>
  );
};

RadialMask.displayName = 'RadialMask';

RadialMask.propTypes = {
  colorScheme: PropTypes.string.isRequired,
};

export default RadialMask;
