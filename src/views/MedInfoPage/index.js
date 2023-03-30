import { useState } from "react";
import {
  FormInput,
  SmallFormInput,
  BigFormInput,
  BlueContainer,
  SignUpForm,
  FormText,
  PageTitleContainer,
  PageTitle,
  BlueButtonText,
  DateCalendar,
  CenterFormText,
  BlueButton,
} from "../../components/components/index.style";
import {
  CircleButton,
  CheckBoxContainer,
  Space,
  SaveButton,
  SkipButton,
  ButtonContainer,
} from "./index.style";
import { Button, Icon } from "react-native-elements";
import { Colors } from "../../constants";
import AvatarContainer from "../../components/Avatar/index";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import RadioButtonRN from "radio-buttons-react-native";
import { CheckBox } from "@rneui/themed";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Auth from "../../api/auth";
import { async } from "@firebase/util";
import {auth} from "../../lib/firebase";

function MedInfoPage({ navigation, route }) {
  const {
    email,
    password,
    role,
    name,
    dateOfBirth,
    gender,
    citizenId,
    phoneNumber,
    address,
    city,
    zipCode,
  } = route.params;
  const [allergy, onChangeAllergy] = useState("");
  const [medication, onChangeMedication] = useState("");
  const [disease, onChangeDisease] = useState("");
  const [open, setOpen] = useState(false);
  const [bloodType, setBloodType] = useState(null);
  const [items, setItems] = useState([
    { label: "A", value: "A" },
    { label: "B", value: "B" },
    { label: "O", value: "O" },
    { label: "AB", value: "AB" },
  ]);
  const [checkedDNR, setCheckedDNR] = useState(false);
  const toggleDNR = () => setCheckedDNR(!checkedDNR);
  const [checkedDonor, setCheckedDonor] = useState(false);
  const toggleDonor = () => setCheckedDonor(!checkedDonor);
  const [emergencyName, setEmergencyName] = useState("");
  const [relationships, setRelationships] = useState([
    { label: "Father", value: "father" },
    { label: "Mother", value: "mother" },
    { label: "Spouse", value: "spouse" },
    { label: "Partner", value: "partner" },
    { label: "Friends", value: "friends" },
  ]);
  const [openRelationships, setOpenRelationships] = useState(false);
  const [relationship, setRelationship] = useState(null);
  const [tel, setTel] = useState("");
  const [insuranceProvider, setInsuranceProvider] = useState("");
  const [insurancePlan, setInsurancePlan] = useState("");
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [text, setText] = useState("select expiration date");
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShow(false);
    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    setText(fDate);
  };
  const handleSubmit = async (event) => {
    try{
      
      const user = await createUserWithEmailAndPassword(auth, email, password);

      const res = await Auth.register({
        body: {
          email: email,
          password: password,
          role: role,
        },
      });
      // navigation.navigate("HomePage", {
      //   //user
      //   email: email,
      //   role: role,
      //   password:password,
      //   //med info
      //   name: name,
      //   dateOfBirth: dateOfBirth,
      //   gender: gender,
      //   citizenId: citizenId,
      //   phoneNumber: phoneNumber,
      //   bloodType: bloodType,
      //   congenitalDisease: disease,
      //   regularMed: medication,
      //   allergies: allergy,
      //   DNRStatus: checkedDNR,
      //   organDonor: checkedDonor,
      //   powerOfAttorneyName: emergencyName,
      //   powerOfAttorneyRelationship: relationship,
      //   powerOfAttorneyPhoneNumber: tel,
      //   //address
      //   address: address,
      //   city: city,
      //   zipCode: zipCode,
      //   //insurance
      //   provider: insuranceProvider,
      //   plan: insurancePlan,
      //   expirationDate: text,
      // });
    }catch(err){
      console.log(err)
    }
    
 
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
        <PageTitle>Medical Information</PageTitle>
      </PageTitleContainer>
      <SignUpForm vertical={true} keyboardDismissMode="on-drag">
        <FormText>Blood type</FormText>
        <DropDownPicker
          open={open}
          value={bloodType}
          items={items}
          setOpen={setOpen}
          setValue={setBloodType}
          setItems={setItems}
          placeholder="select your blood type"
          placeholderStyle={{
            fontSize: 15,
          }}
          style={{ borderColor: "#d8d8d8", backgroundColor: "white" }}
        />
        <FormText>Congenital disease</FormText>
        <BigFormInput
          multiline
          numberOfLines={3}
          onChangeText={onChangeDisease}
          value={disease}
        />
        <FormText>Regular Medication</FormText>
        <BigFormInput
          multiline
          numberOfLines={3}
          onChangeText={onChangeMedication}
          value={medication}
        />
        <FormText>Allergies</FormText>
        <BigFormInput
          multiline
          numberOfLines={3}
          onChangeText={onChangeAllergy}
          value={allergy}
        />
        <Space></Space>
        <CheckBoxContainer>
          <FormText>Do-not-resuscitate</FormText>
          <CheckBox
            checked={checkedDNR}
            onPress={toggleDNR}
            iconType="material-community"
            checkedIcon="checkbox-outline"
            uncheckedIcon={"checkbox-blank-outline"}
          />
        </CheckBoxContainer>

        <CheckBoxContainer>
          <FormText>Organ Donor</FormText>
          <CheckBox
            checked={checkedDonor}
            onPress={toggleDonor}
            iconType="material-community"
            checkedIcon="checkbox-outline"
            uncheckedIcon={"checkbox-blank-outline"}
          />
        </CheckBoxContainer>
        <CenterFormText>Medical Power of Attorney</CenterFormText>
        <FormText>Name</FormText>
        <FormInput onChangeText={setEmergencyName} value={emergencyName} />
        <FormText>Relationship</FormText>
        <DropDownPicker
          open={openRelationships}
          value={relationship}
          items={relationships}
          setOpen={setOpenRelationships}
          setValue={setRelationship}
          setItems={setRelationships}
          placeholder="select relationship"
          placeholderStyle={{
            fontSize: 15,
          }}
          style={{ borderColor: "#d8d8d8", backgroundColor: "white" }}
        />
        <FormText>Tel.</FormText>
        <FormInput onChangeText={setTel} value={tel} />
        <Space></Space>
        <CenterFormText>Insurance information</CenterFormText>
        <FormText>Insurance Provider</FormText>
        <FormInput
          onChangeText={setInsuranceProvider}
          value={insuranceProvider}
        />
        <FormText>Insurance Plan</FormText>
        <FormInput onChangeText={setInsurancePlan} value={insurancePlan} />
        <FormText>Expiration Date</FormText>
        <DateCalendar>
          <SmallFormInput value={text} />
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              display="default"
              onChange={onChange}
            />
          )}
          <Icon
            name="calendar-outline"
            type="ionicon"
            color={Colors.blue}
            size={30}
            onPress={() => setShow(true)}
          />
        </DateCalendar>

        {/* <ButtonContainer>
        <SkipButton
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <BlueButtonText>Skip</BlueButtonText>
        </SkipButton>
        <SaveButton
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <BlueButtonText>Save</BlueButtonText>
        </SaveButton>
        </ButtonContainer> */}
        <BlueButton onPress={handleSubmit}>
          <BlueButtonText>Create account</BlueButtonText>
        </BlueButton>
      </SignUpForm>
    </BlueContainer>
  );
}
export default MedInfoPage;
