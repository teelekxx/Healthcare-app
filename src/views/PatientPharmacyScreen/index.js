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
import { useDispatch, useSelector } from "react-redux";

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
import NotificationController from "../../firestore/notification";

function PatientPharmacyScreen({  }) {
  const [isWaiting, setWaiting] = useState(false);
  const [isFound, setFound] = useState(false);
  const [status, setStatus] = useState("none");
  const [jobId, setJobId] = useState(null);
  const [myPharmaId, setPharmaId] = useState(null);
  const [isPharma, setIsPharma] = useState(false);
  const [allJobs, setAllJobs] = useState([]);
  const [foundPharma, setFoundPharma] = useState(null);
  const auth = useSelector((state) => state.Authentication);



  const [pendingReq, setPendingReq] = useState([
    { Name: "Andy Doe", location: "123 Eiei rd. Bangkok." },
    { Name: "Bill Doe", location: "456 Kiki rd. Bangkok." },
    { Name: "Collin Doe", location: "789 Chichi rd. Bangkok." },
  ]);
  const pharmacist = "Tee Doc";

  const sendPharmacy = async () => {
    try {
      console.log("here");
      const postPharmacy = async () => {
        const token = await AsyncStorage.getItem("token");
        const user = await Auth.postPharmacyJob({
          body: { type: "pharmacy" },
          token: token,
        });
        if (user.isOk) {
          console.log("response = ", user);
          setJobId(user.job._id);
          console.log(user.job._id);
          setStatus("finding");
        }
      };
      await postPharmacy();
    } catch (err) {
      console.log(err);
    }
  };

  const getReciever = async (jobId) => {
    const token = await AsyncStorage.getItem("token");
    const user = await Auth.getRecieverByJobId({
      params: { id: jobId },
      token: token,
    });
    if (user.isOk) {
      return user;
    }
  };

  const fetchData = async (jobId) => {
    const data = await getReciever(jobId);
    console.log("DATA =", data);
    setFoundPharma(data);
  };

  useEffect(() => {
    if (jobId != null) {
      console.log("jobId = ", jobId);
      const unsub = onSnapshot(doc(db, "jobs", jobId), (doc) => {
        if (doc.data()) {
          console.log("Current data: ", doc.data().status);
          setStatus(doc.data().status);
        }
      });
    }

    const getUserDetail = async () => {
      const token = await AsyncStorage.getItem("token");
      const user = await Auth.getUserByToken({
        token: token,
      });
      if (user.isOk) {
        console.log("USER = ", user.data.pharmacy._id);
        setPharmaId(user.data.pharmacy._id);
      }
    };

    const getRequester = async (jobId) => {
      console.log("JOBID =", jobId);
      const token = await AsyncStorage.getItem("token");
      const user = await Auth.getRequesterByJobId({
        params: { id: jobId },
      });
      if (user.isOk) {
        console.log("here:", user.job);
        return user.job;
      }
    };

    const getUserRole = async () => {
      const token = await AsyncStorage.getItem("token");
      const user = await Auth.getUserProfile({
        token: token,
      });
      if (user.data.user.role === "pharmacist") {
        setIsPharma(true);
      }
    };
    getUserRole();
    getUserDetail();

    if (status == "doing") {
      console.log("FETT");
      fetchData(jobId);
    }

    if (isPharma && myPharmaId != null) {
      // const unsub = onSnapshot(collection(db, "jobs"), (querySnapshot) => {
      //   let jobIds = [];
      //   querySnapshot.forEach((doc) => {
      //     const data = doc.data();
      //     if (data.users.includes(myPharmaId.toString())) {
      //       jobIds.push(getRequester(doc.id));
      //     }
      //   });
      //   setAllJobs(jobIds);
      // });

      const q = query(
        collection(db, "jobs"),
        where("users", "array-contains", myPharmaId),
        where("status", "==", "finding")
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const jobs = [];
        querySnapshot.forEach((doc) => {
          jobs.push(doc.data());
        });
        setAllJobs(jobs);
      });
    }
  }, [jobId, isPharma, myPharmaId, status]);

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
              <FindButton onPress={async ()=>{
                // console.log("expoPushToken = ", auth.expoPushToken);
                // console.log("uid = ", auth.user.uid);
                // await NotificationController.removeToken({
                //   uid : auth.user.uid,
                //   token : auth.expoPushToken

                // });

                navigation.navigate("History")


              }}>
                <FindButtonText>logout</FindButtonText>
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
    </FindContainer>
  );
}
export default PatientPharmacyScreen;
