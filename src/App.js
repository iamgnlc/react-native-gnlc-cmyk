import React from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  processColor,
  StatusBar,
  TouchableHighlight,
} from 'react-native';

import Platform from './utils/Platform';
import { colors, shadow, Row, Letter } from './styles/Styles';

import G from './assets/G';
import N from './assets/N';
import L from './assets/L';
import C from './assets/C';

import GradientMask from './GradientMask';
import Container from './Container';

const Rows = {
  g: {
    component: <G as={Letter} color={processColor(colors.black)} />,
    backgroundColor: colors.cyan,
  },
  n: {
    component: <N as={Letter} color={processColor(colors.cyan)} />,
    backgroundColor: colors.magenta,
  },
  l: {
    component: <L as={Letter} color={processColor(colors.magenta)} />,
    backgroundColor: colors.yellow,
  },
  c: {
    component: <C as={Letter} color={processColor(colors.yellow)} />,
    backgroundColor: colors.black,
  },
};

class App extends React.Component {
  containerFlexSize = 4;
  rowFlexSize = this.containerFlexSize / 4;
  fadeDuration = 1500;
  animationDuration = 500;
  easing = Easing.elastic(1);

  state = {
    orientation: null,
    deviceType: null,
    lastTapped: null,
    tapped: {
      g: new Animated.Value(this.rowFlexSize),
      n: new Animated.Value(this.rowFlexSize),
      l: new Animated.Value(this.rowFlexSize),
      c: new Animated.Value(this.rowFlexSize),
    },
  };

  init = () => {
    this.setState({
      orientation: Platform.isPortrait() ? 'portrait' : 'landscape',
      deviceType: Platform.isTablet() ? 'tablet' : 'phone',
    });
  };

  reset = () => {
    this.handleRowTouch(null);
  };

  getProportions = () => {
    return {
      open:
        this.containerFlexSize *
        (this.state.deviceType === 'phone' ? 0.815 : 0.915),
      closed:
        this.containerFlexSize *
        (this.state.deviceType === 'phone' ? 0.185 : 0.085),
    };
  };

  componentDidMount() {
    this.init();
    Dimensions.addEventListener('change', () => {
      this.reset();
      this.setState({
        orientation: Platform.isPortrait() ? 'portrait' : 'landscape',
      });
    });
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change');
  }

  handleRowTouch = (tapped) => {
    this.setState(
      (prevState) => {
        return {
          lastTapped: prevState.lastTapped === tapped ? null : tapped,
        };
      },
      () => {
        const { lastTapped } = this.state;
        Object.keys(this.state.tapped).map((key) => {
          Animated.timing(this.state.tapped[key], {
            toValue:
              lastTapped && key === tapped
                ? this.getProportions().open
                : lastTapped
                ? this.getProportions().closed
                : this.rowFlexSize,
            animation: this.animationDuration,
            easing: this.easing,
            useNativeDriver: false,
          }).start();
        });
      },
    );
  };

  render() {
    const { orientation, tapped } = this.state;
    return (
      <React.Fragment>
        <StatusBar hidden />
        <GradientMask
          steps={[
            { color: colors.cyan, offset: 12.5 },
            { color: colors.magenta, offset: 37.5 },
            { color: colors.yellow, offset: 62.5 },
            { color: colors.black, offset: 87.5 },
          ]}
        />
        <Container
          orientation={orientation}
          flex={this.containerFlexSize}
          duration={this.fadeDuration}
        >
          {Object.keys(Rows).map((key, i) => {
            return (
              <Animated.View
                style={{
                  flex: tapped[key],
                  zIndex: this.containerFlexSize - i,
                  ...shadow,
                }}
                key={key}
              >
                {React.createElement(
                  Row,
                  {
                    backgroundColor: Rows[key].backgroundColor,
                    orientation: orientation,
                  },
                  <TouchableHighlight
                    underlayColor={Rows[key].backgroundColor}
                    onPress={() => this.handleRowTouch(key)}
                  >
                    {Rows[key].component}
                  </TouchableHighlight>,
                )}
              </Animated.View>
            );
          })}
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
