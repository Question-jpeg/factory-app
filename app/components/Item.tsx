import React, {
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import Animated, {
  Easing,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Image, StyleSheet } from "react-native";
import { BuildingAPI, Item as ItemModel, Texture } from "../models";
import { CELL_BORDER_WIDTH, CELL_SIZE } from "./../config/sizes";
import { AppContext } from "./../context";
import { getCoordsDelta, getIJ } from "../utils";
import { BUILDINGS } from "../textures";

export default function Item({
  item: { texture, initPath },
  destroySelf,
}: {
  item: ItemModel;
  destroySelf: () => any;
}) {
  const { blocks } = useContext(AppContext);

  const [xPath, yPath] = initPath.reduce(
    (result, coords) => {
      const { i, j } = getIJ(coords);
      result[0].push((CELL_SIZE - CELL_BORDER_WIDTH) * j);
      result[1].push((CELL_SIZE - CELL_BORDER_WIDTH) * i);
      return result;
    },
    [[], []] as number[][]
  );

  const step = useSharedValue(0);
  const scale = useSharedValue(3);
  const stepMap = Array.from({ length: initPath.length }, (v, k) => k);

  const onFinish = () => {
    blocks.current[initPath.at(-1)!].block.pushItem({
      texture,
      destroyItem: destroySelf,
    });
    scale.value = withTiming(3);
  };

  useEffect(() => {
    const lastIndex = initPath.length - 1;
    step.value = withTiming(
      lastIndex,
      {
        duration: 1000 * lastIndex,
        easing: Easing.linear,
      },
      (finished) => finished && runOnJS(onFinish)()
    );
    scale.value = withTiming(1);

    return function cleanup() {
      step.value = 0;
    };
  }, []);

  const itemStyle = useAnimatedStyle(() => {
    const translateX = interpolate(step.value, stepMap, xPath);
    const translateY = interpolate(step.value, stepMap, yPath);
    return {
      transform: [{ translateX }, { translateY }, { scale: scale.value }],
    };
  });

  return (
    <Animated.Image source={texture.image} style={[styles.image, itemStyle]} />
  );
}

const styles = StyleSheet.create({
  image: {
    width: "20%",
    height: "20%",
    position: "absolute",
  },
});
