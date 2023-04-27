import React from "react";
import { useState, useEffect } from "react";
import {
  SafeAreaView,
  Button,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
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
  Footer,
  BlueContainer,
  ChatView,
  AddMedicationButton,
  ModalBackground,
} from "./index.style";
import Auth from "../../api/auth";
import { AsyncStorage, Alert } from "react-native";
import { collection, query, where, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../lib/firebase";

import ChatBubble from "../../components/ChatBubble/index";
import MedicationsBubble from "../../components/MedicationsBubble/index";
import Prescription from "../../components/Prescription/index";
import Modal from "react-native-modal";
import { async } from "@firebase/util";

const { width, height } = Dimensions.get("window");

function ChatScreen({ navigation, route }) {
  const [image, setImage] = useState(null);
  const [currMessage, setCurrMessage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [medications, setMedications] = useState([]);

  const [total, setTotal] = useState(null);

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

  const addMessage = (message, image) => {
    setChatMessages([
      ...chatMessages,
      {
        Message: message,
        TimeStamp: new Date().toTimeString().slice(0, 5),
        Sender: "Me",
        Image: image,
      },
    ]);
  };

  const sendMessage = () => {
    console.log("images =", image);
    if (currMessage.trim() === "" && image === null) {
      return;
    } else {
      setChatMessages([
        ...chatMessages,
        {
          Message: currMessage,
          TimeStamp: new Date().toTimeString().slice(0, 5),
          Sender: "Me",
          Image: image,
        },
      ]);
      setCurrMessage("");
      setImage(null);
    }
  };

  // const sendInitialMessage = async () => {
  //   const sendMessage = async () => {
  //     const token = await AsyncStorage.getItem("token");
  //     const user = await Auth.postChatMessage({
  //       body: {
  //         groupId: route.params.groupID,
  //         message: "TESTTEE2",
  //         sendBy: route.params.myUID,
  //         seen: false,
  //       },
  //       token: token,
  //     });
  //     if (user.isOk) {
  //       console.log("response = ", user);
  //     }
  //   };
  //   await sendMessage();
  // };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleMedications = (value) => {
    setMedications(value);
    console.log("MED =", value);
  };

  useEffect(() => {
    const getMyUID = async () => {
      const token = await AsyncStorage.getItem("token");
      const user = await Auth.getUserByToken({
        token: token,
      });
      if (user.isOk) {
        console.log(user);
      }
    };
    // sendInitialMessage();
    // getMyUID();
    // if (myUID != null) {
    //   const q = query(
    //     collection(db, "groups"),
    //     where("member", "array-contains", myUID)
    //   );
    //   const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //     const jobs = [];
    //     querySnapshot.forEach((doc) => {
    //       console.log("DATA =", doc.data());
    //       jobs.push(doc.data());
    //     });
    //     console.log("CHATS =", jobs);
    //     setMyChats(jobs);
    //   });
    // }

    console.log("GROUP =");
    const unsub = onSnapshot(
      collection(db, "messages", route.params.groupID, "messages"),
      (querySnapshot) => {
        let temp = [];
        querySnapshot.docs.forEach((change) => {
          console.log("New message: ", change.data());
          temp.push({
            Message: change.data().message,
            TimeStamp: new Date().toTimeString().slice(0, 5),
            Sender: "Me",
            Image: image,
          });
        });
        console.log("TEMP=", temp);
        setChatMessages(temp);
      }
    );
  }, []);

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
        <PageTitle>{route.params.groupID}</PageTitle>
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
      <ChatField contentContainerStyle={{ minHeight: "2%" }}>
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
        {medications.length > 0 && (
          <BubbleContainer>
            <MedicationsBubble medications={medications}></MedicationsBubble>
          </BubbleContainer>
        )}
      </ChatField>

      <BlueKeyboard
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
            <PictureButton onPress={toggleModal}>
              <Icon
                name="medkit-outline"
                type="ionicon"
                color={Colors.white}
                size={21}
              />
            </PictureButton>
            <GreyInput
              multiline={true}
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
          <Modal
            visible={isModalVisible}
            animationType="fade"
            backdropOpacity={0.5}
          >
            <SafeAreaView>
              <Prescription
                handleModalVisible={toggleModal}
                handleSaveMedications={handleMedications}
              />
            </SafeAreaView>
          </Modal>
        </BlueFooter>
      </BlueKeyboard>
    </BlueContainer>
  );
}
export default ChatScreen;
