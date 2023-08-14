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
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { ICONS } from "../textures";
import { UI_COLOR } from "../config/colors";
import { SIDEBAR_MARGIN_VERTICAL } from "../config/sizes";
import { AppContext } from "../context";
import { SideBarAPI } from "../models";
import { SELECTIONS } from "../enums";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const iconContainerPadding = 5;

const styles = StyleSheet.create({
  scaledImage: {
    transform: [{ scale: 1.5 }],
  },
  image: {
    width: "100%",
    height: "100%",
  },
  iconContainer: {
    width: 50,
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
    position: "absolute",
    right: 0,
    gap: 20,
    justifyContent: "center",
    paddingHorizontal: 20,
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

const SideBar = React.forwardRef(
  (
    {
      inventoryVisible,
      toggleInventoryVisible,
      selectedOption,
      setSelectedOption
    }: {
      inventoryVisible: boolean;
      toggleInventoryVisible: () => any;
      selectedOption: SELECTIONS;
      setSelectedOption: (opt: SELECTIONS) => any
    },
    ref
  ) => {
    return (
      <View style={styles.sideBar}>
        <TouchableOpacity
          onPress={toggleInventoryVisible}
          style={[
            styles.iconContainer,
            { borderWidth: inventoryVisible ? 2 : 0 },
          ]}
        >
          <MaterialCommunityIcons name="cube" size={36} color="white" />
        </TouchableOpacity>
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
      </View>
    );
  }
);

SideBar.displayName = "SideBar";

export default SideBar;
