import React from "react";
import {
  SafeAreaView,
  Button,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  Title,
  ItalicText,
  Container,
} from "../../components/components/index.style";
import {
  FormInput,
  SmallFormInput,
  BigFormInput,
  BlueContainer,
  SignUpForm,
  FormText,
  PageTitleContainer,
  BlueButton,
  BlueButtonText,
  DateCalendar,
  CircleButton,
  NotificationTouchable,
} from "../../components/components/index.style";
import { Icon } from "react-native-elements";
import { Colors } from "../../constants";
import {
  ChatField,
  ChatInputContainer,
  CallButton,
  PageTitle,
  PhoneNumber,
} from "./index.style";

function ChatScreen({ navigation, route }) {
  const chatsList = [
    { Name: "Andy Doe", LastMassage: "" },
    { Name: "Bill Doe", LastMassage: "" },
    { Name: "Collin Doe", LastMassage: "Hello" },
    { Name: "Derick Doe", LastMassage: "" },
    { Name: "Evan Doe", LastMassage: "" },
    { Name: "Frank Doe", LastMassage: "" },
    { Name: "Gill Doe", LastMassage: "" },
    { Name: "Harry Doe", LastMassage: "" },
  ];
  return (
    <BlueContainer>
      <PageTitleContainer>
        <CircleButton onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-back-outline"
            type="ionicon"
            color={Colors.blue}
            size={20}
          />
        </CircleButton>
        <PageTitle>{route.params.paramKey}</PageTitle>
        <CallButton>
          <Icon
            name="call-outline"
            type="ionicon"
            color={Colors.blue}
            size={21}
          />
          <PhoneNumber>0814637245</PhoneNumber>
        </CallButton>
      </PageTitleContainer>
      <ChatField>
        <ChatInputContainer>
          <PageTitle>Tee</PageTitle>
        </ChatInputContainer>
      </ChatField>
    </BlueContainer>
  );
}
export default ChatScreen;
