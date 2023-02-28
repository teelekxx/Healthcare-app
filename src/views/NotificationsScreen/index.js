import React from "react";
import { SafeAreaView, Button } from "react-native";
import { Icon } from "react-native-elements";
import { Colors } from "../../constants";
import { BlueCircleButton } from "../../components/components/index.style";

import {
  NotificationsTitle,
  NotificationsContainer,
  TitleContainer,
  NotificationsScrollable,
  NotificationBlock,
  NotificationsName,
  NotificationsMassage,
  NotificationsDate,
} from "./index.style";

function NotificationsScreen({ navigation }) {
  const chatNotifications = [
    { Name: "Collin Doe", Massage: "Hello", Date: "24/02/2023" },
    { Name: "Bill Doe", Massage: "How are you?", Date: "22/02/2023" },
  ];
  const EmergencyNotifications = [
    { Name: "We found an Ambulance!", Massage: "", Date: "20/02/2023" },
    { Name: "Order Successfully", Massage: "", Date: "20/02/2023" },
  ];
  return (
    <NotificationsContainer>
      <TitleContainer>
        <BlueCircleButton onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-back-outline"
            type="ionicon"
            color={Colors.white}
            size={20}
          />
        </BlueCircleButton>
        <NotificationsTitle>Notification</NotificationsTitle>
      </TitleContainer>
      <SafeAreaView>
        <NotificationsScrollable>
          {chatNotifications.map((val, index) => {
            return (
              <NotificationBlock
                onPress={() =>
                  navigation.navigate("Chatting", { paramKey: val.Name })
                }
                key={index}
              >
                <NotificationsName>Masssage from: {val.Name}</NotificationsName>
                <NotificationsMassage>{val.Massage}</NotificationsMassage>
                <NotificationsDate>{val.Date}</NotificationsDate>
              </NotificationBlock>
            );
          })}
          {EmergencyNotifications.map((val, index) => {
            return (
              <NotificationBlock
                // onPress={() =>
                //   navigation.navigate("Chatting", { paramKey: val.Name })
                // }
                key={index}
              >
                <NotificationsName>{val.Name}</NotificationsName>
                <NotificationsMassage>{val.Massage}</NotificationsMassage>
                <NotificationsDate>{val.Date}</NotificationsDate>
              </NotificationBlock>
            );
          })}
        </NotificationsScrollable>
      </SafeAreaView>
    </NotificationsContainer>
  );
}
export default NotificationsScreen;
