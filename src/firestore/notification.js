import { setDoc, getDoc, doc, updateDoc } from "@firebase/firestore";
import { db } from "../lib/firebase";

export default class NotificationController {
  static pushToken = async (data) => {
    try {
      // i it will have many token come up i want key to be number and value to be token
      const { uid, token } = data;

      // append to notification collection and have uid as inside collection and have token as a document inside that collection

      // const docRef = doc(db, "notification", uid);
      // const docSnap = await getDoc(docRef);

      const docRef = doc(db, "notification", uid);

      data = {
        tokens: [token],
      };

      await setDoc(docRef, data, { merge: true });
    } catch (error) {
      console.log(error);
    }
  };
}
