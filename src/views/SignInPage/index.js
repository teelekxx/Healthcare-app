import { useState } from "react";
import { SafeAreaView, Text, Alert } from "react-native";
import {
  ThemeButton,
  ThemeButtonText,
  Or,
  ForgotPassword,
  CircleButton,
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

function SignInPage({ navigation }) {
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
  const handleSubmit = async (event) => {
    try {
      const res = await Auth.login(email, password);
      console.log(res);
      navigation.navigate("HomePage");
    } catch (err) {
      if (err.code == "auth/user-not-found") {
        createAlert("You don't have an account yet.");
      } else if (err.code == "auth/wrong-password") {
        createAlert("Wrong password.");
      }
      console.log(err.code);
    }
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
        <SubTitle>Welcome back!</SubTitle>
        <ItalicText2>Hello there, sign in to continue</ItalicText2>
        <ThemeButton>
          <Icon
            name="logo-google"
            type="ionicon"
            color={Colors.grey}
            size={20}
          />
          <ThemeButtonText>Sign in with Google</ThemeButtonText>
        </ThemeButton>
        <Or>or</Or>
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
        <InputGroup>
          <Icon
            name="lock-closed-outline"
            type="ionicon"
            color={Colors.grey}
            size={30}
          />
          <Input
            type="text"
            secureTextEntry={true}
            placeholder="Password"
            placeholderTextColor={Colors.grey}
            onChangeText={setPassword}
            value={password}
          />
        </InputGroup>
        <ForgotPassword onPress={() => navigation.navigate("ForgetPassword")}>
          Forgot password?
        </ForgotPassword>
        <BlueButton onPress={handleSubmit}>
          <BlueButtonText>Sign in</BlueButtonText>
        </BlueButton>
      </NonScrollForm>
    </BlueContainer>
  );
}
export default SignInPage;
