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
        <View style={{alignSelf: "center", marginBottom:10}}>
          <Heimlich/>
          </View>
          <StepDetail>1. Stand behind the person choking</StepDetail>
          <StepDetail>
            2. Place your arms around their waist and bend them forward
          </StepDetail>
          <StepDetail>
            3. Clench your fist and place it right above the person’s belly
            button then place your other hand on top
          </StepDetail>
          <StepDetail>
            4. Thrust both hands backwards into their stomach with a hard,
            upward movement up to five times
          </StepDetail>
          <StepDetail>
            5. If the object is still stuck in their throat, repeat the thrusts
          </StepDetail>
        </FirstScrollable>
      </SafeAreaView>
    </FirstListContainer>
  );
}
export default HeimlichScreen;
