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
import { Text } from "react-native";
import { Icon, Avatar, Accessory } from "react-native-elements";
import { Colors } from "../../constants";
export default function PharmaRequest({ name, location, distance }) {
  const acceptRequest = async () => {
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
          <PatientName>{name}</PatientName>
          <TimeStamp>12:30</TimeStamp>
        </PatientNameContainer>
        <LocationText>{location}</LocationText>
        <HorizonInput3>
          <BlueBorderButton>
            <BlueButtonText>Decline</BlueButtonText>
          </BlueBorderButton>
          <BlueButton>
            <WhiteButtonText>Accept</WhiteButtonText>
          </BlueButton>
        </HorizonInput3>
      </DetailContainer>
    </RequestContainer>
  );
}
