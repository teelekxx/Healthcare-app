import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
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
import {
  Container,
  Row,
  Cell,
  CellHeader,
  Space,
  PharName,
  Text20,
  BigCellHeader,
  SelectedImage,
  SelectedImageContainer,
  SelectedImagesContainer,
  Text
} from "./index.style";
import { AsyncStorage } from "react-native";
import Auth from "../../api/auth";
const AmbulanceHistoryScreen = ({ navigation, route }) => {
  const { orderId, assigneeName, orderDate, hospital } = route.params;
  const [orders, setOrders] = useState([]);
  const [data, setData] = useState(null);
  const [image, setImage] = useState("");
  let symptoms = [];
  let imageTemp = []
  useEffect(() => {
    try {
      const getEmergencyData = async () => {
        const res = await Auth.getEmergencyCaseById({
          params: { id: orderId },
        });
        if (res.isOk) {
          console.log("result: ", res.data);
          setOrders(res.data);
          for (let i = 0; i < res.data.symptoms.length; i++) {
            symptoms.push(res.data.symptoms[i]);
          }
          for (let i = 0; i < res.data.attachedImages.length; i++) {
            imageTemp.push(res.data.attachedImages[i]);
          }
          console.log("imagetemp: ", imageTemp)
          setImage(imageTemp)
          
          setData(symptoms)

        }
      };
      getEmergencyData();
    } catch (error) {
      console.error(error);
    }
  }, []);
  // const totalPrice = meds.reduce((sum, med) => {
  //   return sum + med.price;
  // }, 0);
  const dateFormat = (date) => {
    console.log("image: ", image)
    console.log("order date: ", orderDate);
    const mongodbDate = new Date(orderDate);
    // Extract year, month, and day from the MongoDB date
    const year = mongodbDate.getFullYear();
    const month = mongodbDate.getMonth() + 1; // Add 1 to get 1-based month index
    const day = mongodbDate.getDate();

    // Concatenate year, month, and day to form a custom date string
    const dateString = `${day < 10 ? "0" + day : day}-${
      month < 10 ? "0" + month : month
    }-${year}`;
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
      <SignUpForm vertical={true} keyboardDismissMode="on-drag">
        <PharName>{hospital}: {assigneeName}</PharName>
        <Text20>Date: {dateFormat(orderDate)}</Text20>
          <Row>
            <CellHeader>Symptoms</CellHeader>
          </Row>        
          {data && data.map((name) => (            
              <Text key = {name}>{name}</Text>           
          ))}
          <Space></Space>
          <Row>
            <CellHeader>Other Information</CellHeader>
          </Row>
          <Text>{orders.otherInformation}</Text>
          <Space></Space>
          <Row>
            <CellHeader>Attached Image</CellHeader>
          </Row>
          {image && (
          <SelectedImagesContainer horizontal={true}>
            {image.map((val, index) => {
              if(val){
                console.log("image shown:",val)
                let url = "https://healthcare-finalproject.s3.ap-southeast-1.amazonaws.com/" + val;
                console.log("url: ", url)
                return (
                <SelectedImageContainer key={index}>
                  <SelectedImage source={{ uri: url }}>
                  </SelectedImage>
                </SelectedImageContainer>
              );
              }    
            })}
          </SelectedImagesContainer>
        )}

      </SignUpForm>
    </BlueContainer>
  );
};

export default AmbulanceHistoryScreen;
