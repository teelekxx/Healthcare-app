import {
  MedContainer,
  MedColumn,
  MedRow,
  MedText,
  MedTextInput,
  QtyInput,
  PriceInput,
  CircleButton,
  MedScollable,
  MedFirstColumn,
  HorizonInput,
  SaveButton,
  WhiteButtonText,
  CloseButton,
  TotalText,
  MedDesInput,
  MedSuggestion,
  SuggestionText,
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
  BlueButtonText,
  WhiteKeyboard,
  DateCalendar,
} from "../components/index.style";
import React, { useState, useRef, useEffect } from "react";
import { Icon } from "react-native-elements";
import { Colors } from "../../constants";
import {
  SafeAreaView,
  View,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { async } from "@firebase/util";
import Auth from "../../api/auth";
import { AsyncStorage } from "react-native";

export default function AddMedicine({
  handleModalVisible,
  handleSaveMedications,
  index,
}) {
  const [medications, setMedication] = useState("");
  const [medicine, setMedicine] = useState("");
  const [duration, setDuration] = useState("");
  const [dosage, setDosage] = useState("");
  const [deliveryFee, setDeliveryFee] = useState("");
  const [price, setPrice] = useState("");
  const [suggestions, setSuggestions] = useState(["TEE"]);

  const closeModal = () => {
    handleModalVisible();
  };

  const saveAndClose = () => {
    if (medicine.length < 1) {
      handleModalVisible();
      return;
    }
    if (index != null) {
      handleSaveMedications(index, {
        name: medicine,
        duration: duration,
        dosage: dosage,
        price: price,
      });
    } else {
      handleSaveMedications({
        name: medicine,
        duration: duration,
        dosage: dosage,
        price: price,
      });
    }

    handleModalVisible();
  };

  const calculateTotal = () => {
    let totalPrice = 0;
    medications.forEach((medicine) => {
      const { Price } = medicine;
      totalPrice += Price;
    });
    return totalPrice;
  };

  // Function to handle input value change
  const handleInputChange = (text) => {
    setMedicine(text);
    const fetchSuggestions = async (text) => {
      const token = await AsyncStorage.getItem("token");
      const user = await Auth.getMedicinesByKeyword({
        params: { keyword: text },
      });
      if (user.isOk) {
        setSuggestions(user.data);
      }
    };
    fetchSuggestions(text);
    console.log(suggestions);
  };

  // Function to handle suggestion selection
  const handleSuggestionSelect = (suggestion) => {
    setMedicine(suggestion);
    setSuggestions([]); // Clear the suggestions after selection
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <MedContainer>
      <MedScollable>
        <MedColumn>
          <MedText>Medicine</MedText>
          <MedTextInput
            value={medicine}
            onChangeText={handleInputChange}
          ></MedTextInput>
          {suggestions.length > 1 && (
            <MedSuggestion
            data={suggestions}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSuggestionSelect(item)}>
                <SuggestionText>{item}</SuggestionText>
              </TouchableOpacity>
            )}
          />
          )}
          
        </MedColumn>
        <MedColumn>
          <MedText>Duration</MedText>
          <MedTextInput
          multiline={true}
            value={duration}
            onChangeText={(text) => setDuration(text)}
          ></MedTextInput>
        </MedColumn>
        <MedColumn>
          <MedText>Dosage</MedText>
          <MedTextInput
          multiline={true}
            value={dosage}
            onChangeText={(text) => setDosage(text)}
          ></MedTextInput>
        </MedColumn>
        <MedColumn>
          <MedText>Price</MedText>
          <MedTextInput
            keyboardType="numeric"
            maxLength={5}
            value={price}
            onChangeText={(text) => setPrice(text)}
          ></MedTextInput>
        </MedColumn>
      </MedScollable>
      <TotalText>Total: {Number(price)}</TotalText>
      <HorizonInput>
        <CloseButton onPress={closeModal}>
          <WhiteButtonText>Close</WhiteButtonText>
        </CloseButton>
        <SaveButton onPress={saveAndClose}>
          <WhiteButtonText>Confirm</WhiteButtonText>
        </SaveButton>
      </HorizonInput>
    </MedContainer>
    </TouchableWithoutFeedback>
  );
}
