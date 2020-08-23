import * as React from 'react';
import { Svg, Defs, LinearGradient, Stop, Rect } from 'react-native-svg';

import { colors, GradientWrapper } from './styles/Styles';

const GradientMask = () => (
  <GradientWrapper>
    <Svg height="100%" width="100%">
      <Defs>
        <LinearGradient id="gradient" x1="0" y1="0" x2="0" y2="100%">
          <Stop offset="12.5%" stopColor={colors.cyan} stopOpacity="1" />
          <Stop offset="37.5%" stopColor={colors.magenta} stopOpacity="1" />
          <Stop offset="62.5%" stopColor={colors.yellow} stopOpacity="1" />
          <Stop offset="87.5%" stopColor={colors.black} stopOpacity="1" />
        </LinearGradient>
      </Defs>
      <Rect x="0" y="0" width="100%" height="100%" fill="url(#gradient)" />
    </Svg>
  </GradientWrapper>
);

GradientMask.displayName = 'GradientMask';

export default React.memo(GradientMask);
