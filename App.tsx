import React from "react";
import { useAssets } from "expo-asset";
import { ASSETS } from "./app/textures";
import GameScreen from "./app/screens/GameScreen";
import TestScreen from "./app/screens/TestScreen";

export default function App() {
  const [assets, error] = useAssets(ASSETS);

  return assets && 
  // <TestScreen />;
  <GameScreen />;
}
