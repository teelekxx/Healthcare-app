import { AsyncStorage } from "@react-native-async-storage/async-storage";
import { auth as firebaseAuth } from "./src/lib/firebase";
import React, { useRef, useEffect, useState, useCallback } from "react";

import Navigator from "./src/routes/appStack";
import store from "./src/redux/store.js";
import Auth from "./src/api/auth";
import { Provider } from "react-redux";


export default function App() {


  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}
