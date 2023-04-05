import styled from "styled-components/native";
import { Colors } from "../../../constants";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const TitleContainer = styled.View`
  flex-direction: row;
`;

export const FirstListTitle = styled.Text`
  color: ${Colors.red};
  
  font-weight: bold;
  font-size: 25px;
  margin-top: ${height * 0.023696}px;
  margin-bottom: ${height * 0.039099}px;
  margin-left: ${width * 0.0641}px;
`;

export const FirstListContainer = styled.View`
  margin-left: ${width * 0.0641}px;
  margin-right: ${width * 0.0641}px;
`;

export const FirstScrollable = styled.ScrollView`
  height: ${height * 0.799142}px;
`;

export const FirstContainer = styled.View`
  display: flex;
  flex-direction: row;
  margin-bottom: ${height * 0.043246}px;
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

export const StepTitle = styled.Text`
  color: ${Colors.blue};
  
  font-weight: bold;
  font-size: 20px;
  margin-top: ${height * 0.032696}px;
`;

export const StepTitle2 = styled.Text`
  color: ${Colors.blue};
  
  font-weight: bold;
  font-size: 25px;
  margin-top: ${height * 0.032696}px;
`;

export const StepDetail = styled.Text`
  color: ${Colors.blue};
  
  font-size: 15px;
`;

export const StepPicture = styled.Image`
  width: ${width * 0.8589}px;
  height: ${width * 1.282}px;
`;
