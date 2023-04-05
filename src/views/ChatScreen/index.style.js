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

export const WhiteContainer = styled.View`
  background-color: ${Colors.white};
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
  
  font-weight: bold;
  color: ${Colors.blue};
`;

export const ChatInputContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.blue};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  height: ${height * 0.094786}px;
  padding: 20px;
`;

export const GreyInput = styled.TextInput`
  font-size: 15px;
  background-color: ${Colors.white};
  border-radius: 10px;
  width: ${width * 0.7}px;
  height: ${height * 0.047393}px;
  padding-left: 10px;
  padding-right: 10px;
  margin-right: ${width * 0.046153}px;
`;

export const PictureButton = styled.TouchableOpacity`
  margin-right: ${width * 0.046153}px;
`;

export const SendButton = styled.TouchableOpacity`
  /* margin-right: ${width * 0.046153}px; */
`;
