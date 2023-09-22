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
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { INVENTORY_CELL_SIZE, INVENTORY_WIDTH } from "../config/sizes";
import { Texture } from "../models";
import { BUILDINGS } from "../textures";
import { CELL_COLOR, UI_COLOR } from "./../config/colors";
import { AppContext } from "./../context";
import { inventoryStyles } from './commonStyles';

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

export default function Inventory({
  inventoryVisible,
  selectedBuildingId,
  setSelectedBuilding,
  UIVisible,
}: {
  inventoryVisible: SharedValue<number>;
  selectedBuildingId: SharedValue<number | undefined>;
  setSelectedBuilding: (building: Texture) => any;
  UIVisible: SharedValue<number>;
}) {
  const containerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX:
          -INVENTORY_WIDTH +
          UIVisible.value *
            interpolate(inventoryVisible.value, [0, 1], [0, INVENTORY_WIDTH]),
      },
    ],
  }));

  const getButtonStyle = (buildingId: number) =>
    useAnimatedStyle(() => ({
      borderWidth: buildingId === selectedBuildingId.value ? 2 : 0,
    }));

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <ScrollView
        style={{ width: "100%", height: "100%" }}
        contentContainerStyle={styles.scrollStyle}
        showsVerticalScrollIndicator={false}
      >
        {Object.values(BUILDINGS)
          .slice(1)
          .map((b) => (
            <AnimatedTouchableOpacity
              onPress={() => setSelectedBuilding(b)}
              key={b.id}
              style={[styles.imageContainer, getButtonStyle(b.id)]}
            >
              <Image source={b.image} style={styles.image} />
            </AnimatedTouchableOpacity>
          ))}
      </ScrollView>
    </Animated.View>
  );
}

const styles = inventoryStyles
