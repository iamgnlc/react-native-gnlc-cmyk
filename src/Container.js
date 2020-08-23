import React, { useRef, useEffect } from 'react';
import { Animated } from 'react-native';
import PropTypes from 'prop-types';

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
      orientation={props.orientation || 'row'}
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

Container.propTypes = {
  orientation: PropTypes.string,
};

export default React.memo(Container);
