import React from "react";
import {
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import reels from "../data/reels";

const screenWidth = Dimensions.get("window").width;

export default function HomeScreen({ navigation, thumbnails }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>🎬 Reels Preview</Text>
      <Text style={styles.subheading}>Tap any reel to watch it in full-screen</Text>

      <FlatList
        horizontal
        data={reels}
        style={{ flexGrow: 0 }}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("Reels", {
                initialIndex: reels.findIndex((r) => r.id === item.id),
              })
            }
          >
            <Image
              source={
                thumbnails[item.id]
                  ? { uri: thumbnails[item.id] }
                  : require("../../assets/placeholder.png")
              }
              style={styles.thumbnail}
            />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", 
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  heading: {
    color: "#000",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subheading: {
    color: "#000001",
    fontSize: 16,
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    marginRight: 16,
    alignItems: "center",
    backgroundColor: "#111",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  thumbnail: {
    width: screenWidth * 0.4,
    height: screenWidth * 0.65,
    resizeMode: "cover",
  },
  username: {
    color: "#ccc",
    fontSize: 14,
    padding: 8,
  },
});
