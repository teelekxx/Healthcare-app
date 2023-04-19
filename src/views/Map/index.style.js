import styled from "styled-components/native";
import { Colors } from "../../constants";
import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${Colors.white};
  padding: 25px 25px 0px 25px;
  width: 100%;
  justify-content: center;
  align-self: center;
`;
export const MapContainer = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${Colors.white};
  padding: 25px 25px 0px 25px;
  margin-top: 11.6%;
  margin-bottom: 23.7%;
  width: 100%;
  justify-content: center;
  align-self: center;
`;
export const Title = styled.Text`
  color: ${Colors.blue};

  font-weight: bold;
  font-size: 40px;
  align-self: center;
`;
export const Text = styled.Text`
  color: ${Colors.blue};

  font-weight: light;
  font-style: italic;
  font-size: 15px;
  align-self: center;
`;
export const Image = styled.Image`
  width: 150px;
  height: 150px;
  align-self: center;
`;

export const ThemeButton = styled.Pressable`
  margin-top: 50px;
  padding: 15px;
  width: 300px;
  height: 60px;
  border: 1px solid ${Colors.blue};
  align-self: center;
  box-shadow: 0px 4px 7px grey;
  background-color: white;
  border-radius: 10px;
`;
export const ThemeButtonText = styled.Text`
  font-size: 20px;
  align-self: center;

  font-weight: bold;
  color: ${Colors.blue};
`;
export const ThemeButton2 = styled.Pressable`
  margin-top: 50px;
  padding: 15px;
  width: 300px;
  height: 60px;
  margin-bottom: 12.78%;
  align-self: center;
  box-shadow: 0px 4px 7px grey;
  background-color: ${Colors.blue};
  border-radius: 10px;
`;
export const ThemeButtonText2 = styled.Text`
  font-size: 20px;
  padding: 0;
  align-self: center;

  font-weight: bold;
  color: ${Colors.white};
`;

export const FindingPrompt = styled.Text`
  color: ${Colors.blue};

  font-weight: bold;
  font-size: 20px;
  margin-top: ${height * 0.09004}px;
  margin-left: ${width * 0.02889}px;
  text-align: center;
`;
