import styled from "styled-components/native";

export const colors = {
  black: "#010202",
  cyan: "#29AAE2",
  magenta: "#E32185",
  yellow: "#FAEA26",
};

export const shadow = {
  shadowColor: "#000",
  shadowOffset: {
    width: 3,
    height: 3,
  },
  shadowOpacity: 0.3,
  shadowRadius: 5,
  elevation: 8,
};

export const Container = styled.View`
  background-color: #000;
  display: flex;
  flex: ${(props) => props.flex};
  flex-direction: ${(props) =>
    props.orientation === "landscape" ? "row" : "column"};
  align-items: stretch;
  justify-content: center;
  z-index: 0;
`;

export const Row = styled.View`
  background-color: ${(props) => props.backgroundColor};
  flex: 1;
  overflow: hidden;
  align-items: ${(props) =>
    props.orientation === "landscape" ? "center" : "stretch"};
  justify-content: center;
`;

export const Letter = styled.View``;
