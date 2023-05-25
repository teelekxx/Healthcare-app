import { Container } from "./index.style";
import { Icon, Avatar, Accessory } from "react-native-elements";
import { Colors } from "../../constants";
import useImagePicker from "../../hooks/useImagePicker.js";

export default function AvatarContainer() {
  const [{ images }, { pickImage,setImages }] = useImagePicker();

  return (
    <Container>
      <Avatar
        // source={require("../../../assets/appLogo.png")}
        size={"large"}
        rounded
        icon={{ name: "user", type: "font-awesome" }}
        overlayContainerStyle={{ backgroundColor: "#efece8" }}
        source={{
    uri:
      images[0].uri,
  }}
      >
        <Accessory
          size={24}
        //   backgroundColor="#00a5cb"
          containerStyle={{ borderRadius: 50 }}
          onPress={pickImage}
        />
      </Avatar>
    </Container>
  );
}
