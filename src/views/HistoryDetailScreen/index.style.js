import styled from "styled-components/native";
import { Colors } from "../../constants";
export const Container = styled.View`
  border-width: 1px;
  border-color: #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
`;

export const Row = styled.View`
  flex-direction: row;
  background-color: #fff;

`;

export const Cell = styled.Text`
  flex: 1;
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
  text-align: left;
  
`;
export const BigCell = styled(Cell)`
flex:2;
`;
export const CellHeader = styled(Cell)`
  font-weight: bold;
`;
export const Price = styled.Text`

`