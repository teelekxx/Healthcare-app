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
import { AsyncStorage, Alert } from "react-native";
import { Text } from "react-native";
import { Icon, Avatar, Accessory } from "react-native-elements";
import { Colors } from "../../constants";
import React, { useState, useEffect } from "react";

export default function MedicineOrder({ data }) {
  const [medicineName, setMedicineName] = useState("MED");
  const [dosage, setDosage] = useState("DOSE");
  const [duration, setDuration] = useState("DURATION");
  const [price, setPrice] = useState("PRICE");

  useEffect(() => {
    setMedicineName(data[0].Medicines);
    setDosage(data[0].Dosage);
    setDuration(data[0].Duration);
    setPrice(data[0].Price);
  }, []);
  const acceptRequest = async () => {
    const token = await AsyncStorage.getItem("token");
    const user = await Auth.postAcceptJob({
      body: { jobId: data.jobId, round: data.round },
      token: token,
    });
    if (user.isOk) {
      console.log(user);
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
          <PatientName>{medicineName}</PatientName>
          <TimeStamp>{price}</TimeStamp>
        </PatientNameContainer>
        <PatientNameContainer>
        <LocationText>{dosage}</LocationText>
        <TimeStamp>{duration}</TimeStamp>
        </PatientNameContainer>
        <HorizonInput3>
          <BlueBorderButton>
            <BlueButtonText>Delete</BlueButtonText>
          </BlueBorderButton>
          <BlueButton>
            <WhiteButtonText>Edit</WhiteButtonText>
          </BlueButton>
        </HorizonInput3>
      </DetailContainer>
    </RequestContainer>
  );
}
