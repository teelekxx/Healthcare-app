import React from "react";
import { useState } from "react";
import {
  SafeAreaView,
  Button,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import {
  Title,
  ItalicText,
  Container,
} from "../../components/components/index.style";
import {
  FormInput,
  SmallFormInput,
  BigFormInput,
  BlueContainer,
  SignUpForm,
  FormText,
  PageTitleContainer,
  BlueButton,
  BlueButtonText,
  DateCalendar,
  CircleButton,
  NotificationTouchable,
} from "../../components/components/index.style";
import { Icon } from "react-native-elements";
import { Colors } from "../../constants";
import * as ImagePicker from "expo-image-picker";
import {
  ChatField,
  ChatInputContainer,
  CallButton,
  PageTitle,
  PhoneNumber,
  GreyInput,
  WhiteContainer,
  PictureButton,
  RemoveButton,
  SendButton,
  BlueFooter,
  BlueKeyboard,
  SelectedImage,
  SelectedImagesContainer,
  SelectedImageContainer,
  BubbleContainer,
} from "./index.style";

import ChatBubble from "../../components/ChatBubble/index";
import { async } from "@firebase/util";

function ChatScreen({ navigation, route }) {
  const [image, setImage] = useState(null);
  const [currMessage, setCurrMessage] = useState("");

  const [chatMessages, setChatMessages] = useState([
    { Message: "Hello", TimeStamp: "12:30", Sender: "Others", Image: null },
  ]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const images = result.assets.map((asset) => asset.uri);
      setImage(images);
    }
  };

  const removeImage = (index) => {
    const newImages = [...image]; // Create a new array copy
    newImages.splice(index, 1); // Remove the item at the given index
    setImage(newImages); // Update the state with the new array
  };

  const sendMessage = () => {
    console.log("images =", image);
    if (currMessage.trim() === "" &&  image === null) {
      return;
    } 
    else {
      setChatMessages([
        ...chatMessages,
        {
          Message: currMessage,
          TimeStamp: "12:30",
          Sender: "Me",
          Image: image,
        },
      ]);
      setCurrMessage("");
      setImage(null);
    }
  };
  return (
    <BlueContainer>
      <PageTitleContainer>
        <CircleButton onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-back-outline"
            type="ionicon"
            color={Colors.blue}
            size={20}
          />
        </CircleButton>
        <PageTitle>{route.params.paramKey}</PageTitle>
        {/* <CallButton>
          <Icon
            name="call-outline"
            type="ionicon"
            color={Colors.blue}
            size={21}
          />
          <PhoneNumber>0814637245</PhoneNumber>
        </CallButton> */}
      </PageTitleContainer>
      <ChatField>
        {chatMessages.map((val, index) => {
          return (
            <BubbleContainer key={index}>
              <ChatBubble
                message={val.Message}
                timeStamp={val.TimeStamp}
                sender={val.Sender}
                image={val.Image}
              ></ChatBubble>
            </BubbleContainer>
          );
        })}
      </ChatField>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : "height"}
        style={{ flex: 0 }}
      >
        <BlueFooter>
          {image && (
            <SelectedImagesContainer horizontal={true}>
              {image.map((val, index) => {
                return (
                  <SelectedImageContainer key={index}>
                    <RemoveButton onPress={() => removeImage(index)}>
                      <Icon
                        name="close-outline"
                        type="ionicon"
                        color={Colors.white}
                        size={21}
                      />
                    </RemoveButton>
                    <SelectedImage source={{ uri: val }} />
                  </SelectedImageContainer>
                );
              })}
            </SelectedImagesContainer>
          )}
          <ChatInputContainer>
            <PictureButton onPress={pickImage}>
              <Icon
                name="images-outline"
                type="ionicon"
                color={Colors.white}
                size={21}
              />
            </PictureButton>

            <GreyInput
              value={currMessage}
              onChangeText={(text) => setCurrMessage(text)}
            ></GreyInput>

            <SendButton onPress={sendMessage}>
              <Icon
                name="send-outline"
                type="ionicon"
                color={Colors.white}
                size={21}
              />
            </SendButton>
          </ChatInputContainer>
        </BlueFooter>
      </KeyboardAvoidingView>
    </BlueContainer>
  );
}
export default ChatScreen;
