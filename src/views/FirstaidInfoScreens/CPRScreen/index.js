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

function CPRScreen({ navigation }) {
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
        <FirstListTitle>CPR</FirstListTitle>
      </TitleContainer>
      <SafeAreaView>
        <FirstScrollable>
          <StepPicture source={require("../../../../assets/CPR.png")} />
          <StepTitle2>For adults and children over 8 years old</StepTitle2>
          <StepTitle>1. Place your hands on the person's chest</StepTitle>
          <StepDetail>
            Imagine a line between the nipples and put the heel of one hand
            directly on that line, in the center of the chest (i.e., the
            sternum). Place your other hand on top of that hand. Center your
            weight directly over your hands.
          </StepDetail>
          <StepTitle>2. Perform chest compressions</StepTitle>
          <StepDetail>
            Push hard, to a depth of at least 2 inches (but no deeper than 2.4
            inches) and fast—about twice per second until the person responds.
            Your hands shouldn't bounce, but you should lift your entire body
            weight off the patient in between each compression.
          </StepDetail>
          <StepTitle>3. Give rescue breaths</StepTitle>
          <StepDetail>
            If you have had CPR training and feel comfortable performing the
            steps, push on the chest 30 times, then give two rescue breaths.
          </StepDetail>
          <StepTitle>4. Repeat</StepTitle>
          <StepDetail>
            Repeat cycles in the CPR ratio of 30:2 (chest compressions and
            breaths) until help arrives or the patient wakes up.
          </StepDetail>
          <StepTitle2>For children 1 to 8 years old</StepTitle2>
          <StepTitle>1. Place your hands on the child's chest</StepTitle>
          <StepDetail>
            Place two hands (or one hand if the child is very small) on the
            child's sternum.
          </StepDetail>
          <StepTitle>2. Perform chest compressions</StepTitle>
          <StepDetail>
            Push hard, to a depth of at least 2 inches (but no deeper than 2.4
            inches) and fast—about twice per second until the person responds.
          </StepDetail>
          <StepTitle>3. Give rescue breaths</StepTitle>
          <StepDetail>
            If you have had CPR training and feel comfortable performing the
            steps, push on the chest 30 times, then give two rescue breaths.
          </StepDetail>
          <StepTitle>4. Repeat</StepTitle>
          <StepDetail>
            Repeat cycles of 30 chest compressions and two breaths until help
            arrives or the patient wakes up.
          </StepDetail>
        </FirstScrollable>
      </SafeAreaView>
    </FirstListContainer>
  );
}
export default CPRScreen;
