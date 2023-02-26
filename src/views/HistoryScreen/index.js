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
} from "./index.style";
import { Text } from "react-native-elements";
import { View } from "react-native";
function HistoryScreen({ navigation }) {
  const orders = [
    {
      id: "000001",
      status: "in progress",
      name: "Pharm. D. Tee Lek",
      medication: [
        { medName: "Para", num: 5 },
        { medName: "Para", num: 5 },
      ],
    },
    {
      id: "000002",
      status: "completed",
      name: "Pharm. D. Jojo Sung",
      medication: [
        { medName: "Para", num: 5 },
        { medName: "Tylenol", num: 5 },
      ],
    },
    {
      id: "000003",
      status: "in progress",
      name: "Pharm. D. Esu Esu",
      medication: [
        { medName: "Ponstan", num: 5 },
        { medName: "Para", num: 5 },
      ],
    },
    {
      id: "000004",
      status: "in progress",
      name: "Pharm. D. Mine Jung",
      medication: [
        { medName: "Para", num: 5 },
        { medName: "Para", num: 5 },
        { medName: "Para", num: 5 },
      ],
    },
  ];
  return (
    <Background>
      <Title>History</Title>
      {orders.map((order, index) => {
        return (
          <Block key={index}>
            <IdContainer>
              <Id>ID: {order.id}</Id>
              <Status>{order.status}</Status>
            </IdContainer>
            <Name>{order.name}</Name>
            {order.medication.map((med, index)=>{
                return(
                    <View key={index}><Medication>{med.medName} x {med.num}</Medication></View>
                );
            })}
            <Space></Space>
          </Block>
        );
      })}
    </Background>
  );
}
export default HistoryScreen;
