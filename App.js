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
import { Container, Row, Letter } from "./styles/Styles";

import G from "./assets/G";
import N from "./assets/N";
import L from "./assets/L";
import C from "./assets/C";

const colors = {
  black: "#010202",
  cyan: "#29AAE2",
  magenta: "#E32185",
  yellow: "#FAEA26",
};

const shadow = {
  shadowColor: "#000",
  shadowOffset: {
    width: 3,
    height: 3,
  },
  shadowOpacity: 0.3,
  shadowRadius: 5,
  elevation: 8,
};

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
  state = {
    orientation: null,
    deviceType: null,
    lastTapped: null,
    tapped: {
      g: new Animated.Value(1),
      n: new Animated.Value(1),
      l: new Animated.Value(1),
      c: new Animated.Value(1),
    },
  };

  flexSize = 4;
  duration = 500;
  easing = Easing.elastic(1);

  getProportions = () => {
    return {
      open: this.flexSize * (this.state.deviceType === "phone" ? 0.815 : 0.915),
      closed:
        this.flexSize * (this.state.deviceType === "phone" ? 0.185 : 0.085),
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
                : 1,
            duration: this.duration,
            easing: this.easing,
            useNativeDriver: false,
          }).start();
        });
      }
    );
  };

  render() {
    const { orientation } = this.state;
    return (
      <Container orientation={orientation} flex={this.flexSize}>
        <StatusBar hidden />
        {Object.keys(Rows).map((key, i) => {
          return (
            <Animated.View
              style={{
                flex: this.state.tapped[key],
                zIndex: this.flexSize - i,
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
    );
  }
}

export default App;
