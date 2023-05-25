import styled from "styled-components/native";
import { Colors } from "../../constants";
export const CircleButton = styled.TouchableOpacity`
  margin-left: 25px;
  padding: 10px;
  width: 50px;
  height: 50px;
  elevation: 10;
  background-color: ${Colors.white};
  border-radius: 100px;
  justify-content: center;
  align-items: center;
`;

export const MapPickerButton = styled.TouchableOpacity`
  font-size: 15px;
  border-radius: 10px;
  background-color: ${Colors.blue};
  width: 340px;
  height: 40px;
  padding: 10px;
  margin-top: 15px;
  margin-bottom: 15px;
  elevation: 10;
  box-shadow: 0px 4px 7px grey;
`;

export const MapPickerText = styled.Text`
  font-size: 15px;
  padding: 0;
  font-weight: bold;
  align-self: center;
  justify-content: center;
  color: ${Colors.white};
`;
export const Block = styled.View`
  align-self:center;
`
