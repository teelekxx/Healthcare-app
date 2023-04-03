import { Button, Text, View } from "react-native";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors } from "../../constants";
import ProfileScreen from "../ProfileScreen";
import MapPage from "../Map/index";
import EmergencyScreen from "../EmergencyScreen/index";
import RequestScreen from "../RequestScreen/index";
import ChatsListScreen from "../ChatsListScreen/index";
import ChatScreen from "../ChatScreen/index";
import NotificationsScreen from "../NotificationsScreen/index";
import MedInfoSummaryScreen from "../MedInfoSummaryScreen";
import HistoryScreen from "../HistoryScreen";
import PatientPharmacyScreen from "../PatientPharmacyScreen/index";
import FirstaidScreen from "../FirstaidScreen/index";

import CPRScreen from "../FirstaidInfoScreens/CPRScreen/index";
import HeimlichScreen from "../FirstaidInfoScreens/HeimlichScreen/index";
import SplintScreen from "../FirstaidInfoScreens/SplintScreen/index";
import BleedingScreen from "../FirstaidInfoScreens/BleedingScreen/index";
import SprainScreen from "../FirstaidInfoScreens/SprainScreen/index";
import BurnScreen from "../FirstaidInfoScreens/BurnScreen/index";

// function ProfileScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>Profile screen</Text>
//     </View>
//   );
// }

// function PharmaScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>Pharma screen</Text>
//     </View>
//   );
// }

// function HistoryScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>History screen</Text>
//     </View>
//   );
// }

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function PharmacyStack() {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
      })}
    >
      <Stack.Screen name="PatientPharmacy" component={PatientPharmacyScreen} />
      <Stack.Screen name="Chatting" component={ChatScreen} />
      <Stack.Screen name="Notification" component={NotificationStack} />
    </Stack.Navigator>
  );
}

function AmbulanceStack() {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
      })}
    >
      <Stack.Screen name="Emergency" component={EmergencyScreen} />
      <Stack.Screen name="Request" component={RequestScreen} />
      <Stack.Screen name="Map" component={MapPage} />
      <Stack.Screen name="Firstaid" component={FirstaidScreen} />
      <Stack.Screen name="CPR" component={CPRScreen} />
      <Stack.Screen name="Heimlich Maneuver" component={HeimlichScreen} />
      <Stack.Screen name="Set a Splint" component={SplintScreen} />
      <Stack.Screen name="Stop the Bleeding" component={BleedingScreen} />
      <Stack.Screen name="Support a Sprain" component={SprainScreen} />
      <Stack.Screen name="Treat a Burn" component={BurnScreen} />
      <Stack.Screen name="Notification" component={NotificationStack} />
    </Stack.Navigator>
  );
}

function NotificationStack() {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
      })}
    >
      <Stack.Screen name="NotificationList" component={NotificationsScreen} />
      <Stack.Screen name="Chatting" component={ChatScreen} />
    </Stack.Navigator>
  );
}

function ChatStack({ navigation, route }) {
  // navigation.setOptions({
  //   tabBarStyle: { display: "none" },
  // });
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
      })}
    >
      <Stack.Screen name="ChatList" component={ChatsListScreen} />
      <Stack.Screen name="Chatting" component={ChatScreen} />
      <Stack.Screen name="Notification" component={NotificationStack} />
    </Stack.Navigator>
  );
}
function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
      })}
    >
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
      <Stack.Screen name="MedInfoSummary" component={MedInfoSummaryScreen} />
    </Stack.Navigator>
  );
}

function HomePage({ navigation }) {
  return (
    // <NavigationContainer>
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "car" : "car-outline";
          } else if (route.name === "History") {
            iconName = focused ? "ios-list" : "ios-list-outline";
          } else if (route.name === "Pharmacy") {
            iconName = focused ? "medkit" : "medkit-outline";
          } else if (route.name === "Chat") {
            iconName = focused
              ? "chatbubble-ellipses"
              : "chatbubble-ellipses-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.blue,
        tabBarInactiveTintColor: Colors.grey,
      })}
    >
      <Tab.Screen
        name="Pharmacy"
        component={PharmacyStack}
        options={({ route }) => ({
          tabBarStyle: ((route) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? "";
            if (routeName === "Chatting") {
              return { display: "none" };
            }
            return;
          })(route),
        })}
      />
      <Tab.Screen
        name="Chat"
        component={ChatStack}
        options={({ route }) => ({
          tabBarStyle: ((route) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? "";
            if (routeName === "Chatting" || routeName === "Notification") {
              return { display: "none" };
            }
            return;
          })(route),
        })}
      />
      <Tab.Screen
        name="Home"
        component={AmbulanceStack}
        options={({ route }) => ({
          tabBarStyle: ((route) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? "";
            if (
              routeName === "Notification" ||
              routeName === "Firstaid" ||
              routeName === "CPR" ||
              routeName === "Heimlich Maneuver" ||
              routeName === "Set a Splint" ||
              routeName === "Stop the Bleeding" ||
              routeName === "Support a Sprain" ||
              routeName === "Treat a Burn"
            ) {
              return { display: "none" };
            }
            return;
          })(route),
        })}
      />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={({ route }) => ({
          tabBarStyle: ((route) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? "";
            if (routeName === "MedInfoSummary") {
              return { display: "none" };
            }
            return;
          })(route),
        })}
      />
    </Tab.Navigator>
    // </NavigationContainer>
  );
}
export default HomePage;
