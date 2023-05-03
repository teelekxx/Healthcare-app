import { setDoc, getDoc, doc, updateDoc } from "@firebase/firestore";
import { db } from "../lib/firebase";

export default class NotificationController {
  static pushToken = async (data) => {
    try {
      const { uid, token } = data;


      const docRef = doc(db, "notification", uid);

      data = {
        tokens: [token],
      };

      await setDoc(docRef, data, { merge: true });
    } catch (error) {
      console.log(error);
    }
  };

  static removeToken = async ({ uid, token } ) => {
    const docRef = doc(db, "notification", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      const tokens = data.tokens.filter((t) => t !== token);
      await updateDoc(docRef, { tokens });
    }
  }
}
