import axios from "axios";

// const uri = `https://aec32548a02114e0294b4d9c2e6e048f-1482926241.ap-southeast-1.elb.amazonaws.com/development`;
// const uri = "aec32548a02114e0294b4d9c2e6e048f-1482926241.ap-southeast-1.elb.amazonaws.com"
// const uri = "http://10.66.15.66:3000"

const uri = "http://192.168.1.124:3000";
export async function request({
  baseURL = uri,
  body = null,
  method = HTTP_METHODS.get,
  token = "",
  url = "",
  contentType,
}) {
  return axios({
    baseURL,
    method,
    url,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(contentType && { "Content-Type": contentType }),
    },
    ...(contentType === "multipart/form-data"
      ? {
          transformRequest: (data, headers) => body,
        }
      : {
          data: body,
        }),
  })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response.data;
    });
}
// //notification.routes.js
// import express from "express";
// import multer from "multer";
// import authMiddleware from "../middlewares/Auth.middleware.js";
// import {
//   createNotification,
//   getNotification,
//   readNotification,
//   deleteNotification,
//   getNotificationById,
//   createNotificationToken,
//   updateNotificationToken,
//   sendNotificationToUser,
// } from "../controllers/notification.controller.js";

// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === "image/png" ||
//     file.mimetype === "image/jpg" ||
//     file.mimetype === "image/jpeg"
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// const router = express.Router();

// router.post("/", authMiddleware, createNotification);

// router.get("/user/:userId", authMiddleware, getNotification);

// router.post("/token/read", authMiddleware, readNotification);

// router.delete("/token", authMiddleware, deleteNotification);

// router.get("/:id", authMiddleware, getNotificationById);

// // router.post("/token", createNotificationToken);

// // router.patch("/token", authMiddleware, updateNotificationToken);

// router.put("/notification/send", sendNotificationToUser);

// export default router;
//notificationToken.model.js
// import mongoose from 'mongoose';

// const { Schema } = mongoose;

// const notificationTokenSchema = new Schema(
//   {
//     token: {
//       type: String,
//     },
//     userId: {
//       type: Schema.Types.ObjectId,
//       ref: 'User',
//     }
//   },
//   { timestamps: true },
// );

// export default mongoose.model('NotificationToken', notificationTokenSchema);

//notification.model.js

// import mongoose from 'mongoose';

// const { Schema } = mongoose;

// const notificationSchema = new Schema(
//   {
//     iconType: {
//       type: String,
//     },
//     message: {
//       type: String,
//     },
//     isRead: {
//       type: Boolean,
//       default: false,
//     },
//     isDelete: {
//       type: String,
//       default: false,
//     },
//     userId: {
//       type: Schema.Types.ObjectId,
//       ref: 'User',
//     },
//     body: {
//       type: String,
//     },
//     otherId: {
//       type: String,
//     },
//     type: {
//       type: String,
//       enum : ['','','',''],

//     }
//   },
//   { timestamps: true },
// );

// export default mongoose.model('Notification', notificationSchema);

//notification.controller.js
// import axios from "axios";
// import Notification from "../models/notification.model.js";
// import NotificationToken from "../models/notificationToken.model.js";
// import User from "../models/user.js";
// import { db } from "../loaders/firebase.js";

// export async function createNotification(req, res, next) {
//   const session = await Notification.startSession();
//   session.startTransaction();

//   try {
//     const { type, detail, title, body, otherId, userId } = req.body;
//     const { files, uid } = req;

//     // TODO ADD FIND USER BY ID
//     const user = await User.findOne({ uid });

//     if (!user) {
//       const error = new Error("User not found.");
//       error.statusCode = 404;
//       throw error;
//     }

//     const report = new Notification({
//       type,
//       detail,
//       uid,
//       title,
//       body,
//       otherId,
//       userId,
//     });

//     await report.save();

//     await session.commitTransaction();
//     session.endSession();

//     res
//       .status(201)
//       .json({ ok: true, message: "created report successfully", data: report });
//   } catch (err) {
//     await session.abortTransaction();
//     session.endSession();

//     if (!err.statusCode) {
//       err.statusCode = 500;
//     }
//     next(err);
//   }
// }

// export async function getNotification(req, res, next) {
//   try {
//     const { userId } = req.params;

//     const notification = await Notification.find({
//       userId,
//       isDelete: false,
//     }).sort({ createdAt: -1 });

//     res
//       .status(200)
//       .json({
//         ok: true,
//         message: "get notification successfully",
//         notification,
//       });
//   } catch (err) {
//     if (!err.statusCode) {
//       err.statusCode = 500;
//     }
//     next(err);
//   }
// }

// export async function readNotification(req, res, next) {
//   const { id } = req.body;

//   try {
//     const notification = await Notification.findOneAndUpdate(
//       { _id: id },
//       { isRead: true }
//     );

//     res
//       .status(200)
//       .json({
//         ok: true,
//         message: "read notification successfully",
//         data: notification,
//       });
//   } catch (err) {
//     if (!err.statusCode) {
//       err.statusCode = 500;
//     }
//     next(err);
//   }
// }

