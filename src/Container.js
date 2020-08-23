import React, { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

import { Container as StyledContainer } from './styles/Styles';

const Container = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: props.duration || 1000,
      useNativeDriver: false,
    }).start();
  }, [fadeAnim]);

  return (
    <StyledContainer
      orientation={props.orientation}
      flex={props.flex}
      style={{
        opacity: fadeAnim,
      }}
    >
      {props.children}
    </StyledContainer>
  );
};

Container.displayName = 'Container';

export default React.memo(Container);
