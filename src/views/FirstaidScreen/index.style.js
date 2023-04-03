import styled from "styled-components/native";
import { Colors } from "../../constants";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const TitleContainer = styled.View`
  flex-direction: row;
`;

export const FirstListTitle = styled.Text`
  color: ${Colors.blue};
  font-family: Monaco;
  font-weight: bold;
  font-size: 25px;
  margin-top: ${height * 0.023696}px;
  margin-bottom: ${height * 0.039099}px;
  margin-left: ${width * 0.0641}px;
`;

export const FirstListContainer = styled.View`
  margin-left: ${width * 0.0641}px;
`;

export const FirstScrollable = styled.ScrollView`
  height: ${height * 0.799142}px;
`;

export const FirstContainer = styled.View`
  display: flex;
  flex-direction: row;
  margin-bottom: ${height * 0.043246}px;
`;

export const DetailContainer = styled.View`
  border-bottom-width: 1px;
  border-color: ${Colors.blue};
  border-style: solid;
`;

export const FirstName = styled.Text`
  color: ${Colors.red};
  font-family: Monaco;
  font-weight: bold;
  font-size: 20px;
  margin-bottom: ${height * 0.007109}px;
`;

export const Description = styled.Text`
  color: ${Colors.blue};
  font-family: Monaco;
  font-size: 15px;
`;

export const BlueCircleButton = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  margin-top: 10px;
  elevation: 10;
  background-color: ${Colors.blue};
  border-radius: 100px;
  justify-content: center;
  align-items: center;
`;
