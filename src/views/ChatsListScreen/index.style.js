import styled from "styled-components/native";
import { Colors } from "../../constants";
import { Dimensions, ScrollView } from "react-native";

const { width, height } = Dimensions.get("window");

export const ChatListTitle = styled.Text`
  color: ${Colors.blue};
  font-family: Monaco;
  font-weight: bold;
  font-size: 25px;
  margin-top: ${height * 0.023696}px;
  margin-bottom: ${height * 0.039099}px;
`;

export const ChatListContainer = styled.View`
  margin-left: ${width * 0.0641}px;
`;

export const ChatScrollable = styled.ScrollView`
  height: ${height * 0.770142}px;
`;
