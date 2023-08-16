import React, {
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";
import { ICONS } from "../textures";
import { UI_COLOR } from "../config/colors";
import { SIDEBAR_MARGIN_VERTICAL, SIDEBAR_WIDTH } from "../config/sizes";
import { AppContext } from "../context";
import { SideBarAPI } from "../models";
import { SELECTIONS } from "../enums";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { SIDEBAR_GAP } from "./../config/sizes";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

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
  toggleInventoryVisible,
  selectedOption,
  setSelectedOption,
  UIVisible,
  toggleUIVisible
}: {
  inventoryVisible: boolean;
  toggleInventoryVisible: () => any;
  selectedOption: SELECTIONS;
  setSelectedOption: (opt: SELECTIONS) => any;
  UIVisible: boolean;
  toggleUIVisible: () => any
}) {
  const x = useSharedValue(0);

  const sideBarStyle = useAnimatedStyle(() => ({
    transform: [{translateX: x.value}]
  }))

  useEffect(() => {
    if (UIVisible) x.value = withTiming(0)
    else x.value = withTiming(SIDEBAR_WIDTH - SIDEBAR_GAP)
  }, [UIVisible])

  return (
    <Animated.View
      style={[
        styles.sideBar,
        sideBarStyle
      ]}
    >
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={toggleUIVisible}
          style={[
            styles.iconContainer,
          ]}
        >
          {UIVisible ? (
            <Feather name="check-circle" size={36} color="white" />
          ) : (
            <Feather name="settings" size={36} color="white" />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={toggleInventoryVisible}
          style={[
            styles.iconContainer,
            { borderWidth: inventoryVisible ? 2 : 0 },
          ]}
        >
          <MaterialCommunityIcons name="cube" size={36} color="white" />
        </TouchableOpacity>
      </View>
      {sideBarData.map((d, i) => (
        <TouchableOpacity
          key={i}
          onPress={() => setSelectedOption(d.selection)}
          style={[
            styles.iconContainer,
            { borderWidth: selectedOption === d.selection ? 2 : 0 },
          ]}
        >
          {d.icon ? (
            <Image source={d.icon} style={[styles.image, d.style]} />
          ) : (
            d.expoIcon
          )}
        </TouchableOpacity>
      ))}
    </Animated.View>
  );
}
