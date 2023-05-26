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
import Heimlich from "../../../../assets/Heimlich.svg";

function HeimlichScreen({ navigation }) {
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
        <FirstListTitle>Heimlich Maneuver</FirstListTitle>
      </TitleContainer>
      </SafeAreaView>
      <SafeAreaView>
        <FirstScrollable>
        <View style={{alignSelf: "center"}}>
          <Heimlich/>
          </View>
          <StepTitle2>How to give Heimlich maneuver</StepTitle2>
          <StepTitle>1. Stand behind the person choking</StepTitle>
          <StepTitle>
            2. Place your arms around their waist and bend them forward
          </StepTitle>
          <StepTitle>
            3. Clench your fist and place it right above the person’s belly
            button then place your other hand on top
          </StepTitle>
          <StepTitle>
            4. Thrust both hands backwards into their stomach with a hard,
            upward movement up to five times
          </StepTitle>
          <StepTitle>
            5. If the object is still stuck in their throat, repeat the thrusts
          </StepTitle>
        </FirstScrollable>
      </SafeAreaView>
    </FirstListContainer>
  );
}
export default HeimlichScreen;
