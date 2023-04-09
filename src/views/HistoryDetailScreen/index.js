import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  BlueContainer,
  PageTitleContainer,
  PageTitle,
  CircleButton,
  SignUpForm,
} from "../../components/components/index.style";
import { Icon } from "react-native-elements";
import { Colors } from "../../constants";
import { Container, Row, Cell, CellHeader, BigCell } from "./index.style";
const HistoryDetailScreen = () => {
  const meds = [
    {
      name: "Tylenol",
      dosage: "1 Morning, 1 Night (before food)",
      duration: "10 days",
      price: 500
    },
    {
      name: "Differin",
      dosage: "1 Morning(after food)",
      duration: "5 days",
      price: 50
    },
    {
      name: "Tylenol",
      dosage: "1 Morning, 1 Night (before food)",
      duration: "10 days",
      price: 500
    },
    {
      name: "Tylenol",
      dosage: "1 Morning, 1 Night (before food)",
      duration: "10 days",
      price: 500
    },
  ];
  const totalPrice = meds.reduce((sum, med) => {
    return sum + med.price;
  }, 0);
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
        <PageTitle>Order details</PageTitle>
      </PageTitleContainer>
      <SignUpForm vertical={true} keyboardDismissMode="on-drag">
        <Container>
          <Row>
            <CellHeader>Name</CellHeader>
            <CellHeader>Dosage</CellHeader>
            <CellHeader>Duration</CellHeader>
            <CellHeader>Price</CellHeader>
          </Row>
          {meds.map((med, index) => (
            <Row key={index}>
              <Cell>{med.name}</Cell>
              <BigCell>{med.dosage}</BigCell>
              <Cell>{med.duration}</Cell>
              <Cell>{med.price}</Cell>
            </Row>
          ))}
        </Container>
        <Text>Total Price: {totalPrice}</Text>
      </SignUpForm>
    </BlueContainer>
  );
};

export default HistoryDetailScreen;
