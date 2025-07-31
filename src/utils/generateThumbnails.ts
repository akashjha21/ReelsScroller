import * as VideoThumbnails from "expo-video-thumbnails";
import reels from "../src/data/reels";

export const generateThumbnails = async () => {
  const thumbs: { [id: string]: string } = {};
  for (const reel of reels) {
    const { uri } = await VideoThumbnails.getThumbnailAsync(reel.video, {
      time: 1000,
    });
    thumbs[reel.id] = uri;
  }
  return thumbs;
};
