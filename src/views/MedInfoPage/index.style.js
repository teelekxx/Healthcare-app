import styled from "styled-components/native";
import { Colors } from "../../constants";
export const CircleButton = styled.TouchableOpacity`
  ${'' /* margin-top:60px; */}
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
export const CheckBoxContainer = styled.View`
flex: 1;
flex-direction: row;
justify-content: space-between;
`
export const Space = styled.View`
height:30px;
width:100%;
`
export const SkipButton = styled.TouchableOpacity`
  margin-top: 50px;
  margin-bottom: 50px
  padding: 15px;
  width: 150px;
  height: 60px;
  align-self: center;
  box-shadow: 0px 4px 7px grey;
  background-color: ${Colors.grey};
  border-radius: 10px;
`;

export const SaveButton = styled.TouchableOpacity`
  margin-top: 50px;
  margin-bottom: 50px
  padding: 15px;
  width: 150px;
  height: 60px;
  align-self: center;
  box-shadow: 0px 4px 7px grey;
  background-color: ${Colors.blue};
  border-radius: 10px;
`;

export const ButtonContainer = styled.View`
flex-direction: row;
justify-content: space-between;
`
