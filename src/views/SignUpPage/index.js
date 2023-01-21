import React from "react";
import { SafeAreaView, Text } from "react-native";
import { ThemeButton, ThemeButtonText, Or, CircleButton} from "./index.style";
import { Input, InputGroup, SubTitle, ItalicText2, BlueContainer, Form, BlueButton, BlueButtonText} from "../../components/components/index.style";
import { Icon } from "react-native-elements";
import { Colors } from "../../constants";
import BackButton from "../../components/BackButton";
function SignUpPage({ navigation }) {
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
      <Form>
      <SubTitle>Hello!</SubTitle>
      <ItalicText2>Create an account to continue</ItalicText2>
      <ThemeButton>
      <Icon
              name="logo-google"
              type="ionicon"
              color={Colors.grey}
              size={20}
            />
        <ThemeButtonText>Sign up with Google</ThemeButtonText>
      </ThemeButton>
      <Or>or</Or>
        <InputGroup>
        <Icon
              name="mail-outline"
              type="ionicon"
              color={Colors.grey}
              size={30}
            />
          <Input type="text" placeholder="Email address" placeholderTextColor={Colors.grey}/>
        </InputGroup>
        <InputGroup>
        <Icon
          name='lock-closed-outline'
          type='ionicon'
          color={Colors.grey}
          size={30}
        />
          <Input type="text" placeholder="Password" placeholderTextColor={Colors.grey}/>
        </InputGroup>
        <InputGroup>
        <Icon
          name='lock-closed-outline'
          type='ionicon'
          color={Colors.grey}
          size={30}
        />
          <Input type="text" placeholder="Confirm password" placeholderTextColor={Colors.grey}/>
        </InputGroup>
        <BlueButton  onPress={() => navigation.navigate("Home")}>
          <BlueButtonText>Next</BlueButtonText>
        </BlueButton>
      </Form>
    </BlueContainer>
  );
}
export default SignUpPage;