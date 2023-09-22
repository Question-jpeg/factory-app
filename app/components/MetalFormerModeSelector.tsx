import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { INVENTORY_WIDTH } from "../config/sizes";
import { BuildingAPI } from "../models";
import { inventoryStyles } from "./commonStyles";
import { MaterialIcons } from "@expo/vector-icons";
import { RESOURCES } from "./../textures";
import { METAL_FORMER_MODES } from "../enums";
import { CELL_COLOR } from "../config/colors";

const data: { [key in METAL_FORMER_MODES]: number[] } = {
  [METAL_FORMER_MODES.ROLLING]: [
    RESOURCES.INGOT_TIN.image,
    RESOURCES.PLATE_TIN.image,
    RESOURCES.CASING_TIN.image,
  ],
  [METAL_FORMER_MODES.CUTTING]: [
    RESOURCES.PLATE_TIN.image,
    RESOURCES.CABLE_TIN.image,
  ],
  [METAL_FORMER_MODES.EXTRUDING]: [
    RESOURCES.INGOT_TIN.image,
    RESOURCES.CABLE_TIN.image,
  ],
};

export default function MetalFormerModeSelector({
  metalFormer,
  metalFormerModeSelectorVisible,
  UIVisible,
}: {
  metalFormer?: BuildingAPI;
  metalFormerModeSelectorVisible: SharedValue<number>;
  UIVisible: SharedValue<number>;
}) {
  const containerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX:
          -INVENTORY_WIDTH +
          UIVisible.value *
            interpolate(
              metalFormerModeSelectorVisible.value,
              [0, 1],
              [0, INVENTORY_WIDTH]
            ),
      },
    ],
  }));

  const [reloadState, setReloadState] = useState(false);

  const reload = () => setReloadState(!reloadState);

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <ScrollView
        style={{ width: "100%", height: "100%" }}
        contentContainerStyle={styles.scrollStyle}
        showsVerticalScrollIndicator={false}
      >
        {Object.keys(data).map((mode) => (
          <TouchableOpacity
            onPress={() => {
              if (metalFormer) {
                metalFormer.block.setMetalFormerMode!(parseInt(mode));
                reload();
              }
            }}
            key={mode}
            style={[
              styles.mode,
              {
                borderWidth: metalFormer
                  ? metalFormer.block.metalFormerMode?.current ===
                    parseInt(mode)
                    ? 2
                    : 0
                  : 0,
              },
            ]}
          >
            {data[mode as unknown as METAL_FORMER_MODES].map((image, i) => (
              <React.Fragment key={i}>
                {i !== 0 && (
                  <MaterialIcons
                    name="arrow-right-alt"
                    size={24}
                    color="lightgray"
                  />
                )}
                <Image key={image} source={image} style={styles.image} />
              </React.Fragment>
            ))}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  ...inventoryStyles,
  scrollStyle: {
    ...inventoryStyles.scrollStyle,
    paddingRight: 10,
    flexDirection: "column",
    flexWrap: "nowrap",
    alignItems: "flex-end",
    justifyContent: 'center',
    height: '100%'
  },
  mode: {
    flexDirection: "row",
    gap: 2,
    backgroundColor: CELL_COLOR,
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white",
    width: "85%",
    borderRadius: 5,
  },
  image: {
    width: 30,
    height: 30,
  },
});
