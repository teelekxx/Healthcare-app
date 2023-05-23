import styled from "styled-components/native";
import { Colors } from "../../constants";
import { Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");
const marginMultiplier = Platform.OS === "ios" ? 0 : 0.0632;
const backButtonMargin = Platform.OS === "ios" ? 0 : 60;

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${Colors.white};
  padding: 25px 25px 0px 25px;
  width: 100%;
  justify-content: center;
  align-self: center;
`;
export const Title = styled.Text`
  color: ${Colors.blue};
  font-weight: bold;
  font-size: 40px;
  align-self: center;
`;
export const SubTitle = styled.Text`
  color: ${Colors.blue};
  font-weight: bold;
  font-size: 30px;
`;

export const ItalicText = styled.Text`
  color: ${Colors.blue};

  font-weight: light;
  font-style: italic;
  font-size: 15px;
  align-self: center;
`;
export const ItalicText2 = styled.Text`
  color: ${Colors.blue};

  font-weight: light;
  font-style: italic;
  font-size: 15px;
`;

export const InputGroup = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 25px;
  margin-top: 10px;
`;
export const Input = styled.TextInput`
  font-size: 15px;
  padding: 10px;
  border: 1px solid ${Colors.lightGrey};
  border-radius: 10px;
  width: 300px;
  height: 40px;
`;

export const BlueContainer = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${Colors.blue};
  width: 100%;
`;

export const Form = styled.ScrollView`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  height: 70%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: ${Colors.white};
  padding: 50px 25px 0px 25px;
  flexgrow: 0;
`;

export const NonScrollForm = styled.View`
  height: 100%;
  flex-direction: column;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: ${Colors.white};
  padding: 50px 25px 0px 25px;
  flexgrow: 0;
`;

export const SignUpForm = styled.ScrollView`
  flex-direction: column;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: ${Colors.white};
  padding: 25px 25px 0px 25px;
`;

export const BlueButton = styled.TouchableOpacity`
  margin-top: 50px;
  margin-bottom: 50px;
  padding: 15px;
  width: 340px;
  height: 60px;
  align-self: center;
  box-shadow: 0px 4px 7px grey;
  background-color: ${Colors.blue};
  border-radius: 10px;
`;
export const RedButton = styled.TouchableOpacity`
  margin-bottom: 50px;
  padding: 15px;
  width: 340px;
  height: 60px;
  align-self: center;
  box-shadow: 0px 4px 7px grey;
  background-color: ${Colors.red};
  border-radius: 10px;
`;
export const BlueButtonText = styled.Text`
  font-size: 20px;
  padding: 0;
  align-self: center;

  font-weight: bold;
  color: ${Colors.white};
`;

export const Text = styled.Text`
  font-size: 20px;

  font-weight: regular;
  color: ${Colors.blue};
`;

export const PageTitle = styled.Text`
  font-size: 24px;

  font-weight: bold;
  color: ${Colors.white};
  margin-top: 70px;
  margin-left: 20px;
`;

export const PageTitleContainer = styled.SafeAreaView`
  margin-bottom: 30px;
  flex-direction: row;
  align-items: center;
`;

export const HomeTitleContainer = styled.SafeAreaView`
  margin-top: ${height * marginMultiplier}px;
  margin-bottom: 40px;
  flex-direction: row;
  justify-content: center;
`;

export const AvatarContainer = styled.View`
  align-self: center;
`;

export const FormText = styled.Text`
  font-size: 15px;

  font-weight: bold;
  color: ${Colors.blue};
  padding-top: 10px;
  padding-bottom: 10px;
`;
export const CenterFormText = styled.Text`
  font-size: 15px;

  font-weight: bold;
  color: ${Colors.blue};
  padding-top: 10px;
  padding-bottom: 10px;
  align-self: center;
`;

export const FormInput = styled.TextInput`
  font-size: 15px;
  border: 1px solid ${Colors.lightGrey};
  border-radius: 10px;
  width: 340px;
  height: 40px;
  padding-left: 10px;
  padding-right: 10px;
`;
export const BigFormInput = styled.TextInput`
  font-size: 15px;
  border: 1px solid ${Colors.lightGrey};
  border-radius: 10px;
  width: 340px;
  height: 80px;
  padding-left: 10px;
  padding-right: 10px;
`;
export const SmallFormInput = styled.TextInput`
  font-size: 15px;
  border: 1px solid ${Colors.lightGrey};
  border-radius: 10px;
  width: 300px;
  height: 40px;
  padding-left: 10px;
  padding-right: 10px;
`;
export const DateCalendar = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;

export const CircleButton = styled.TouchableOpacity`
  margin-top: ${backButtonMargin}px;
  margin-left: 10px;
  padding: 10px;
  width: 50px;
  height: 50px;
  elevation: 10;
  background-color: ${Colors.white};
  border-radius: 100px;
  justify-content: center;
  align-items: center;
`;

export const BlueCircleButton = styled.TouchableOpacity`
  margin-top: 60px;
  margin-left: 25px;
  padding: 10px;
  width: 50px;
  height: 50px;
  elevation: 10;
  background-color: ${Colors.blue};
  border-radius: 100px;
  justify-content: center;
  align-items: center;
`;

export const NotificationTouchable = styled.TouchableOpacity`
  margin-left: auto;
  margin-right: 25px;
`;

export const GreyText = styled.Text`
  font-size: 15px;

  font-weight: bold;
  color: ${Colors.grey};
  padding-bottom: 5px;
  padding-top: 5px;
`;
export const InfoInput = styled.TextInput`
  font-size: 15px;
  border: 1px solid ${Colors.lightGrey};
  color: ${Colors.blue};
  border-radius: 10px;

  font-weight: bold;
  width: 340px;
  height: 40px;
  padding-left: 10px;
  padding-right: 10px;
`;
export const SmallInfoInput = styled.TextInput`
  font-size: 15px;
  border: 1px solid ${Colors.lightGrey};
  color: ${Colors.blue};
  border-radius: 10px;

  font-weight: bold;
  width: 300px;
  height: 40px;
  padding-left: 10px;
  padding-right: 10px;
`;
export const BigInfoInput = styled.TextInput`
  font-size: 15px;
  border: 1px solid ${Colors.lightGrey};

  font-weight: bold;
  color: ${Colors.blue};
  border-radius: 10px;
  width: 340px;
  height: 80px;
  padding-left: 10px;
  padding-right: 10px;
`;

export const WhiteKeyboard = styled.KeyboardAvoidingView`
  background-color: ${Colors.white};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
`;
