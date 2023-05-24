import React from "react";
import { SafeAreaView, Button, View } from "react-native";
import {
  Title,
  ItalicText,
  Container,
} from "../../components/components/index.style";
import {
  Image,
  Text,
  ThemeButton,
  ThemeButtonText,
  ThemeButton2,
  ThemeButtonText2,
  Bt,
} from "./index.style";
import SageLogo from "../../../assets/appLogo.svg";
function LandingPage({ navigation }) {






  return (
    <Container>
    <View style={{alignSelf: "center"}}>
    <SageLogo/>
    </View>
      {/* <Title text = {"SAGE"}/> */}
      <Title>SAGE</Title>
      <ItalicText>Your health, our care</ItalicText>
      <ThemeButton onPress={() => navigation.navigate("SignIn")}>
        <ThemeButtonText>Sign in</ThemeButtonText>
      </ThemeButton>
      <ThemeButton2 onPress={() => navigation.navigate("SignUp")}>
        <ThemeButtonText2>Sign up</ThemeButtonText2>
      </ThemeButton2>
    </Container>
  );
}
export default LandingPage;
