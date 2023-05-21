import {
  WhiteMessage,
  MyBubble,
  MessageContainer,
  MyTimeStamp,
  OthersBubble,
  OthersTimeStamp,
  BlueMessage,
  SelectedImage,
  ImagesContainer,
  ReadLabel,
  MyImage,
  UnderBubble,
  CloseButton,
  SaveButton,
  WhiteButtonText,
  HorizonInput,
  BlueMedMessage,
  WhiteMedMessage,
} from "./index.style";
import { Text } from "react-native";
import { Icon, Avatar, Accessory } from "react-native-elements";
import { Colors } from "../../constants";
import Auth from "../../api/auth";
import { AsyncStorage, Alert } from "react-native";
import { db } from "../../lib/firebase";
import { useEffect, useState } from "react";

export default function ChatBubble({
  message,
  timeStamp,
  sender,
  image,
  seen,
  type,
  myUID,
}) {
  const [medMessage, setMedMessage] = useState(["NO"]);

  const medString = (value) => {
    let tempMedMessage = "";
    value.forEach((data) => {
      tempMedMessage += data._id + "\n";
      // tempMedMessage += data.Medicines + "\n";
      // tempMedMessage += data.Description + "\n";
      // tempMedMessage += "Price: " + data.Price + "\n";
      // tempMedMessage += "\n";
    });
    // tempMedMessage += "Total: " + tempTotal;
    return tempMedMessage;
  };

  const getOrderDetail = async () => {
    const token = await AsyncStorage.getItem("token");
    const user = await Auth.getOrderById({
      params: { orderId: message },
      token: token,
    });
    if (user.isOk) {
      return user.data.medicines;
    } else {
      return ["ERROR"];
    }
  };

  const fetchData = async () => {
    const data = await getOrderDetail();
    setMedMessage(data);
  };

  useEffect(() => {
    if (type === "prescription") {
      fetchData();
    }
  }, []);
  if (image === null) {
    image = [];
  }
  if (image.length === 0 && message === "") {
    return;
  } else {
    if (sender === myUID) {
      if (type === "prescription") {
        return (
          <MessageContainer>
            <MyBubble>
              <WhiteMedMessage>{medString(medMessage)}</WhiteMedMessage>
            </MyBubble>
            <UnderBubble>
              {seen && <ReadLabel>Read</ReadLabel>}
              <MyTimeStamp>{timeStamp}</MyTimeStamp>
            </UnderBubble>
          </MessageContainer>
        );
      } else {
        return (
          <MessageContainer>
            {image.length !== 0 && (
              <ImagesContainer>
                {image.map((val, index) => {
                  return <MyImage source={{ uri: val }} key={index} />;
                })}
              </ImagesContainer>
            )}
            {message && (
              <MyBubble>
                <WhiteMessage>{message}</WhiteMessage>
              </MyBubble>
            )}
            <UnderBubble>
              {seen && <ReadLabel>Read</ReadLabel>}
              <MyTimeStamp>{timeStamp}</MyTimeStamp>
            </UnderBubble>
          </MessageContainer>
        );
      }
    } else {
      if (type === "prescription") {
        return (
          <MessageContainer>
            <OthersBubble>
              <BlueMedMessage>{medString(medMessage)}</BlueMedMessage>
              <HorizonInput>
                <CloseButton>
                  <WhiteButtonText>Decline</WhiteButtonText>
                </CloseButton>
                <SaveButton>
                  <WhiteButtonText>Accept</WhiteButtonText>
                </SaveButton>
              </HorizonInput>
            </OthersBubble>
            <OthersTimeStamp>{timeStamp}</OthersTimeStamp>
          </MessageContainer>
        );
      } else {
        return (
          <MessageContainer>
            <OthersBubble>
              <BlueMessage>{message}</BlueMessage>
            </OthersBubble>
            <OthersTimeStamp>{timeStamp}</OthersTimeStamp>
          </MessageContainer>
        );
      }
    }
  }
}
