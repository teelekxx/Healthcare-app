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

import Faint from "../../../../assets/recovery.svg";


function UnconsciousnessScreen({ navigation }) {
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
          <FirstListTitle>Unconsciousness</FirstListTitle>
        </TitleContainer>
      </SafeAreaView>
      <SafeAreaView>
        <FirstScrollable>
          <View style={{ alignSelf: "center", marginBottom:10}}>
            <Faint />
          </View>
          <StepDetail>
            1. Kneel by the casualty and straighten their legs. Place the arm that is nearest to you at a right angle to their body, with the elbow bent and their palm facing upwards.
          </StepDetail>
          <StepDetail>
            2. Bring their other arm across their chest and place the back of their hand against the cheek nearest to you. Hold it there.
            remove it.
          </StepDetail>
          <StepDetail>
            3. With your other hand, pull their far knee up so that their foot is flat on the floor.
          </StepDetail>
          <StepDetail>
            4. Keeping the back of the casualty’s hand pressed against their cheek, pull on the far leg to roll the casualty towards you on to their side. You can then adjust the top leg so that it is bent at a right angle.
          </StepDetail>
          <StepDetail>
            5. Gently tilt the casualty’s head back and lift their chin to make sure their airway stays open. You can adjust the hand under their cheek to do this.
          </StepDetail>
          <StepDetail>
            6. If they remain in the recovery position for 30 minutes, roll them into the recovery position on the other side.
          </StepDetail>
         
        </FirstScrollable>
      </SafeAreaView>
    </FirstListContainer>
  );
}
export default UnconsciousnessScreen;