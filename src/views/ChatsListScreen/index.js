import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Button,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  Title,
  ItalicText,
  Container,
  NotificationTouchable,
  HomeTitleContainer,
  LoadingContainer,
} from "../../components/components/index.style";
import ChatModule from "../../components/ChatModule/index";
import { Icon } from "react-native-elements";
import SwitchSelector from "react-native-switch-selector";
import { Colors } from "../../constants";
import { useDispatch, useSelector } from "react-redux";

import {
  ChatListContainer,
  ChatListTitle,
  ChatScrollable,
  RoleSwitch,
} from "./index.style";
import Auth from "../../api/auth";
import { AsyncStorage, Alert } from "react-native";
import {
  collection,
  query,
  where,
  doc,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { db } from "../../lib/firebase";

function ChatsListScreen({ navigation }) {
  const [isPatient, setPatient] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [myUID, setMyUID] = useState("");
  const [myChats, setMyChats] = useState([]);
  const auth = useSelector((state) => state.Authentication);
  const isAuthenticated = auth.isAuthenticated;

  if (!isAuthenticated) {
    navigation.navigate("Landing");
  }

  const chatsListPharma = [
    { Name: "Mine Pattarin", LastMassage: "" },
    { Name: "Hel Ping", LastMassage: "Hello!" },
  ];
  const options = [
    { label: "As a patient", value: true },
    { label: "As a Paramedic", value: false },
  ];

  useEffect(() => {
    const sortArrayBySendAt = (array) => {
      array.sort((a, b) => {
        let sendAtA = 0;
        let sendAtB = 0;
        if (a.data().lastMsg.sendAt != null) {
          sendAtA = new Date(
            a.data().lastMsg.sendAt.seconds * 1000 +
              a.data().lastMsg.sendAt.nanoseconds / 1000000
          );
        }
        if (b.data().lastMsg.sendAt != null) {
          sendAtB = new Date(
            b.data().lastMsg.sendAt.seconds * 1000 +
              b.data().lastMsg.sendAt.nanoseconds / 1000000
          );
        }

        return sendAtA - sendAtB;
      });

      return array;
    };
    // const getMyUID = async () => {
    //   const token = await AsyncStorage.getItem("token");
    //   const user = await Auth.getUserByToken({
    //     token: token,
    //   });
    //   if (user.isOk) {
    //     setMyUID(user.data.user.uid);
    //   }
    // };
    // getMyUID();

    if (auth.user) {
      setMyUID(auth.user.uid);

      if (myUID != null) {
        const q = query(
          collection(db, "groups"),
          where("member", "array-contains", myUID)
        );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const jobs = [];
          querySnapshot.forEach((doc) => {
            jobs.push(doc);
          });
          // setMyChats(sortArrayBySendAt(jobs));
          setMyChats(jobs);
          setIsLoading(false);
        });
      }
    }
  }, [myUID]);

  if (isLoading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color="#00a5cb" />
      </LoadingContainer>
    );
  }

  return (
    <ChatListContainer>
      <HomeTitleContainer>
        <ChatListTitle>Chats</ChatListTitle>
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

      <RoleSwitch>
        <SwitchSelector
          options={options}
          initial={0}
          textColor={Colors.blue}
          selectedColor={Colors.white}
          buttonColor={Colors.blue}
          borderColor={Colors.blue}
          onPress={(value) => setPatient(value)}
        />
      </RoleSwitch>
      {isPatient ? (
        <SafeAreaView>
          {isLoading ? (
            <LoadingContainer>
              <ActivityIndicator size="large" color="#00a5cb" />
            </LoadingContainer>
          ) : (
            <ChatScrollable>
              {myChats.map((val, index) => {
                return (
                  <TouchableOpacity>
                    <ChatModule
                      navigation={navigation}
                      chat={val}
                      myUID={myUID}
                    ></ChatModule>
                  </TouchableOpacity>
                );
              })}
            </ChatScrollable>
          )}
        </SafeAreaView>
      ) : (
        <SafeAreaView>
          <ChatScrollable>
            {chatsListPharma.map((val, index) => {
              return (
                  <ChatModule chat={val}></ChatModule>
              );
            })}
          </ChatScrollable>
        </SafeAreaView>
      )}
    </ChatListContainer>
  );
}
export default ChatsListScreen;
