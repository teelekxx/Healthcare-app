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
} from "../../components/components/index.style";
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

export default function Prescription({
  handleModalVisible,
  handleSaveMedications,
}) {
  const [medications, setMedication] = useState([]);
  const [medicine, setMedicine] = useState("");
  const [dosage, setDosage] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");

  const closeModal = () => {
    handleModalVisible();
  };

  const saveAndClose = () => {
    handleSaveMedications(medications, calculateTotal());
    handleModalVisible();
  };

  const addMedicines = () => {
    console.log("ADD MED");
    if (medicine.trim() === "") {
      return;
    } else {
      setMedication([
        ...medications,
        {
          Medicines: medicine,
          Doasge: dosage,
          Duration: duration,
          Price: price,
        },
      ]);
      setMedicine("");
      setDosage("");
      setDuration("");
      setPrice("");
    }
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
        <MedRow>
          <MedFirstColumn>
            <MedText>Medicine</MedText>
            {medications.length > 0 && (
              <View>
                {medications.map((val, index) => {
                  return <MedText>{val.Medicines}</MedText>;
                })}
              </View>
            )}
            <MedTextInput
              value={medicine}
              onChangeText={(text) => setMedicine(text)}
            ></MedTextInput>
          </MedFirstColumn>
          <MedColumn>
            <MedText>Dosage</MedText>
            {medications.length > 0 && (
              <View>
                {medications.map((val, index) => {
                  return <MedText>{val.Doasge}</MedText>;
                })}
              </View>
            )}
            <QtyInput
              keyboardType="numeric"
              maxLength={3}
              value={dosage}
              onChangeText={(text) => setDosage(text)}
            ></QtyInput>
          </MedColumn>
          <MedColumn>
            <MedText>Duration</MedText>
            {medications.length > 0 && (
              <View>
                {medications.map((val, index) => {
                  return <MedText>{val.Duration}</MedText>;
                })}
              </View>
            )}
            <QtyInput
              keyboardType="numeric"
              maxLength={3}
              value={duration}
              onChangeText={(text) => setDuration(text)}
            ></QtyInput>
          </MedColumn>
          <MedColumn>
            <MedText>Price</MedText>
            {medications.length > 0 && (
              <View>
                {medications.map((val, index) => {
                  return <MedText>{val.Price}</MedText>;
                })}
              </View>
            )}
            <PriceInput
              keyboardType="numeric"
              maxLength={5}
              value={price}
              onChangeText={(text) => setPrice(text)}
            ></PriceInput>
          </MedColumn>
        </MedRow>
        <CircleButton onPress={addMedicines}>
          <Icon
            name="medkit-outline"
            type="ionicon"
            color={Colors.blue}
            size={15}
          />
        </CircleButton>
      </MedScollable>
      <TotalText>Total: {calculateTotal()}</TotalText>
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
