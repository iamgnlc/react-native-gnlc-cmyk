import React from 'react';
import {
  Animated,
  AppState,
  Dimensions,
  StatusBar,
  TouchableHighlight,
} from 'react-native';
import { Appearance, AppearanceProvider } from 'react-native-appearance';

import {
  ANIMATION_DURATION,
  CONTAINER_FLEX_SIZE,
  DELAY_LONG_PRESS,
  EASE_TYPE,
  FADE_DURATION,
  ROW_FLEX_SIZE,
} from './config';

// import { ShakeEventExpo } from './utils/ShakeEventExpo';
import Device from './utils/Device';
import { colorSchemes, shadow, Row, Letter } from './styles/Styles';

import G from './assets/G';
import N from './assets/N';
import L from './assets/L';
import C from './assets/C';

import about from './components/about';
import Container from './components/Container';
import GradientBackground from './components/GradientBackground';
import RadialMask from './components/RadialMask';

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

  init = async () => {
    await this.setColorScheme();
    this.setDeviceType();
    this.setOrientation();
    this.setState({ isMounted: true });
  };

  reset = () => {
    this.setOrientation();
    this.handleRowTouch();
  };

  setDeviceType = () =>
    this.setState({
      deviceType: Device.isTablet() ? 'tablet' : 'phone',
    });

  setOrientation = () =>
    this.setState({
      orientation: Device.isPortrait() ? 'portrait' : 'landscape',
    });

  setColorScheme = async () =>
    new Promise((resolve) => {
      this.setState({ colorScheme: Appearance.getColorScheme() }, resolve);
    });

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
    const { deviceType } = this.state;

    return {
      open: CONTAINER_FLEX_SIZE * (deviceType === 'phone' ? 0.815 : 0.915),
      closed: CONTAINER_FLEX_SIZE * (deviceType === 'phone' ? 0.185 : 0.085),
    };
  };

  handleAppStateChange = (nextAppState) => {
    this.setState({ appState: nextAppState });
  };

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

  componentDidMount() {
    this.init();
    Dimensions.addEventListener('change', this.reset);
    AppState.addEventListener('change', this.handleAppStateChange);
    Appearance.addChangeListener(this.setColorScheme);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change');
    AppState.removeEventListener('change');
    Appearance.removeChangeListener();
  }

  renderRow = (key) => {
    const { orientation } = this.state;
    const { backgroundColor, component } = this.getRows()[key];

    return React.createElement(
      Row,
      {
        backgroundColor,
        orientation,
        elevation: shadow.elevation,
      },
      <TouchableHighlight
        underlayColor={backgroundColor}
        onPress={() => this.handleRowTouch(key)}
        onLongPress={about}
        delayLongPress={DELAY_LONG_PRESS}
      >
        {component}
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

  renderBackground = () => {
    const { colorScheme } = this.state;

    return (
      <GradientBackground
        steps={[
          { color: colorSchemes[colorScheme].cyan, offset: 12.5 },
          { color: colorSchemes[colorScheme].magenta, offset: 37.5 },
          { color: colorSchemes[colorScheme].yellow, offset: 62.5 },
          { color: colorSchemes[colorScheme].black, offset: 87.5 },
        ]}
      />
    );
  };

  renderContainer = () => {
    const { orientation } = this.state;

    return (
      <Container
        orientation={orientation}
        flex={CONTAINER_FLEX_SIZE}
        duration={FADE_DURATION}
      >
        {this.renderRows()}
      </Container>
    );
  };

  renderMask = () => {
    const { colorScheme } = this.state;

    return <RadialMask colorScheme={colorScheme} />;
  };

  render() {
    const { isMounted } = this.state;

    return (
      <>
        <StatusBar hidden />
        {isMounted && (
          <>
            {this.renderBackground()}
            {this.renderContainer()}
            {this.renderMask()}
          </>
        )}
      </>
    );
  }
}

export default () => (
  <AppearanceProvider>
    <App />
  </AppearanceProvider>
);
