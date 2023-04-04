import {
  WhiteMessage,
  MyBubble,
  MessageContainer,
  MyTimeStamp,
  OthersBubble,
  OthersTimeStamp,
  BlueMessage,
  SelectedImage,
  SelectedImagesContainer
} from "./index.style";
import { Text } from "react-native";
import { Icon, Avatar, Accessory } from "react-native-elements";
import { Colors } from "../../constants";
export default function ChatBubble({ message, timeStamp, sender, image }) {
  if (image === null){
    image = [];
  }
  if (image.length === 0 && message === ""){
    return;
  }
  else{
  if (sender === "Me") {
    return (
      <MessageContainer>
        {image.length !== 0 && (
          <SelectedImagesContainer>
            {image.map((val) => {
              return (
                <MyBubble>
                <SelectedImage source={{ uri: val }} />
                </MyBubble>);
            })}
            </SelectedImagesContainer>
        )}
        {message && (
          <MyBubble>
            <WhiteMessage>{message}</WhiteMessage>
          </MyBubble>
        )}

        <MyTimeStamp>{timeStamp}</MyTimeStamp>
      </MessageContainer>
    );
  } else {
    return (
      <MessageContainer>
        <OthersBubble>
          <BlueMessage>{message}</BlueMessage>
        </OthersBubble>
        <OthersTimeStamp>{timeStamp}</OthersTimeStamp>
      </MessageContainer>
    );
  }
}
}
