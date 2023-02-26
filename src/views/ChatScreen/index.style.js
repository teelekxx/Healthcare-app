import styled from "styled-components/native";
import { Colors } from "../../constants";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const ChatField = styled.ScrollView`
  height: ${height * 0.59128}px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: ${Colors.white};
`;

export const PageTitle = styled.Text`
  font-size: 24px;
  font-family: Monaco;
  font-weight: bold;
  color: ${Colors.white};
  margin-top: 70px;
  margin-left: ${width * 0.035897}px;
  margin-right: ${width * 0.035897}px;
`;

export const HorizonTitle = styled.View`
  display: flex;
  flex-direction: row;
`;

export const CallButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  font-size: 15px;
  width: ${width * 0.407692}px;
  height: ${height * 0.047393}px;
  background-color: ${Colors.white};
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  margin-top: 70px;
`;

export const PhoneNumber = styled.Text`
  font-size: 15px;
  font-family: Monaco;
  font-weight: bold;
  color: ${Colors.blue};
`;

export const ChatInputContainer = styled.View`
  display: flex;
  flex-direction: row;
  background-color: ${Colors.blue};
  margin-top: ${height * 0.65521}px;
  z-index: 99;
`;
