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
import Sprain from "../../../../assets/ankleSprain.svg"
function SprainScreen({ navigation }) {
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
        <FirstListTitle>Support a Sprain</FirstListTitle>
      </TitleContainer>
      </SafeAreaView>
      <SafeAreaView>
        <FirstScrollable>
        <View style={{alignSelf: "center", marginBottom:10}}>
          <Sprain/>
          </View>
          <StepDetail>
            1. Rest the injured part until it's less painful.
          </StepDetail>
          <StepDetail>
            2. Wrap an icepack or cold compress in a towel and place over the
            injured part immediately. Continue for no more than 20 minutes at a
            time, four to eight times a day.
          </StepDetail>
          <StepDetail>
            2. Support the injured part with an elastic compression
            bandage for at least 2 days.
          </StepDetail>
          <StepDetail>
            3. Raise the injured part above heart level to decrease
            swelling.
          </StepDetail>
        </FirstScrollable>
      </SafeAreaView>
    </FirstListContainer>
  );
}
export default SprainScreen;
