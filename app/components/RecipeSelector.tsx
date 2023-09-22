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
import { CRAFT_ITEM_SIZE, INVENTORY_CELL_SIZE, INVENTORY_WIDTH } from "../config/sizes";
import { BuildingAPI, Recipe } from "../models";
import { RECIPES } from "../recipes";
import { RESOURCES_IMAGES } from "../textures";
import { inventoryStyles } from "./commonStyles";

export default function RecipeSelector({
  bench,
  recipeSelectorVisible,
  UIVisible,
}: {
  bench?: BuildingAPI;
  recipeSelectorVisible: SharedValue<number>;
  UIVisible: SharedValue<number>;
}) {
  const containerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX:
          -INVENTORY_WIDTH +
          UIVisible.value *
            interpolate(
              recipeSelectorVisible.value,
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
        contentContainerStyle={[styles.scrollStyle, ]}
        showsVerticalScrollIndicator={false}
      >
        {Object.values(RECIPES).map((recipe) => (
          <TouchableOpacity
            onPress={() => {
              if (bench) {
                bench.block.setRecipe!(recipe);
                reload();
              }
            }}
            key={recipe.texture.id}
            style={[
              styles.imageContainer,
              {
                width: INVENTORY_CELL_SIZE / 1.5,
                padding: 5,
                borderWidth: bench
                  ? recipe.texture.id === bench.block.recipe?.current.texture.id
                    ? 2
                    : 0
                  : 0,
              },
            ]}
          >
            <Image source={recipe.texture.image} style={styles.image} />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={{ width: 2, height: "100%", backgroundColor: "black" }} />
      <ScrollView
        style={styles.craftScroll}
        contentContainerStyle={styles.craftColumn}
        showsVerticalScrollIndicator={false}
      >
        {bench &&
          Object.keys(bench.block.recipe!.current.craft).map((textureId) => (
            <View key={textureId} style={styles.craftItem}>
              <Image
                source={RESOURCES_IMAGES[textureId as any]}
                style={styles.image}
              />
              <Text style={{ color: "lightgray", fontWeight: "500" }}>
                {bench.block.recipe!.current.craft[textureId as any]}
              </Text>
            </View>
          ))}
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  ...inventoryStyles,
  craftScroll: {
    height: "100%",
    width: 60,
  },
  craftColumn: {
    gap: 20,
    paddingHorizontal: 5,
    justifyContent: 'center',
    height: '100%'
  },
  craftItem: {
    aspectRatio: 1,
    width: "100%",
    alignItems: "center",
  },
});
