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
} from "../../components/components/index.style";
import { Icon } from "react-native-elements";
import { Colors } from "../../constants";
import {
  TitleContainer,
  FirstListTitle,
  FirstScrollable,
  FirstListContainer,
  FirstContainer,
  FirstName,
  Description,
  DetailContainer,
  BlueCircleButton,
} from "./index.style";

function FirstaidScreen({ navigation }) {
  const firstList = [
    {
      Name: "CPR",
      Description:
        "CPR is short for cardiopulmonary resuscitation—it provides artificial ventilation that can preserve brain function, blood circulation, and breathing in a person.",
    },
    {
      Name: "Heimlich Maneuver",
      Description:
        "If someone is choking, the Heimlich can dislodge whatever it is that is blocking their airways to save their life or prevent potential brain damage.",
    },
    {
      Name: "Set a Splint",
      Description:
        "If you are far away from help and someone in your group has suffered a broken bone, you’ll need to set a splint.",
    },
    {
      Name: "Stop the Bleeding",
      Description:
        "When you’re in a situation where someone is bleeding excessively. The injured person could be bleeding from a main artery or vein, in which case they could bleed out in 10-15 minutes.",
    },
    {
      Name: "Support a Sprain",
      Description:
        "Sprains are common injuries. The sprained joint should be wrapped with an ace bandage and elevated until a doctor can take a look at it. Usually, the best treatment for sprains is R.I.C.E.—rest, ice, compression, elevation.",
    },
    {
      Name: "Treat a Burn",
      Description:
        "There are three degrees of burn injuries and treating each degree is different. First degree burns really just need topical remedies and loose gauze. Second-degree burns will be blistered and a little swollen. Run it under cool water, then treat similar to a first-degree burn. Third-degree burns are classified by whitening of the skin, blistering, and numbness. These burns should be treated by a doctor. ",
    },
  ];
  return (
    <FirstListContainer>
      <SafeAreaView>
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
      </SafeAreaView>
      <TitleContainer>
        <BlueCircleButton onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-back-outline"
            type="ionicon"
            color={Colors.white}
            size={20}
          />
        </BlueCircleButton>
        <FirstListTitle>Firstaid</FirstListTitle>
      </TitleContainer>
      <SafeAreaView>
        <FirstScrollable>
          {firstList.map((val, index) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate(val.Name)}
                key={index}
              >
                <FirstContainer>
                  <DetailContainer>
                    <FirstName>{val.Name}</FirstName>
                    <Description>{val.Description}</Description>
                  </DetailContainer>
                </FirstContainer>
              </TouchableOpacity>
            );
          })}
        </FirstScrollable>
      </SafeAreaView>
    </FirstListContainer>
  );
}
export default FirstaidScreen;
