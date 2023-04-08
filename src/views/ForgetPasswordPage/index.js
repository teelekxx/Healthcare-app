import { useState } from "react";
import { SafeAreaView, Text, Alert, View } from "react-native";
import {
  ThemeButton,
  ThemeButtonText,
  Or,
  ForgotPassword,
  CircleButton,
  SendButton,
} from "./index.style";
import {
  Input,
  InputGroup,
  SubTitle,
  ItalicText2,
  BlueContainer,
  Form,
  NonScrollForm,
  BlueButton,
  BlueButtonText,
} from "../../components/components/index.style";
import { Icon } from "react-native-elements";
import { Colors } from "../../constants";
import BackButton from "../../components/BackButton";
import Auth from "../../api/auth";
function ForgetPasswordPage({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function createAlert(message) {
    Alert.alert("Try Again", message, [
      {
        text: "Ok",
        style: "cancel",
      },
    ]);
  }
  const handleSubmit = () => {
    //Send forget password
  };
  return (
    <BlueContainer>
      <CircleButton onPress={() => navigation.goBack()}>
        <Icon
          name="arrow-back-outline"
          type="ionicon"
          color={Colors.blue}
          size={20}
        />
      </CircleButton>
      <NonScrollForm>
        <SubTitle>Password Recovery</SubTitle>
        <ItalicText2>
          Please enter your Email address, we will send you a password recovery
          email
        </ItalicText2>
        <InputGroup>
          <Icon
            name="mail-outline"
            type="ionicon"
            color={Colors.grey}
            size={30}
          />
          <Input
            type="text"
            placeholder="Email address"
            placeholderTextColor={Colors.grey}
            onChangeText={setEmail}
            value={email}
          />
        </InputGroup>
        <SendButton onPress={handleSubmit}>
          <BlueButtonText>Send</BlueButtonText>
        </SendButton>
      </NonScrollForm>
    </BlueContainer>
  );
}
export default ForgetPasswordPage;
