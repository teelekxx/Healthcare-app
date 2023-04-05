import styled from "styled-components/native";
import { Colors } from "../../constants";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const MessageContainer = styled.View`
  margin-top: 20px;
`;

export const MyBubble = styled.View`
  background-color: ${Colors.blue};
  border-radius: 50px;
  padding: 10px 20px 10px 20px;
  margin-left: auto;
  max-width: ${width * 0.7435}px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
  elevation: 10;
`;

export const WhiteMessage = styled.Text`
  color: ${Colors.white};

  font-size: 15px;
  font-weight: bold;
  text-align: right;
`;

export const MyTimeStamp = styled.Text`
  color: ${Colors.grey};

  font-size: 10px;
  text-align: right;
  padding-right: 20px;
  padding-top: 10px;
`;

export const OthersBubble = styled.View`
  background-color: ${Colors.white};
  border-radius: 50px;
  padding: 10px 20px 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: auto;
  max-width: ${width * 0.7435}px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
  elevation: 10;
`;

export const BlueMessage = styled.Text`
  color: ${Colors.blue};

  font-size: 15px;
  font-weight: bold;
  text-align: right;
`;

export const OthersTimeStamp = styled.Text`
  color: ${Colors.grey};

  font-size: 10px;
  text-align: left;
  padding-right: 20px;
  padding-top: 10px;
`;

export const MySelectedImage = styled.Image`
  width: 200px;
  height: 200px;
  border-radius: 50px;
  margin-left: auto;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
  elevation: 10;
`;

export const SelectedImagesContainer = styled.View``;
