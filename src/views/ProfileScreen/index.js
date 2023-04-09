import { Icon, Avatar, Accessory } from "react-native-elements";
import {
  GreyText,
  Container,
  InfoInput,
  SmallInfoInput,
  DateCalendar,
  BigInfoInput,
  BlueButton,
  BlueButtonText,
  RedButton,
} from "../../components/components/index.style";
import {
  Background,
  EditButton,
  EditButtonText,
  AvaContainer,
} from "./index.style";

import { useEffect, useState } from "react";
import { AsyncStorage } from "react-native";
import AvatarContainer from "../../components/Avatar";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
import { Colors } from "../../constants";
import { async, jsonEval } from "@firebase/util";
import Auth from "../../api/auth";
function ProfileScreen({ navigation }) {
  
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("");
  const [mode, setMode] = useState("Edit");

  const [gender, setGender] = useState("");
  const [id, setID] = useState("");
  const [tel, setTel] = useState("");
  const [address, setAddress] = useState(
    ""
  );
  const [role, setRole] = useState("Regular user");

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ]);
  const [city, setCity] = useState("")
  const [zipCode, setZipCode] = useState("")

  const [text, setText] = useState("");
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const editMode = () => {
    console.log(mode);
    if (mode === "Edit") {
      //editing
      setEdit(true);
      setMode("Save");
    } else {
      //save
      setEdit(false);
      const updateUser = async () =>{
        const token = await AsyncStorage.getItem("token");
        const user = await Auth.updateUserProfile({
          body:{
            name:name,
            dateOfBirth: text,
            gender: gender,
            citizenId: id,
            phoneNumber: tel,
            address: address,
            city:city,
            zipCode:zipCode,

          },token:token
        })
      }
      updateUser();
      setMode("Edit");
    }
  };
  const handleLogOut = async () =>{
    await Auth.logout();
    navigation.navigate("SignIn")
  }

  const onChangeDate = (event, selectedDate) => {
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

  useEffect(() => {
    try {
      const getUserData = async () => {
        const token = await AsyncStorage.getItem("token");
        const user = await Auth.getUserProfile({
          token: token,
        });
        setName(user.data.medicalInformation.name)
        setText(user.data.medicalInformation.dateOfBirth)
        setGender(user.data.medicalInformation.gender)
        setID(user.data.medicalInformation.citizenId)
        setTel(user.data.medicalInformation.phoneNumber)
        setAddress(user.data.address.address)
        setCity(user.data.address.city)
        setZipCode(user.data.address.zipCode)
      };
      getUserData();
    } catch (error) {
      console.error(error);
    }
  }, []);




  return (
    <Background>
      <AvaContainer>
        <AvatarContainer />
        <EditButton onPress={editMode}>
          <EditButtonText>{mode}</EditButtonText>
        </EditButton>
      </AvaContainer>
      <GreyText>Name</GreyText>
      <InfoInput onChangeText={setName} value={name} editable={edit} />
      <GreyText>Date of Birth</GreyText>
      <DateCalendar>
        <SmallInfoInput value={text} editable={edit} />
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}
        <Icon
          name="calendar-outline"
          type="ionicon"
          color={Colors.blue}
          size={30}
          onPress={() => {
            if (mode === "Save") {
              setShow(true);
            }
          }}
        />
      </DateCalendar>
      <GreyText>Gender</GreyText>
      <DropDownPicker
        open={open}
        value={gender}
        items={items}
        setOpen={setOpen}
        setValue={setGender}
        setItems={setItems}
        placeholder={gender}
        placeholderStyle={{
          fontSize: 15,
          color: "#00a5cb",
        }}
        style={{ borderColor: "#d8d8d8", backgroundColor: "white" }}

        textStyle={{
          color: "#00a5cb",
          fontWeight: "bold",
        }}
        disabled={!edit}
      />
      <GreyText>Citizen ID</GreyText>
      <InfoInput onChangeText={setID} value={id} maxLength={14} editable={edit} />
      <GreyText>Tel.</GreyText>
      <InfoInput onChangeText={setTel} value={tel} maxLength={10} editable={edit} />
      <GreyText>Address</GreyText>
      <BigInfoInput
        multiline
        numberOfLines={3}
        onChangeText={setAddress}
        value={address}
        editable={edit}
      />
      <GreyText>City</GreyText>
      <InfoInput onChangeText={setCity} value={city} editable={edit} />
      <GreyText>Zipcode</GreyText>
      <InfoInput onChangeText={setZipCode} value={zipCode} editable={edit} />
      <GreyText>Role</GreyText>
      <InfoInput value={role} editable={false} />
      <BlueButton style={{marginBottom:20}}onPress={() => navigation.navigate("MedInfoSummary")}>
        <BlueButtonText>View Medical Information</BlueButtonText>
      </BlueButton>
      <RedButton onPress={handleLogOut}>
        <BlueButtonText>Log out</BlueButtonText>
      </RedButton>
      
    </Background>
  );
}
export default ProfileScreen;
