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
  // const orders = [
  //   {
  //     id: "000001",
  //     status: "in progress",
  //     name: "Pharm. D. Tee Lek",
  //     medication: [
  //       { medName: "Para", num: 5 },
  //       { medName: "Para", num: 5 },
  //     ],
  //   },
  //   {
  //     id: "000002",
  //     status: "completed",
  //     name: "Pharm. D. Jojo Sung",
  //     medication: [
  //       { medName: "Para", num: 5 },
  //       { medName: "Tylenol", num: 5 },
  //     ],
  //   },
  //   {
  //     id: "000003",
  //     status: "in progress",
  //     name: "Pharm. D. Esu Esu",
  //     medication: [
  //       { medName: "Ponstan", num: 5 },
  //       { medName: "Para", num: 5 },
  //     ],
  //   },
  //   {
  //     id: "000004",
  //     status: "in progress",
  //     name: "Pharm. D. Mine Jung",
  //     medication: [
  //       { medName: "Para", num: 5 },
  //       { medName: "Para", num: 5 },
  //       { medName: "Para", num: 5 },
  //     ],
  //   },

  // ];

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    try {
      const getOrderData = async () => {
        const token = await AsyncStorage.getItem("token");
        const res = await Auth.getOrders({
          token: token,
        });
        setOrders(res.data);
        console.log(res.data);
        console.log("orders: ", orders[0].pharmacistMedicalInformation.name);
        // const mongoDate = res.data.created_at
        // setDate(mongoDate.toLocaleString())
      };
      getOrderData();
    } catch (error) {
      console.error(error);
    }
  }, []);
  const dateFormat = (date) => {
    const mongodbDate = new Date("2022-03-15T08:30:45.123Z");
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
      {orders.map((order, index) => {
        return (
          <Block
            key={index}
            onPress={() => navigation.navigate("HistoryDetail")}
          >
            {/* <IdContainer>
              <Id>ID: {order.id}</Id>
              <Status>{order.status}</Status>
            </IdContainer> */}
            <Name>{order.pharmacistMedicalInformation.name}</Name>
            <DateFormat>{dateFormat(order.created_at)}</DateFormat>
            <DateFormat>Total Price: {order.total} Baht</DateFormat>
            {/* {order.medicines.map((med, index) => {
              return (
                <View key={index}>
                  <Medication>{med.name}</Medication>
                </View>
              );
            })} */}
            <Space></Space>
          </Block>
        );
      })}
    </Background>
  );
}
export default HistoryScreen;
