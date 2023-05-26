import styled from "styled-components/native";
import { Colors } from "../../constants";
import { Dimensions } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { Marker } from "react-native-maps";

const { width, height } = Dimensions.get("window");

export const MedContainer = styled.SafeAreaView`
  display: flex;
  height: 100%;
  background-color: ${Colors.blue};
  border-radius: 20px;
  box-shadow: 0px 0px 70px grey;
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
  padding: 20px 30px 0px 30px;

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

  padding: 10px;
`;

export const MedDesInput = styled.TextInput`
  font-size: 15px;
  background-color: ${Colors.white};
  border-radius: 10px;
  min-height: 350px;
  margin-bottom: auto;
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
