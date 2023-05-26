import styled from "styled-components/native";
import { Colors } from "../../constants";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const RequestContainer = styled.View`
  display: flex;
  flex-direction: row;
  margin-bottom: ${height * 0.043246}px;
  background-color:${Colors.white};
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.2);
  padding: 10px 20px 10px 20px;
  margin: 10px;
  border-radius: 20px;
`;

export const DetailContainer = styled.View``;

export const DesContainer = styled.ScrollView`
  max-height: 100px;
`;

export const PatientName = styled.Text`
  color: ${Colors.blue};

  font-weight: bold;
  font-size: 20px;
`;

export const Price = styled.Text`
  color: ${Colors.blue};
  margin-left: auto;
  font-weight: bold;
  font-size: 15px;
`;

export const Fee = styled.Text`
  color: ${Colors.blue};
  margin-left: auto;
  font-size: 10px;
`;

export const PatientNameContainer = styled.View`
  flex-direction: row;
  margin-bottom: ${height * 0.007109}px;
  width:100% ;
`;

export const LocationText = styled.Text`
  color: ${Colors.blue};
  font-weight: bold;
  font-size: 12px;
`;

export const HorizonInput3 = styled.View`
  flex-direction: row;
  margin-top: ${height * 0.01672}px;
  width:100% ;
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

export const WhiteButtonText = styled.Text`
  font-size: 15px;
  font-weight: bold;

  color: ${Colors.white};
`;
