import React, { useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { Texture } from "../models";
import MockItem from "../test/MockItem";
import { RESOURCES } from "../textures";

export default function TestScreen() {
  const mockItem = useRef<{
    create: (texture: Texture, path: string[]) => any;
  }>();

  useEffect(() => {
    setTimeout(() => {
      mockItem.current?.create(RESOURCES.SAND, [
        "0_0",
        "0_1",
        "0_2",
        "1_2",
        "1_3",
        "1_4",
      ]);
    }, 3000);
    setTimeout(() => {
      mockItem.current?.create(RESOURCES.COAL, [
        "0_0",
        "1_0",
        "2_0",
        "2_1",
        "2_2",
        "2_3",
      ]);
    }, 3000 + 5000 + 1000);
  }, []);

  return (
    <View style={styles.container}>
      <MockItem ref={mockItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "yellow",
  },
});
