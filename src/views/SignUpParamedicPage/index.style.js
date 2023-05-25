import styled from "styled-components/native";
import { Colors } from "../../constants";

export const CircleButton = styled.TouchableOpacity`
  margin-left:25px;
  padding: 10px;
  width: 50px;
  height: 50px;
  elevation:10;
  background-color: ${Colors.white};
  border-radius: 100px;
  justify-content:center;
  align-items:center;
`;
export const Block = styled.View`
  align-self:center;
`
