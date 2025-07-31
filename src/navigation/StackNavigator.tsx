import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../components/HomeScreen";
import ReelsScreen from "../components/ReelsScreen";
import SplashScreen from "../components/SplashScreen";

const Stack = createStackNavigator();

export default function StackNavigator({ thumbnails }: any) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
        <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Home">
        {(props) => <HomeScreen {...props} thumbnails={thumbnails} />}
      </Stack.Screen>
      <Stack.Screen name="Reels" component={ReelsScreen} />
    </Stack.Navigator>
  );
}
