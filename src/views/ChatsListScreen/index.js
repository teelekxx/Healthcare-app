import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Button,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  Title,
  ItalicText,
  Container,
  NotificationTouchable,
  HomeTitleContainer,
} from "../../components/components/index.style";
import ChatModule from "../../components/ChatModule/index";
import { Icon } from "react-native-elements";
import SwitchSelector from "react-native-switch-selector";
import { Colors } from "../../constants";
import {
  ChatListContainer,
  ChatListTitle,
  ChatScrollable,
  RoleSwitch,
} from "./index.style";
import Auth from "../../api/auth";
import { AsyncStorage, Alert } from "react-native";
import { collection, query, where, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../lib/firebase";

function ChatsListScreen({ navigation }) {
  const [isPatient, setPatient] = useState(true);
  const [myUID, setMyUID] = useState(null);
  const [myChats, setMyChats] = useState([]);
  const chatsListPatient = [
    { Name: "Andy Doe", LastMassage: "" },
    { Name: "Bill Doe", LastMassage: "" },
    { Name: "Collin Doe", LastMassage: "Hello" },
    { Name: "Derick Doe", LastMassage: "" },
    { Name: "Evan Doe", LastMassage: "" },
    { Name: "Frank Doe", LastMassage: "" },
    { Name: "Gill Doe", LastMassage: "" },
    { Name: "Harry Doe", LastMassage: "" },
  ];
  const chatsListPharma = [
    { Name: "Mine Pattarin", LastMassage: "" },
    { Name: "Hel Ping", LastMassage: "Hello!" },
  ];
  const options = [
    { label: "As a patient", value: true },
    { label: "As a Paramedic", value: false },
  ];

  useEffect(() => {
    const getMyUID = async () => {
      const token = await AsyncStorage.getItem("token");
      const user = await Auth.getUserByToken({
        token: token,
      });
      if (user.isOk) {
        setMyUID(user.data.user.uid);
      }
    };
    getMyUID();
    if (myUID != null) {
      const q = query(
        collection(db, "groups"),
        where("member", "array-contains", myUID)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const jobs = [];
        querySnapshot.forEach((doc) => {
          console.log("DATA =", doc.data());
          jobs.push(doc.data());
        });
        console.log("CHATS =", jobs);
        setMyChats(jobs);
      });
    }
  }, [myUID]);

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
          <ChatScrollable>
            {myChats.map((val, index) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Chatting", {
                      groupID: val.jobId,
                      myUID: myUID,
                      chat: val,
                    })
                  }
                  key={index}
                >
                  <ChatModule chat={val} myUID={myUID}></ChatModule>
                </TouchableOpacity>
              );
            })}
          </ChatScrollable>
        </SafeAreaView>
      ) : (
        <SafeAreaView>
          <ChatScrollable>
            {chatsListPharma.map((val, index) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Chatting", { paramKey: val.Name })
                  }
                  key={index}
                >
                  <ChatModule chat={val}></ChatModule>
                </TouchableOpacity>
              );
            })}
          </ChatScrollable>
        </SafeAreaView>
      )}
    </ChatListContainer>
  );
}
export default ChatsListScreen;
