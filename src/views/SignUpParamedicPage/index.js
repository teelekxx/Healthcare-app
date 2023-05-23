
import { useState, useEffect } from "react";
import { Text, Platform, Keyboard, TouchableWithoutFeedback } from "react-native";
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
  WhiteKeyboard,
  DateCalendar,
} from "../../components/components/index.style";
import { CircleButton, InputBoundary } from "./index.style";
import { Icon } from "react-native-elements";
import { Colors } from "../../constants";
import AvatarContainer from "../../components/Avatar/index";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Formik, ErrorMessage } from "formik";
import Modal from "react-native-modal";
import MapPicker from "../../components/MapPicker/index";
import Auth from "../../api/auth";

function SignUpParamedicPage({ navigation, route }) {
  const { email, password, role } = route.params;
  const [name, onChangeName] = useState("");
  const [id, onChangeID] = useState("");
  const [phone, onChangePhone] = useState("");
  const [address, onChangeAddress] = useState("");
  const [city, onChangeCity] = useState("");
  const [zipCode, onChangeZipCode] = useState("");
  const [open, setOpen] = useState(false);
  const [gender, setGender] = useState(null);
  const [licenseNum, setLicenseNum] = useState("");
  const [licenseDate, setLicenseDate] = useState(new Date());
  const [items, setItems] = useState([
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ]);
  const [date, setDate] = useState(new Date());
  const [openHospital, setOpenHospital] = useState(false);
  const [show, setShow] = useState(false);
  const [text, setText] = useState("select date");
  const [licenseText, setLicenseText] = useState("select date");
  const [showLicense, setShowLicense] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : 0;
  //hospital options
  let extractedHospitals = [];
  const [hospitals, setHospitals] = useState([]);
  useEffect(() => {
    try {
      const getAllHospitals = async () => {
        const res = await Auth.getHospitals({});
        console.log("data", res.data);
        if(extractedHospitals.length == 0){
          for (let i = 0; i < res.data.length; i++) {
            const hospital = { label: res.data[i].name, value: res.data[i]._id };
            extractedHospitals.push(hospital);
          }
          console.log(extractedHospitals);
        }
       
        //  setHospitals(res)
      };
      getAllHospitals();
    } catch (error) {
      console.error(error);
    }
  }, []);
  const [hospitalOptions, setHospitalOptions] = useState(extractedHospitals);
  const [selectedHospital, setSelectedHospital] = useState("");

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
  const onChangeLicense = (event, selectedDate) => {
    const currentDate = selectedDate || licenseDate;
    setLicenseDate(currentDate);
    setShowLicense(false);
    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    setLicenseText(fDate);
  };
  const handleSubmit = (values) => {
    navigation.navigate("MedInfo", {
      email: email,
      password: password,
      role: role,
      name: values.name,
      dateOfBirth: values.text,
      gender: gender,
      citizenId: values.citizenId,
      phoneNumber: values.phone,
      address: address,
      city: city,
      zipCode: zipCode,
      licenseNum: values.licenseNum,
      licenseDate: licenseText,
      hospitalId: selectedHospital,
    });
  };

  DropDownPicker.setListMode("SCROLLVIEW");

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
        <PageTitle>Sign Up</PageTitle>
      </PageTitleContainer>
      <Formik
        initialValues={{
          name: "",
          dateOfBirth: new Date(),
          citizenId: "",
          phoneNumber: "",
          licenseNum: "",
        }}
        onSubmit={handleSubmit}
        validate={(values) => {
          const errors = {};

          if (!values.name) {
            errors.name = "Name is required";
          }
          if (!values.dateOfBirth) {
            errors.dateOfBirth = "Date of Birth is required";
          }
          if (!values.citizenId) {
            errors.citizenId = "Citizen ID is required";
          } else if (!/^\d+$/.test(values.citizenId)) {
            errors.citizenId = "Citizen ID is in a wrong format";
          } else if (values.citizenId.length < 13) {
            errors.citizenId = "Citizen ID must be 13 characters long";
          }
          if (!values.phoneNumber) {
            errors.phoneNumber = "Phone number is required";
          } else if (!/^\d+$/.test(values.phoneNumber)) {
            errors.phoneNumber = "Phone number is in a wrong format";
          }
          if (!values.licenseNum) {
            errors.licenseNum = "Medical license No. is required";
          }
          return errors;
        }}
        validateOnChange={false}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <WhiteKeyboard
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <SignUpForm nestedScrollEnabled horizontal={false}>
              <AvatarContainer />
              <FormText>Name</FormText>
              <FormInput
                type="text"
                placeholderTextColor={Colors.grey}
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
              />
              <ErrorMessage
                name="name"
                component={Text}
                style={{ color: "red" }}
              />
              <FormText>Date of Birth</FormText>
              <DateCalendar>
                <SmallFormInput value={text} />
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={values.dateOfBirth}
                    mode="date"
                    display="default"
                    onChange={onChange}
                    onBlur={handleBlur("dateOfBirth")}
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
              <ErrorMessage
                name="dateOfBirth"
                component={Text}
                style={{ color: "red" }}
              />

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
              <FormInput
                type="text"
                placeholderTextColor={Colors.grey}
                onChangeText={handleChange("citizenId")}
                onBlur={handleBlur("citizenId")}
                value={values.citizenId}
              />
              <ErrorMessage
                name="citizenId"
                component={Text}
                style={{ color: "red" }}
              />
              <FormText>Tel.</FormText>
              <FormInput
                type="text"
                placeholderTextColor={Colors.grey}
                onChangeText={handleChange("phoneNumber")}
                onBlur={handleBlur("phoneNumber")}
                value={values.phoneNumber}
              />
              <ErrorMessage
                name="phoneNumber"
                component={Text}
                style={{ color: "red" }}
              />
              <FormText>Hospital</FormText>
              <DropDownPicker
                open={openHospital}
                value={selectedHospital}
                items={hospitalOptions}
                setOpen={setOpenHospital}
                setValue={setSelectedHospital}
                setItems={setHospitalOptions}
                placeholder="select your hospital"
                searchable={true}
                searchPlaceholder="Search..."
                placeholderStyle={{
                  fontSize: 15,
                }}
                dropDownContainerStyle={{
                  borderColor: "#dfdfdf",
                }}
                style={{ borderColor: "#d8d8d8", backgroundColor: "white" }}
              />
              <FormText>Medical license No.</FormText>
              <FormInput
                type="text"
                placeholderTextColor={Colors.grey}
                onChangeText={handleChange("licenseNum")}
                onBlur={handleBlur("licenseNum")}
                value={values.licenseNum}
              />
              <ErrorMessage
                name="licenseNum"
                component={Text}
                style={{ color: "red" }}
              />
              <FormText>Medical license expiration date</FormText>
              <DateCalendar>
                <SmallFormInput value={licenseText} />
                {showLicense && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={licenseDate}
                    mode="date"
                    display="default"
                    onChange={onChangeLicense}
                  />
                )}
                <Icon
                  name="calendar-outline"
                  type="ionicon"
                  color={Colors.blue}
                  size={30}
                  onPress={() => setShowLicense(true)}
                />
              </DateCalendar>
              <FormText>Address</FormText>
              <BigFormInput
                multiline
                numberOfLines={3}
                onChangeText={onChangeAddress}
                value={address}
              />
              <FormText>City</FormText>
              <FormInput onChangeText={onChangeCity} value={city} />
              <FormText>Zip Code</FormText>
              <FormInput onChangeText={onChangeZipCode} value={zipCode} />
              <BlueButton onPress={handleSubmit}>
                <BlueButtonText>Next</BlueButtonText>
              </BlueButton>
            </SignUpForm>
          </WhiteKeyboard>
        )}
      </Formik>
    </BlueContainer>
    </TouchableWithoutFeedback>
  );
}
export default SignUpParamedicPage;
