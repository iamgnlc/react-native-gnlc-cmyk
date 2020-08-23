import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';

export const colors = {
  black: '#010202',
  cyan: '#29AAE2',
  magenta: '#E32185',
  yellow: '#FAEA26',
};

export const shadow = {
  shadowColor: '#000',
  shadowOffset: {
    width: 3,
    height: 3,
  },
  shadowOpacity: 0.3,
  shadowRadius: 5,
  elevation: 8,
};

export const GradientWrapper = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 0;
`;

export const SvgWrapper = styled.View`
  aspect-ratio: 1;
`;

export const Container = styled(Animated.View)`
  background-color: transparent;
  display: flex;
  flex: ${(props) => props.flex};
  flex-direction: ${(props) =>
    props.orientation === 'landscape' ? 'row' : 'column'};
  align-items: stretch;
  justify-content: center;
  z-index: 1;
`;

Container.propTypes = {
  flex: PropTypes.number,
  orientation: PropTypes.string,
};

export const Row = styled.View`
  background-color: ${(props) => props.backgroundColor};
  flex: 1;
  overflow: hidden;
  align-items: ${(props) =>
    props.orientation === 'landscape' ? 'center' : 'stretch'};
  justify-content: center;
`;

Row.propTypes = {
  backgroundColor: PropTypes.string,
  orientation: PropTypes.string,
};

export const Letter = styled.View``;
