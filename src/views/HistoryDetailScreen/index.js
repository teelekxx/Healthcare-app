import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  BlueContainer,
  PageTitleContainer,
  PageTitle,
  CircleButton,
  SignUpForm,
} from "../../components/components/index.style";
import { useState, useEffect } from "react";
import { Icon } from "react-native-elements";
import { Colors } from "../../constants";
import { Container, Row, Cell, CellHeader, BigCell, PharName, Text20, BigCellHeader } from "./index.style";
import { AsyncStorage } from "react-native"
;
import Auth from "../../api/auth";
const HistoryDetailScreen = ({navigation, route}) => {
  const {orderId, userName, orderDate, totalPrice, deliveryFee} = route.params
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    try {
      const getOrderData = async () => {
        // const token = await AsyncStorage.getItem("token");
        console.log("orderid:",orderId)
        const res = await Auth.getOrderDetail({
          params: { id : orderId},
        });
        console.log("result: ",res.data)
        setOrders(res.data.medicines);
        // const mongoDate = res.data.created_at
        // setDate(mongoDate.toLocaleString())
      };
      getOrderData();

    } catch (error) {
      console.error(error);
    }
  }, []);
  // const totalPrice = meds.reduce((sum, med) => {
  //   return sum + med.price;
  // }, 0);
  const dateFormat = (date) => {
    console.log("order date: ",orderDate)
    const mongodbDate = new Date(orderDate);
    // Extract year, month, and day from the MongoDB date
    const year = mongodbDate.getFullYear();
    const month = mongodbDate.getMonth() + 1; // Add 1 to get 1-based month index
    const day = mongodbDate.getDate();

    // Concatenate year, month, and day to form a custom date string
    const dateString = `${
      day < 10 ? "0" + day : day
    }-${month < 10 ? "0" + month : month}-${year}`;
    return dateString;
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
        <PageTitle>Order details</PageTitle>
      </PageTitleContainer>
      <SignUpForm vertical={true}>
      <PharName>{userName}</PharName>
      <Text20>Date: {dateFormat(orderDate)}</Text20>
        <Container>
          <Row>
            <CellHeader>Name</CellHeader>
            <BigCellHeader>Dosage</BigCellHeader>
            <CellHeader>Duration</CellHeader>
            <CellHeader>Price</CellHeader>
          </Row>
          {orders.map((med, index) => (
            <Row key={index}>
              <Cell>{med.name}</Cell>
              <BigCell>{med.dosage}</BigCell>
              <Cell>{med.duration}</Cell>
              <Cell>{med.price}</Cell>
            </Row>
          ))}
          <Row>
            <Cell>Delivery fee: {deliveryFee}</Cell>
          </Row>
        </Container>
        <Text20>Total Price: {totalPrice}</Text20>
      </SignUpForm>
    </BlueContainer>
  );
};

export default HistoryDetailScreen;
