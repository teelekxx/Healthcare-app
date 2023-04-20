import styled from "styled-components/native";
import { Colors } from "../../constants";
import {
  Dimensions,
  KeyboardAvoidingView,
  KeyboardAvoidingViewComponent,
} from "react-native";

const { width, height } = Dimensions.get("window");
const titleMargin = Platform.OS === "ios" ? 0 : 50;

export const ChatField = styled.ScrollView`
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  height: auto;
  background-color: ${Colors.white};
  padding: 0px 20px 20px 20px;
`;

export const ChatView = styled.SafeAreaView`
  background-color: ${Colors.white};
`;

export const SelectedImagesContainer = styled.ScrollView`
  padding: 0px 10px 0px 10px;
`;

export const PageTitle = styled.Text`
  align-self: center;
  font-size: 24px;
  font-weight: bold;
  color: ${Colors.white};
  margin-left: ${width * 0.035897}px;
  margin-right: ${width * 0.035897}px;
  margin-top: ${titleMargin}px;
`;

export const HorizonTitle = styled.View`
  display: flex;
  flex-direction: row;
`;

export const WhiteContainer = styled.View`
  background-color: ${Colors.white};
`;

export const BlueFooter = styled.View`
  background-color: ${Colors.blue};
  align-items: center;
  justify-content: center;
  padding-top: 10px;
`;

export const BlueKeyboard = styled.KeyboardAvoidingView`
  background-color: ${Colors.blue};
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

export const ChatInputContainer = styled.SafeAreaView`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.blue};
  height: ${height * 0.094786}px;
  padding: 20px;
`;

export const GreyInput = styled.TextInput`
  font-size: 15px;
  background-color: ${Colors.white};
  border-radius: 10px;
  width: ${width * 0.7}px;
  padding: 10px;
  margin-right: ${width * 0.046153}px;
`;

export const PictureButton = styled.TouchableOpacity`
  margin-right: ${width * 0.046153}px;
`;

export const RemoveButton = styled.TouchableOpacity``;

export const SendButton = styled.TouchableOpacity`
  /* margin-right: ${width * 0.046153}px; */
`;

export const SelectedImage = styled.Image`
  width: 200px;
  height: 200px;
  border-radius: 10px;
  margin-top: 10px;
`;

export const SelectedImageContainer = styled.View``;

export const BubbleContainer = styled.View``;

export const BlueContainer = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${Colors.blue};
  width: 100%;
`;
