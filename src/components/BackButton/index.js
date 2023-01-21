import { CircleButton } from "./index.style";
import { Icon } from "react-native-elements";
import { Colors } from "../../constants";
export default function BackButton({navigation}){
    return(
        <CircleButton onPress={() => navigation.navigate("Landing")}>
            <Icon
              name="arrow-back-outline"
              type="ionicon"
              color={Colors.blue}
              size={20}
            />
        </CircleButton>
    )
}