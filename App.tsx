import React, { useEffect } from "react";
import { useAssets } from "expo-asset";
import { ASSETS, RESOURCES_IMAGES } from "./app/textures";
import GameScreen from "./app/screens/GameScreen";
import TestScreen from "./app/screens/TestScreen";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";

NavigationBar.setVisibilityAsync("hidden");

export default function App() {
  const [assets, error] = useAssets(ASSETS);

  return (
    assets && (
      <>
        {/* <TestScreen /> */}
        <StatusBar hidden />
        <GameScreen />
      </>
    )
  );
}
