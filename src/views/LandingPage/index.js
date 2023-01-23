import React from "react";
import { SafeAreaView, Button,  } from "react-native";
import { Title, ItalicText, Container} from "../../components/components/index.style";
import { Image, Text, ThemeButton, ThemeButtonText, ThemeButton2, ThemeButtonText2, Bt} from "./index.style";
function LandingPage({ navigation }) {
  return (
    <Container>
      <Image source={require("../../../assets/appLogo.png")} />
      {/* <Title text = {"SAGE"}/> */}
      <Title>SAGE</Title>
      <ItalicText>Your health, our care</ItalicText>
      <ThemeButton onPress={() => navigation.navigate("SignIn")}>
          <ThemeButtonText>
            Sign in
          </ThemeButtonText>
        </ThemeButton>
        <ThemeButton2 onPress={() => navigation.navigate("SignUp")}>
          <ThemeButtonText2>
            Sign up
          </ThemeButtonText2>
        </ThemeButton2>
    </Container>
  );
}
export default LandingPage;
