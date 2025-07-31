import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";

export default function SplashScreen({ navigation }: any) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace("Home");
    }, 3000); // 3-second splash

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/logo.png")} // 🔁 replace with your logo
        style={styles.logo}
      />
      <Text style={styles.title}>ReelView</Text>
      <Text style={styles.tagline}>Watch. Scroll. Enjoy.</Text>
      <ActivityIndicator size="large" color="#00FFB2" style={styles.loader} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // dark background for modern feel
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    resizeMode: "contain",
  },
  title: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: "#aaa",
    marginBottom: 30,
  },
  loader: {
    marginTop: 20,
  },
});
