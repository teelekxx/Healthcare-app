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
import Auth from "../../api/auth";
import * as ImagePicker from "expo-image-picker";
import { AsyncStorage, Alert } from "react-native";

function PatientPharmacyScreen({ navigation }) {
  const [isWaiting, setWaiting] = useState(false);
  const [isFound, setFound] = useState(false);
  const [status, setStatus] = useState("none");
  const [jobId, setJobId] = useState(null);
  const pharmacist = "Tee Doc";

  const sendEmergencyCase = async () => {
    try {
      console.log("here");
      const postEmergency = async () => {
        const token = await AsyncStorage.getItem("token");
        const user = await Auth.postEmergencyCase({
          body: {},
          token: token,
        });
        if (!user.isOk) {
          console.log("NOT OK ", user);
        }
        if (user.isOk) {
          console.log("response = ", user);
          setJobId(user.data.jobId);
          console.log(user.data.jobId);
        }
      };
      await postEmergency();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (jobId != null) {
      const unsub = onSnapshot(doc(db, "jobs", jobId), (doc) => {
        console.log("Current data: ", doc.data().status);
        setStatus(doc.data().status);
      });
    }
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
          <FindButton onPress={sendEmergencyCase}>
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
