import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./src/navigation/StackNavigator";
import reelsData from "./src/data/reels";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import * as VideoThumbnails from "expo-video-thumbnails";

export default function App() {
  const [thumbnails, setThumbnails] = useState<{ [id: string]: string }>({});
  const [reels, setReels] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const updatedReels = [];

      for (let i = 0; i < reelsData.length; i++) {
        const reel = reelsData[i];
        const fileUri = FileSystem.documentDirectory + `video${i + 1}.mp4`;

        const asset = Asset.fromModule(reel.video);
        await asset.downloadAsync(); // ensure it's downloaded

        const info = await FileSystem.getInfoAsync(fileUri);
        if (!info.exists) {
          await FileSystem.copyAsync({
            from: asset.localUri || asset.uri,
            to: fileUri,
          });
        }

        updatedReels.push({
          ...reel,
          video: { uri: fileUri }, // updated to file system uri
        });
      }

      setReels(updatedReels);

      const thumbs: { [id: string]: string } = {};
      for (const reel of updatedReels) {
        const { uri } = await VideoThumbnails.getThumbnailAsync(reel.video.uri, {
          time: 1000,
        });
        thumbs[reel.id] = uri;
      }

      setThumbnails(thumbs);
    })();
  }, []);
  return (
    <NavigationContainer>
      <StackNavigator thumbnails={thumbnails} />
    </NavigationContainer>
  );
}
