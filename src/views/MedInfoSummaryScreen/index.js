import {
  SmallInfoInput,
  BlueContainer,
  SignUpForm,
  FormText,
  PageTitleContainer,
  PageTitle,
  DateCalendar,
  GreyText,
  InfoInput,
  BigInfoInput,
  CenterFormText,
} from "../../components/components/index.style";
import {
  CircleButton,
  EditButton,
  EditButtonText,
  CheckBoxContainer,
  Space,
} from "./index.style";
import { Icon } from "react-native-elements";
import { Colors } from "../../constants";
import { useState } from "react";
import { CheckBox } from "@rneui/themed";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
function MedInfoSummaryScreen({ navigation }) {
  const [edit, setEdit] = useState(false);
  const [mode, setMode] = useState("Edit");
  const [allergy, setAllergy] = useState("Shrimp");
  const [medication, setMedication] = useState("Accutane");
  const [disease, setDisease] = useState("Heart Disease");
  const [open, setOpen] = useState(false);
  const [bloodType, setBloodType] = useState("A");
  const [items, setItems] = useState([
    { label: "A", value: "A" },
    { label: "B", value: "B" },
    { label: "O", value: "O" },
    { label: "AB", value: "AB" },
  ]);
  const [checkedDNR, setCheckedDNR] = useState(true);
  const toggleDNR = () => setCheckedDNR(!checkedDNR);
  const [checkedDonor, setCheckedDonor] = useState(false);
  const toggleDonor = () => setCheckedDonor(!checkedDonor);
  const [name, setName] = useState("Mine Jung");
  const [relationships, setRelationships] = useState([
    { label: "Father", value: "father" },
    { label: "Mother", value: "mother" },
    { label: "Spouse", value: "spouse" },
    { label: "Partner", value: "partner" },
    { label: "Friends", value: "friends" },
  ]);
  const [openRelationships, setOpenRelationships] = useState(false);
  const [relationship, setRelationship] = useState("father");
  const [tel, setTel] = useState("0817977168");
  const [insuranceProvider, setInsuranceProvider] = useState("AIA");
  const [insurancePlan, setInsurancePlan] = useState("Health care");
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [text, setText] = useState("12/05/2023");
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
        <EditButton onPress={editMode}>
          <EditButtonText>{mode}</EditButtonText>
        </EditButton>
        <GreyText>Congenital Disease</GreyText>
        <BigInfoInput
          multiline
          numberOfLines={3}
          onChangeText={setDisease}
          value={disease}
          editable={edit}
        />
        <GreyText>Regular Medication</GreyText>
        <BigInfoInput
          multiline
          numberOfLines={3}
          onChangeText={setMedication}
          value={medication}
          editable={edit}
        />
        <GreyText>Allergies</GreyText>
        <BigInfoInput
          multiline
          numberOfLines={3}
          onChangeText={setAllergy}
          value={allergy}
          editable={edit}
        />
        <GreyText>Blood Type</GreyText>
        <DropDownPicker
          open={open}
          value={bloodType}
          items={items}
          setOpen={setOpen}
          setValue={setBloodType}
          setItems={setItems}
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
        <Space />
        <CheckBoxContainer>
          <FormText>Do-not-resuscitate</FormText>
          <CheckBox
            checked={checkedDNR}
            onPress={toggleDNR}
            iconType="material-community"
            checkedIcon="checkbox-outline"
            uncheckedIcon={"checkbox-blank-outline"}
            disabled={!edit}
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
            disabled={!edit}
          />
        </CheckBoxContainer>
        <CenterFormText>Medical Power of Attorney</CenterFormText>
        <GreyText>Name</GreyText>
        <InfoInput onChangeText={setName} value={name} editable={edit} />
        <GreyText>Relationship</GreyText>
        <DropDownPicker
          open={openRelationships}
          value={relationship}
          items={relationships}
          setOpen={setOpenRelationships}
          setValue={setRelationship}
          setItems={setRelationships}
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
        <GreyText>Tel.</GreyText>
        <InfoInput onChangeText={setTel} value={tel} editable={edit} />
        <CenterFormText>Insurance Information</CenterFormText>
        <GreyText>Insurance Provider</GreyText>
        <InfoInput
          onChangeText={setInsuranceProvider}
          value={insuranceProvider}
          editable={edit}
        />
        <GreyText>Insurance Plan</GreyText>
        <InfoInput
          onChangeText={setInsurancePlan}
          value={insurancePlan}
          editable={edit}
        />
        <GreyText>Expiration Date</GreyText>
        <DateCalendar>
          <SmallInfoInput value={text} editable={edit} />
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
            onPress={() => {
              if (mode === "Save") {
                setShow(true);
              }
            }}
          />
        </DateCalendar>
        <Space></Space>
        <Space></Space>
      </SignUpForm>
    </BlueContainer>
  );
}
export default MedInfoSummaryScreen;
