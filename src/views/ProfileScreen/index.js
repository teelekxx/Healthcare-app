import { Icon, Avatar, Accessory } from "react-native-elements";
import {
  GreyText,
  Container,
  InfoInput,
  SmallInfoInput,
  DateCalendar,
  BigInfoInput,
} from "../../components/components/index.style";
import {
  Background,
  EditButton,
  EditButtonText,
  AvaContainer,
} from "./index.style";
import { useState } from "react";
import AvatarContainer from "../../components/Avatar";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
import { Colors } from "../../constants";
function ProfileScreen({ navigation }) {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("John Doe");
  const [mode, setMode] = useState("Edit");
  const [gender, setGender] = useState("Male");
  const [id, setID] = useState("12345678912345");
  const [tel, setTel] = useState("0817977168");
  const [address, setAddress] = useState("111, soi Chan 43 Yaek 18, Bangkhlo, Bangkholaem, Bkk, 10120");
  const [role, setRole] = useState("regular user")
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ]);
  const [text, setText] = useState("22/05/2001");
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const editMode = () => {
    console.log(mode);
    if (mode === "Edit") {
      setEdit(true);
      setMode("Save");
    } else {
      setEdit(false);
      setMode("Edit");
    }
  };
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
        textStyle={{ color: "#00a5cb", fontFamily: "Monaco", fontWeight: "bold" }}
        disabled={!edit}
      />
      <GreyText>Citizen ID</GreyText>
      <InfoInput onChangeText={setID} value={id} editable={edit} />
      <GreyText>Tel.</GreyText>
      <InfoInput onChangeText={setTel} value={tel} editable={edit} />
      <GreyText>Address</GreyText>
      <BigInfoInput multiline numberOfLines={3}  onChangeText={setAddress} value={address} editable ={edit}/>
      <GreyText>Role</GreyText>
      <InfoInput value={role} editable={false} />
    </Background>
  );
}
export default ProfileScreen;
