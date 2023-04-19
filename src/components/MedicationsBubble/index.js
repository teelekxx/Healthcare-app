import {
  WhiteMessage,
  MyBubble,
  MessageContainer,
  MyTimeStamp,
  OthersBubble,
  OthersTimeStamp,
  BlueMessage,
  SelectedImage,
  ImagesContainer,
  MyImage,
  MedRow,
  MedColumn,
  MedText,
} from "./index.style";
import { Text } from "react-native";
import { Icon, Avatar, Accessory } from "react-native-elements";
import { Colors } from "../../constants";
export default function MedicationsBubble({ medications, total }) {
  return (
    <MessageContainer>
      <MyBubble>
        <MedRow>
          <MedColumn></MedColumn>
        </MedRow>
        {medications.map((val, index) => {
          return (
            <MedRow>
              <MedColumn>
                <MedText>{val.Medicines}</MedText>
                <MedText>x{val.Qty}</MedText>
              </MedColumn>
            </MedRow>
          );
        })}
      </MyBubble>
    </MessageContainer>
  );
}
