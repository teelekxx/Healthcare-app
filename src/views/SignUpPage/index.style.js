import styled from "styled-components/native";
import { Colors } from "../../constants";



export const ThemeButton = styled.TouchableOpacity`
  flex-direction:row;
  margin-top:50px;
  width: 100%;
  height: 40px;
  border: 1px solid ${Colors.grey}
  box-shadow: 0px 4px 7px grey;
  background-color: ${Colors.white};
  border-radius: 10px;
  align-items: center;
  padding: 0px 0px 0px 25px;
`;
export const ThemeButtonText = styled.Text`
  font-size: 15px;
  align-self: center;
  
  margin-left: 25px;
  color: ${Colors.grey};
`;
export const Or = styled.Text`
  font-size: 20px;
  align-self: center;
  
  color: ${Colors.grey};
  padding-top: 20px;
  
`;
export const CircleButton = styled.TouchableOpacity`
  margin-top:60px;
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
