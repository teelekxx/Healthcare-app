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
  margin-bottom: 5px;
`;

export const WhiteMessage = styled.Text`
  color: ${Colors.white};

  font-size: 15px;
  font-weight: bold;
  text-align: right;
`;
export const UnderBubble = styled.View`
  flex-direction: row;
  margin-left: auto;
`;

export const MyTimeStamp = styled.Text`
  color: ${Colors.grey};

  font-size: 10px;
  padding-right: 20px;
`;

export const ReadLabel = styled.Text`
  color: ${Colors.blue};

  font-size: 10px;
  padding-right: 10px;
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
  margin-bottom: 5px;
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
`;

export const MyImage = styled.Image`
  width: 200px;
  height: 200px;
  margin-bottom: 10px;
  margin-left: auto;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
  elevation: 10;
`;

export const ImagesContainer = styled.View``;
