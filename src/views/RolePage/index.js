import { Image } from "react-native";
import React from "react";
import { Container, CircleButton, BoxWrapper, RoleImage } from "./index.style";
import { Icon } from "react-native-elements";
import { Colors } from "../../constants";
import { SubTitle, Text, BlueButton, BlueButtonText } from "../../components/components/index.style";
import { RadioButton } from "react-native-paper";
function RolePage({ navigation }) {
  const [checked, setChecked] = React.useState("Regular user");
  return (
    <Container>
      <CircleButton onPress={() => navigation.goBack()}>
        <Icon
          name="arrow-back-outline"
          type="ionicon"
          color={Colors.white}
          size={20}
        />
      </CircleButton>
      <Image source={require("../../../assets/role.png")} />
      <SubTitle>- Choose your role -</SubTitle>
      <BoxWrapper>
        <RoleImage source={require("../../../assets/regularUser.png")} />
        <Text>Regular user</Text>
        <RadioButton
          color={Colors.blue}
          uncheckedColor={Colors.grey}
          value="Regular user"
          status={checked === "Regular user" ? "checked" : "unchecked"}
          onPress={() => setChecked("Regular user")}
        />
      </BoxWrapper>
      <BoxWrapper>
        <RoleImage source={require("../../../assets/paramedicUser.png")} />
        <Text>Paramedic</Text>
        <RadioButton
          color={Colors.blue}
          uncheckedColor={Colors.grey}
          value="Paramedic"
          status={checked === "Paramedic" ? "checked" : "unchecked"}
          onPress={() => setChecked("Paramedic")}
        />
      </BoxWrapper>
      <BoxWrapper>
        <RoleImage source={require("../../../assets/pharmacistUser.png")} />
        <Text>Pharmacist</Text>
        <RadioButton
          color={Colors.blue}
          uncheckedColor={Colors.grey}
          value="Pharmacist"
          status={checked === "Pharmacist" ? "checked" : "unchecked"}
          onPress={() => setChecked("Pharmacist")}
        />
      </BoxWrapper>
      <BlueButton  onPress={() => navigation.navigate("Home")}>
          <BlueButtonText>Next</BlueButtonText>
        </BlueButton>
    </Container>
  );
}
export default RolePage;
