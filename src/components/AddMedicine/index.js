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
} from "react-native";

export default function AddMedicine({
  handleModalVisible,
  handleSaveMedications,
  index
}) {
  const [medications, setMedication] = useState("");
  const [medicine, setMedicine] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const closeModal = () => {
    handleModalVisible();
  };

  const saveAndClose = () => {
    if(index != null){    handleSaveMedications(index, 
      {
        Medicines: medicine,
        Description: description,
        Price: price,
      },
    );
  }
  else{
    handleSaveMedications(
      {
        Medicines: medicine,
        Description: description,
        Price: price,
      },
    );
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

  return (
    <MedContainer>
      <MedScollable>
          <MedColumn>
            <MedText>Medicine</MedText>
            <MedTextInput
              value={medicine}
              onChangeText={(text) => setMedicine(text)}
            ></MedTextInput>
          </MedColumn>
          <MedColumn>
          <MedText>Description</MedText>
            <MedDesInput 
            multiline={true}
            value={description} 
            onChangeText={(text) => setDescription(text)}>
            </MedDesInput>
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
      <TotalText>Total: {price}</TotalText>
      <HorizonInput>
        <CloseButton onPress={closeModal}>
          <WhiteButtonText>Close</WhiteButtonText>
        </CloseButton>
        <SaveButton onPress={saveAndClose}>
          <WhiteButtonText>Confirm</WhiteButtonText>
        </SaveButton>
      </HorizonInput>
    </MedContainer>
  );
}
