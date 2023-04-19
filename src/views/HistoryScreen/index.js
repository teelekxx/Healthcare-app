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
} from "./index.style";
import { Text } from "react-native-elements";
import { View } from "react-native";
import { useEffect, useState } from "react";
import { AsyncStorage } from "react-native";
import Auth from "../../api/auth";
function HistoryScreen({ navigation }) {

  const [orders, setOrders] = useState([]);
  const [pharmaOrders, setPharmaOrders] = useState([])
  const [isPharma, setIsPharma] = useState(false)

  useEffect(() => {
    try {
      // get role from user
      const getUserRole = async () => {

        const token = await AsyncStorage.getItem("token");
        const user = await Auth.getUserProfile({
          token: token,
        });
        if(user.data.user.role==="pharmacist"){
            setIsPharma(true);
        }
        
      };

      //when the user is regular user
      const getOrderData = async () => {
        const token = await AsyncStorage.getItem("token");
        const res = await Auth.getOrders({
          token: token,
        });
        setOrders(res.data.orders);
        console.log("user order: ", res.data.orders)
      };

      //when the user is pharmacist (selling history)
      const getPharmaData = async () =>{
        if(isPharma){
          const token = await AsyncStorage.getItem("token");
          const res = await Auth.pharmaGetOrders({
            token:token,
          });
  
          setPharmaOrders(res.data.orders)
        }
        
      };
      getUserRole();
      console.log("ispharma", isPharma)

        getPharmaData();

        getOrderData();

      
      

      
    } catch (error) {
      console.error(error);
    }
  }, []);
  // const getBuyerName = async (id) => {
  //     const res = await Auth.getUserById({
  //       params: { id : id},
  //     });
  //     if(res.isOk){
  //       console.log("isok:", res.data.medicalInformation.name)
  //       return res.data.medicalInformation.name
  //     }
  //     // return
      
    
  // };

  const dateFormat = (date) => {
    const mongodbDate = new Date(date);
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
    <Background>
      <Title>History</Title>
      {pharmaOrders && pharmaOrders.map((order, index) => {
        return (
          <Block
            key={index}
            onPress={() => navigation.navigate("HistoryDetail", {orderId: order.order._id, userName: order.buyerInfo.name,orderDate: order.order.created_at, totalPrice: order.order.total})}
          >
            <Name>{order.buyerInfo.name}</Name>
            <DateFormat>{dateFormat(order.order.created_at)}</DateFormat>
            <DateFormat>Total Price: {order.order.total} Baht</DateFormat>
            <Space></Space>
          </Block>
        );
      })}
      {orders && orders.map((order, index) => {
        return (
          <Block
            key={index}
            onPress={() => navigation.navigate("HistoryDetail", {orderId: order.order._id, userName: order.pharmacistInfo.name, orderDate: order.order.created_at, totalPrice: order.order.total})}
          >
            <Name>{order.pharmacistInfo.name}</Name>
            <DateFormat>{dateFormat(order.order.created_at)}</DateFormat>
            <DateFormat>Total Price: {order.order.total} Baht</DateFormat>
            <Space></Space>
          </Block>
        );
      })}
    </Background>
  );
}
export default HistoryScreen;
