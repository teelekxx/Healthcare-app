import styled from "styled-components/native";
import { Colors } from "../../constants";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const NativeText = styled.Text`
  font-size: 18px;
  align-self: center;

  font-weight: bold;
  color: ${Colors.white};
`;

export const NativeButton = styled.TouchableOpacity`
  width: 150px;
  height: 40px;
  margin-top: 10px;
  background-color: ${Colors.blue};
  border-radius: 20px;
  justify-content: center;
`;

export const NotificationsTitle = styled.Text`
  color: ${Colors.blue};

  font-weight: bold;
  font-size: 25px;
  margin-left: ${width * 0.0641}px;
`;

export const NotificationsContainer = styled.View`
  flex: 1;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 60px;
  margin-bottom: 30px;
`;

export const NotificationsScrollable = styled.ScrollView`
  max-height: ${height * 0.6994}px;
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

export const NotificationFlatList = styled.FlatList`
  background-color: ${Colors.white};
  padding: 0px 20px 20px 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;
