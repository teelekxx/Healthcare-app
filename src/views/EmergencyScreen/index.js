import React from "react";
import { SafeAreaView, Button } from "react-native";
import {
  Title,
  ItalicText,
  Container,
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
      <SosTitle>Ambulance request</SosTitle>
      <PromptText1>Click the button below to request an ambulance</PromptText1>
      <SosButton onPress={() => navigation.navigate("Request")}>
        <SosButtonText>SOS</SosButtonText>
      </SosButton>
    </SosContainer>
  );
}
export default EmergencyScreen;
