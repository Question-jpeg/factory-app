import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";
import { ICONS } from "../textures";
import { UI_COLOR } from "../config/colors";
import { SIDEBAR_WIDTH } from "../config/sizes";
import { SELECTIONS } from "../enums";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { SIDEBAR_GAP } from "./../config/sizes";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const iconContainerPadding = 5;

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    gap: SIDEBAR_GAP,
  },
  scaledImage: {
    transform: [{ scale: 1.5 }],
  },
  image: {
    width: "100%",
    height: "100%",
  },
  iconContainer: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: UI_COLOR,
    borderRadius: 10,
    padding: iconContainerPadding,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white",
  },
  sideBar: {
    height: "100%",
    width: SIDEBAR_WIDTH,
    position: "absolute",
    right: 0,
    gap: SIDEBAR_GAP,
    justifyContent: "center",
    paddingHorizontal: SIDEBAR_GAP,
    alignItems: "flex-end",
  },
});

const sideBarData = [
  { icon: ICONS.PIPE, selection: SELECTIONS.PIPE },
  {
    icon: ICONS.CONNECTOR,
    selection: SELECTIONS.CONNECTION,
    style: styles.scaledImage,
  },
  { icon: ICONS.SERVO, selection: SELECTIONS.SERVO, style: styles.scaledImage },
  {
    expoIcon: <MaterialIcons name="highlight-remove" size={36} color="brown" />,
    selection: SELECTIONS.DELETE,
  },
];

export default function Sidebar({
  inventoryVisible,
  recipeSelectorVisible,
  metalFormerModeSelectorVisible,
  toggleInventoryVisible,
  selectedOption,
  setSelectedOption,
  UIVisible,
  toggleUIVisible,
}: {
  inventoryVisible: SharedValue<number>;
  recipeSelectorVisible: SharedValue<number>;
  metalFormerModeSelectorVisible: SharedValue<number>;
  toggleInventoryVisible: () => any;
  selectedOption: SharedValue<SELECTIONS>;
  setSelectedOption: (opt: SELECTIONS) => any;
  UIVisible: SharedValue<number>;
  toggleUIVisible: () => any;
}) {
  const sideBarStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          UIVisible.value,
          [0, 1],
          [SIDEBAR_WIDTH - SIDEBAR_GAP, 0]
        ),
      },
    ],
  }));

  const inventoryButtonStyle = useAnimatedStyle(() => ({
    borderWidth:
      inventoryVisible.value *
      (1 - recipeSelectorVisible.value) *
      (1 - metalFormerModeSelectorVisible.value) *
      2,
  }));

  const getButtonStyle = (selection: SELECTIONS) =>
    useAnimatedStyle(() => ({
      borderWidth: selectedOption.value === selection ? 2 : 0,
    }));

  const getReadyIconStyle = (outputRange: number[]) =>
    useAnimatedStyle(() => ({
      opacity: interpolate(UIVisible.value, [0, 1], outputRange),
    }));

  return (
    <Animated.View style={[styles.sideBar, sideBarStyle]}>
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={toggleUIVisible}
          style={[styles.iconContainer]}
        >
          <Animated.View
            style={[
              StyleSheet.absoluteFillObject,
              { justifyContent: "center", alignItems: "center" },
              getReadyIconStyle([1, 0]),
            ]}
          >
            <Feather name="settings" size={36} color="white" />
          </Animated.View>
          <Animated.View
            style={[
              StyleSheet.absoluteFillObject,
              { justifyContent: "center", alignItems: "center" },
              getReadyIconStyle([0, 1]),
            ]}
          >
            <Feather name="check-circle" size={36} color="white" />
          </Animated.View>
        </TouchableOpacity>
        <AnimatedTouchableOpacity
          onPress={toggleInventoryVisible}
          style={[styles.iconContainer, inventoryButtonStyle]}
        >
          <MaterialCommunityIcons name="cube" size={36} color="white" />
        </AnimatedTouchableOpacity>
      </View>
      {sideBarData.map((d, i) => (
        <AnimatedTouchableOpacity
          key={i}
          onPress={() => setSelectedOption(d.selection)}
          style={[styles.iconContainer, getButtonStyle(d.selection)]}
        >
          {d.icon ? (
            <Image source={d.icon} style={[styles.image, d.style]} />
          ) : (
            d.expoIcon
          )}
        </AnimatedTouchableOpacity>
      ))}
    </Animated.View>
  );
}
