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
export const EditButton = styled.TouchableOpacity`
  width: 150px;
  height: 40px;
  margin-bottom:10px;
  background-color: ${Colors.blue};
  border-radius: 20px;
  justify-content: center;
  align-self: center;
`;
export const EditButtonText = styled.Text`
  font-size: 18px;
  align-self: center;
  
  font-weight: bold;
  color: ${Colors.white};
`;
export const CheckBoxContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;
export const Space = styled.View`
  height: 30px;
  width: 100%;
`;
export const RedText = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: ${Colors.red};
  align-self:center;
  padding-bottom:15px;
`;