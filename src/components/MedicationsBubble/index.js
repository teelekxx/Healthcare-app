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
export default function MedicationsBubble({ medications }) {
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
              </MedColumn>
              <MedColumn>
                <MedText>{val.Qty}</MedText>
              </MedColumn>
              <MedColumn>
                <MedText>{val.Price}</MedText>
              </MedColumn>
            </MedRow>
          );
        })}
      </MyBubble>
    </MessageContainer>
  );
}
