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
  padding:5px 0px 5px 0px
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
  text-align: left;
  font-size: 18px;
  color: ${Colors.blue};
`;
export const BigCell = styled(Cell)`
  flex: 2;
  justify-content: space-between;
`;
export const CellHeader = styled(Cell)`
  font-weight: bold;
  margin-bottom:10px;
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
export const Space = styled.View`
height:20px;
width:100%;
`

export const Text = styled.Text`
  color: ${Colors.blue};
  ${'' /* font-weight: bold; */}
  font-size: 15px;
  ${'' /* margin-bottom: 20px; */}
`;

export const SelectedImage = styled.Image`
  width: 100px;
  height: 100px;


  border-radius: 10px;
`;
export const ImageWrapper = styled.View`
flex:1;
flex-direction:row;
`
export const SelectedImageContainer = styled.View`
margin-right:10px;
`;

export const RemoveButton = styled.TouchableOpacity`
margin-left:auto;

`;

export const SelectedImagesContainer = styled.ScrollView`
  padding: 0px 10px 0px 10px;
`;

