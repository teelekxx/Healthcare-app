import {
  Background,
  Block,
  Title,
  Id,
  IdContainer,
  Status,
  Name,
  Medication,
  Space,
  DateFormat,
  BlockContainer,
} from "./index.style";
import { Colors } from "../../constants";
import { View,RefreshControl, ActivityIndicator } from "react-native";
import { useEffect, useState, useCallback } from "react";
import { AsyncStorage } from "react-native"
;
import Auth from "../../api/auth";
import { Icon, Avatar, Accessory } from "react-native-elements";
import { useGetOrders} from "../../hooks/order";
import { LoadingContainer } from "../../components/components/index.style";
function HistoryScreen({ navigation }) {
 
  const [orders, setOrders] = useState([]);
  const [pharmaOrders, setPharmaOrders] = useState([]);
  const [isPharma, setIsPharma] = useState(false);
  const [ambulanceCases, setAmbulanceCases] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const getHistory = async () => {
    setIsloading(true)
    const token = await AsyncStorage.getItem("token");
    const res = await Auth.getCaseAndOrder({
      token: token,
    });

    setAmbulanceCases(res.data.emergencyCases.emergencyCases);
    setOrders(res.data.orders.orders)
    setIsloading(false);
    // console.log(res.data.orders.orders)
  };
  useEffect(() => {
    try {
     
      // get role from user
      const getUserRole = async () => {
        const token = await AsyncStorage.getItem("token");
        const user = await Auth.getUserProfile({
          token: token,
        });
        console.log("pharma: ", user.data.user.role)

        if (user.data.user.role === "pharmacist") {
          console.log("pharma: ")
          setIsPharma(true);
        }
      };
      getUserRole();
      getHistory();
    } catch (error) {
      console.error(error);
    }
  }, [isPharma]);

  const dateFormat = (date) => {
    const mongodbDate = new Date(date);
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
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getHistory().then(() => setRefreshing(false));
    // setTimeout(() => {
    //   setRefreshing(false);
    // }, 2000);
  }, []);


  if (isLoading) { 
    return (<LoadingContainer><ActivityIndicator size="large" color="#00a5cb"/></LoadingContainer>)
  }
  
    

  return (
    <Background refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
      <Title>History</Title>
      {orders && isPharma &&
        orders.map((order, index) => {
          return (
            <BlockContainer
              key={index}
              onPress={() =>
                navigation.navigate("HistoryDetail", {
                  orderId: order.order._id,
                  userName: order.buyerInfo.name,
                  orderDate: order.order.created_at,
                  totalPrice: order.order.total,
                })
              }
            >
            <Block>
            <Name>{order.buyerInfo.name}</Name>
            {/* <DateFormat>Total Price: {order.order.total} Baht</DateFormat> */}
              <DateFormat>Date: {dateFormat(order.order.created_at)}</DateFormat>
              
              <Space></Space>
            </Block>
            <Icon
                name="medkit-outline"
                type="ionicon"
                color={Colors.blue}
                size={30}
              />
            </BlockContainer>
          );
        })}
      {orders && !isPharma &&
        orders.map((order, index) => {
          return (
            <BlockContainer
              key={index}
              onPress={() =>
                navigation.navigate("HistoryDetail", {
                  orderId: order.order._id,
                  userName: order.pharmacistInfo.name,
                  orderDate: order.order.created_at,
                  totalPrice: order.order.total,
                  deliveryFee: order.order.deliveryFee
                })
              }
            >
              <Block>
                <Name>{order.pharmacistInfo.name}</Name>
                {/* <DateFormat>Total Price: {order.order.total} Baht</DateFormat> */}
                <DateFormat>Date: {dateFormat(order.order.created_at)}</DateFormat>
                <Space></Space>
              </Block>
              <Icon
                name="medkit-outline"
                type="ionicon"
                color={Colors.blue}
                size={30}
              />
            </BlockContainer>
          );
        })}
      {ambulanceCases &&
        ambulanceCases.map((order, index) => {
          return (
            <BlockContainer
              key={index}
              onPress={() =>
                navigation.navigate("AmbulanceHistory", {
                  orderId: order._id,
                  assigneeName: order.job.receiverName,
                  orderDate: order.created_at,
                  hospital: order.hospitalName,
                })
              }
            >
            <Block>
            <Name>{order.job.receiverName}</Name>
              <DateFormat>{order.hospitalName}</DateFormat>
              <DateFormat>Date: {dateFormat(order.created_at)}</DateFormat>
              <Space></Space>
            </Block>
            <Icon
                name="medical-outline"
                type="ionicon"
                color={Colors.blue}
                size={30}
              />
              
            </BlockContainer>
          );
        })}
    </Background>
  );
}
export default HistoryScreen;
