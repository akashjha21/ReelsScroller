import React, { useRef, useState } from "react";
import { View, FlatList, Dimensions, TouchableOpacity, Image } from "react-native";
import { ResizeMode, Video } from "expo-av";
import { SafeAreaView } from "react-native-safe-area-context";
import reels from "../data/reels";

const height = Math.round(Dimensions.get("window").height);

export default function ReelsScreen({ route }: any) {
  const { initialIndex = 0 } = route.params || {};
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(true);

  const onViewRef = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
      setIsPlaying(true);
    }
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 80 });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <FlatList
        data={reels}
        pagingEnabled
        horizontal={false}
        style={{ flex: 1 }}
        keyExtractor={(item) => item.id}
        decelerationRate="fast"
        removeClippedSubviews
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        renderItem={({ item, index }) => (
          <View
            style={{
              height: height,
              width: "100%",
              backgroundColor: "black",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setIsPlaying((p) => !p)}
              style={{
                flex: 1,
                height: "100%",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Video
                source={item.video}
                style={{ height: "100%", width: "100%" }}
                resizeMode={ResizeMode.COVER}
                shouldPlay={index === currentIndex && isPlaying}
                isLooping
              />
              {!isPlaying && index === currentIndex && (
                <Image
                  source={require("../../assets/pause.png")}
                  style={{
                    position: "absolute",
                    width: 64,
                    height: 64,
                    alignSelf: "center",
                    opacity: 0.8,
                    zIndex: 2,
                  }}
                />
              )}
            </TouchableOpacity>

        
          </View>
        )}
      />
    </SafeAreaView>
  );
}
