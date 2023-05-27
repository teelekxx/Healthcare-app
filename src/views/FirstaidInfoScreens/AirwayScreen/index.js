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
  StepContainer,
} from "./index.style";
import AirwayPic from "../../../../assets/airway.svg";
import RescueBreath from "../../../../assets/rescueBreath.svg"

function AirwayScreen({ navigation }) {
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
            <AirwayPic />
          </View>
          <StepDetail>
            1. Look, listen and feel for breathing no longer than 10 seconds
          </StepDetail>
          <StepDetail>
            2. Open the person's mouth and check for foreign material, if found,
            remove it.
          </StepDetail>
          <StepDetail>
            3. Place one hand on the patient’s forehead and the other under the
            chin.
          </StepDetail>
          <StepDetail>
            4. Tilt the forehead back whilst lifting the chin forward to extend
            the neck.
          </StepDetail>
          <View style={{ alignSelf: "center", marginBottom:10, marginTop:10}}>
            <RescueBreath />
          </View>
          <StepDetail>
            1. With the airway open, pinch the nostrils shut, and cover the person’s mouth with a CPR face mask to make a seal.
          </StepDetail>
          <StepDetail>
          2. Give two rescue breaths, each lasting about 1 second.
          </StepDetail>
          <StepDetail>
          3. Watch for their chest to rise with each breath. If it doesn’t, reposition the face mask and try again.
          </StepDetail>
          
        </FirstScrollable>
      </SafeAreaView>
    </FirstListContainer>
  );
}
export default AirwayScreen;
