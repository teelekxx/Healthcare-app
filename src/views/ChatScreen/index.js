import React from "react";
import { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  Button,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
  FlatList,
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
  Wrapper,
} from "./index.style";
import Auth from "../../api/auth";
import { AsyncStorage, Alert } from "react-native";
import Chat from "../../firestore/chat";
import {
  collection,
  query,
  where,
  doc,
  onSnapshot,
  orderBy,
  limitToLast,
  limit,
  getDocs,
  updateDoc,
  startAfter,
} from "firebase/firestore";
import { db } from "../../lib/firebase";

import ChatBubble from "../../components/ChatBubble/index";
import MedicationsBubble from "../../components/MedicationsBubble/index";
import Prescription from "../../components/Prescription/index";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import { async } from "@firebase/util";

const { width, height } = Dimensions.get("window");

function ChatScreen({ navigation, route }) {
  const [image, setImage] = useState(null);
  const [currMessage, setCurrMessage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [medications, setMedications] = useState([]);
  const [chatName, setChatName] = useState("");
  const [total, setTotal] = useState(null);
  const [myUID, setMyUID] = useState("");
  const [otherUID, setOtherUID] = useState("");
  const [isPharma, setIsPharma] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { Message: "Hello", TimeStamp: "12:30", Sender: "Others", Image: null },
  ]);
  const [posts, setPosts] = useState([]);
  const [lastKey, setLastKey] = useState("");
  const [nextPosts_loading, setNextPostsLoading] = useState(false);

  const auth = useSelector((state) => state.Authentication);
  const isAuthenticated = auth.isAuthenticated;
  const scrollViewRef = useRef(null);

  const getMoreMessages = async () => {
    try {
      const queryRef = query(
        collection(db, "messages", route.params.groupID, "messages"),
        orderBy("sendAt", "desc"),
        startAfter(lastKey),
        limit(5)
      );
      let tempKey = "CHANGE ME!";
      let newMessages = chatMessages;
      getDocs(queryRef)
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            newMessages.push({
              Message: doc.data().message,
              TimeStamp: doc.data().sendAt.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              Sender: doc.data().sendBy,
              Image: image,
              Seen: doc.data().seen
            });
            setLastKey(doc);
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
      setChatMessages(newMessages);
      // setLastKey(tempKey);
    } catch (e) {
      console.log(e);
    }
  };

  const getChatter = async (myUID) => {
    const otherUID = route.params.chat.member.filter(
      (jobID) => jobID !== myUID
    );
    const token = await AsyncStorage.getItem("token");
    const user = await Auth.getUserByUID({
      params: { uid: otherUID },
    });
    if (user.isOk) {
      return user;
    }
  };
  const fetchData = async (myUID) => {
    const data = await getChatter(myUID);
    setChatName(data.data.medicalInformation.name);
  };

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

  const sendInitialMessage = async () => {
    const sendInitMessage = async () => {
      const token = await AsyncStorage.getItem("token");
      const user = await Auth.postChatMessage({
        body: {
          groupId: route.params.groupID,
          message: "Hellonearh",
          sendBy: route.params.myUID,
          seen: false,
          type: "message",
        },
        token: token,
      });
      if (user.isOk) {
        console.log("response = ", user);
      }
    };
    await sendInitMessage();
  };

  const sendMessage = async () => {
    console.log("SEND!");
    const token = await AsyncStorage.getItem("token");
    await Chat.sendMessage({
      uid: route.params.myUID,
      groupId: route.params.groupID,
      message: currMessage,
    });
    // const user = await Auth.postChatMessage({
    //   body: {
    //     groupId: route.params.groupID,
    //     message: currMessage,
    //     sendBy: route.params.myUID,
    //     seen: false,
    //     type: "message",
    //   },
    //   token: token,
    // });
    // if (user.isOk) {
    //   console.log("response = ", user);
    // }
    setCurrMessage("");
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleMedications = (value) => {
    setMedications(value);
    console.log("MED =", value);
  };

  useEffect(() => {
    fetchData(route.params.myUID);
    if (auth.user) {
      setMyUID(auth.user.uid);
    }

    const getUserRole = async () => {
      const token = await AsyncStorage.getItem("token");
      const user = await Auth.getUserProfile({
        token: token,
      });
      if (user.data.user.role === "pharmacist") {
        setIsPharma(true);
      }
    };
    getUserRole();

    // postsFirstBatch();

    const q = query(
      collection(db, "messages", route.params.groupID, "messages"),
      orderBy("sendAt", "desc"),
      limit(10)
    );

    const unsub = onSnapshot(q, (querySnapshot) => {
      let tempKey = "";
      let tempUID = "";
      let temp = [];
      querySnapshot.docs.forEach((change) => {
        temp.push({
          Message: change.data().message,
          TimeStamp: change.data().sendAt.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          Sender: change.data().sendBy,
          Image: image,
          Seen: change.data().seen
        });
        tempKey = change;
        if(change.data().sendBy !== myUID){
          tempUID = change.data().sendBy
        }
      });
      setOtherUID(tempUID);
      setChatMessages(temp);
      setLastKey(tempKey);
    });

    const updateDocuments = async () => {
      try {
        const querySnapshot = await getDocs(query(
          collection(db, "messages", route.params.groupID, "messages"),
           where('sendBy', '==', otherUID)
        ));
        querySnapshot.forEach(async (doc) => {
          await updateDoc(doc.ref, { seen: true });
        });
      } catch (error) {
        console.error('Error updating documents:', error);
      }
    };

    updateDocuments(); //
  }, [myUID, isPharma]);

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
        <PageTitle>{chatName}</PageTitle>
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
      <Wrapper
        behavior={Platform.OS === "ios" ? "position" : "height"}
        style={{ flex: 1 }}
      >
        <ChatField
          data={chatMessages}
          keyExtractor={(item, index) => index.toString()}
          inverted={true}
          onEndReached={getMoreMessages}
          renderItem={({ item }) => (
            <BubbleContainer>
              <ChatBubble
                message={item.Message}
                timeStamp={item.TimeStamp}
                sender={item.Sender}
                image={item.Image}
                seen={item.Seen}
                myUID={myUID}
              />
            </BubbleContainer>
          )}
        />
      </Wrapper>
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
            {isPharma && (
              <PictureButton onPress={toggleModal}>
              <Icon
                name="medkit-outline"
                type="ionicon"
                color={Colors.white}
                size={21}
              />
            </PictureButton>
          )}
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
