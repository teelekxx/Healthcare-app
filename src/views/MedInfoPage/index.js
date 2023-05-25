import { useState } from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
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
  WhiteKeyboard,
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
import { auth } from "../../lib/firebase";

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
    faceImg,
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
  const [uid, setUid] = useState("");
  const [insuranceNumber, setInsuranceNumber] = useState("");
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
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user._tokenResponse.idToken);
      // regular user
      if (role === "Regular user") {
        const formData = new FormData();
        formData.append("role", "user");
        formData.append("email", email);
        formData.append("verificationStatus","false");
        formData.append("name", name);
        formData.append("dateOfBirth",dateOfBirth);
        formData.append("gender",gender);
        formData.append("citizenId", citizenId);
        formData.append("phoneNumber",phoneNumber);
        formData.append("bloodType",bloodType);
        formData.append("congenitalDisease",disease);
        formData.append("regularMed", medication);
        formData.append("allergies", allergy);
        formData.append("DNRStatus", checkedDNR);
        formData.append("organDonour", checkedDonor);
        formData.append("powerOfAttorneyName", emergencyName)
        formData.append("powerOfAttorneyRelationship", relationship);
        formData.append("powerOfAttorneyPhoneNumber", tel);
        formData.append("address", address);
        formData.append("city", city);
        formData.append("zipCode", zipCode);
        formData.append("provider", insuranceProvider);
        formData.append("plan", insurancePlan);
        formData.append("expirationDate", text );
        formData.append("faceImg",faceImg );
        console.log("user created", formData)
        const res = await Auth.registerUser({
          body:formData,
          token: user._tokenResponse.idToken,
        });
        console.log("in user function")
        //pharmacist
      } else if (role === "Pharmacist") {
        console.log("here");
        const {
          licenseNum,
          licenseDate,
          pharName,
          pharDescription,
          pharAddress,
          pharCity,
          pharZipCode,
          pharLatitude,
          pharLongitude,
        } = route.params;
        const formData = new FormData();
        formData.append("role", "pharmacist");
        formData.append("email", email);
        formData.append("verificationStatus","false");
        formData.append("name", name);
        formData.append("dateOfBirth",dateOfBirth);
        formData.append("gender",gender);
        formData.append("citizenId", citizenId);
        formData.append("phoneNumber",phoneNumber);
        formData.append("bloodType",bloodType);
        formData.append("congenitalDisease",disease);
        formData.append("regularMed", medication);
        formData.append("allergies", allergy);
        formData.append("DNRStatus", checkedDNR);
        formData.append("organDonour", checkedDonor);
        formData.append("powerOfAttorneyName", emergencyName)
        formData.append("powerOfAttorneyRelationship", relationship);
        formData.append("powerOfAttorneyPhoneNumber", tel);
        formData.append("address", address);
        formData.append("city", city);
        formData.append("zipCode", zipCode);
        formData.append("provider", insuranceProvider);
        formData.append("plan", insurancePlan);
        formData.append("expirationDate", text );
        formData.append("faceImg",faceImg );
        formData.append("pharmacistVerificationStatus",false );
        formData.append("licenseId",licenseNum);
        formData.append("licenseExpireDate",licenseDate)
        const res = await Auth.registerUser({
          body:formData,
          token: user._tokenResponse.idToken,
        });
        const phar = await Auth.registerPharmacy({
          body: {
            pharmacistId: res.data.pharmacist._id,
            address: pharAddress,
            city: pharCity,
            zipCode: pharZipCode,
            latitude: pharLatitude,
            longitude: pharLongitude,
            type: "pharmacist",
            name: pharName,
            description: pharDescription,
          },
        });
      } else if (role === "Paramedic") {
        const { licenseDate, licenseNum, hospitalId } = route.params;
        const formData = new FormData();
        formData.append("role", "paramedics");
        formData.append("email", email);
        formData.append("verificationStatus","false");
        formData.append("name", name);
        formData.append("dateOfBirth",dateOfBirth);
        formData.append("gender",gender);
        formData.append("citizenId", citizenId);
        formData.append("phoneNumber",phoneNumber);
        formData.append("bloodType",bloodType);
        formData.append("congenitalDisease",disease);
        formData.append("regularMed", medication);
        formData.append("allergies", allergy);
        formData.append("DNRStatus", checkedDNR);
        formData.append("organDonour", checkedDonor);
        formData.append("powerOfAttorneyName", emergencyName)
        formData.append("powerOfAttorneyRelationship", relationship);
        formData.append("powerOfAttorneyPhoneNumber", tel);
        formData.append("address", address);
        formData.append("city", city);
        formData.append("zipCode", zipCode);
        formData.append("provider", insuranceProvider);
        formData.append("plan", insurancePlan);
        formData.append("expirationDate", text );
        formData.append("faceImg",faceImg );
        formData.append("licenseId",licenseNum);
        formData.append("licenseExpireDate",licenseDate)
        formData.append("hospitalId", hospitalId)
        const res = await Auth.registerUser({
          body:formData,
          token: user._tokenResponse.idToken,
        });
      }

      navigation.navigate("SignIn");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
        <WhiteKeyboard
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <SignUpForm>
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
            <FormInput onChangeText={setTel} value={tel} maxLength={10} />
            <Space></Space>
            <CenterFormText>Insurance information</CenterFormText>
            <FormText>Insurance Provider</FormText>
            <FormInput
              onChangeText={setInsuranceProvider}
              value={insuranceProvider}
            />
            <FormText>Insurance Number</FormText>
            <FormInput
              onChangeText={setInsuranceNumber}
              value={insuranceNumber}
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
        </WhiteKeyboard>
      </BlueContainer>
    </TouchableWithoutFeedback>
  );
}
export default MedInfoPage;
