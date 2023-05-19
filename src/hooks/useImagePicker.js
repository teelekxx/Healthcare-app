import React from "react";

import * as ImageManipulator from "expo-image-manipulator";

import * as ImagePicker from "expo-image-picker";
import { useState, useEffect } from "react";

function useImagePicker() {
  // const [image, setImage] = useState(null);

  // const pickImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   if (!result.canceled) {
  //     const localUri = result.uri;
  //     const filename = localUri.split("/").pop();
  //     const match = /\.(\w+)$/.exec(filename);
  //     const type = match ? `image/${match[1]}` : "image";

  //     const res = await ImageManipulator.manipulateAsync(
  //       result.uri,
  //       [{ resize: { height: 1500 } }],
  //       {
  //         compress: 0.7,
  //         format: ImageManipulator.SaveFormat.JPEG,
  //       }
  //     );

  //     const imageFile = {
  //       name: filename,
  //       type,
  //       uri: res.uri,
  //     };
  //     setImage(imageFile);

  //   return imageFile;

  //   }

    
  // };

  const [images, setImages] = useState([]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.cancelled) {

      const newImages = await Promise.all(
        result.assets.map(async (uri) => {
          const localUri = uri;
          const filename = localUri.split("/").pop();
          const match = /\.(\w+)$/.exec(filename);
          const type = match ? `image/${match[1]}` : "image";
  
          const res = await ImageManipulator.manipulateAsync(
            uri,
            [{ resize: { height: 1500 } }],
            {
              compress: 0.7,
              format: ImageManipulator.SaveFormat.JPEG,
            }
          );
  
          const imageFile = {
            name: filename,
            type,
            uri: res.uri,
          };
          return imageFile;
        })
      );
      setImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  

  return [{ images }, { pickImage }];
}
export default useImagePicker;
