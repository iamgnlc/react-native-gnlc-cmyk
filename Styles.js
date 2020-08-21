import styled from "styled-components/native";

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
  z-index: ${(props) => props.zIndex};
`;

export const Letter = styled.View``;
