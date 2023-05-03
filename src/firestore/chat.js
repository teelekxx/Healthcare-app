import { setDoc, getDoc, doc, updateDoc,collection, doc, addDoc  } from "@firebase/firestore";
import { db } from "../lib/firebase";

export default class Chat {
  static sendMessage = async ({ uid, token }) => {
    const messagesCollectionRef = collection(
      db,
      "messages",
      groupId,
      "messages"
    );

    addDoc(messagesCollectionRef, messageData)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };
}
