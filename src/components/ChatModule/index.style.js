import styled from "styled-components/native";
import { Colors } from "../../constants";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const ChatContainer = styled.View`
  display: flex;
  flex-direction: row;
  margin-bottom: ${height * 0.043246}px;
`;

export const DetailContainer = styled.View`
  margin-left: ${width * 0.05384}px;

  width: ${width * 0.63589}px;
`;

export const ChatName = styled.Text`
  color: ${Colors.blue};
  
  font-weight: bold;
  font-size: 15px;
  margin-bottom: ${height * 0.007109}px;
`;

export const LastMassage = styled.Text`
  color: ${Colors.grey};
  
  font-size: 15px;
`;
