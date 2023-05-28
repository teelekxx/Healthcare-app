import {
  setDoc,
  getDoc,
  doc,
  updateDoc,
  collection,
  addDoc,
} from "@firebase/firestore";
import { db } from "../lib/firebase";

export default class Chat {
  static sendMessage = async ({ uid, groupId, message, type }) => {
    const messageData = {
      message: message,
      sendBy: uid,
      sendAt: new Date(),
      seen: false,
      type: type,
    };

    const messagesCollectionRef = collection(
      db,
      "messages",
      groupId,
      "messages"
    );

    addDoc(messagesCollectionRef, messageData)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        return docRef.id;
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };
}
