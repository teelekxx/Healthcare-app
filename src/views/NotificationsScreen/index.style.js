import styled from "styled-components/native";
import { Colors } from "../../constants";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const NotificationsTitle = styled.Text`
  color: ${Colors.blue};
  
  font-weight: bold;
  font-size: 25px;
  margin-top: ${height * 0.08886}px;
  margin-left: ${width * 0.0641}px;
`;

export const NotificationsContainer = styled.View`
  flex: 1;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
`;

export const NotificationsScrollable = styled.ScrollView`
  height: ${height * 0.8994}px;
  margin-left: ${width * 0.0641}px;
  margin-right: ${width * 0.0641}px;
`;

export const NotificationBlock = styled.TouchableOpacity`
  /* height: ${height * 0.699142}px; */
  border-bottom-width: 1px;
  border-color: ${Colors.blue};
  border-style: solid;
  margin-top: ${height * 0.04324}px;
`;

export const NotificationsName = styled.Text`
  color: ${Colors.blue};
  
  font-weight: bold;
  font-size: 20px;
`;

export const NotificationsMassage = styled.Text`
  color: ${Colors.grey};
  
  font-size: 15px;
`;

export const NotificationsDate = styled.Text`
  color: ${Colors.grey};
  
  font-size: 15px;
  margin-left: auto;
`;
