import { createSlice, configureStore } from "@reduxjs/toolkit";

const authentication = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: false,
  error: null,
  loginMode: "",
  expoPushToken: "",
  nextPage: "",

};
const authenticationSlice = createSlice({
  name: "Authentication",
  initialState: authentication,
  reducers: {
    setLoginMode(state, value) {
      state.loginMode = value.payload.loginMode;
    },
    login(state,value) {
      state.isAuthenticated = true;
      state.user = value.payload.user;
      state.token = value.payload.token;
      state.loading = false;
      state.error = null;
    },
    logout(state, value) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
                
    },
    setExpoPushToken(state, value) {
      state.expoPushToken = value.payload.expoPushToken;
    },
    setNextPage(state, value) {
      state.nextPage = value.payload.nextPage;

    },
    loading(state, value) {
      state.loading = true;
    },
    error(state, value) {
      state.loading = false;
      state.error = value.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    Authentication: authenticationSlice.reducer,
  },
  //   middleware: (getDefaultMiddleware) =>
  //     getDefaultMiddleware({
  //       serializableCheck: {
  //         ignoredActionPaths: ["payload.onConfirm", "payload.onCancel"],
  //         ignoredPaths: ["Alert.onConfirm", "Alert.onCancel"],
  //       },
  //     }),
});

export const AuthenticationActions = authenticationSlice.actions;
export default store;