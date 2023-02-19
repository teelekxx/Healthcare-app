import styled from "styled-components/native";
import { Colors } from "../../constants";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const SosButton = styled.TouchableOpacity`
  width: ${height * 0.2962}px;
  height: ${height * 0.2962}px;
  border-radius: 200px;
  background-color: ${Colors.red};
  margin-top: ${height * 0.03436}px;
  margin-left: ${width * 0.1794}px;
  justify-content: center;
  align-items: center;
`;

export const SosButtonText = styled.Text`
  font-size: 64px;
  align-self: center;
  font-family: Monaco;
  font-weight: bold;
  color: ${Colors.white};
`;

export const PromptText1 = styled.Text`
  width: ${width * 0.62564}px;
  font-size: 20px;
  align-self: center;
  font-family: Monaco;
  font-weight: bold;
  color: ${Colors.blue};
  margin-top: ${height * 0.12914}px;
  margin-left: ${width * 0.02564}px;
`;

export const SosTitle = styled.Text`
  color: ${Colors.blue};
  font-family: Monaco;
  font-weight: bold;
  font-size: 25px;
  margin-top: ${height * 0.08886}px;
  margin-left: ${width * 0.0641}px;
`;

export const SosContainer = styled.View``;
