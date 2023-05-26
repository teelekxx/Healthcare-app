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
;
import { Text } from "react-native";
import { Icon, Avatar, Accessory } from "react-native-elements";
import { Colors } from "../../constants";
import React, { useState, useEffect } from "react";

export default function PharmaRequest({ data }) {
  const [patientName, setPatientName] = useState("");
  const [location, setLocation] = useState(null);

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
    setLocation(data.requesterUser.address.address);
    console.log(data);
  };

  useEffect(() => {
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
      tempMessage = {
        uid: route.params.myUID,
        groupId: route.params.groupID,
        message: currMessage,
        type: "message",
      };
      // const token = await AsyncStorage.getItem("token");
      // await Chat.sendMessage(tempMessage);
      console.log("ACCEPT:",user);
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
            <BlueButtonText>Decline</BlueButtonText>
          </BlueBorderButton>
          <BlueButton onPress={acceptRequest}>
            <WhiteButtonText>Accept</WhiteButtonText>
          </BlueButton>
        </HorizonInput3>
      </DetailContainer>
    </RequestContainer>
  );
}