// export async function deleteNotification(req, res, next) {
//   const { id } = req.body;

//   try {
//     const notification = await Notification.findOneAndUpdate(
//       { _id: id },
//       { isDelete: true }
//     );

//     res
//       .status(200)
//       .json({
//         ok: true,
//         message: "Delete notification successfully",
//         data: notification,
//       });
//   } catch (err) {
//     if (!err.statusCode) {
//       err.statusCode = 500;
//     }
//     next(err);
//   }
// }

// export async function getNotificationById(req, res, next) {
//   try {
//     const { id } = req.params;

//     const notification = await Notification.find({ userId: id }).lean();

//     res
//       .status(200)
//       .json({
//         ok: true,
//         message: "get notification successfully",
//         notification,
//       });
//   } catch (err) {
//     if (!err.statusCode) {
//       err.statusCode = 500;
//     }
//     next(err);
//   }
// }

// export async function createNotificationToken(req, res, next) {
//   const session = await NotificationToken.startSession();
//   session.startTransaction();

//   const { token, userId, uid } = req.body;

//   try {
//     const notificationsRef = db.collection("notifications").doc(uid);

//     await notificationsRef.set(
//       {
//         [id1]: {
//           [id2]: true,
//         },
//       },
//       { merge: true }
//     );

//     return res
//       .status(200)
//       .json({ message: "Notification token created successfully" });

//     // let notificationToken;

//     // const notificationTokenExisted = await NotificationToken.findOne({ token });

//     // if (notificationTokenExisted) {
//     //   const error = new Error('Token already exists.');
//     //   error.statusCode = 400;
//     //   throw error;
//     // }

//     // if (userId) {
//     //   const user = await User.findById(userId);

//     //   if (!user) {
//     //     const error = new Error('User not found.');
//     //     error.statusCode = 404;
//     //     throw error;
//     //   }

//     //   notificationToken = new NotificationToken({
//     //     token,
//     //     userId,
//     //   });
//     // } else {
//     //   notificationToken = new NotificationToken({
//     //     token,
//     //   });
//     // }

//     // await notificationToken.save();

//     // res.status(201).json({ ok: true, message: 'created notification token successfully', data: notificationToken });
//   } catch (err) {
//     await session.abortTransaction();
//     session.endSession();

//     if (!err.statusCode) {
//       err.statusCode = 500;
//     }
//     next(err);
//   }
// }

// export async function updateNotificationToken(req, res, next) {
//   const session = await NotificationToken.startSession();
//   session.startTransaction();

//   try {
//     const { token, userId } = req.body;

//     const notificationToken = await NotificationToken.findOne({ token });

//     if (!notificationToken) {
//       const error = new Error("Notification token not found.");
//       error.statusCode = 404;
//       throw error;
//     }

//     notificationToken.token = token;

//     if (userId) {
//       notificationToken.userId = userId;
//     } else {
//       notificationToken.userId = null;
//     }

//     await notificationToken.save();

//     res
//       .status(200)
//       .json({
//         ok: true,
//         message: "update notification token successfully",
//         data: notificationToken,
//       });
//   } catch (err) {
//     await session.abortTransaction();
//     session.endSession();

//     if (!err.statusCode) {
//       err.statusCode = 500;
//     }
//     next(err);
//   }
// }

// export async function sendNotificationToUser(req, res, next) {
//   const { uid, title, body,feature,groupId } = req.body;

//   try {

//     const mapsRef = db
//       .collection("notification")
//       .doc("4fZI9VTZ3QXnjNpnbfmZ8xqsCty1");

//     const doc = await mapsRef.get();

//     // const data = doc.data().tokens.map((token) => ({
//     //   to: token,
//     //   title : "hello",
//     //   body: "my name is boon",
//     // }));

//     // const response = await axios.post('https://exp.host/--/api/v2/push/send', {
//     //   data,
//     // });

//     console.log(doc.data().tokens);

//     const expoNotificationBody = {
//       to: doc.data().tokens,
//       title,
//       body,
//       data: {
//         groupId,
//         feature,
//       },
//       sound: 'default',
//       ios: { // optional configuration for iOS
//         sound: true // enable sound on iOS
//       },
//       android: { // optional configuration for Android
//         channelId: 'default',
//         sound: true, // enable sound on Android
//         priority: 'max',
//         group:'pecgo'
//       },
//     };

//     console.log({expoNotificationBody});

//     const response = await fetch('https://exp.host/--/api/v2/push/send', {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//         'accept-encoding': 'gzip, deflate',
//         host: 'exp.host',
//         'accept-language': 'en-US,en;q=0.9',
//       },
//       body: JSON.stringify(expoNotificationBody),
//     });

//     res.status(200).json({ ok: true, message: 'send notification successfully', response });
//   } catch (error) {
//     console.log({error});
//     if (!error.statusCode) {
//       error.statusCode = 500;
//     }
//     next(error);
//   }
// }

//src->index.js line 27
//import notificationRouter from "./routes/notification.routes.js";
