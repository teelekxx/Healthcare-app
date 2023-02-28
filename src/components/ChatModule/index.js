import {
  ChatContainer,
  DetailContainer,
  ChatName,
  LastMassage,
} from "./index.style";
import { Text } from "react-native";
import { Icon, Avatar, Accessory } from "react-native-elements";
import { Colors } from "../../constants";
export default function ChatModule({ name, lastMassage }) {
  if (lastMassage == "") {
    lastMassage = "No massage";
  }
  return (
    <ChatContainer>
      <Avatar
        // source={require("../../../assets/appLogo.png")}
        size={"large"}
        rounded
        icon={{ name: "user", type: "font-awesome" }}
        overlayContainerStyle={{ backgroundColor: "#efece8" }}
      ></Avatar>
      <DetailContainer>
        <ChatName>{name}</ChatName>
        <LastMassage>{lastMassage}</LastMassage>
      </DetailContainer>
    </ChatContainer>
  );
}
