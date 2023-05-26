import React from "react";
import { SafeAreaView, Button } from "react-native";
import { Icon } from "react-native-elements";
import { Colors } from "../../constants";
import { Audio } from "expo-av";
import {
  Title,
  ItalicText,
  Container,
  NotificationTouchable,
  HomeTitleContainer,
} from "../../components/components/index.style";
import {
  SosButton,
  SosContainer,
  SosButtonText,
  PromptText1,
  SosTitle,
  ThemeButton2,
  ThemeButtonText2,
  Cpr,
  FirstAidContainer,
  CprButton,
} from "./index.style";
import { useState } from "react";
import { useEffect } from "react";

function EmergencyScreen({ navigation }) {
  const [sound, setSound] = useState();
  const [play, setPlay]=useState(false);
  async function loadSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync( require('../../../assets/heartbeatTempo.mp3')
    );
    setSound(sound);
  }
  async function handleClicked(){
    if(!play){
      setPlay(true)
      await sound.playAsync();
    }else{
      setPlay(false)
      await sound.stopAsync();
    }
  }
 
  useEffect(() => {
    try{
      loadSound();
    }catch(error){
      console.log('Failed to load sound', error)
    }
  }, []);
  return (
    <SosContainer>
        <HomeTitleContainer>
        <SosTitle>Ambulance request</SosTitle>
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
        </HomeTitleContainer>
      <PromptText1>Click the button below to request an ambulance</PromptText1>
      <SosButton onPress={() => navigation.navigate("Request")}>
        <SosButtonText>SOS</SosButtonText>
      </SosButton>
      <FirstAidContainer>
      <ThemeButton2 onPress={() => navigation.navigate("Firstaid")}>
        <ThemeButtonText2>Firstaid Knowledge</ThemeButtonText2>
      </ThemeButton2>
      <CprButton onPress={handleClicked}> 
      <Cpr source= {require("../../../assets/cprIcon.png")}/>
      </CprButton>
      
      </FirstAidContainer>
      
    </SosContainer>
  );
}
export default EmergencyScreen;
