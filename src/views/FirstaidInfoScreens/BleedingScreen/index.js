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

function BleedingScreen({ navigation }) {
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
        <FirstListTitle>Stop the Bleeding</FirstListTitle>
      </TitleContainer>
      <SafeAreaView>
        <FirstScrollable>
          <StepPicture source={require("../../../../assets/bleeding.jpg")} />
          <StepTitle>1. Stop the Bleeding</StepTitle>
          <StepDetail>
            Apply direct pressure on the cut or wound with a clean cloth,
            tissue, or piece of gauze until bleeding stops. If blood soaks
            through the material, don’t remove it. Put more cloth or gauze on
            top of it and continue to apply pressure.
          </StepDetail>
          <StepTitle>2. Clean Cut or Wound</StepTitle>
          <StepDetail>
            Gently clean with soap and warm water. Try to rinse soap out of
            wound to prevent irritation.
          </StepDetail>
          <StepTitle>3. Protect the Wound</StepTitle>
          <StepDetail>
            Apply antibiotic cream to reduce risk of infection and cover with a
            sterile bandage. Change the bandage daily to keep the wound clean
            and dry.
          </StepDetail>
        </FirstScrollable>
      </SafeAreaView>
    </FirstListContainer>
  );
}
export default BleedingScreen;
