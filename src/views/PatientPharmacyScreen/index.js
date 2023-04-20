import React, { useState, useEffect } from "react";
import { SafeAreaView, Button, ActivityIndicator } from "react-native";
import { Icon, Avatar } from "react-native-elements";
import { collection, query, where, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { Colors } from "../../constants";
import {
  Title,
  ItalicText,
  Container,
  NotificationTouchable,
  HomeTitleContainer,
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
  const [status, setStatus] = useState("none");
  const pharmacist = "Tee Doc";

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "jobs", "643fff34344376d3aec2452e"),
      (doc) => {
        console.log("Current data: ", doc.data().status);
        setStatus(doc.data().status);
      }
    );
  }, []);

  return (
    <FindContainer>
      <HomeTitleContainer>
        <FindTitle>Pharmacy</FindTitle>
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
      {status === "none" ? (
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
      ) : status === "finding" ? (
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
      ) : status === "doing" ? (
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
              size={20}
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
      ) : (
        <ButtonContainer></ButtonContainer>
      )}
    </FindContainer>
  );
}
export default PatientPharmacyScreen;
