import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "lib/firebase";
import { request } from "./index";




class Auth {
  static async login(email, password) {
    const emailTrimed = email.trim();
    const passwordTrimed = password.trim();
    const user = await signInWithEmailAndPassword(
      auth,
      emailTrimed,
      passwordTrimed
    );

    return user;
  }

  static async logout() {
    await signOut(auth);
  }

  static async register(email, password, mongoData) {
    // createv user in firebase
   const user = await createUserWithEmailAndPassword(auth, email, password);
    // create user in mongo
    const config = {
      method: HTTP_METHODS.post,
      url: `/`,
      body: options.body,
      token: options.token,
    };

    return request(config).catch((err) => ({ ...err, ok: false }));

  }
}

export default Auth;
