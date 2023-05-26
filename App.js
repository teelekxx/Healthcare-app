import { AsyncStorage } from "react-native";
import { auth as firebaseAuth } from "./src/lib/firebase";
import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";

import Navigator from "./src/routes/appStack";
import store from "./src/redux/store.js";
import Auth from "./src/api/auth";
import { Provider } from "react-redux";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Navigator />
      </QueryClientProvider>
    </Provider>
  );
}
