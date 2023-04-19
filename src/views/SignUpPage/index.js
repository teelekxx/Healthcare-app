import React from "react";
import { useState } from "react";
import { SafeAreaView, Text, Alert } from "react-native";
import {
  ThemeButton,
  ThemeButtonText,
  Or,
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
  WhiteKeyboard,
} from "../../components/components/index.style";
import { Icon } from "react-native-elements";
import { Colors } from "../../constants";
import BackButton from "../../components/BackButton";
import Auth from "../../api/auth";
import { compose } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { Formik, ErrorMessage} from "formik";

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
  const checkEmail = async (email) => {
    console.log(email);
    const res = await Auth.checkUserEmail({
      body: {
        email: email,
      },
    });
    return res.data;
  };
  const handleData = async (values) => {
    const result = isValidEmail(values.email);
    const matchPass = checkPasswordMatch(values.password, values.confirmPassword);
    const passLength = checkPasswordLength(values.password);
    const emailExist = await checkEmail(values.email);

    if (values.email === "" || values.password === "" || values.confirmPassword === "") {
      createAlert("All fields are required.");
      return;
    } else if (!result) {
      createAlert("Invalid email format.");
      return;
    } else if (!matchPass) {
      createAlert("Password does not match.");
      return;
    } else if (!passLength) {
      createAlert("Your password must have more than 6 characters.");
      return;
    } else if (emailExist === true) {
      createAlert("Email already existed.");
      return;
    }
    navigation.navigate("Role", { email: values.email, password: values.password });
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
      <Formik
        initialValues={{ email: "", password: "", confirmPassword: "" }}
        onSubmit={handleData}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Email is required";
          } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = "Invalid email address";
          }
          if (!values.password) {
            errors.password = "Password is required";
          } else if (values.password.length < 6) {
            errors.password = "Password must be at least 6 characters long";
          }
          if (!values.confirmPassword) {
            errors.confirmPassword = "Confirm Password is required";
          } else if (values.password.length < 6) {
            errors.confirmPassword =
              "Password must be at least 6 characters long";
          } else if (
            !checkPasswordMatch(values.password, values.confirmPassword)
          ) {
            errors.confirmPassword = "Password does not match.";
          }
          return errors;
        }}
        validateOnChange={false}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <WhiteKeyboard
            behavior={Platform.OS === "ios" ? "position" : "position"}
            style={{ flex: 1 }}
          >
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
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
              </InputGroup>
              <ErrorMessage
                name="email"
                component={Text}
                style={{ color: "red" }}
              />
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
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                />
              </InputGroup>
              <ErrorMessage
                name="password"
                component={Text}
                style={{ color: "red" }}
              />
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
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  value={values.confirmPassword}
                />
                
              </InputGroup>
              <ErrorMessage
                name="confirmPassword"
                component={Text}
                style={{ color: "red" }}
              />
              <BlueButton onPress={handleSubmit}>
                {/* <BlueButton onPress={() => navigation.navigate("Role", { email: values.email, password: values.password })}> */}
                <BlueButtonText>Next</BlueButtonText>
              </BlueButton>
            </NonScrollForm>
          </WhiteKeyboard>
        )}
      </Formik>
    </BlueContainer>
  );
}
export default SignUpPage;
