import { AsyncStorage } from "react-native";
import { auth as firebaseAuth } from "./src/lib/firebase";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import Navigator from "./src/routes/appStack";
export default function App() {
  const setNewToken = async () => {
    await AsyncStorage.setItem(
      "token",
      await firebaseAuth.currentUser.getIdToken()
    );
  };

  const fetchUserInfomation = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      // const res = await User.get({
      //   type: User.USER_GET_USER_DETAIL,
      //   token,
      // });

      // const data = await UserController.getUserByUid(res.user.uid);

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
  useEffect(()=> {
    firebaseAuth.onIdTokenChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        const { authTimeMillis, expirationTimeMillis } = idTokenResult;
        const timeToExpiration = expirationTimeMillis - authTimeMillis;
        const refreshTokenTimeToExpiration = user.refreshTokenTimeToExpiration;
        if (refreshTokenTimeToExpiration && refreshTokenTimeToExpiration < timeToExpiration) {
          // The refresh token is expiring soon, refresh it.
          await user.getIdToken(/* forceRefresh */ true);
        }
      }
    });
  }, [])

  return <Navigator />;
}
