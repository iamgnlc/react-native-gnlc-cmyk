import React from "react";
import {
  Animated,
  Dimensions,
  Easing,
  processColor,
  StatusBar,
  TouchableHighlight,
} from "react-native";
import RNShake from "react-native-shake";

import Platform from "./utils/Platform";
import { colors, shadow, Row, Letter } from "./styles/Styles";

import G from "./assets/G";
import N from "./assets/N";
import L from "./assets/L";
import C from "./assets/C";
import GradientMask from "./assets/GradientMask";

import Container from "./Container";

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
  duration = 500;
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

  getProportions = () => {
    return {
      open:
        this.containerFlexSize *
        (this.state.deviceType === "phone" ? 0.815 : 0.915),
      closed:
        this.containerFlexSize *
        (this.state.deviceType === "phone" ? 0.185 : 0.085),
    };
  };

  componentDidMount() {
    this.setState({
      orientation: Platform.isPortrait() ? "portrait" : "landscape",
      deviceType: Platform.isTablet() ? "tablet" : "phone",
    });
    RNShake.addEventListener("ShakeEvent", () => {
      this.reset();
    });
    Dimensions.addEventListener("change", () => {
      this.reset();
      this.setState({
        orientation: Platform.isPortrait() ? "portrait" : "landscape",
      });
    });
  }

  componentWillUnmount() {
    RNShake.removeEventListener("ShakeEvent");
    Dimensions.removeEventListener("change");
  }

  reset = () => {
    this.handleRowTouch(null);
  };

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
            duration: this.duration,
            easing: this.easing,
            useNativeDriver: false,
          }).start();
        });
      }
    );
  };

  render() {
    const { orientation, tapped } = this.state;
    return (
      <React.Fragment>
        <StatusBar hidden />
        <GradientMask />
        <Container
          orientation={orientation}
          flex={this.containerFlexSize}
          duration={1500}
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
                  </TouchableHighlight>
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
