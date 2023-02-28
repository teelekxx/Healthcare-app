import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Button,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Colors } from "../../constants";
import {
  Title,
  ItalicText,
  Container,
} from "../../components/components/index.style";
import {
  RequestContainer,
  RequestTitle,
  InputContainer,
  HorizonInput,
  HorizonInput2,
  HorizonInput3,
  GreyInput,
  BlueText,
  GreyText,
  BlueBorderButton,
  GreyButton,
  BlueButton,
  GreyButtonText,
  BlueButtonText,
  WhiteButtonText,
  SymptomList,
  SymptomIcon,
  CheckBoxContainer,
} from "./index.style";
import {
  FormInput,
  SmallFormInput,
  BigFormInput,
  BlueContainer,
  SignUpForm,
  FormText,
  PageTitleContainer,
  PageTitle,
  DateCalendar,
} from "../../components/components/index.style";

function RequestScreen({ navigation }) {
  const [isAccident, setAccident] = useState(false);
  const [isChestPain, setChestPain] = useState(false);
  const [isBreathlessness, setBreathlessness] = useState(false);
  const [isUnconsciousness, setUnconsciousness] = useState(false);
  const [isWeakness, setWeakness] = useState(false);

  return (
    <RequestContainer>
      <RequestTitle>Ambulance request detail</RequestTitle>
      <InputContainer>
        <BlueText>Contact number*</BlueText>
        <GreyInput placeholder="0817977168"></GreyInput>
      </InputContainer>
      <InputContainer>
        <BlueText>Attached image (optional)</BlueText>
        <HorizonInput>
          <GreyButton>
            <GreyButtonText>Take photo</GreyButtonText>
          </GreyButton>
          <GreyButton>
            <GreyButtonText>Choose photo</GreyButtonText>
          </GreyButton>
        </HorizonInput>
      </InputContainer>
      <InputContainer>
        <BlueText>Type of emergencies (optional)</BlueText>
      </InputContainer>
      <SymptomList>
        <HorizonInput2>
          <SymptomIcon source={require("../../../assets/fender-bender.png")} />
          <GreyText>Accident</GreyText>
          <CheckBoxContainer>
            <BouncyCheckbox
              fillColor="#00a5cb"
              isChecked={isAccident}
              onPress={() => setAccident(!isAccident)}
            />
          </CheckBoxContainer>
        </HorizonInput2>
        <HorizonInput2>
          <SymptomIcon source={require("../../../assets/chest-pain.png")} />
          <GreyText>Chest pain</GreyText>
          <CheckBoxContainer>
            <BouncyCheckbox
              fillColor="#00a5cb"
              isChecked={isChestPain}
              onPress={() => setChestPain(!isChestPain)}
            />
          </CheckBoxContainer>
        </HorizonInput2>
        <HorizonInput2>
          <SymptomIcon source={require("../../../assets/lungs.png")} />
          <GreyText>Breathlessness</GreyText>
          <CheckBoxContainer>
            <BouncyCheckbox
              fillColor="#00a5cb"
              isChecked={isBreathlessness}
              onPress={() => setBreathlessness(!isBreathlessness)}
            />
          </CheckBoxContainer>
        </HorizonInput2>
        <HorizonInput2>
          <SymptomIcon source={require("../../../assets/insomnia.png")} />
          <GreyText>Unconsciousness</GreyText>
          <CheckBoxContainer>
            <BouncyCheckbox
              fillColor="#00a5cb"
              isChecked={isUnconsciousness}
              onPress={() => setUnconsciousness(!isUnconsciousness)}
            />
          </CheckBoxContainer>
        </HorizonInput2>
        <HorizonInput2>
          <SymptomIcon source={require("../../../assets/weakness.png")} />
          <GreyText>Sudden paralysis/weakness</GreyText>
          <CheckBoxContainer>
            <BouncyCheckbox
              fillColor="#00a5cb"
              isChecked={isWeakness}
              onPress={() => setWeakness(!isWeakness)}
            />
          </CheckBoxContainer>
        </HorizonInput2>
      </SymptomList>
      <InputContainer behavior="padding">
        <BlueText>Other/ more information (optional)</BlueText>
        <GreyInput></GreyInput>
      </InputContainer>
      <HorizonInput3>
        <BlueBorderButton onPress={() => navigation.goBack()}>
          <BlueButtonText>Cancel</BlueButtonText>
        </BlueBorderButton>
        <BlueButton onPress={() => navigation.navigate("Map")}>
          <WhiteButtonText>Request</WhiteButtonText>
        </BlueButton>
      </HorizonInput3>
    </RequestContainer>
  );
}
export default RequestScreen;
