import styled from "styled-components/native";
import { Colors } from "../../constants";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const NotificationsTitle = styled.Text`
  color: ${Colors.blue};
  font-family: Monaco;
  font-weight: bold;
  font-size: 25px;
  margin-top: ${height * 0.08886}px;
  margin-left: ${width * 0.0641}px;
`;

export const NotificationsContainer = styled.View``;
