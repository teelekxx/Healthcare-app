import styled from "styled-components/native";
import { Icon, Avatar } from "react-native-elements";
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
  padding: 10px 10px 0px 10px;
  flex-direction: column;
  background-color: ${Colors.white};
  margin-top: 11.6%;

  width: 100%;
  align-self: center;
  border-radius: 20px;
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
export const ChatButton = styled.Pressable`
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  margin-top: 10px;
  margin-bottom: 5.78%;
  align-self: center;
  box-shadow: 0px 4px 7px grey;
  background-color: ${Colors.white};
  border-radius: 100px;
`;
export const ThemeButton = styled.TouchableOpacity`
  margin-top: 10px;
  padding: 15px;
  width: 340px;
  height: 60px;
  margin-bottom: 20px;
  align-self: center;
  box-shadow: 0px 4px 4px grey;
  background-color: ${Colors.white};
  border-radius: 10px;
  border: 1px solid ${Colors.red};
`;
export const ThemeButtonText = styled.Text`
  font-size: 20px;
  align-self: center;
  font-weight: bold;
  color: ${Colors.red};
`;
export const ThemeButton2 = styled.Pressable`
  padding: 15px;
  flex:1;
  height: 64px;
  align-self: center;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
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
export const FirstAidContainer = styled.View`
flex-direction:row;
justify-content:center;
margin-bottom:30px;
`
export const CprButton = styled.Pressable`
`
export const Cpr = styled.Image`
  width: 64px;
  height: 64px;
  margin-left: 10px;
  box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.2);
  elevation: 10;
`;

export const FindingPrompt = styled.Text`
  color: ${Colors.blue};
  font-weight: bold;
  font-size: 20px;
  margin-left: ${width * 0.02889}px;
  text-align: center;
  margin-top:10px;
  margin-bottom:10px;
`;

export const DistanceText = styled.Text`
  color: ${Colors.blue};
  margin-top: 10px;
  font-weight: bold;
  font-size: 20px;
  margin-left: ${width * 0.02889}px;
  text-align: center;
`;

export const HospitalName = styled.Text`
  color: ${Colors.blue};
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 30px;
  margin-left: ${width * 0.02889}px;
  text-align: center;
`;

export const InlineIcon = styled(Icon)`
  padding-top: 19px;
  margin-left: 5px;
`;

export const ChatIcon = styled(Icon)``;
 export const CancelledView = styled.View`
 `