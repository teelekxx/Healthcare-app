import React, { useState, useEffect } from "react";
import { SafeAreaView, Button, ActivityIndicator } from "react-native";
import { Icon, Avatar } from "react-native-elements";
import { Colors } from "../../constants";
import {
  Title,
  ItalicText,
  Container,
  NotificationTouchable,
} from "../../components/components/index.style";
import {
  FindButton,
  FindContainer,
  FindButtonText,
  FindTitle,
  PharmacyIcon,
  WaitingButton,
  FindingPrompt,
  ButtonContainer,
  ChattingButton,
  InlineIcon,
  WhiteButtonText,
  ProfileIcon,
  DetailContainer,
  DetailText,
  TimeText,
} from "./index.style";

function PatientPharmacyScreen({ navigation }) {
  const [isWaiting, setWaiting] = useState(false);
  const [isFound, setFound] = useState(false);
  const pharmacist = "Tee Doc";

  return (
    <FindContainer>
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
      <FindTitle>Pharmacy</FindTitle>
      {!isWaiting && !isFound ? (
        <ButtonContainer>
          <PharmacyIcon
            source={require("../../../assets/prescription-1.png")}
          />
          <FindButton
            onPress={() => {
              setWaiting(true);
            }}
          >
            <FindButtonText>Find my Pharmacist</FindButtonText>
          </FindButton>
        </ButtonContainer>
      ) : isWaiting && !isFound ? (
        <ButtonContainer>
          <PharmacyIcon
            source={require("../../../assets/prescription-1.png")}
          />
          {/* <WaitingButton disabled ={true} */}
          <WaitingButton
            onPress={() => {
              setFound(true);
            }}
          >
            <ActivityIndicator size="large" />
          </WaitingButton>
          <FindingPrompt>waiting for available Pharmacist ...</FindingPrompt>
        </ButtonContainer>
      ) : (
        <ButtonContainer>
          <ProfileIcon
            source={require("../../../assets/profile-picture-empty.png")}
          />
          <DetailContainer>
            <DetailText>Tee Doc</DetailText>
            <DetailText>ABC Health Pharmacy</DetailText>
            <TimeText>{new Date().toLocaleString()}</TimeText>
          </DetailContainer>
          <FindingPrompt>
            Pharmacist found. Click the button below to start chatting{" "}
            <InlineIcon
              name="checkmark-circle"
              type="ionicon"
              color={Colors.teal}
              size={25}
            />
          </FindingPrompt>
          <ChattingButton
            onPress={() =>
              navigation.navigate("Chatting", { paramKey: pharmacist })
            }
          >
            <WhiteButtonText>Start chatting</WhiteButtonText>
          </ChattingButton>
        </ButtonContainer>
      )}
    </FindContainer>
  );
}
export default PatientPharmacyScreen;
