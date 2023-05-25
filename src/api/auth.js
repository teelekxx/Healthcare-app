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
    console.log(config);

    return request(config).catch((err) => ({ ...err, isOk: false }));
  }
  static async registerPharmacy(option) {
    const config = {
      method: HTTP_METHODS.post,
      url: `/pharmacy`,
      body: option.body,
      token: option.token,
    };
    console.log(config);

    return request(config).catch((err) => ({ ...err, isOk: false }));
  }
  static async getUserProfile(option) {
    const config = {
      method: HTTP_METHODS.get,
      url: `/user`,
      body: option.body,
      token: option.token,
    };
    console.log(config);

    return request(config).catch((err) => ({ ...err, isOk: false }));
  }
  static async checkUserEmail(option) {
    const config = {
      method: HTTP_METHODS.post,
      url: `/register/email`,
      body: option.body,
      token: option.token,
    };
    console.log(config);

    return request(config).catch((err) => ({ ...err, isOk: false }));
  }
  static async updateUserProfile(option) {
    const config = {
      method: HTTP_METHODS.put,
      url: `/user`,
      body: option.body,
      token: option.token,
    };
    console.log(config);

    return request(config).catch((err) => ({ ...err, isOk: false }));
  }
  static async postEmergencyCase(option) {
    const config = {
      method: HTTP_METHODS.post,
      url: `/emergency/case`,
      body: option.body,
      token: option.token,
    };
    console.log(config);

    return request(config).catch((err) => ({ ...err, isOk: false }));
  }

  static async postPharmacyJob(option) {
    const config = {
      method: HTTP_METHODS.post,
      url: `/job`,
      body: option.body,
      token: option.token,
    };
    console.log(config);

    return request(config).catch((err) => ({ ...err, isOk: false }));
  }

  static async getAvaliableJobs(option) {
    const config = {
      method: HTTP_METHODS.get,
      url: `/job/pharmacist/tok`,
      token: option.token,
    };
    console.log(config);

    return request(config).catch((err) => ({ ...err, isOk: false }));
  }

  static async getOrders(option) {
    const config = {
      method: HTTP_METHODS.get,
      url: `/order/tok/user`,
      body: option.body,
      token: option.token,
    };
    console.log(config);

    return request(config).catch((err) => ({ ...err, isOk: false }));
  }
  static async getOrderDetail(option) {
    const config = {
      method: HTTP_METHODS.get,
      url: `/order/${option.params.id}`,
      token: option.token,
    };
    console.log(config);

    return request(config).catch((err) => ({ ...err, isOk: false }));
  }
  static async getUserByUID(option) {
    const config = {
      method: HTTP_METHODS.get,
      url: `/user/uid/${option.params.uid}`,
      token: option.token,
    };
    console.log(config);

    return request(config).catch((err) => ({ ...err, isOk: false }));
  }
  static async getUserByToken(option) {
    const config = {
      method: HTTP_METHODS.get,
      url: `/user`,
      token: option.token,
    };
    console.log(config);

    return request(config).catch((err) => ({ ...err, isOk: false }));
  }
  static async getRequesterByJobId(option) {
    const config = {
      method: HTTP_METHODS.get,
      url: `/job/requester/${option.params.id}`,
      token: option.token,
    };
    console.log(config);
    return request(config).catch((err) => ({ ...err, isOk: false }));
  }
  static async pharmaGetOrders(option) {
    const config = {
      method: HTTP_METHODS.get,
      url: `/order/tok/pharmacist`,
      body: option.body,
      token: option.token,
    };
    console.log(config);
    return request(config).catch((err) => ({ ...err, isOk: false }));
  }
  static async getAmbulanceCase(option) {
    const config = {
      method: HTTP_METHODS.get,
      url: `/emergency/case`,
      body: option.body,
      token: option.token,
    };
    console.log(config);
    return request(config).catch((err) => ({ ...err, isOk: false }));
  }
  static async getUserById(option) {
    const config = {
      method: HTTP_METHODS.get,
      url: `/user/${option.params.id}`,
      token: option.token,
    };
    console.log(config);

    return request(config).catch((err) => ({ ...err, isOk: false }));
  }
  static async getEmergencyCaseById(option) {
    const config = {
      method: HTTP_METHODS.get,
      url: `/emergency/case/${option.params.id}`,
      token: option.token,
    };
    console.log(config);

    return request(config).catch((err) => ({ ...err, isOk: false }));
  }
  static async getCaseAndOrder(option) {
    const config = {
      method: HTTP_METHODS.get,
      url: `/emergency/case/order/tok`,
      token: option.token,
    };
    console.log(config);
    return request(config).catch((err) => ({ ...err, isOk: false }));
  }

  static async getHospitals(option) {
    const config = {
      method: HTTP_METHODS.get,
      url: `/hospitals`,
      token: option.token,
    };
    console.log(config);
    return request(config).catch((err) => ({ ...err, isOk: false }));
  }

  static async getRecieverByJobId(option) {
    const config = {
      method: HTTP_METHODS.get,
      url: `/job/pharmacist/${option.params.id}`,
      token: option.token,
    };
    console.log(config);

    return request(config).catch((err) => ({ ...err, isOk: false }));
  }
  static async getHospitalByJobId(option) {
    const config = {
      method: HTTP_METHODS.get,
      url: `/job/receiver/${option.params.id}`,
      token: option.token,
    };
    console.log(config);

    return request(config).catch((err) => ({ ...err, isOk: false }));
  }
  static async postAcceptJob(option) {
    const config = {
      method: HTTP_METHODS.post,
      url: `/job/accept`,
      body: option.body,
      token: option.token,
    };
    console.log(config);

    return request(config).catch((err) => ({ ...err, isOk: false }));
  }
  static async postCancelJob(option) {
    const config = {
      method: HTTP_METHODS.post,
      url: `/job/cancel`,
      body: option.body,
      token: option.token,
    };
    console.log(config);

    return request(config).catch((err) => ({ ...err, isOk: false }));
  }
  static async postChatMessage(option) {
    const config = {
      method: HTTP_METHODS.post,
      url: `/chat/message`,
      body: option.body,
      token: option.token,
    };
    console.log(config);

    return request(config).catch((err) => ({ ...err, isOk: false }));
  }
  static async postOrder(option) {
    const config = {
      method: HTTP_METHODS.post,
      url: `/order`,
      body: option.body,
      token: option.token,
    };
    console.log(config);

    return request(config).catch((err) => ({ ...err, isOk: false }));
  }
  static async updateOrder(option) {
    const config = {
      method: HTTP_METHODS.put,
      url: `/order/${option.params.orderId}`,
      body: option.body,
      token: option.token,
    };
    console.log(config);

    return request(config).catch((err) => ({ ...err, isOk: false }));
  }
  static async getOrderById(option) {
    const config = {
      method: HTTP_METHODS.get,
      url: `/order/${option.params.orderId}`,
      token: option.token,
    };
    console.log(config);

    return request(config).catch((err) => ({ ...err, isOk: false }));
  }
  static async putStaffOnDuty(option) {
    const config = {
      method: HTTP_METHODS.put,
      url: `/medical/staff/tok/update`,
      body: option.body,
      token: option.token,
    };
    console.log(config);

    return request(config).catch((err) => ({ ...err, isOk: false }));
  }
  static async getMedicinesByKeyword(option) {
    const config = {
      method: HTTP_METHODS.get,
      url: `/medicine/search/${option.params.keyword}`,
      token: option.token,
    };
    console.log(config);

    return request(config).catch((err) => ({ ...err, isOk: false }));
  }
}

export default Auth;
