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
  const [duration, setDuration] = useState("");
  const [dosage, setDosage] = useState("");
  const [deliveryFee, setDeliveryFee] = useState("");
  const [price, setPrice] = useState("");

  const closeModal = () => {
    handleModalVisible();
  };

  const saveAndClose = () => {
    if(medicine.length < 1){
      handleModalVisible();
      return;
    }
    if(index != null){    
      handleSaveMedications(index, 
      {
        name: medicine,
        duration: duration,
        dosage: dosage,
        deliveryFee: deliveryFee,
        price: price,
      },
    );
  }
  else{
    handleSaveMedications(
      {
        name: medicine,
        duration: duration,
        dosage: dosage,
        deliveryFee: deliveryFee,
        price: price,
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
            <MedText>Duration</MedText>
            <MedTextInput
              value={duration}
              onChangeText={(text) => setDuration(text)}
            ></MedTextInput>
          </MedColumn>
          <MedColumn>
            <MedText>Dosage</MedText>
            <MedTextInput
              value={dosage}
              onChangeText={(text) => setDosage(text)}
            ></MedTextInput>
          </MedColumn>
          <MedColumn>
            <MedText>Delivery Fee</MedText>
            <MedTextInput
            keyboardType="numeric"
              maxLength={5}
              value={deliveryFee}
              onChangeText={(text) => setDeliveryFee(text)}
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
      <TotalText>Total: {Number(price) + Number(deliveryFee)}</TotalText>
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
