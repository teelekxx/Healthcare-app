import React, { useRef, useEffect, useState, useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AsyncStorage } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { auth as firebaseAuth } from "../../src/lib/firebase";
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
import Prescription from "../views/PrescriptionScreen";
import ChatScreen from "../views/ChatScreen";
import PharmaFinalScreen from "../views/PharmaFinalScreen";
import MedInfoSummaryScreen from "../views/MedInfoSummaryScreen";
import HistoryDetailScreen from "../views/HistoryDetailScreen";
import AmbulanceHistoryScreen from "../views/AmbulanceHistoryScreen";
import NotificationController from "../firestore/notification";
import { useDispatch, useSelector } from "react-redux";
import { AuthenticationActions } from "../../src/redux/store.js";
import Auth from "../../src/api/auth";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import NavigationService from "../lib/NavigationService";

const Stack = createNativeStackNavigator();

const MyStack = ({ navigation }) => {
  const dispatch = useDispatch();

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  async function sendPushNotification(expoPushToken) {
    const message = {
      to: expoPushToken,
      sound: "default",
      title: "Original Title",
      body: "And here is the body!",
      data: { someData: "goes here" },
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  }

  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

  const setNewToken = async () => {
    await AsyncStorage.setItem(
      "token",
      await firebaseAuth.currentUser.getIdToken()
    );
  };

  const fetchUserInfomation = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const data = await Auth.getUserProfile({
        token,
      });

      if (data.isOk) {
        const user = data.data.user;
        dispatch(AuthenticationActions.login({ user, token }));
      }
    } catch (e) {
      console.error(e);
      console.error("Fetch User Info error", e);
    }
  }, []);

  useEffect(() => {
    const unlisten = firebaseAuth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        await setNewToken();
        await fetchUserInfomation();
        setTokenInterval = setInterval(() => {
          setNewToken();
          fetchUserInfomation();
        }, 1000 * 60 * 15);
      } else {
        AsyncStorage.removeItem("token");
      }
    });
  }, []);
  useEffect(() => {
    firebaseAuth.onIdTokenChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        const { authTimeMillis, expirationTimeMillis } = idTokenResult;
        const timeToExpiration = expirationTimeMillis - authTimeMillis;
        const refreshTokenTimeToExpiration = user.refreshTokenTimeToExpiration;
        if (
          refreshTokenTimeToExpiration &&
          refreshTokenTimeToExpiration < timeToExpiration
        ) {
          // The refresh token is expiring soon, refresh it.
          await user.getIdToken(/* forceRefresh */ true);
        }
      }
    });
  }, []);

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const auth = useSelector((state) => state.Authentication);

  const appendToFireStore = async ({ uid, token: expoPushToken }) => {
    dispatch(AuthenticationActions.setExpoPushToken({ expoPushToken }));

    await NotificationController.pushToken({
      uid,
      token: expoPushToken,
    });
  };

  useEffect(() => {
    console.log("hello");
    registerForPushNotificationsAsync().then((token) => {
      console.log("token here", token);
      if (auth.isAuthenticated)
        appendToFireStore({ uid: auth.user.uid, token: token });
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        // console.log(response.notification.request.content.data.feature);

        dispatch(AuthenticationActions.setNextPage({ nextPage: "History" }));
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
        })}
      >
        <Stack.Screen name="Landing" component={LandingPage} />
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="SignIn" component={SignInPage} />
        <Stack.Screen name="ForgetPassword" component={ForgetPasswordPage} />
        <Stack.Screen name="SignUp" component={SignUpPage} />
        <Stack.Screen name="Prescription" component={Prescription} />
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
        <Stack.Screen
          name="AmbulanceHistory"
          component={AmbulanceHistoryScreen}
        />
        <Stack.Screen name="Chatting" component={ChatScreen} />
        <Stack.Screen name="PharmaFinal" component={PharmaFinalScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MyStack;
