import React from 'react';
import {
  Alert,
  Animated,
  Appearance,
  AppState,
  Dimensions,
  Linking,
  StatusBar,
  TouchableHighlight,
} from 'react-native';

import {
  ANIMATION_DURATION,
  CONTAINER_FLEX_SIZE,
  DELAY_LONG_PRESS,
  EASE_TYPE,
  FADE_DURATION,
  GITHUB_PROFILE,
  ROW_FLEX_SIZE,
} from './config';

// import { ShakeEventExpo } from './utils/ShakeEventExpo';
import Device from './utils/Device';
import { colorSchemes, shadow, Row, Letter } from './styles/Styles';

import G from './assets/G';
import N from './assets/N';
import L from './assets/L';
import C from './assets/C';

import GradientMask from './components/GradientMask';
import Container from './components/Container';

// const Rows = {
//   g: {
//     component: <G as={Letter} color={colors.black} />,
//     backgroundColor: colors.cyan,
//   },
//   n: {
//     component: <N as={Letter} color={colors.cyan} />,
//     backgroundColor: colors.magenta,
//   },
//   l: {
//     component: <L as={Letter} color={colors.magenta} />,
//     backgroundColor: colors.yellow,
//   },
//   c: {
//     component: <C as={Letter} color={colors.yellow} />,
//     backgroundColor: colors.black,
//   },
// };

class App extends React.Component {
  state = {
    orientation: null,
    deviceType: null,
    lastTapped: null,
    colorScheme: null,
    isMounted: false,
    appState: AppState.currentState,
    tapped: {
      g: new Animated.Value(ROW_FLEX_SIZE),
      n: new Animated.Value(ROW_FLEX_SIZE),
      l: new Animated.Value(ROW_FLEX_SIZE),
      c: new Animated.Value(ROW_FLEX_SIZE),
    },
  };

  init = () => {
    this.setState(
      {
        orientation: Device.isPortrait() ? 'portrait' : 'landscape',
        deviceType: Device.isTablet() ? 'tablet' : 'phone',
      },
      () => {
        this.setColorScheme();
        this.setState({ isMounted: true });
      },
    );
  };

  reset = () => {
    this.setState(
      {
        orientation: Device.isPortrait() ? 'portrait' : 'landscape',
      },
      this.handleRowTouch(),
    );
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

  getRows = () => {
    const { colorScheme } = this.state;

    return {
      g: {
        component: <G as={Letter} color={colorSchemes[colorScheme].black} />,
        backgroundColor: colorSchemes[colorScheme].cyan,
      },
      n: {
        component: <N as={Letter} color={colorSchemes[colorScheme].cyan} />,
        backgroundColor: colorSchemes[colorScheme].magenta,
      },
      l: {
        component: <L as={Letter} color={colorSchemes[colorScheme].magenta} />,
        backgroundColor: colorSchemes[colorScheme].yellow,
      },
      c: {
        component: <C as={Letter} color={colorSchemes[colorScheme].yellow} />,
        backgroundColor: colorSchemes[colorScheme].black,
      },
    };
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

  setColorScheme = () =>
    this.setState({ colorScheme: Appearance.getColorScheme() });

  handleAppStateChange = (nextAppState) => {
    this.setState({ appState: nextAppState }, () => {
      this.setColorScheme();
    });
  };

  componentDidMount() {
    this.init();
    Dimensions.addEventListener('change', () => {
      this.reset();
    });
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change');
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleRowTouch = (justTapped = null) => {
    this.setState(
      (prevState) => {
        return {
          lastTapped: prevState.lastTapped === justTapped ? null : justTapped,
        };
      },
      () => {
        const { lastTapped, tapped } = this.state;
        // Animate rows.
        Object.keys(tapped).map((key) => {
          Animated.timing(tapped[key], {
            toValue:
              lastTapped && key === justTapped
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

  renderRow = (key) => {
    const { orientation } = this.state;

    return React.createElement(
      Row,
      {
        backgroundColor: this.getRows()[key].backgroundColor,
        orientation: orientation,
        elevation: shadow.elevation,
      },
      <TouchableHighlight
        underlayColor={this.getRows()[key].backgroundColor}
        onPress={() => this.handleRowTouch(key)}
        onLongPress={this.about}
        delayLongPress={DELAY_LONG_PRESS}
      >
        {this.getRows()[key].component}
      </TouchableHighlight>,
    );
  };

  renderRows = () => {
    const { tapped } = this.state;

    return Object.keys(this.getRows()).map((key, i) => {
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

  renderGradient = () => {
    const { colorScheme } = this.state;

    return (
      <GradientMask
        steps={[
          { color: colorSchemes[colorScheme].cyan, offset: 12.5 },
          { color: colorSchemes[colorScheme].magenta, offset: 37.5 },
          { color: colorSchemes[colorScheme].yellow, offset: 62.5 },
          { color: colorSchemes[colorScheme].black, offset: 87.5 },
        ]}
      />
    );
  };

  render() {
    const { orientation, isMounted } = this.state;

    return isMounted ? (
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
    ) : null;
  }
}

export default App;
