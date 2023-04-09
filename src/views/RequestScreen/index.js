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
import { Icon } from "react-native-elements";
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
  BlueText2,
  BlueBorderButton,
  GreyButton,
  BlueButton,
  GreyButtonText,
  BlueButtonText,
  WhiteButtonText,
  SymptomList,
  SymptomIcon,
  CheckBoxContainer,
  SelectedImage,
  SelectedImageContainer,
  RemoveButton,
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
import * as Location from "expo-location";
import Auth from "../../api/auth";
import * as ImagePicker from "expo-image-picker";
import { AsyncStorage } from "react-native";
function RequestScreen({ navigation }) {
  const [isAccident, setAccident] = useState(false);
  const [isChestPain, setChestPain] = useState(false);
  const [isBreathlessness, setBreathlessness] = useState(false);
  const [isUnconsciousness, setUnconsciousness] = useState(false);
  const [isWeakness, setWeakness] = useState(false);
  const [image, setImage] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otherInformation, setOtherInformation] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const symptoms = [];

  useEffect(() => {
    try {
      (async () => {
      
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission to access location was denied');
          return;
        }
        
  
        let location = await Location.getCurrentPositionAsync({});
        console.log(latitude)
        setLatitude(location.coords.latitude)
        setLongitude(location.coords.longitude)
      })();
      const getUserData = async () => {
        const token = await AsyncStorage.getItem("token");
        const user = await Auth.getUserProfile({
          token: token,
        });
        setPhoneNumber(user.data.medicalInformation.phoneNumber);
      };
      getUserData();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const removeImage = () => {
    setImage(null);
  };
  const checkSymptoms =()=>{
    if(isAccident){
      symptoms.push("Accident")
    }
    if(isBreathlessness){
      symptoms.push("Breathlessness")
    }
    if(isChestPain){
      symptoms.push("Chest pain")
    }
    if(isUnconsciousness){
      symptoms.push("Unconscious")
    }
    if(isWeakness){
      symptoms.push("Physical weaknesses")
    }
  }

  const sendEmergencyCase = async () => {
    try {
      checkSymptoms();
      console.log(image)
      const postEmergency = async () => {
        const token = await AsyncStorage.getItem("token");
        const user = await Auth.postEmergencyCase({
          body: {
            contactNumber: phoneNumber,
            symptoms: symptoms,
            otherInformation: otherInformation,
            acceptanceStatus: "waiting",
            deliveringStatus: "waiting",
            latitude:latitude,
            longitude:longitude,

          },
          token: token,
        });
      };
      postEmergency();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <RequestContainer>
      <RequestTitle>Ambulance request detail</RequestTitle>
      <InputContainer>
        <BlueText>Contact number*</BlueText>
        <GreyInput
          keyboardType="phone-pad"
          onChangeText={setPhoneNumber}
          value={phoneNumber}
          maxLength={10}
        ></GreyInput>
      </InputContainer>
      <InputContainer>
        <BlueText>Attached image (optional)</BlueText>

        {image && (
          <SelectedImageContainer>
            <RemoveButton onPress={removeImage}>
              <Icon
                name="close-outline"
                type="ionicon"
                color={Colors.red}
                size={21}
              />
            </RemoveButton>
            <SelectedImage source={{ uri: image }} />
          </SelectedImageContainer>
        )}
        {!image && (
          <GreyButton onPress={pickImage}>
            <GreyButtonText>Choose photo</GreyButtonText>
          </GreyButton>
        )}
      </InputContainer>

      <InputContainer>
        <BlueText>Type of emergencies (optional)</BlueText>
      </InputContainer>
      <SymptomList>
        <HorizonInput2>
          <SymptomIcon source={require("../../../assets/fender-bender.png")} />
          {isAccident && <BlueText2>Accident</BlueText2>}
          {!isAccident && <GreyText>Accident</GreyText>}
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
          {isChestPain && <BlueText2>Chest pain</BlueText2>}
          {!isChestPain && <GreyText>Chest pain</GreyText>}
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
          {isBreathlessness && <BlueText2>Breathlessness</BlueText2>}
          {!isBreathlessness && <GreyText>Breathlessness</GreyText>}
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
          {isUnconsciousness && <BlueText2>Unconsciousness</BlueText2>}
          {!isUnconsciousness && <GreyText>Unconsciousness</GreyText>}
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
          {isWeakness && <BlueText2>Sudden paralysis/weakness</BlueText2>}
          {!isWeakness && <GreyText>Sudden paralysis/weakness</GreyText>}
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
        <GreyInput
          multiline
          numberOfLines={3}
          onChangeText={setOtherInformation}
          value={otherInformation}
        ></GreyInput>
      </InputContainer>
      <HorizonInput3>
        <BlueBorderButton onPress={() => navigation.goBack()}>
          <BlueButtonText>Cancel</BlueButtonText>
        </BlueBorderButton>
        {/* <BlueButton onPress={() => navigation.navigate("Map")}> */}
        <BlueButton onPress={sendEmergencyCase}>
          <WhiteButtonText>Request</WhiteButtonText>
        </BlueButton>
      </HorizonInput3>
    </RequestContainer>
  );
}
export default RequestScreen;
