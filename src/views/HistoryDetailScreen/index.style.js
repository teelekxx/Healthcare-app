import styled from "styled-components/native";
import { Colors } from "../../constants";
export const Container = styled.View`
  flex: 1;
  width: 100%;
  border-width: 1px;
  border-color: #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
  overflow: hidden;
  align-items: center;
  
  
`;

export const Row = styled.View`
  flex-direction: row;
  background-color: #fff;
  text-align: left;
  justify-content: space-between;
`;

export const Cell = styled.Text`
  flex: 1;
  padding:5px 0px 5px 5px
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
  text-align: left;
  font-size: 13px;
`;
export const BigCell = styled(Cell)`
  flex: 2;
  justify-content: space-between;
`;
export const CellHeader = styled(Cell)`
  font-weight: bold;
`;
export const BigCellHeader = styled(CellHeader)`
 flex: 2;

`
export const PharName = styled.Text`
  color: ${Colors.blue};
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 5px;
`;
export const Text20 = styled.Text`
  color: ${Colors.blue};
  font-weight: bold;
  font-size: 15px;
  margin-bottom: 20px;
`;
