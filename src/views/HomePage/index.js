import { Button, Text, View } from "react-native";
import { NavigationContainer, getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Ionicons from "react-native-vector-icons/Ionicons";
import ProfileScreen from "../ProfileScreen";
import MapPage from "../Map/index";
import EmergencyScreen from "../EmergencyScreen/index";
import RequestScreen from "../RequestScreen/index";
import MedInfoSummaryScreen from "../MedInfoSummaryScreen";
import { Colors } from "../../constants";

// function ProfileScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>Profile screen</Text>
//     </View>
//   );
// }

function PharmaScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Pharma screen</Text>
    </View>
  );
}

function ChatScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Chat screen</Text>
    </View>
  );
}

function HistoryScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>History screen</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

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
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home"
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
        <Tab.Screen name="Pharmacy" component={PharmaScreen} />
        <Tab.Screen name="Chat" component={ChatScreen} />
        <Tab.Screen name="Home" component={AmbulanceStack} />
        <Tab.Screen name="History" component={HistoryScreen} />
        <Tab.Screen name="Profile" component={ProfileStack} options={({ route }) => ({
            tabBarStyle: ((route) => {
              const routeName = getFocusedRouteNameFromRoute(route) ?? ""
              console.log(routeName)
              if (routeName === 'MedInfoSummary') {
                return { display: "none" }
              }
              return
            })(route),
          })}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
export default HomePage;
