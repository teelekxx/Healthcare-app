import {
  DetailContainer,
  ChatName,
  LastMassage,
  RequestContainer,
  HorizonInput3,
  BlueBorderButton,
  BlueButtonText,
  BlueButton,
  WhiteButtonText,
  PatientName,
  PatientNameContainer,
  TimeStamp,
  LocationText,
} from "./index.style";
import Auth from "../../api/auth";
import * as ImagePicker from "expo-image-picker";
import { AsyncStorage } from "react-native"
;import { useDispatch, useSelector } from "react-redux";
import { Text } from "react-native";
import { Icon, Avatar, Accessory } from "react-native-elements";
import { Colors } from "../../constants";
import React, { useState, useEffect } from "react";
import Chat from "../../firestore/chat";

export default function PharmaRequest({ navigation, data }) {
  const [patientInfo, setPatientInfo] = useState(null);
  const [patientName, setPatientName] = useState("");
  const [location, setLocation] = useState(null);
  const [myUID, setMyUID] = useState("");
  const auth = useSelector((state) => state.Authentication);
  const isAuthenticated = auth.isAuthenticated;

  const getRequester = async (jobId) => {
    const token = await AsyncStorage.getItem("token");
    const user = await Auth.getRequesterByJobId({
      params: { id: jobId },
    });
    if (user.isOk) {
      console.log("OTHERUSER:", user.job.requesterUid);
      return user.job;
    }
  };
  const fetchData = async (jobId) => {
    const data = await getRequester(jobId);
    setPatientName(data.requesterUser.medicalInformation.name);
    setPatientInfo(data)
    setLocation(data.requesterUser.address.address);
    console.log(data.requesterUser);
  };

  useEffect(() => {
    if (auth.user) {
      setMyUID(auth.user.uid);
    }
    console.log(data);
    const jobId = data.jobId;
    fetchData(jobId);
    // console.log("REQUEST = ", getRequester(jobId));
  }, []);
  const acceptRequest = async () => {
    const token = await AsyncStorage.getItem("token");
    const user = await Auth.postAcceptJob({
      body: { jobId: data.jobId, round: data.round },
      token: token,
    });
    if (user.isOk) {
      console.log("ACCEPT!!",user);
      tempMessage = {
        uid: patientInfo.requesterUid,
        groupId: data.jobId,
        message: data.requesterUser.medicalInformation.bloodType,
        type: "message",
      };
      const token = await AsyncStorage.getItem("token");
      await Chat.sendMessage(tempMessage);

      navigation.navigate("Chatting", {
        chatName: patientName,
        groupID: data.jobId,
        myUID: myUID,
      })
      
      
    }
    // try {
    //   console.log("here");
    //   const postEmergency = async () => {
    //     const token = await AsyncStorage.getItem("token");
    //     const user = await Auth.postEmergencyCase({
    //       body: {},
    //       token: token,
    //     });
    //     if (!user.isOk) {
    //       console.log("NOT OK ", user);
    //     }
    //     if (user.isOk) {
    //       console.log("response = ", user);
    //       setJobId(user.data.jobId);
    //       console.log(user.data.jobId);
    //     }
    //   };
    //   await postEmergency();
    // } catch (err) {
    //   console.log(err);
    // }
  };

  const declineRequest = async () => {
    // try {
    //   console.log("here");
    //   const postEmergency = async () => {
    //     const token = await AsyncStorage.getItem("token");
    //     const user = await Auth.postEmergencyCase({
    //       body: {},
    //       token: token,
    //     });
    //     if (!user.isOk) {
    //       console.log("NOT OK ", user);
    //     }
    //     if (user.isOk) {
    //       console.log("response = ", user);
    //       setJobId(user.data.jobId);
    //       console.log(user.data.jobId);
    //     }
    //   };
    //   await postEmergency();
    // } catch (err) {
    //   console.log(err);
    // }
  };

  return (
    <RequestContainer>
      <DetailContainer>
        <PatientNameContainer>
          <PatientName>{patientName}</PatientName>
          <TimeStamp>12:30</TimeStamp>
        </PatientNameContainer>
        <LocationText>{location}</LocationText>
        <HorizonInput3>
        <BlueBorderButton>
        <BlueButtonText>
          Decline
        </BlueButtonText>
        </BlueBorderButton>
          <BlueButton onPress={acceptRequest}>
            <WhiteButtonText>Accept</WhiteButtonText>
          </BlueButton>
        </HorizonInput3>
      </DetailContainer>
    </RequestContainer>
  );
}
