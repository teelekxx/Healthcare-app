import React from "react";
import { useState } from "react";
import { SafeAreaView, Text, Alert } from "react-native";
import { ThemeButton, ThemeButtonText, Or, CircleButton } from "./index.style";
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
import { compose } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
function SignUpPage({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  function isValidEmail(inputEmail) {
    console.log(inputEmail);
    // Regular expression for validating email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Return true if email matches the regular expression
    return emailRegex.test(inputEmail);
  }
  function createAlert(message) {
    Alert.alert("Try Again", message, [
      {
        text: "Ok",
        style: "cancel",
      },
    ]);
  }

  function checkPasswordMatch(pass, confirmPass) {
    if (pass === confirmPass) {
      return true;
    } else {
      return false;
    }
  }

  function checkPasswordLength(pass) {
    if (pass.length >= 6) {
      return true;
    }
    return false;
  }
  const handleData = async () => {
    //     fetch('http://192.168.1.179:3000/user', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     email:"minejung@gmail.com",
    //     role:"user",
    //   })
    // });

    // const res = await Auth.register({
    //   body: {
    //     email: "chanok993@mail.com",
    //     password: "password",
    //     role: "user",
    //   },
    // });
    // console.log({res})

    const result = isValidEmail(email);
    const matchPass = checkPasswordMatch(password, confirmPassword);
    const passLength = checkPasswordLength(password);

    if (email === "" || password === "" || confirmPassword === "") {
      createAlert("All fields are required");
      return;
    } else if (!result) {
      createAlert("Invalid email format");
      return;
    } else if (!matchPass) {
      createAlert("Password does not match");
      return;
    } else if (!passLength) {
      createAlert("Your password must have more than 6 characters");
      return;
    }
    navigation.navigate("Role", { email: email, password: password });

    // try {
    //   const user = await createUserWithEmailAndPassword(auth, email, password);
    //   navigation.navigate("Role", { email: email, password: password });
    // } catch (err) {
    //   if (err.code == "auth/email-already-in-use") {
    //     createAlert("The account already exists for that email.");
    //   }
    //   console.log(err.message);
    // }
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
            placeholder="Confirm password"
            placeholderTextColor={Colors.grey}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
          />
        </InputGroup>
        <BlueButton onPress={handleData}>
          <BlueButtonText>Next</BlueButtonText>
        </BlueButton>
      </NonScrollForm>
    </BlueContainer>
  );
}
export default SignUpPage;
