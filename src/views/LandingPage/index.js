import React from "react";
import { SafeAreaView } from "react-native";
import { Container, Title, Image, Text, ThemeButton, ThemeButtonText, ThemeButton2, ThemeButtonText2} from "./index.style";
function LandingPage({ navigation }) {
  return (
    <Container>
      <Image source={require("../../../assets/appLogo.png")} />
      <Title>SAGE</Title>
      <Text>Your health, our care</Text>
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
