import styled from "styled-components/native";
import { Colors } from "../../constants";
import { Dimensions, KeyboardAvoidingView } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

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

  font-weight: bold;
  color: ${Colors.white};
`;

export const ContactPrompt = styled.Text`
  font-size: 20px;

  font-weight: bold;
  color: ${Colors.blue};
  margin-top: ${height * 0.01777}px;
`;

export const GreyInput = styled.TextInput`
  font-size: 15px;
  border: 1px solid ${Colors.lightGrey};
  border-radius: 10px;
  width: 340px;
  height: 80px;
  padding-left: 10px;
  padding-right: 10px;
`;

export const BlueText = styled.Text`
  font-size: 15px;

  font-weight: bold;
  color: ${Colors.blue};
  margin-top: ${height * 0.01777}px;
  margin-bottom: ${height * 0.00947}px; ;
`;

export const GreyText = styled.Text`
  font-size: 15px;

  font-weight: bold;
  color: ${Colors.grey};
  text-align: center;
  margin-left: ${width * 0.04359}px;
`;

export const BlueText2 = styled.Text`
  font-size: 15px;

  font-weight: bold;
  color: ${Colors.blue};
  text-align: center;
  margin-left: ${width * 0.04359}px;
`;

export const RequestTitle = styled.Text`
  color: ${Colors.blue};

  font-weight: bold;
  font-size: 25px;
  margin-top: ${height * 0.08886}px;
`;

export const InputContainer = styled.View``;

export const HorizonInput = styled.View`
  display: flex;
  flex-direction: row;
`;

export const HorizonInput2 = styled.View`
  align-items: center;
  flex-direction: row;
  margin-top: ${height * 0.021327}px;
`;

export const HorizonInput3 = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: ${height * 0.03672}px;
`;

export const RequestContainer = styled.ScrollView`
  margin-left: ${width * 0.0641}px;
`;

export const GreyButton = styled.TouchableOpacity`
  font-size: 15px;
  border: 1px solid ${Colors.lightGrey};
  border-radius: 10px;
  padding-left: 10px;
  padding-right: 10px;
  width: ${width * 0.384615}px;
  height: ${height * 0.04739}px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: ${width * 0.1}px;
`;

export const BlueBorderButton = styled.Pressable`
  font-size: 15px;
  border: 1px solid ${Colors.blue};
  border-radius: 10px;
  padding-left: 10px;
  padding-right: 10px;
  width: ${width * 0.41025}px;
  height: ${height * 0.05924}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BlueButton = styled.TouchableOpacity`
  font-size: 15px;
  background-color: ${Colors.blue};
  border-radius: 10px;
  padding-left: 10px;
  padding-right: 10px;
  width: ${width * 0.41025}px;
  height: ${height * 0.05924}px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: ${width * 0.05641}px;
`;

export const BlueButtonText = styled.Text`
  font-size: 15px;
  font-weight: bold;

  color: ${Colors.blue};
`;

export const WhiteButtonText = styled.Text`
  font-size: 15px;
  font-weight: bold;

  color: ${Colors.white};
`;

export const GreyButtonText = styled.Text`
  font-size: 15px;

  color: ${Colors.grey};
`;

export const SymptomList = styled.View``;

export const SymptomIcon = styled.Image`
  width: ${width * 0.07692}px;
  height: ${width * 0.07692}px;
`;

export const CheckBoxContainer = styled.View`
  margin-left: auto;
`;

export const SelectedImage = styled.ImageBackground`
  width: 100px;
  height: 100px;


  border-radius: 10px;
`;
export const ImageWrapper = styled.View`
flex:1;
flex-direction:row;
`
export const SelectedImageContainer = styled.View`
margin-right:10px;
`;

export const RemoveButton = styled.TouchableOpacity`
margin-left:auto;

`;

export const SelectedImagesContainer = styled.ScrollView`
  padding: 0px 10px 0px 10px;
`;

export const Wrapper = styled.KeyboardAvoidingView`
  flex: 1;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;