import styled from "styled-components/native";
import { Colors } from "../../constants";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const RequestContainer = styled.View`
  display: flex;
  flex-direction: row;
  margin-bottom: ${height * 0.043246}px;
  border: 1px solid ${Colors.blue};
  padding: 10px 30px 10px 30px;
  margin: 10px;
  border-radius: 20px;
`;

export const DetailContainer = styled.View``;

export const PatientName = styled.Text`
  color: ${Colors.blue};

  font-weight: bold;
  font-size: 20px;
`;

export const TimeStamp = styled.Text`
  color: ${Colors.blue};
  margin-left: auto;
  font-weight: bold;
  font-size: 15px;
`;

export const PatientNameContainer = styled.View`
  flex-direction: row;
  margin-bottom: ${height * 0.007109}px;
`;

export const LocationText = styled.Text`
  color: ${Colors.blue};
  font-weight: bold;
  font-size: 12px;
`;

export const HorizonInput3 = styled.View`
  flex-direction: row;
  margin-top: ${height * 0.01672}px;
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
  margin-left: 40px;
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
