import React from 'react';
import {
  FormInput,
  Input,
  BigFormInput,
  BlueContainer,
  SignUpForm,
  FormText,
  PageTitleContainer,
  PageTitle,
  BlueButton,
  BlueButtonText,
} from "../../components/components/index.style";
import { CircleButton } from "./index.style";
import { Icon, Avatar, Accessory } from "react-native-elements";
import { Colors } from "../../constants";
import AvatarContainer from "../../components/Avatar/index";
function SignUpRegularPage({ navigation }) {
  const [name, onChangeName] = React.useState('');
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
      <SignUpForm vertical={true}>
        <AvatarContainer />
        <FormText>Name</FormText>
        <FormInput onChangeText={onChangeName} value ={name}/>
        <FormText>Date of Birth</FormText>
        <Input />
        <FormText>Gender</FormText>
        <Input />
        <FormText>Citizen ID</FormText>
        <FormInput />
        <FormText>Tel.</FormText>
        <FormInput />
        <FormText>Address</FormText>
        <BigFormInput multiline numberOfLines={3} />
        <FormText>City</FormText>
        <FormInput />
        <FormText>Zip Code</FormText>
        <FormInput />
        <BlueButton onPress={()=> console.log({text})}>
          <BlueButtonText>Next</BlueButtonText>
        </BlueButton>
      </SignUpForm>
    </BlueContainer>
  );
}
export default SignUpRegularPage;
