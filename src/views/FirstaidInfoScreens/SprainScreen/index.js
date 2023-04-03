import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Button,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { NotificationTouchable } from "../../../components/components/index.style";
import { Icon } from "react-native-elements";
import { Colors } from "../../../constants";
import {
  TitleContainer,
  FirstListTitle,
  FirstScrollable,
  FirstListContainer,
  BlueCircleButton,
  StepTitle,
  StepTitle2,
  StepPicture,
  StepDetail,
} from "./index.style";

function SprainScreen({ navigation }) {
  return (
    <FirstListContainer>
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
      <TitleContainer>
        <BlueCircleButton onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-back-outline"
            type="ionicon"
            color={Colors.white}
            size={20}
          />
        </BlueCircleButton>
        <FirstListTitle>Support a Sprain</FirstListTitle>
      </TitleContainer>
      <SafeAreaView>
        <FirstScrollable>
          <StepTitle2>
            Think R.I.C.E. for the first 48 hours after the injury
          </StepTitle2>
          <StepTitle>
            Rest: Rest the injured part until it's less painful.
          </StepTitle>
          <StepTitle>
            Ice: Wrap an icepack or cold compress in a towel and place over the
            injured part immediately. Continue for no more than 20 minutes at a
            time, four to eight times a day.
          </StepTitle>
          <StepTitle>
            Compression: Support the injured part with an elastic compression
            bandage for at least 2 days.
          </StepTitle>
          <StepTitle>
            Elevation: Raise the injured part above heart level to decrease
            swelling.
          </StepTitle>
        </FirstScrollable>
      </SafeAreaView>
    </FirstListContainer>
  );
}
export default SprainScreen;
