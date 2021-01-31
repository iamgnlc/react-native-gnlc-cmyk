import * as React from 'react';
import { Svg, Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import PropTypes from 'prop-types';

import { GradientWrapper } from '../styles/Styles';

import getDimensions from '../utils/getDimensions';

const GradientMask = (props) => {
  const [dimensions, setDimensions] = React.useState(getDimensions());

  const renderSteps = () =>
    props.steps.map((step, i) => {
      return (
        <Stop
          key={i}
          offset={`${step.offset}%`}
          stopColor={step.color}
          stopOpacity={step.opacity || 1}
        />
      );
    });

  return (
    <GradientWrapper
      pointerEvents="none"
      onLayout={() => setDimensions(getDimensions())}
    >
      <Svg height="100%" width="100%">
        <Defs>
          <LinearGradient id="gradient" x1="0" y1="0" x2="0" y2="100%">
            {renderSteps()}
          </LinearGradient>
        </Defs>
        <Rect
          x="0"
          y="0"
          width={dimensions.width}
          height={dimensions.height}
          fill="url(#gradient)"
        />
      </Svg>
    </GradientWrapper>
  );
};

GradientMask.displayName = 'GradientMask';

GradientMask.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      offset: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
      opacity: PropTypes.number,
    }),
  ),
};

export default React.memo(GradientMask);
