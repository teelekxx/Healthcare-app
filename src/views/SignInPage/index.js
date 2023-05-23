import { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  Text,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from "react-native";
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
  WhiteKeyboard,
  SignUpForm,
} from "../../components/components/index.style";
import { Icon } from "react-native-elements";
import { Colors } from "../../constants";
import BackButton from "../../components/BackButton";
import Auth from "../../api/auth";
import { Formik, ErrorMessage } from "formik";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function SignInPage({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { width, height } = Dimensions.get("window");
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const getToken = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("You need to enable permissions to receive notifications.");
        return;
      }
    }
    console.log("Two");
    const tokenData = await Notifications.getExpoPushTokenAsync();
    console.log("Three");
    const token = tokenData.data;
    console.log(token);
  };
  function createAlert(message) {
    Alert.alert("Try Again", message, [
      {
        text: "Ok",
        style: "cancel",
      },
    ]);
  }

  const handleSubmit = async (values) => {
    try {
      const res = await Auth.login(values.email, values.password);
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <BlueContainer>
        <View style={{ flex: 1 }}>
          <CircleButton onPress={() => navigation.goBack()}>
            <Icon
              name="arrow-back-outline"
              type="ionicon"
              color={Colors.blue}
              size={20}
            />
          </CircleButton>
          <Formik
            initialValues={{ email, password }}
            onSubmit={handleSubmit}
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
              return errors;
            }}
            validateOnChange={false}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <WhiteKeyboard
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={{ flex: 1 }}
              >
                <TouchableWithoutFeedback
                  onPress={Keyboard.dismiss}
                  accessible={false}
                  style={{ flex: 1 }}
                >
                  <Form>
                    <SubTitle>Welcome back!</SubTitle>
                    <ItalicText2>Hello there, sign in to continue</ItalicText2>
                    <InputGroup>
                      <Icon
                        name="mail-outline"
                        type="ionicon"
                        color={Colors.grey}
                        size={30}
                      />
                      <View>
                        <Input
                          type="text"
                          placeholder="Email address"
                          placeholderTextColor={Colors.grey}
                          onChangeText={handleChange("email")}
                          onBlur={handleBlur("email")}
                          value={values.email}
                        />
                        <ErrorMessage
                          name="email"
                          component={Text}
                          style={{ color: "red" }}
                        />
                      </View>
                    </InputGroup>

                    <InputGroup>
                      <Icon
                        name="lock-closed-outline"
                        type="ionicon"
                        color={Colors.grey}
                        size={30}
                      />
                      <View>
                        <Input
                          type="text"
                          secureTextEntry={true}
                          placeholder="Password"
                          placeholderTextColor={Colors.grey}
                          onChangeText={handleChange("password")}
                          onBlur={handleBlur("password")}
                          value={values.password}
                        />
                        <ErrorMessage
                          name="password"
                          component={Text}
                          style={{ color: "red" }}
                        />
                      </View>
                    </InputGroup>

                    <ForgotPassword
                      onPress={() => navigation.navigate("ForgetPassword")}
                    >
                      Forgot password?
                    </ForgotPassword>

                    <BlueButton onPress={handleSubmit}>
                      <BlueButtonText>Sign in</BlueButtonText>
                    </BlueButton>
                  </Form>
                </TouchableWithoutFeedback>
              </WhiteKeyboard>
            )}
          </Formik>
        </View>
      </BlueContainer>
    </TouchableWithoutFeedback>
  );
}
export default SignInPage;
