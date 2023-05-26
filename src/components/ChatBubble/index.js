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
import { Text, ActivityIndicator } from "react-native";
import { Icon, Avatar, Accessory } from "react-native-elements";
import { Colors } from "../../constants";
import Auth from "../../api/auth";
import { Alert } from "react-native";
import { AsyncStorage } from "react-native";
import { db } from "../../lib/firebase";
import { useEffect, useState } from "react";

export default function ChatBubble({
  navigation,
  message,
  timeStamp,
  sender,
  image,
  seen,
  type,
  myUID,
  chatName,
  handleFinish,
}) {
  const [medMessage, setMedMessage] = useState([]);
  const [deliveryFee, setDeliveryFee] = useState("");
  const [orderStatus, setOrderStatus] = useState("pending");
  const [isLoading, setIsLoading] = useState(true);

  const medString = (value, fee) => {
    let tempMedMessage = "";
    let tempTotal = 0;
    value.forEach((data) => {
      if (data.name) {
        // tempMedMessage += data._id + "\n";
        tempMedMessage += data.name + "\n\n";
        tempMedMessage += "Duration: " + data.duration + "\n";
        tempMedMessage += "Dosage: " + data.dosage + "\n";
        tempMedMessage += "Price: " + data.price + "\n";
        tempMedMessage += "\n";
        tempTotal += Number(data.price);
      }
    });
    tempTotal += Number(fee);
    tempMedMessage += "+ " + fee + "\n";
    tempMedMessage += "Total: " + tempTotal;
    return tempMedMessage;
  };

  const getOrderDetail = async () => {
    const token = await AsyncStorage.getItem("token");
    const user = await Auth.getOrderById({
      params: { orderId: message },
      token: token,
    });
    if (user.isOk) {
      setMedMessage(user.data.medicines);
      setDeliveryFee(user.data.deliveryFee);
      return user.data;
    } else {
      return ["ERROR"];
    }
  };

  const acceptOrder = async () => {
    const token = await AsyncStorage.getItem("token");
    const user = await Auth.updateOrder({
      params: { orderId: message },
      body: { status: "accepted" },
      token: token,
    });
    if (user.isOk) {
      setOrderStatus("accepted");
      handleFinish();
      navigation.navigate("PharmaFinal", {
        chatName: chatName,
        medMessage: medString(medMessage,deliveryFee),
      });
    }
  };

  const cancelOrder = async () => {
    const token = await AsyncStorage.getItem("token");
    const user = await Auth.updateOrder({
      params: { orderId: message },
      body: { status: "canceled" },
      token: token,
    });
    if (user.isOk) {
      setOrderStatus("canceled");
    }
  };

  const fetchData = async () => {
    const data = await getOrderDetail();

    setOrderStatus(data.status);
    setIsLoading(false);
  };
  if (type === "prescription" && isLoading) {
    console.log("PRE");
    fetchData();
  }

  useEffect(() => {
    // if (type === "prescription") {
    //   console.log("PRE");
    //   fetchData();
    // }
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
              {isLoading ? (
                <ActivityIndicator size="small" color={Colors.white} />
              ) : (
                <WhiteMedMessage>
                  {medString(medMessage, deliveryFee)}
                </WhiteMedMessage>
              )}
            </MyBubble>
            <UnderBubble>
              {seen && <ReadLabel>Read</ReadLabel>}
              <MyTimeStamp>{timeStamp}</MyTimeStamp>
            </UnderBubble>
          </MessageContainer>
        );
      } else if (type === "image") {
        return (
          <MessageContainer>
            <ImagesContainer>
              <MyImage
                source={{
                  uri:
                    "https://healthcare-finalproject.s3.ap-southeast-1.amazonaws.com/" +
                    message,
                }}
              />
            </ImagesContainer>
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
              <BlueMedMessage>
                {medString(medMessage, deliveryFee)}
              </BlueMedMessage>
              {console.log({ orderStatus })}
              {orderStatus == "pending" && (
                <HorizonInput>
                  <CloseButton onPress={cancelOrder}>
                    <WhiteButtonText>Decline</WhiteButtonText>
                  </CloseButton>
                  <SaveButton onPress={acceptOrder}>
                    <WhiteButtonText>Accept</WhiteButtonText>
                  </SaveButton>
                </HorizonInput>
              )}
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
