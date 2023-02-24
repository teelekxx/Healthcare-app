import styled from "styled-components/native";
import { Colors } from "../../constants";
export const Background = styled.ScrollView`
  background-color: ${Colors.white};
  flex: 1;
  flex-direction: column;
  padding: 25px 25px 0px 25px;
`;
export const AvaContainer = styled.View`
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 30px;
  justify-content: center;
`;
export const EditButton = styled.TouchableOpacity`
  width: 150px;
  height: 40px;
  margin-top: 10px;
  background-color: ${Colors.blue};
  border-radius: 20px;
  justify-content: center;
`;
export const EditButtonText = styled.Text`
  font-size: 18px;
  align-self: center;
  font-family: Monaco;
  font-weight: bold;
  color: ${Colors.white};
`;
