import React from "react";
import { SafeAreaView, Button } from "react-native";
import { Icon } from "react-native-elements";
import { Colors } from "../../constants";
import {
  Title,
  ItalicText,
  Container,
  NotificationTouchable,
} from "../../components/components/index.style";
import {
  SosButton,
  SosContainer,
  SosButtonText,
  PromptText1,
  SosTitle,
} from "./index.style";

function EmergencyScreen({ navigation }) {
  return (
    <SosContainer>
      <SafeAreaView>
        <NotificationTouchable
          onPress={() => navigation.navigate("Notification")}
        >
          <Icon
            name="notifications-outline"
            type="ionicon"
            color={Colors.blue}
            size={30}
          />
        </NotificationTouchable>
      </SafeAreaView>
      <SosTitle>Ambulance request</SosTitle>
      <PromptText1>Click the button below to request an ambulance</PromptText1>
      <SosButton onPress={() => navigation.navigate("Request")}>
        <SosButtonText>SOS</SosButtonText>
      </SosButton>
    </SosContainer>
  );
}
export default EmergencyScreen;
