import React from "react";
import { SafeAreaView } from "react-native";
import { Title, ItalicText} from "../../components/components/index.style";
import { Container, Image, Text, ThemeButton, ThemeButtonText, ThemeButton2, ThemeButtonText2} from "./index.style";
function LandingPage({ navigation }) {
  return (
    <Container>
      <Image source={require("../../../assets/appLogo.png")} />
      {/* <Title text = {"SAGE"}/> */}
      <Title>SAGE</Title>
      <ItalicText>Your health, our care</ItalicText>
      <ThemeButton>
          <ThemeButtonText onPress={() => navigation.navigate("SignIn")}>
            Sign in
          </ThemeButtonText>
        </ThemeButton>
        <ThemeButton2>
          <ThemeButtonText2 onPress={() => navigation.navigate("SignUp")}>
            Sign up
          </ThemeButtonText2>
        </ThemeButton2>
    </Container>
  );
}
export default LandingPage;
