import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
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

const screens = {
  Landing: {
    screen: LandingPage,
    navigationOptions: {
      headerShown: false,
    },
  },
  Home: {
    screen: HomePage,
    navigationOptions: {
      headerShown: false,
    },
  },
  SignUp: {
    screen: SignUpPage,
    navigationOptions: {
      headerShown: false,
    },
  },
  Map: {
    screen: MapPage,
    navigationOptions: {
      headerShown: false,
    },
  },

    SignIn: {
      screen: SignInPage,
      navigationOptions: {
        headerShown: false,
      },
    },
    Role: {
      screen: RolePage,
      navigationOptions: {
        headerShown: false,
      },
    },
    SignUpRegular:{
      screen: SignUpRegularPage,
      navigationOptions: {
        headerShown: false,
      },
    },
    SignUpPharmacist:{
      screen: SignUpPharmacistPage,
      navigationOptions: {
        headerShown: false,
      },
    },
    SignUpParamedic:{
      screen: SignUpParamedicPage,
      navigationOptions: {
        headerShown: false,
      },
    },
    MedInfo:{
      screen: MedInfoPage,
      navigationOptions: {
        headerShown: false,
      },
    }
  };
  const Stack = createStackNavigator(screens);
  
  export default createAppContainer(Stack);
