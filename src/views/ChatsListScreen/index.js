import React from "react";
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
} from "../../components/components/index.style";
import ChatModule from "../../components/ChatModule/index";
import { Icon } from "react-native-elements";
import { Colors } from "../../constants";
import {
  ChatListContainer,
  ChatListTitle,
  ChatScrollable,
} from "./index.style";

function ChatsListScreen({ navigation }) {
  const chatsList = [
    { Name: "Andy Doe", LastMassage: "" },
    { Name: "Bill Doe", LastMassage: "" },
    { Name: "Collin Doe", LastMassage: "Hello" },
    { Name: "Derick Doe", LastMassage: "" },
    { Name: "Evan Doe", LastMassage: "" },
    { Name: "Frank Doe", LastMassage: "" },
    { Name: "Gill Doe", LastMassage: "" },
    { Name: "Harry Doe", LastMassage: "" },
  ];
  return (
    <ChatListContainer>
      <NotificationTouchable>
        <Icon
          name="notifications-outline"
          type="ionicon"
          color={Colors.blue}
          size={30}
        />
      </NotificationTouchable>
      <ChatListTitle>Chats</ChatListTitle>
      <SafeAreaView>
        <ChatScrollable>
          {chatsList.map((val, index) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Chatting", { paramKey: val.Name })
                }
                key={index}
              >
                <ChatModule
                  name={val.Name}
                  lastMassage={val.LastMassage}
                ></ChatModule>
              </TouchableOpacity>
            );
          })}
        </ChatScrollable>
      </SafeAreaView>
    </ChatListContainer>
  );
}
export default ChatsListScreen;
