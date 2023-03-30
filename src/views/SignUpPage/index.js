import React from "react";
import { useState } from "react";
import { SafeAreaView, Text, Alert } from "react-native";
import { ThemeButton, ThemeButtonText, Or, CircleButton} from "./index.style";
import { Input, InputGroup, SubTitle, ItalicText2, BlueContainer, Form, BlueButton, BlueButtonText} from "../../components/components/index.style";
import { Icon } from "react-native-elements";
import { Colors } from "../../constants";
import BackButton from "../../components/BackButton";
import Auth from "../../api/auth";
import { compose } from "@reduxjs/toolkit";

function SignUpPage({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  function isValidEmail(inputEmail) {
    console.log(inputEmail)
    // Regular expression for validating email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Return true if email matches the regular expression
    return emailRegex.test(inputEmail);
  }
  function createAlert(message){ 
    Alert.alert(
    "Try Again",
    message,
    [
      {
        text: "Ok",
        style: "cancel"
      },
    ]
  );}
 
  function checkPassword(pass, confirmPass){
    if(pass === confirmPass){
      return true
    }
    else{
      return false
    }
  }
  const handleData = async () =>{

    const res = await Auth.register({
      body: {
        email: "chanok213@mail.com",
        password: "password",
        role: "user",
      },
    });
    console.log({res})


    

    // const result = isValidEmail(email)
    // const matchPass = checkPassword(password, confirmPassword)

    // if(!result){
    //   createAlert("Invalid email format")
    //   return
    // }
    // else if(!matchPass){
    //   createAlert("Password does not match")
    //   return
    // }else if(email===""||password===""||confirmPassword===""){
    //   createAlert("All fields are required")
    // }
    // navigation.navigate('Role', {email: email, password:password})
  }
  

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
          <Input type="text" placeholder="Email address" placeholderTextColor={Colors.grey}  onChangeText={setEmail} value={email}/>
        </InputGroup>
        <InputGroup>
        <Icon
          name='lock-closed-outline'
          type='ionicon'
          color={Colors.grey}
          size={30}
        />
          <Input type="text" secureTextEntry={true} placeholder="Password" placeholderTextColor={Colors.grey} onChangeText={setPassword} value={password}/>
        </InputGroup>
        <InputGroup>
        <Icon
          name='lock-closed-outline'
          type='ionicon'
          color={Colors.grey}
          size={30}
        />
          <Input type="text" secureTextEntry={true} placeholder="Confirm password" placeholderTextColor={Colors.grey} onChangeText={setConfirmPassword} value={confirmPassword}/>
        </InputGroup>
        <BlueButton  onPress={handleData}>
          <BlueButtonText>Next</BlueButtonText>
        </BlueButton>
      </Form>
    </BlueContainer>
  );
}
export default SignUpPage;