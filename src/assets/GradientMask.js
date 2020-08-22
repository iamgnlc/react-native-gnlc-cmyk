import * as React from "react";
import { Svg, Defs, LinearGradient, Stop, Rect } from "react-native-svg";
import styled from "styled-components/native";

import { colors } from "../styles/Styles";

const Wrapper = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const GradientMask = () => (
  <Wrapper>
    <Svg height="100%" width="100%">
      <Defs>
        <LinearGradient
          id="grad"
          x1="0"
          y1="0"
          x2="100%"
          y2="100%"
          gradientTransform="rotate(25)"
        >
          <Stop offset="0" stopColor={colors.cyan} stopOpacity="1" />
          <Stop offset="35%" stopColor={colors.magenta} stopOpacity="1" />
          <Stop offset="65%" stopColor={colors.yellow} stopOpacity="1" />
          <Stop offset="85%" stopColor={colors.black} stopOpacity="1" />
        </LinearGradient>
      </Defs>

      <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
    </Svg>
  </Wrapper>
);

export default React.memo(GradientMask);
