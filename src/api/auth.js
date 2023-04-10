import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../lib/firebase";
import { HTTP_METHODS } from "./constant";
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


  static async registerUser(option) {


    const config = {
      method: HTTP_METHODS.post,
      url: `/user`,
      body: option.body,
      token: option.token,
    };
    console.log(config)
    
    return request(config).catch((err) => ({ ...err, isOk: false }));

  }
  static async registerPharmacy(option) {


    const config = {
      method: HTTP_METHODS.post,
      url: `/pharmacy`,
      body: option.body,
      token: option.token,
    };
    console.log(config)
    
    return request(config).catch((err) => ({ ...err, isOk: false }));

  }
  static async getUserProfile(option){
    const config = {
      method: HTTP_METHODS.get,
      url: `/user`,
      body: option.body,
      token: option.token,
    };
    console.log(config)
    
    return request(config).catch((err) => ({ ...err, isOk: false }));
  }
  static async checkUserEmail(option){
    const config = {
      method: HTTP_METHODS.post,
      url: `/register/email`,
      body: option.body,
      token: option.token,
    };
    console.log(config)
    
    return request(config).catch((err) => ({ ...err, isOk: false }));
  }
  static async updateUserProfile(option){
    const config = {
      method: HTTP_METHODS.put,
      url: `/user`,
      body: option.body,
      token: option.token,
    };
    console.log(config)
    
    return request(config).catch((err) => ({ ...err, isOk: false }));
  }
  static async postEmergencyCase(option){
    const config = {
      method: HTTP_METHODS.post,
      url: `/emergency/case`,
      body: option.body,
      token: option.token,
    };
    console.log(config)
    
    return request(config).catch((err) => ({ ...err, isOk: false }));
  }


}

export default Auth;
