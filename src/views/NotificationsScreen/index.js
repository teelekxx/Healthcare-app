import React from "react";
import { SafeAreaView, Button } from "react-native";
import { Icon } from "react-native-elements";
import { Colors } from "../../constants";
import {
  Title,
  ItalicText,
  Container,
  NotificationTouchable,
} from "../../components/components/index.style";
import { NotificationsTitle, NotificationsContainer } from "./index.style";

function NotificationsScreen({ navigation }) {
  return (
    <NotificationsContainer>
      <NotificationsTitle>Notification</NotificationsTitle>
    </NotificationsContainer>
  );
}
export default NotificationsScreen;
