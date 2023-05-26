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
  ActivityIndicator,
  Linking,
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
  LoadingContainer,
} from "../../components/components/index.style";
import { Icon } from "react-native-elements";
import { Colors } from "../../constants";
import * as ImagePicker from "expo-image-picker";
import {
  ChatField,
  ChatInputContainer,
  CallButton,
  DoneButton,
  PageTitle,
  PhoneNumber,
  GreyInput,
  WhiteContainer,
  PictureButton,
  MedButton,
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
  HorizonTitle,
} from "./index.style";
import Auth from "../../api/auth";
import { AsyncStorage } from "react-native"
;
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
  setDoc,
  updateDoc,
  startAfter,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";

import ChatBubble from "../../components/ChatBubble/index";
import MedicationsBubble from "../../components/MedicationsBubble/index";
// import Prescription from "../../components/Prescription/index";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import { async } from "@firebase/util";
import useImagePicker from "../../hooks/useImagePicker.js";

const { width, height } = Dimensions.get("window");

function ChatScreen({ navigation, route }) {
  const [{ images }, { pickImage, setImages }] = useImagePicker();
  const [currMessage, setCurrMessage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [medications, setMedications] = useState([]);
  const [chatName, setChatName] = useState("");
  const [chatNumber, setChatNumber] = useState("");
  const [total, setTotal] = useState(null);
  const [myUID, setMyUID] = useState("");
  const [otherUID, setOtherUID] = useState("");
  const [isPharma, setIsPharma] = useState(false);
  const [isPara, setIsPara] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [posts, setPosts] = useState([]);
  const [lastKey, setLastKey] = useState("");
  const [nextPosts_loading, setNextPostsLoading] = useState(false);
  const [lastMessage, setLastMessage] = useState([]);
  const [group, setGroup] = useState("");

  const auth = useSelector((state) => state.Authentication);
  const isAuthenticated = auth.isAuthenticated;
  const scrollViewRef = useRef(null);

  const nameFormat = (name) => {
    let newName = name;
    if (name.length > 15) {
      newName = name.slice(0, 15);
      newName += "...";
    }
    return newName;
  };

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
              TimeStamp: doc
                .data()
                .sendAt.toDate()
                .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              Sender: doc.data().sendBy,
              Image: images,
              Seen: doc.data().seen,
              Type: doc.data().type,
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

  const getGroup = async (jobId) => {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, "groups"), where("jobId", "==", jobId))
      );

      if (querySnapshot.empty) {
        console.log("No group found with the specified jobId");
        return null;
      } else {
        const docSnapshot = querySnapshot.docs[0];
        return docSnapshot;
      }
    } catch (error) {
      console.error("Error getting group:", error);
      return null;
    }
  };

  const getChatter = async (myUID) => {
    const group = await getGroup(route.params.groupID);
    const otherUID = group.data().member.filter((jobID) => jobID !== myUID);
    setOtherUID(otherUID);
    setGroup(group);
    const token = await AsyncStorage.getItem("token");
    const user = await Auth.getUserByUID({
      params: { uid: otherUID },
    });
    if (user.isOk) {
      setIsLoading(false);
      return user;
    }
  };
  const fetchData = async (myUID) => {
    const data = await getChatter(myUID);
    setChatNumber(data.data.medicalInformation.phoneNumber);
    setChatName(data.data.medicalInformation.name);
  };

  // const pickImage = async () => {
  //   // No permissions request is necessary for launching the image library
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsMultipleSelection: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   if (!result.canceled) {
  //     const images = result.assets.map((asset) => asset.uri);
  //     setImage(images);
  //   }
  // };

  const removeImage = (index) => {
    const newImages = [...images]; // Create a new array copy
    newImages.splice(index, 1); // Remove the item at the given index
    setImages(newImages); // Update the state with the new array
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

  const updateLastMessage = async (value) => {
    try {
      const docRef = doc(db, "groups", group.id);
      await updateDoc(docRef, { lastMsg: value });
    } catch (error) {
      console.error("Error updating documents:", error);
    }
  };

  // postsFirstBatch();
  const sendMessage = async () => {
    if (images.length > 0){
      const formData = new FormData();
      images.map((image) => {
        formData.append("images", image);
      });
      const postImages = async () => {
        const token = await AsyncStorage.getItem("token");
        const user = await Auth.postChatImages({
          body: formData,
          token: token,
        });
        if (user.isOk) {
          console.log("IMG:", user.attachedImagesPath);
          user.attachedImagesPath.forEach((imagePath) => {
            Chat.sendMessage({
            uid: route.params.myUID,
            groupId: route.params.groupID,
            message: imagePath,
            type: "image",
          });

          });
          
          setImages([]);
        } 
        else{
          console.log("ERROR");
        }
      };
      await postImages();
    }
    if (currMessage != "") {
      let tempMessage = "";
    let tempLastMessage = "";

    tempMessage = {
      uid: route.params.myUID,
      groupId: route.params.groupID,
      message: currMessage,
      type: "message",
    };
    tempLastMessage = {
      sendBy: route.params.myUID,
      message: currMessage,
      sendAt: new Date(),
    };

      const token = await AsyncStorage.getItem("token");
      await Chat.sendMessage(tempMessage);
      updateLastMessage(tempLastMessage);
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
      scrollViewRef.current.scrollToOffset({ offset: 0 });
    }
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleDonePress = () => {
    console.log("Done (Place holder)");
    navigation.goBack();
  };

  const handleDialPress = (phoneNumber) => {
    if (phoneNumber != "") {
      const telUrl = `tel:${phoneNumber}`;
      Linking.openURL(telUrl).catch(() => {
        console.log("Failed to dial the number");
      });
    }
  };

  const handleMedications = async (value, fee) => {
    const q = query(
      collection(db, "messages", route.params.groupID, "messages"),
      where("type", "==", "prescription")
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });
    if (value.length > 0) {
      let orderId = "";
      console.log("VALUE =", value);
      const token = await AsyncStorage.getItem("token");
      const user = await Auth.postOrder({
        body: {
          userUid: otherUID[0],
          jobId: group.data().jobId,
          medicines: value,
          deliveryFee: fee,
          status: "pending",
        },

        token: token,
      });
      if (user.isOk) {
        await Chat.sendMessage({
          uid: route.params.myUID,
          groupId: route.params.groupID,
          message: user.data.order._id,
          type: "prescription",
        });
        // console.log("response = ", user);
      } else if (!user.isOk) {
        console.log("response = ", user);
      }

      // console.log("Prescriptions deleted successfully");
    }
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
      } else if (user.data.user.role === "paramedics") {
        setIsPara(true);
      }
    };

    getUserRole();

    const q = query(
      collection(db, "messages", route.params.groupID, "messages"),
      orderBy("sendAt", "desc"),
      limit(10)
    );

    const unsub = onSnapshot(q, (querySnapshot) => {
      updateDocuments();
      let tempKey = "";
      let temp = [];
      let tempMessage = {};
      querySnapshot.docs.forEach((change) => {
        tempMessage = {
          Message: change.data().message,
          TimeStamp: change
            .data()
            .sendAt.toDate()
            .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          Sender: change.data().sendBy,
          Image: images,
          Seen: change.data().seen,
          Type: change.data().type,
        };
        temp.push(tempMessage);
        tempKey = change;
      });
      setChatMessages(temp);
      setLastKey(tempKey);
    });

    const updateDocuments = async () => {
      try {
        if (myUID) {
          const querySnapshot = await getDocs(
            query(
              collection(db, "messages", route.params.groupID, "messages"),
              where("sendBy", "!=", myUID)
            )
          );
          querySnapshot.forEach(async (doc) => {
            await updateDoc(doc.ref, { seen: true });
          });
        }
      } catch (error) {
        console.error("Error updating documents:", error);
      }
    };

    updateDocuments(); //
  }, [myUID, isPharma, isPara]);

  // if (isLoading) {
  //   return (<LoadingContainer><ActivityIndicator size="large" color="#00a5cb"/></LoadingContainer>)
  // }

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

        <HorizonTitle>
          <PageTitle>{nameFormat(route.params.chatName)}</PageTitle>
          {isPara && (
            <DoneButton onPress={handleDonePress}>
              <Icon
                name="checkmark-done-outline"
                type="ionicon"
                color={Colors.white}
                size={21}
              />
            </DoneButton>
          )}
          <CallButton onPress={() => handleDialPress(chatNumber)}>
            <Icon
              name="call-outline"
              type="ionicon"
              color={Colors.blue}
              size={21}
            />
            {/* <PhoneNumber>Call</PhoneNumber> */}
          </CallButton>
        </HorizonTitle>
      </PageTitleContainer>
      <ChatField
        data={chatMessages}
        keyExtractor={(item, index) => index.toString()}
        inverted={true}
        ref={(ref) => {
          scrollViewRef.current = ref;
        }}
        onEndReached={getMoreMessages}
        renderItem={({ item }) => (
          <BubbleContainer>
            <ChatBubble
              chatName={chatName}
              navigation={navigation}
              message={item.Message}
              timeStamp={item.TimeStamp}
              sender={item.Sender}
              image={item.Image}
              seen={item.Seen}
              type={item.Type}
              myUID={myUID}
            />
          </BubbleContainer>
        )}
      />

      <BlueKeyboard
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 0 }}
      >
        {images && (
          <SelectedImagesContainer horizontal={true}>
            {images.map((val, index) => {
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
                  <SelectedImage source={{ uri: val.uri }} />
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
              size={30}
            />
          </PictureButton>
          {isPharma && (
            <MedButton
              onPress={() =>
                navigation.navigate("Prescription", {
                  medication: medications,
                  updateData: handleMedications,
                })
              }
            >
              <Icon
                name="medkit-outline"
                type="ionicon"
                color={Colors.white}
                size={30}
              />
            </MedButton>
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
              size={30}
            />
          </SendButton>
        </ChatInputContainer>
      </BlueKeyboard>
    </BlueContainer>
  );
}
export default ChatScreen;
