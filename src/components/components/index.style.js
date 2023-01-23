import styled from "styled-components/native";
import { Colors } from "../../constants";

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${Colors.white};
  padding: 25px 25px 0px 25px;
  width: 100%;
  justify-content: center;
  align-self: center;
`;
export const Title = styled.Text`
    color: ${Colors.blue}
    font-family: Monaco;
    font-weight: bold;
    font-size: 40px;
    align-self: center;
`;
export const SubTitle = styled.Text`
    color: ${Colors.blue}
    font-family: Monaco;
    font-weight: bold;
    font-size: 30px;
    
`;

export const ItalicText = styled.Text`
    color: ${Colors.blue}
    font-family: Monaco;
    font-weight: light;
    font-style:italic;
    font-size: 15px;
    align-self: center;
`;
export const ItalicText2 = styled.Text`
    color: ${Colors.blue}
    font-family: Monaco;
    font-weight: light;
    font-style:italic;
    font-size: 15px;
`;

export const InputGroup = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 25px;
`;
export const Input = styled.TextInput`
  font-size: 15px;
  padding: 10px;
  border: 1px solid ${Colors.grey};
  border-radius: 10px;
  width: 300px;
  height: 40px;
`;

export const BlueContainer = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${Colors.blue};
  width: 100%;
`;

export const Form = styled.View`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  height: 70%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: ${Colors.white};
  padding: 50px 25px 0px 25px;
`;
export const BlueButton = styled.TouchableOpacity`
  margin-top: 50px;
  padding: 15px;
  width: 340px;
  height: 60px;
  align-self: center;
  box-shadow: 0px 4px 7px grey;
  background-color: ${Colors.blue};
  border-radius: 10px;
`;
export const BlueButtonText = styled.Text`
  font-size: 20px;
  padding: 0;
  align-self: center;
  font-family: Monaco;
  font-weight: bold;
  color: ${Colors.white};
`;

export const Text = styled.Text`
  font-size:20px;
  font-family: Monaco;
  font-weight: regular;
  color: ${Colors.blue};
`