import {
  Input,
  InputGroup,
  SubTitle,
  ItalicText2,
  BlueContainer,
  SignUpForm,
  BlueButton,
  PageTitleContainer,
  PageTitle,
} from "../../components/components/index.style";
import { CircleButton } from "./index.style";
import { Icon, Avatar} from "react-native-elements";
import { Colors } from "../../constants";
function SignUpRegularPage({ navigation }) {
  return (
    <BlueContainer>
    <PageTitleContainer>

    <CircleButton onPress={() => navigation.goBack()}>
        <Icon
          name="arrow-back-outline"
          type="ionicon"
          color={Colors.blue}
          size={20}
        />
      </CircleButton>
      <PageTitle>Sign Up</PageTitle>
    </PageTitleContainer>
     <SignUpForm>
    

     </SignUpForm>
    </BlueContainer>
  );
}
export default SignUpRegularPage;
