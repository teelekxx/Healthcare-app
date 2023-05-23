
import { AsyncStorage } from "@react-native-async-storage/async-storage";


const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("token");
      if (value !== null) {
        return value;
      }
    } catch (error) {
      console.error("Error in retrieveData", error);
    }
    return null;
  };


  
export const getOrder = async ({ queryKey }) => {
    
    const token = await retrieveData();

    //call api

    if (res.isOk) {
      return res.data;
    }
  };