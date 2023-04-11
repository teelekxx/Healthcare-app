import { Image } from "react-native";
import React from "react";
import { Container, CircleButton, BoxWrapper, RoleImage } from "./index.style";
import { Icon } from "react-native-elements";
import { Colors } from "../../constants";
import {
  SubTitle,
  Text,
  BlueButton,
  BlueButtonText,
} from "../../components/components/index.style";
import { RadioButton } from "react-native-paper";
import BouncyCheckbox from "react-native-bouncy-checkbox";

function RolePage({ route, navigation }) {
  const [checked, setChecked] = React.useState("Regular user");
  const { email, password } = route.params;
  function next() {
    console.log(checked);
    if (checked === "Regular user") {
      navigation.navigate("SignUpRegular", {
        role: checked,
        email: email,
        password: password,
      });
    } else if (checked === "Paramedic") {
      navigation.navigate("SignUpParamedic", {
        role: checked,
        email: email,
        password: password,
      });
    } else {
      navigation.navigate("SignUpPharmacist", {
        role: checked,
        email: email,
        password: password,
      });
    }
  }
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
      <BoxWrapper onPress={() => setChecked("Regular user")}>
        <RoleImage source={require("../../../assets/regularUser.png")} />
        <Text>Regular user</Text>
        <RadioButton
          color={Colors.blue}
          uncheckedColor={Colors.grey}
          value="Regular user"
          status={checked === "Regular user" ? "checked" : "unchecked"}
        />
      </BoxWrapper>
      <BoxWrapper onPress={() => setChecked("Paramedic")}>
        <RoleImage source={require("../../../assets/paramedicUser.png")} />
        <Text>Paramedic</Text>

        <RadioButton
          color={Colors.blue}
          uncheckedColor={Colors.grey}
          value="Paramedic"
          status={checked === "Paramedic" ? "checked" : "unchecked"}
        />
      </BoxWrapper>
      <BoxWrapper onPress={() => setChecked("Pharmacist")}>
        <RoleImage source={require("../../../assets/pharmacistUser.png")} />
        <Text>Pharmacist</Text>
        <RadioButton
          color={Colors.blue}
          uncheckedColor={Colors.grey}
          value="Pharmacist"
          status={checked === "Pharmacist" ? "checked" : "unchecked"}
        />
      </BoxWrapper>
      <BlueButton onPress={next}>
        <BlueButtonText>Next</BlueButtonText>
      </BlueButton>
    </Container>
  );
}
export default RolePage;
