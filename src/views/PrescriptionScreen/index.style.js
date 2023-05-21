import styled from "styled-components/native";
import { Colors } from "../../constants";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const titleMargin = Platform.OS === "ios" ? 0 : 50;

export const MedContainer = styled.SafeAreaView`
  display: flex;
  height: 100%;
  // margin-top: ${height * 0.25}px;
  background-color: ${Colors.blue};
  border-radius: 20px;
`;

export const PreContainer = styled.SafeAreaView`
  height: 100% ;
  background-color: ${Colors.blue};
`;

export const MedScollable = styled.ScrollView`
  height: 100%;
`;

export const MedRow = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
`;

export const MedColumn = styled.View`
  margin-right: 10px;
`;

export const MedFirstColumn = styled.View`
  margin-right: 10px;
  margin-left: 10px;
`;

export const MedText = styled.Text`
  color: ${Colors.white};

  font-size: 15px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const MedTextInput = styled.TextInput`
  font-size: 15px;
  background-color: ${Colors.white};
  border-radius: 10px;
  width: ${width * 0.25}px;
  padding: 5px;
`;

export const QtyInput = styled.TextInput`
  font-size: 15px;
  background-color: ${Colors.white};
  border-radius: 10px;
  width: ${width * 0.1}px;
  padding: 5px;
`;

export const PriceInput = styled.TextInput`
  font-size: 15px;
  background-color: ${Colors.white};
  border-radius: 10px;
  width: ${width * 0.15}px;
  padding: 5px;
`;

export const CircleButton = styled.TouchableOpacity`
  margin-top: 10px;
  width: 35px;
  height: 35px;
  elevation: 10;
  background-color: ${Colors.white};
  border-radius: 100px;
  margin-left: auto;
  margin-right: 20px;
  padding: 8px;
`;

export const AddMedicineButton = styled.TouchableOpacity`
  margin-top: 50px;
  margin-bottom:auto ;
  width: 35px;
  height: 35px;
  elevation: 10;
  background-color: ${Colors.white};
  border-radius: 100px;
  align-self: center;
  justify-content: center;
  padding: 8px;
`;

export const Wrapper = styled.SafeAreaView`
max-height: ${height * 0.6}px;
`;


export const HorizonInput = styled.View`
  display: flex;
  flex-direction: row;
  padding: 20px;
`;

export const SaveButton = styled.TouchableOpacity`
  font-size: 15px;
  background-color: ${Colors.teal};
  border-radius: 20px;
  padding-left: 10px;
  padding-right: 10px;
  width: ${width * 0.38025}px;
  height: ${height * 0.05924}px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
`;

export const CloseButton = styled.TouchableOpacity`
  font-size: 15px;
  background-color: ${Colors.grey};
  border-radius: 20px;
  padding-left: 10px;
  padding-right: 10px;
  width: ${width * 0.38025}px;
  height: ${height * 0.05924}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const WhiteButtonText = styled.Text`
  font-size: 15px;
  font-weight: bold;

  color: ${Colors.white};
`;
export const TotalText = styled.Text`
  font-size: 15px;
  font-weight: bold;
  margin-left: 20px;
  color: ${Colors.white};
`;

export const WhiteContainer = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${Colors.white};
  width: 100%;
`;

export const MedicineScrollable = styled.ScrollView`

  `;

export const PageTitle = styled.Text`
  align-self: center;
  font-size: 24px;
  font-weight: bold;
  color: ${Colors.white};
  margin-left: ${width * 0.035897}px;
  margin-right: ${width * 0.035897}px;
  margin-top: ${titleMargin}px;
`;

export const BlueBorderButton = styled.TouchableOpacity`
  border: 1px solid ${Colors.blue};
  border-radius: 20px;
  padding: 10px 45px 10px 45px;

  justify-content: center;
  align-items: center;
`;

export const BlueButton = styled.TouchableOpacity`
  background-color: ${Colors.blue};
  border-radius: 20px;
  padding: 10px 45px 10px 45px;
  margin-left: auto;
  justify-content: center;
  align-items: center;
  margin-left: auto;
`;

export const BlueButtonText = styled.Text`
  font-size: 15px;
  font-weight: bold;

  color: ${Colors.blue};
`;

