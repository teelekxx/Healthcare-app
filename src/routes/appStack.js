// import { createStackNavigator } from "react-navigation-stack";
// import { createAppContainer } from "react-navigation";
// import LandingPage from "../views/LandingPage/index";
// import SignInPage from "../views/SignInPage/index";
// import SignUpPage from "../views/SignUpPage/index";
// import HomePage from "../views/HomePage/index";
// import MapPage from "../views/Map/index";
// import RolePage from "../views/RolePage/index";
// import SignUpParamedicPage from "../views/SignUpParamedicPage";
// import SignUpPharmacistPage from "../views/SignUpPharmacistPage";
// import SignUpRegularPage from "../views/SignUpRegularPage";
// import MedInfoPage from "../views/MedInfoPage";

// const screens = {
//   Landing: {
//     screen: LandingPage,
//     navigationOptions: {
//       headerShown: false,
//     },
//   },
//   Home: {
//     screen: HomePage,
//     navigationOptions: {
//       headerShown: false,
//     },
//   },
//   SignUp: {
//     screen: SignUpPage,
//     navigationOptions: {
//       headerShown: false,
//     },
//   },
//   Map: {
//     screen: MapPage,
//     navigationOptions: {
//       headerShown: false,
//     },

//   },

//   SignIn: {
//     screen: SignInPage,
//     navigationOptions: {
//       headerShown: false,
//     },
//   },
//   Role: {
//     screen: RolePage,
//     navigationOptions: {
//       headerShown: false,
//     },
//   },
//   SignUpRegular: {
//     screen: SignUpRegularPage,
//     navigationOptions: {
//       headerShown: false,
//     },
//   },
//   SignUpPharmacist: {
//     screen: SignUpPharmacistPage,
//     navigationOptions: {
//       headerShown: false,
//     },
//   },
//   SignUpParamedic: {
//     screen: SignUpParamedicPage,
//     navigationOptions: {
//       headerShown: false,
//     },
//   },
//   MedInfo: {
//     screen: MedInfoPage,
//     navigationOptions: {
//       headerShown: false,
//     },
//   },
// };
// const Stack = createStackNavigator(screens);

// export default createAppContainer(Stack);
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingPage from "../views/LandingPage/index";
import SignInPage from "../views/SignInPage/index";
import SignUpPage from "../views/SignUpPage/index";
import HomePage from "../views/HomePage/index";
import MapPage from "../views/Map/index";
import RolePage from "../views/RolePage/index";
import SignUpParamedicPage from "../views/SignUpParamedicPage";
import SignUpPharmacistPage from "../views/SignUpPharmacistPage";
import SignUpRegularPage from "../views/SignUpRegularPage";
import MedInfoPage from "../views/MedInfoPage";
import ForgetPasswordPage from "../views/ForgetPasswordPage";
import ChatScreen from "../views/ChatScreen";
import MedInfoSummaryScreen from "../views/MedInfoSummaryScreen";
import HistoryDetailScreen from "../views/HistoryDetailScreen";
const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
        })}
      >
        <Stack.Screen name="Landing" component={LandingPage} />
        <Stack.Screen name="SignIn" component={SignInPage} />
        <Stack.Screen name="ForgetPassword" component={ForgetPasswordPage} />
        <Stack.Screen name="SignUp" component={SignUpPage} />
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="Map" component={MapPage} />
        <Stack.Screen name="Role" component={RolePage} />
        <Stack.Screen name="SignUpParamedic" component={SignUpParamedicPage} />
        <Stack.Screen
          name="SignUpPharmacist"
          component={SignUpPharmacistPage}
        />
        <Stack.Screen name="SignUpRegular" component={SignUpRegularPage} />
        <Stack.Screen name="MedInfo" component={MedInfoPage} />
        <Stack.Screen name="MedInfoSummary" component={MedInfoSummaryScreen} />
        <Stack.Screen name="HistoryDetail" component={HistoryDetailScreen} />
        <Stack.Screen name="Chatting" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MyStack;
