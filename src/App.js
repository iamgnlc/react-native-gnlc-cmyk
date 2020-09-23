import React from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  Linking,
  StatusBar,
  TouchableHighlight,
} from 'react-native';

import {
  ANIMATION_DURATION,
  CONTAINER_FLEX_SIZE,
  EASE_TYPE,
  FADE_DURATION,
  GITHUB_PROFILE,
  ROW_FLEX_SIZE,
} from './config';

// import { ShakeEventExpo } from './utils/ShakeEventExpo';
import Platform from './utils/Platform';
import { colors, shadow, Row, Letter } from './styles/Styles';

import G from './assets/G';
import N from './assets/N';
import L from './assets/L';
import C from './assets/C';

import GradientMask from './components/GradientMask';
import Container from './components/Container';

const Rows = {
  g: {
    component: <G as={Letter} color={colors.black} />,
    backgroundColor: colors.cyan,
  },
  n: {
    component: <N as={Letter} color={colors.cyan} />,
    backgroundColor: colors.magenta,
  },
  l: {
    component: <L as={Letter} color={colors.magenta} />,
    backgroundColor: colors.yellow,
  },
  c: {
    component: <C as={Letter} color={colors.yellow} />,
    backgroundColor: colors.black,
  },
};

class App extends React.Component {
  state = {
    orientation: null,
    deviceType: null,
    lastTapped: null,
    tapped: {
      g: new Animated.Value(ROW_FLEX_SIZE),
      n: new Animated.Value(ROW_FLEX_SIZE),
      l: new Animated.Value(ROW_FLEX_SIZE),
      c: new Animated.Value(ROW_FLEX_SIZE),
    },
  };

  init = () => {
    this.setState({
      orientation: Platform.isPortrait() ? 'portrait' : 'landscape',
      deviceType: Platform.isTablet() ? 'tablet' : 'phone',
    });
  };

  reset = () => {
    this.setState(
      {
        orientation: Platform.isPortrait() ? 'portrait' : 'landscape',
      },
      this.handleRowTouch(),
    );
  };

  getProportions = () => {
    return {
      open:
        CONTAINER_FLEX_SIZE *
        (this.state.deviceType === 'phone' ? 0.815 : 0.915),
      closed:
        CONTAINER_FLEX_SIZE *
        (this.state.deviceType === 'phone' ? 0.185 : 0.085),
    };
  };

  about = () =>
    Alert.alert(
      'About',
      GITHUB_PROFILE,
      [
        {
          text: 'OK',
        },
        {
          text: 'Open',
          onPress: () => {
            Linking.openURL(GITHUB_PROFILE);
          },
        },
      ],
      {
        cancelable: false,
      },
    );

  componentDidMount() {
    this.init();
    Dimensions.addEventListener('change', () => {
      this.reset();
    });
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change');
  }

  handleRowTouch = (tapped = null) => {
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
                : ROW_FLEX_SIZE,
            animation: ANIMATION_DURATION,
            easing: EASE_TYPE,
            useNativeDriver: false,
          }).start();
        });
      },
    );
  };

  renderGradient = () => (
    <GradientMask
      steps={[
        { color: colors.cyan, offset: 12.5 },
        { color: colors.magenta, offset: 37.5 },
        { color: colors.yellow, offset: 62.5 },
        { color: colors.black, offset: 87.5 },
      ]}
    />
  );

  renderRow = (key) => {
    const { orientation } = this.state;

    return React.createElement(
      Row,
      {
        backgroundColor: Rows[key].backgroundColor,
        orientation: orientation,
        elevation: shadow.elevation,
      },
      <TouchableHighlight
        underlayColor={Rows[key].backgroundColor}
        onPress={() => this.handleRowTouch(key)}
        onLongPress={this.about}
        delayLongPress={1000}
      >
        {Rows[key].component}
      </TouchableHighlight>,
    );
  };

  renderRows = () => {
    const { tapped } = this.state;

    return Object.keys(Rows).map((key, i) => {
      return (
        <Animated.View
          style={{
            flex: tapped[key],
            zIndex: CONTAINER_FLEX_SIZE - i,
            ...shadow,
          }}
          key={key}
        >
          {this.renderRow(key)}
        </Animated.View>
      );
    });
  };

  render() {
    const { orientation } = this.state;

    return (
      <React.Fragment>
        <StatusBar hidden />
        {this.renderGradient()}
        <Container
          orientation={orientation}
          flex={CONTAINER_FLEX_SIZE}
          duration={FADE_DURATION}
        >
          {this.renderRows()}
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
