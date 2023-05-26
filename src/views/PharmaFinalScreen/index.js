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
  HorizonTitle,
  BlueText,
  OrderContainer,
} from "./index.style";
import Auth from "../../api/auth";
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

const { width, height } = Dimensions.get("window");

function PharmaFinalScreen({ navigation, route }) {
  const [image, setImage] = useState(null);
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
            <PageTitle>Order summary</PageTitle>
          </HorizonTitle>
      </PageTitleContainer>
      <WhiteContainer>
      <OrderContainer>
      <BlueText>{route.params.medMessage}</BlueText>
      </OrderContainer>
      
      </WhiteContainer>
      
    </BlueContainer>
  );
}
export default PharmaFinalScreen;
