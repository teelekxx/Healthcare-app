import {useState} from "react";
import {
  FormInput,
  SmallFormInput,
  BigFormInput,
  BlueContainer,
  SignUpForm,
  FormText,
  PageTitleContainer,
  PageTitle,
  BlueButton,
  BlueButtonText,
  DateCalendar,
} from "../../components/components/index.style";
import { CircleButton } from "./index.style";
import { Icon } from "react-native-elements";
import { Colors } from "../../constants";
import AvatarContainer from "../../components/Avatar/index";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform } from "react-native";

function SignUpRegularPage({ navigation }) {
  const [name, onChangeName] = useState("");
  const [id, onChangeID] = useState("");
  const [phone, onChangePhone] = useState("");
  const [address, onChangeAddress] = useState("");
  const [city, onChangeCity] = useState("");
  const [zipCode, onChangeZipCode] = useState("");
  const [open, setOpen] = useState(false);
  const [gender, setGender] = useState(null);
  const [items, setItems] = useState([
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ]);
  const [date, setDate] = useState(new Date())
  // const [mode, setMode] = useState('date')
  const [show, setShow] = useState(false)
  const [text, setText] = useState('select date')

  const onChange = (event, selectedDate) => {  
    const currentDate = selectedDate || date
    setDate(currentDate)
    setShow(false)
    let tempDate = new Date(currentDate)
    let fDate = tempDate.getDate() + "/" + (tempDate.getMonth()+1)+'/'+tempDate.getFullYear()
    setText(fDate)
  }
  // const showMode = (currentMode) => {
  //   setShow(true)
  //   setMode(currentMode)
  // }
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
      <SignUpForm vertical={true} keyboardDismissMode="on-drag">
        <AvatarContainer />
        <FormText>Name</FormText>
        <FormInput onChangeText={onChangeName} value={name} />
        <FormText>Date of Birth</FormText>
        <DateCalendar>
        <SmallFormInput value={text}/>
        {show &&(<DateTimePicker
        testID="dateTimePicker"
          value={date}
          mode='date'
          display='default'
          onChange={onChange}
        />)}
        <Icon
              name="calendar-outline"
              type="ionicon"
              color={Colors.blue}
              size={30}
              onPress={()=> setShow(true)}
            />
        </DateCalendar>
       
        <FormText>Gender</FormText>
        <DropDownPicker
          open={open}
          value={gender}
          items={items}
          setOpen={setOpen}
          setValue={setGender}
          setItems={setItems}
          placeholder="select your gender"
          placeholderStyle={{
         
            fontSize: 15,
          }}
          style={{ borderColor: "#d8d8d8", backgroundColor: "white" }}
        />
        <FormText>Citizen ID</FormText>
        <FormInput onChangeText={onChangeID} value={id} />
        <FormText>Tel.</FormText>
        <FormInput onChangeText={onChangePhone} value={phone} />
        <FormText>Address</FormText>
        <BigFormInput multiline numberOfLines={3} />
        <FormText>City</FormText>
        <FormInput onChangeText={onChangeCity} value={city} />
        <FormText>Zip Code</FormText>
        <FormInput onChangeText={onChangeZipCode} value={zipCode} />
        <BlueButton onPress={() => {navigation.navigate('MedInfo')}}>
          <BlueButtonText>Next</BlueButtonText>
        </BlueButton>
      </SignUpForm>
    </BlueContainer>
  );
}
export default SignUpRegularPage;
