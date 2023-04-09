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

function SignUpPharmacistPage({ navigation, route }) {
  const {email, password, role} = route.params;
  const [name, onChangeName] = useState("");
  const [id, onChangeID] = useState("");
  const [phone, onChangePhone] = useState("");
  const [address, onChangeAddress] = useState("");
  const [city, onChangeCity] = useState("");
  const [zipCode, onChangeZipCode] = useState("");
  const [open, setOpen] = useState(false);
  const [gender, setGender] = useState(null);
  const [licenseNum, setLicenseNum] = useState("");
  const [licenseDate, setLicenseDate] = useState(new Date())
  const [items, setItems] = useState([
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ]);
  const [date, setDate] = useState(new Date())
  const [show, setShow] = useState(false)
  const [text, setText] = useState('select date')
  const [licenseText, setLicenseText] = useState('select date')
  const [showLicense, setShowLicense] = useState(false)
  const [pharName, setPharName] = useState("")
  const [pharDescription, setPharDescription] = useState("")
  const [pharAddress, setPharAddress] = useState("")
  const [pharCity, setPharCity] = useState("")
  const [pharZipCode, setPharZipcode] = useState("")
  const [pharLatitude, setPharLatitude] = useState("")
  const [pharLongitude, setPharLongitude] = useState("")
  const onChange = (event, selectedDate) => {  
    const currentDate = selectedDate || date
    setDate(currentDate)
    setShow(false)
    let tempDate = new Date(currentDate)
    let fDate = tempDate.getDate() + "/" + (tempDate.getMonth()+1)+'/'+tempDate.getFullYear()
    setText(fDate)
  }
  const onChangeLicense = (event, selectedDate) => {  
    const currentDate = selectedDate || licenseDate
    setLicenseDate(currentDate)
    setShowLicense(false)
    let tempDate = new Date(currentDate)
    let fDate = tempDate.getDate() + "/" + (tempDate.getMonth()+1)+'/'+tempDate.getFullYear()
    setLicenseText(fDate)
  }
  const handleSubmit = () => {
    navigation.navigate("MedInfo", {
      email: email,
      password:password,
      role: role,
      name: name,
      dateOfBirth: text,
      gender: gender,
      citizenId: id,
      phoneNumber: phone,
      address: address,
      city:city,
      zipCode:zipCode,
      pharName: pharName,
      pharDescription:pharDescription,
      pharAddress: pharAddress,
      pharCity:pharCity,
      pharZipCode: pharZipCode,
      pharLatitude: pharLatitude,
      pharLongitude: pharLongitude,
      licenseNum: licenseNum,
      licenseDate: licenseText,
    });
  };
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
        <FormInput onChangeText={onChangeID} value={id} maxLength={14}/>
        <FormText>Tel.</FormText>
        <FormInput onChangeText={onChangePhone} value={phone} maxLength={10}/>
        <FormText>Pharmacist license No.</FormText>
        <FormInput onChangeText={setLicenseNum} value={licenseNum} />
        <FormText>Pharmacist license expiration date</FormText>
        <DateCalendar>
        <SmallFormInput value={licenseText}/>
        {showLicense &&(<DateTimePicker
        testID="dateTimePicker"
          value={licenseDate}
          mode='date'
          display='default'
          onChange={onChangeLicense}
        />)}
        <Icon
              name="calendar-outline"
              type="ionicon"
              color={Colors.blue}
              size={30}
              onPress={()=> setShowLicense(true)}
            />
        </DateCalendar>
        <FormText>Address</FormText>
        <BigFormInput multiline numberOfLines={3}  onChangeText={onChangeAddress} value={address}/>
        <FormText>City</FormText>
        <FormInput onChangeText={onChangeCity} value={city} />
        <FormText>Zip Code</FormText>
        <FormInput onChangeText={onChangeZipCode} value={zipCode} />

        {/* pharmacy store */}
        <FormText>Pharmacy's name</FormText>
        <FormInput onChangeText={setPharName} value={pharName} />
        <FormText>Pharmacy's description</FormText>
        <FormInput onChangeText={setPharDescription} value={pharDescription} />
        <FormText>Pharmacy's address</FormText>
        <BigFormInput multiline numberOfLines={3}  onChangeText={setPharAddress} value={pharAddress}/>
        <FormText>Pharmacy's city</FormText>
        <FormInput onChangeText={setPharCity} value={pharCity} />
        <FormText>Pharmacy's zip Code</FormText>
        <FormInput onChangeText={setPharZipcode} value={pharZipCode} />
        <FormText>Pharmacy's latitude</FormText>
        <FormInput onChangeText={setPharLatitude} value={pharLatitude} />
        <FormText>Pharmacy's longitude</FormText>
        <FormInput onChangeText={setPharLongitude} value={pharLongitude} />

        <BlueButton onPress={handleSubmit}>
          <BlueButtonText>Next</BlueButtonText>
        </BlueButton>
      </SignUpForm>
    </BlueContainer>
  );
}
export default SignUpPharmacistPage;
