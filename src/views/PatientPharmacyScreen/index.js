import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Button,
  ActivityIndicator,
  ScrollView,
} from "react-native";
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
import PharmaRequest from "../../components/PharmaRequest";

function PatientPharmacyScreen({ navigation }) {
  const [isWaiting, setWaiting] = useState(false);
  const [isFound, setFound] = useState(false);
  const [status, setStatus] = useState("none");
  const [jobId, setJobId] = useState(null);
  const [isPharma, setIsPharma] = useState(false);
  const [pendingReq, setPendingReq] = useState([
    { Name: "Andy Doe", location: "123 Eiei rd. Bangkok." },
    { Name: "Bill Doe", location: "456 Kiki rd. Bangkok." },
    { Name: "Collin Doe", location: "789 Chichi rd. Bangkok." },
  ]);
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

    // const getUserRole = async () => {
    //   const token = await AsyncStorage.getItem("token");
    //   const user = await Auth.getUserProfile({
    //     token: token,
    //   });
    //   if (user.data.user.role === "pharmacist") {
    //     setIsPharma(true);
    //   }
    // };
    // getUserRole();

    setIsPharma(true);
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
      {isPharma ? (
        <ButtonContainer>
          <ScrollView>
            {pendingReq.map((val, index) => {
              return (
                <PharmaRequest
                  name={val.Name}
                  location={val.location}
                  key={index}
                ></PharmaRequest>
              );
            })}
          </ScrollView>
        </ButtonContainer>
      ) : (
        <ButtonContainer>
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
              <FindingPrompt>
                waiting for available Pharmacist ...
              </FindingPrompt>
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
        </ButtonContainer>
      )}
    </FindContainer>
  );
}
export default PatientPharmacyScreen;
