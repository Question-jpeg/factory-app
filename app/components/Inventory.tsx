import React, {
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { INVENTORY_CELL_SIZE, INVENTORY_WIDTH } from "../config/sizes";
import { Texture } from "../models";
import { BUILDINGS } from "../textures";
import { CELL_COLOR, UI_COLOR } from "./../config/colors";
import { AppContext } from "./../context";

export default function Inventory({
  inventoryVisible,
  selectedBuilding,
  setSelectedBuilding,
  UIVisible
}: {
  inventoryVisible: boolean;
  selectedBuilding: Texture | undefined;
  setSelectedBuilding: (building: Texture) => any;
  UIVisible: boolean
}) {
  const x = useSharedValue(0);

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }],
  }));

  useEffect(() => {
    if (inventoryVisible && UIVisible) x.value = withTiming(0);
    else x.value = withTiming(-INVENTORY_WIDTH);
  }, [inventoryVisible, UIVisible]);

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <ScrollView
        style={{ width: "100%", height: "100%" }}
        contentContainerStyle={styles.scrollStyle}
      >
        {Object.values(BUILDINGS)
          .slice(1)
          .map((b) => (
            <TouchableOpacity
              onPress={() => setSelectedBuilding(b)}
              key={b.id}
              style={[
                styles.imageContainer,
                { borderWidth: b.id === selectedBuilding?.id ? 2 : 0 },
              ]}
            >
              <Image source={b.image} style={styles.image} />
            </TouchableOpacity>
          ))}
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  scrollStyle: {
    gap: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    padding: 20,
  },
  imageContainer: {
    width: INVENTORY_CELL_SIZE,
    aspectRatio: 1,
    padding: 10,
    backgroundColor: CELL_COLOR,
    borderRadius: 5,
    borderColor: "white",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  container: {
    position: "absolute",
    height: "100%",
    width: INVENTORY_WIDTH,
    backgroundColor: UI_COLOR,

    borderWidth: 2,
  },
});
