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
import Splint from "../../../../assets/splint.svg";

function SplintScreen({ navigation }) {
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
        <FirstListTitle>Set a Splint</FirstListTitle>
      </TitleContainer>
      </SafeAreaView>
      <SafeAreaView>
        <FirstScrollable>
        <View style={{alignSelf: "center", marginBottom:10}}>
          <Splint/>
          </View>
          
          <StepDetail>
            1. Attend to bleeding, if any, before you attempt to place the splint.
            You can stop the bleeding by putting pressure directly on the wound.
          </StepDetail>
          <StepDetail>
            2. Apply a bandage, a square of gauze, or a piece of cloth. Don’t try
            to move the body part that needs to be splinted. By trying to
            realign a misshapen body part or broken bone, you may accidentally
            cause more damage.
          </StepDetail>
          <StepDetail>
            3. Carefully place the homemade splint so that it rests on the joint
            above the injury and the joint below it.
          </StepDetail>
          <StepDetail>
            4. Once the splinting is completed, you should check the areas around
            it every few minutes for signs of decreased blood circulation.
          </StepDetail>
          <StepDetail>
            5. After you’ve applied the splint and the injured body part is no
            longer able to move, call 911 or your local emergency services.
          </StepDetail>
        </FirstScrollable>
      </SafeAreaView>
    </FirstListContainer>
  );
}
export default SplintScreen;
