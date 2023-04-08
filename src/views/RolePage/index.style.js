import styled from "styled-components/native";
import { Colors } from "../../constants";

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${Colors.white};
  padding: 0px 25px 0px 25px;
  width: 100%;
  align-items: center;
`;
export const CircleButton = styled.Pressable`
  margin-top: 60px;
  padding: 10px;
  width: 50px;
  height: 50px;
  elevation: 3;
  background-color: ${Colors.blue};
  border-radius: 100px;
  justify-content: center;
  align-items: center;
  align-self: flex-start;
`;

export const BoxWrapper = styled.TouchableOpacity`
  flex-direction: row;
  width: 340px;
  height: 80px;
  justify-content: space-between;
  border: 1px solid ${Colors.grey};
  justify-content: space-between;
  align-items: center;
  margin: 30px 0px 0px 0px;
  padding-right: 25px;
  border-radius: 20px;
`;

export const RoleImage = styled.Image`
  width: 80px;
  height: 80px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
`;
