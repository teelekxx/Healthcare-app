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
  DateCalendar,
  WhiteKeyboard,
} from "../../components/components/index.style";
import { CircleButton, Block } from "./index.style";
import { Icon, Avatar, Accessory } from "react-native-elements";
import { Colors } from "../../constants";
import AvatarContainer from "../../components/Avatar/index";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Formik, ErrorMessage } from "formik";
import useImagePicker from "../../hooks/useImagePicker.js";
function SignUpRegularPage({ navigation, route }) {
  const { email, password, role } = route.params;
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
  const [date, setDate] = useState(new Date());
  // const [mode, setMode] = useState('date')
  const [show, setShow] = useState(false);
  const [text, setText] = useState("select date");
  const [{ images }, { pickImage, setImages }] = useImagePicker();
  useEffect(()=>{
    setImages(null)
  },[])
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
  const handleSubmit = (values) => {
    console.log("email:",email,text,values.phoneNumber)
    navigation.navigate("MedInfo", {
      email: email,
      password: password,
      role: role,
      name: values.name,
      dateOfBirth: text,
      gender: gender,
      citizenId: values.citizenId,
      phoneNumber: values.phoneNumber,
      address: address,
      city: city,
      zipCode: zipCode,
      ...(images && images[0] && { faceImg: images[0] }),
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
          return errors;
        }}
        validateOnChange={false}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <WhiteKeyboard
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <SignUpForm>
            <Block>
                  <Avatar
                    // source={require("../../../assets/appLogo.png")}
                    size={"large"}
                    rounded
                    icon={{ name: "user", type: "font-awesome" }}
                    overlayBlockStyle={{ backgroundColor: "#efece8" }}
                    source={
                      images && images[0]?.uri
                        ? { uri: images[0].uri }
                        : require("../../../assets/profile-picture-empty.png")
                    }
                  >
                    <Accessory
                      size={24}
                      containerStyle={{ borderRadius: 50 }}
                      onPress={pickImage}
                    />
                  </Avatar>
                </Block>
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
export default SignUpRegularPage;
