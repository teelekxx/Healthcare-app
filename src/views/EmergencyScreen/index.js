import React from "react";
import { SafeAreaView, Button } from "react-native";
import { Icon } from "react-native-elements";
import { Colors } from "../../constants";
import {
  Title,
  ItalicText,
  Container,
  NotificationTouchable,
  HomeTitleContainer,
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
        <HomeTitleContainer>
        <SosTitle>Ambulance request</SosTitle>
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
        </HomeTitleContainer>
      <PromptText1>Click the button below to request an ambulance</PromptText1>
      <SosButton onPress={() => navigation.navigate("Request")}>
        <SosButtonText>SOS</SosButtonText>
      </SosButton>
    </SosContainer>
  );
}
export default EmergencyScreen;
