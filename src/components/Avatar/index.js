import { Container } from "./index.style";
import { Icon, Avatar, Accessory } from "react-native-elements";
import { Colors } from "../../constants";
export default function AvatarContainer() {
  return (
    <Container>
      <Avatar
        // source={require("../../../assets/appLogo.png")}
        size={"large"}
        rounded
        icon={{ name: "user", type: "font-awesome" }}
        overlayContainerStyle={{ backgroundColor: "#efece8" }}
      >
        <Accessory
          size={24}
        //   backgroundColor="#00a5cb"
          containerStyle={{ borderRadius: 50 }}
          onPress={() => console.log("clicked")}
        />
      </Avatar>
    </Container>
  );
}
