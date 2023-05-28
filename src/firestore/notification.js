import { setDoc, getDoc, doc, updateDoc } from "@firebase/firestore";
import { db } from "../lib/firebase";

export default class NotificationController {
  static pushToken = async (data) => {
    try {
      const { uid, token } = data;

      console.log({ uid, token });

      const docRef = doc(db, "notification", uid);

      const docSnap = await getDoc(docRef);
      console.log("docsnap data: ", docSnap.data());
      if (docSnap.data()) {
        if (!docSnap.data().tokens.includes(token)) {
          // Retrieve the existing data
          const existingData = docSnap.data().tokens;
          // Retrieve the existing tokens array or initialize it as an empty array
          const existingTokens = existingData.tokens || [];
          // Append the new token to the existing tokens array
          const updatedTokens = [...existingTokens, token];
          // Update the 'tokens' field with the updated array
          await updateDoc(docRef, { tokens: updatedTokens });
        }
      } else {
        // Create a new document with the token
        await setDoc(docRef, { tokens: [token] });
      }
    } catch (error) {
      console.log(error);
    }
  };

  static removeToken = async ({ uid, token }) => {
    try {
      const docRef = doc(db, "notification", uid);
      const docSnap = await getDoc(docRef);
      console.log(docSnap.data(), token);
      // if (docSnap.exists()) {
      const data = docSnap.data();
      console.log("data", data);

      console.log("token of this phone", token);
      const tokens = data.tokens.filter((t) => t !== token);
      console.log("Last token", tokens);
      await updateDoc(docRef, { tokens });
    } catch (error) {
      console.log(error);
    }
  };
  // };
}
