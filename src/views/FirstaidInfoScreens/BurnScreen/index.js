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

function BurnScreen({ navigation }) {
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
        <FirstListTitle>Treat a Burn</FirstListTitle>
      </TitleContainer>
      <SafeAreaView>
        <FirstScrollable>
          <StepPicture source={require("../../../../assets/burn.png")} />
          <StepTitle2>How to Treat a Burn</StepTitle2>
          <StepTitle>Cool the Burn</StepTitle>
          <StepDetail>
            Stop the burning process by running the burn under cool water for at
            least five minutes. Do not use ice to cool a burn as it can lead to
            further injury and hypothermia. Avoid spraying burns with high
            pressure, just let the water run over the burned area for as long as
            you can.
          </StepDetail>
          <StepTitle>When to Call 911</StepTitle>
          <StepDetail>
            Call 911 if there is charring (blackened skin) or blistering
            (bubbles on the skin) in the following areas: The face, The genitals
            All the way around a wrist, arm, leg or ankle, or Anywhere on the
            body covering an area bigger than the size of the chest.
          </StepDetail>
          <StepTitle>Using Burn Ointment</StepTitle>
          <StepDetail>
            Minor burns can be treated with a topical burn ointment or spray to
            reduce pain. Ointments should be water-soluble. Do not apply butter
            or oil to any burn. Butter or lard may feel cool because it comes
            out of the refrigerator, but the oils will trap heat and make the
            burn deeper over time.
          </StepDetail>
          <StepTitle>Burn Care</StepTitle>
          <StepDetail>
            Burns destroy skin and the loss of skin can lead to infection,
            dehydration, and hypothermia. While the burn is healing, wear loose
            natural clothing like silks or light cotton. Harsher fabrics will
            irritate the skin even more.
          </StepDetail>
        </FirstScrollable>
      </SafeAreaView>
    </FirstListContainer>
  );
}
export default BurnScreen;
