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
import { TitleContainer,FirstListContainer,BlueCircleButton, FirstListTitle, FirstScrollable,FirstContainer, StepDetail } from "../AirwayScreen/index.style";
import CPR from "../../../../assets/CPRPic.svg";

function CPRScreen({ navigation }) {
  return (
    <FirstListContainer>
      <SafeAreaView>
        <TitleContainer>
          <BlueCircleButton onPress={() => navigation.goBack()}>
            <Icon
              name="arrow-back-outline"
              type="ionicon"
              color={Colors.white}
              size={20}
            />
          </BlueCircleButton>
          <FirstListTitle>Open the airway</FirstListTitle>
        </TitleContainer>
      </SafeAreaView>
      <SafeAreaView>
        <FirstScrollable>
          <View style={{ alignSelf: "center", marginBottom:10}}>
            <CPR />
          </View>
          <StepDetail>
            1. To prepare to give chest compressions, place them safely on a flat surface and kneel beside them.
          </StepDetail>
          <StepDetail>
            2. If the person is an adult, place the heel of one of your hands in the center of their chest, between the nipples. Put your other hand on top of the first. Interlock your fingers and raise them up so only the heel of your hand remains on their chest.
          </StepDetail>
          <StepDetail>
            3. To start compressions on an adult, use your upper body to push straight down on their chest at least 2 inches. Perform these at a rate of 100 to 120 compressions per minute. Allow their chest to recoil between compressions.
          </StepDetail>
          <StepDetail>
            4. Repeat the compression cycle until the person starts to breathe or medical help arrives. If the person begins to breathe, have them lie on their side quietly until medical assistance is on the scene.
          </StepDetail>
          {/* <StepTitle2>For adults and children over 8 years old</StepTitle2>
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
          </StepDetail> */}
        </FirstScrollable>
      </SafeAreaView>
    </FirstListContainer>
  );
}
export default CPRScreen;
