import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import LandingPage from "../views/LandingPage/index";
import SignInPage from "../views/SignInPage/index";
import SignUpPage from "../views/SignUpPage/index";
import HomePage from "../views/HomePage/index";
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
    // MedInfo:{
    //   screen: MedInfoPage,
    //   navigationOptions: {
    //     headerShown: false,
    //   },
    // },
    SignIn: {
      screen: SignInPage,
      navigationOptions: {
        headerShown: false,
      },
    },
    // FirstAid: {
    //   screen: FirstAidPage,
    //   navigationOptions: {
    //     headerShown: false,
    //   },
    // },
    // History: {
    //   screen: HistoryPage,
    //   navigationOptions: {
    //     headerShown: false,
    //   },
    // },
    // Chat: {
    //   screen: ChatPage,
    //   navigationOptions: {
    //     headerShown: false,
    //   },
    // },
    // GotAmbulance: {
    //   screen: GotAmbulancePage,
    //   navigationOptions: {
    //     headerShown: false,
    //   },
    // },
    // Arrival: {
    //   screen: AmbulanceArrival,
    //   navigationOptions: {
    //     headerShown: false,
    //   },
    // },
  };
  const Stack = createStackNavigator(screens);
  
  export default createAppContainer(Stack);