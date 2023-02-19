import styled from "styled-components/native";
import { Colors } from "../../constants";

export const ThemeButton = styled.Pressable`
  flex-direction: row;
  margin-top: 50px;
  width: 100%;
  height: 40px;
  border: 1px solid ${Colors.grey};
  box-shadow: 0px 2px 2px grey;
  background-color: ${Colors.white};
  border-radius: 10px;
  align-items: center;
  padding: 0px 0px 0px 25px;
`;
export const ThemeButtonText = styled.Text`
  font-size: 15px;
  align-self: center;
  font-family: Monaco;
  margin-left: 25px;
  color: ${Colors.grey};
`;

export const Or = styled.Text`
  font-size: 20px;
  align-self: center;
  font-family: Monaco;
  color: ${Colors.grey};
  padding-top: 30px;
`;
export const ForgotPassword = styled.Text`
  font-size: 15px;
  text-decoration: underline;
  text-decoration-color: ${Colors.grey};
  font-style: italic;
  align-self: flex-end;
  font-family: Monaco;
  color: ${Colors.grey};
  padding-top: 10px;
`;

export const CircleButton = styled.Pressable`
  margin-top: 60px;
  margin-left: 25px;
  padding: 10px;
  width: 50px;
  height: 50px;
  elevation: 10;
  background-color: ${Colors.white};
  border-radius: 100px;
  justify-content: center;
  align-items: center;
`;
