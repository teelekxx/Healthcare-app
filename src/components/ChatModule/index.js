import {
  ChatContainer,
  DetailContainer,
  ChatName,
  LastMassage,
} from "./index.style";
import { Text } from "react-native";
import { Icon, Avatar, Accessory } from "react-native-elements";
import { Colors } from "../../constants";
import React, { useState, useEffect } from "react";
import Auth from "../../api/auth";
import { AsyncStorage } from "react-native";
import { Alert, ActivityIndicator } from "react-native";
import { LoadingContainer } from "../components/index.style";
import {
  collection,
  query,
  where,
  doc,
  onSnapshot,
  orderBy,
  getCountFromServer,
} from "firebase/firestore";
import { db } from "../../lib/firebase";

export default function ChatModule({ navigation, chat, myUID }) {
  const [chatName, setChatName] = useState("");
  const [chatCount, setChatCount] = useState(0);
  const [image, setImage] = useState(null);
  const [otherUser, setOtherUser] = useState(null);
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getChatter = async (myUID) => {
    const otherUID = chat.data().member.filter((jobID) => jobID !== myUID);
    const token = await AsyncStorage.getItem("token");
    const user = await Auth.getUserByUID({
      params: { uid: otherUID },
    });
    if (user.isOk) {
      return user;
    }
  };
  const fetchData = async (myUID) => {
    const data = await getChatter(myUID);
    setChatName(data.data.medicalInformation.name);
    setImage(data.data.user.faceImg);

    // const snapshot = getCountFromServer(q);
    // console.log("count: ", snapshot.data().count);
    // console.log("COUNT:" );
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData(myUID);
    // const q = query(
    //   collection(db, "messages", chat.data().jobId, "messages"),
    //   where("sendBy", "==", myUID),
    //   where("seen", "==", false)
    //   // where("visible", "==", true),
    // );
    // const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //   querySnapshot.forEach((doc) => {
    //     setChatCount(chatCount + 1);
    //   });
    //   // setMyChats(sortArrayBySendAt(jobs));
    // });
  }, []);

  return (
    <ChatContainer
      onPress={() =>
        navigation.navigate("Chatting", {
          chatName: chatName,
          groupID: chat.data().jobId,
          myUID: myUID,
        })
      }
    >
      <Avatar
        // source={require("../../../assets/appLogo.png")}
        size={"large"}
        rounded
        icon={image ? null : { name: "user", type: "font-awesome" }}
        overlayContainerStyle={{ backgroundColor: "#efece8" }}
        source={
          image
            ? {
                uri:
                  "https://healthcare-finalproject.s3.ap-southeast-1.amazonaws.com/" +
                  image,
              }
            : require("../../../assets/profile-picture-empty.png")
        }
      ></Avatar>

      {isLoading ? (
        <LoadingContainer>
          <ActivityIndicator size="small" color={Colors.blue} />
        </LoadingContainer>
      ) : (
        <DetailContainer>
          <ChatName>{chatName}</ChatName>
          {/* <LastMassage>{chatCount}</LastMassage> */}
          <LastMassage>{chat.data().lastMsg.message}</LastMassage>
        </DetailContainer>
      )}
    </ChatContainer>
  );
}
