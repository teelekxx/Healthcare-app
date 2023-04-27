import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Button,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { Icon, Avatar } from "react-native-elements";
import { collection, query, where, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { Colors } from "../../constants";
import { AsyncStorage } from "react-native";
import { useSelector, useDispatch } from "react-redux";
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
import NotificationController from "../../firestore/notification";

function PatientPharmacyScreen({ navigation }) {
  const [isWaiting, setWaiting] = useState(false);
  const [isFound, setFound] = useState(false);
  const [status, setStatus] = useState("none");
  const [jobId, setJobId] = useState(null);
  const [myPharmaId, setPharmaId] = useState(null);
  const [isPharma, setIsPharma] = useState(false);
  const [allJobs, setAllJobs] = useState([]);
  const [foundPharma, setFoundPharma] = useState(null);
  const [pendingReq, setPendingReq] = useState([
    { Name: "Andy Doe", location: "123 Eiei rd. Bangkok." },
    { Name: "Bill Doe", location: "456 Kiki rd. Bangkok." },
    { Name: "Collin Doe", location: "789 Chichi rd. Bangkok." },
  ]);
  const pharmacist = "Tee Doc";

  const auth = useSelector((state) => state.Authentication);

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
      {!isWaiting && !isFound ? (
        <ButtonContainer>
          <PharmacyIcon
            source={require("../../../assets/prescription-1.png")}
          />
        </NotificationTouchable>
      </HomeTitleContainer>
      {console.log(allJobs)}

      {isPharma ? (
        <ButtonContainer>
          {allJobs.length > 0 && (
            <ScrollView>
              {allJobs.map((item) => {
                return <PharmaRequest data={item}></PharmaRequest>;
              })}
            </ScrollView>
          )}
        </ButtonContainer>
      ) : (
        <ButtonContainer>
          {status === "none" ? (
            <ButtonContainer>
              <PharmacyIcon
                source={require("../../../assets/prescription-1.png")}
              />
              <FindButton onPress={sendPharmacy}>
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
              {foundPharma && (
                <DetailContainer>
                  <DetailText>
                    {foundPharma.job.pharmacistProfile.medicalInformation.name}
                  </DetailText>

                  <DetailText>
                    {foundPharma.job.pharmacistProfile.pharmacy.name}
                  </DetailText>
                  <TimeText>{new Date().toLocaleString()}</TimeText>
                </DetailContainer>
              )}

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

      <Button
        onPress={async () => {
          const token = await AsyncStorage.getItem("token");
          const uid = auth.user.uid;

          await NotificationController.pushToken({
            uid: uid,
            token: token,
          });
        }}
        title="click"
      ></Button>
    </FindContainer>
  );
}
export default PatientPharmacyScreen;
