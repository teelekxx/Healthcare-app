import { HTTP_METHODS } from "./constant";
import { request } from "./index";

class Notification {
  static async getNotificationByUserId(option) {
    const config = {
      method: HTTP_METHODS.put,
      url: `/notification/`,
      body: option.body,
      token: option.token,
    };
    console.log(config);

    return request(config).catch((err) => ({ ...err, isOk: false }));
  }
}

export default Notification;
