import * as ImageManipulator from "expo-image-manipulator";
import { v4 as uuidv4 } from "uuid";

import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import * as Permissions from "expo-permissions";

export const AssetToLocalUri = async (imageList) => {
  const images = Promise.all(
    imageList.map(async (image) => {
      const res = await ImageManipulator.manipulateAsync(
        image.uri,
        [{ resize: { height: 1500 } }],
        {
          compress: 0.6,
          format: ImageManipulator.SaveFormat.JPEG,
        }
      );
      const match = /\.(\w+)$/.exec(res.uri);
      const type = match ? `image/${match[1]}` : "image";
      const fileName = res.uri.split("/")[-1];

      return {
        uri: res.uri,
        type,
        name: `${uuidv4()}.jpeg`,
      };
    })
  );

  return images;
};

export async function downloadImage(url) {
  const path = url.split("/");
  const file_name = path[path.length - 1];
  FileSystem.downloadAsync(url, FileSystem.documentDirectory + file_name)
    .then(({ uri }) => {
      MediaLibrary.createAssetAsync(uri).then((asset) => {
        MediaLibrary.createAlbumAsync("Pecgo", asset)
          .then(() => {

          })
          .catch((error) => {
            console.error("error", error);
          });
      });
    })
    .catch((error) => {
      console.error("error",error);
    });
}