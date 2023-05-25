import { setDoc, getDoc, doc, updateDoc } from "@firebase/firestore";
import { db } from "../lib/firebase";

export default class NotificationController {
  static pushToken = async (data) => {
    try {
      const { uid, token } = data;

      console.log({ uid, token });

      const docRef = doc(db, "notification", uid);

      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        // Retrieve the existing data
        const existingData = docSnap.data();
        // Retrieve the existing tokens array or initialize it as an empty array
        const existingTokens = existingData.tokens || [];
        // Append the new token to the existing tokens array
        const updatedTokens = [...existingTokens, token];
        // Update the 'tokens' field with the updated array
        await updateDoc(docRef, { tokens: updatedTokens });
      } else {
        // Create a new document with the token
        await setDoc(docRef, { tokens: [token] });
      }
    } catch (error) {
      console.log(error);
    }
  };

  static removeToken = async ({ uid, token }) => {
    const docRef = doc(db, "notification", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      const tokens = data.tokens.filter((t) => t !== token);
      await updateDoc(docRef, { tokens });
    }
  };
}
