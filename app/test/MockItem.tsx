import { Asset } from "expo-asset";
import { Image } from "expo-image";
import React, { useImperativeHandle, useRef } from "react";
import Animated, {
  Easing,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Platform, StyleSheet } from "react-native";
import { Texture } from "../models";
import { getIJ } from "../utils";
import { RESOURCES } from "./../textures";
import { CELL_BORDER_WIDTH, CELL_SIZE } from "../config/sizes";

const MockItem = React.forwardRef(
  ({ onFinish }: { onFinish: (textureId: number) => any }, ref) => {
    const step = useSharedValue(0);
    const data = useSharedValue({
      xPath: [0, 1],
      yPath: [0, 1],
      stepMap: [0, 1],
    });
    const scale = useSharedValue(3);
    const opacity = useSharedValue(0);
    const image = useRef<Animated.Image>();

    const animate = (textureId: number, path: string[]) => {
      scale.value = withTiming(1);
      opacity.value = withTiming(1);

      const lastIndex = path.length - 1;
      step.value = withTiming(
        lastIndex,
        {
          duration: lastIndex * 1000,
          easing: Easing.linear,
        },
        (finished) => {
          if (finished) {
            onFinish(textureId);
            scale.value = withTiming(3);
          }
        }
      );
    };

    const refresh = () => {
      step.value = 0;
      scale.value = 3;
      opacity.value = 0;
    };

    useImperativeHandle(ref, () => ({
      create: (texture: Texture, path: string[]) => {
        refresh();

        const nativeProp = Platform.OS === "ios" ? "source" : "src";
        image.current?.setNativeProps({
          [nativeProp]: [Asset.fromModule(texture.image)],
        });

        const [xPath, yPath] = path.reduce(
          (result, coords) => {
            const { i, j } = getIJ(coords);
            result[0].push((CELL_SIZE - CELL_BORDER_WIDTH) * j);
            result[1].push((CELL_SIZE - CELL_BORDER_WIDTH) * i);
            return result;
          },
          [[], []] as number[][]
        );
        const stepMap = Array.from({ length: path.length }, (v, k) => k);

        data.value = { stepMap, xPath, yPath };

        animate(texture.id, path);
      },
      refresh,
    }));

    const imageStyle = useAnimatedStyle(() => {
      const translateX = interpolate(
        step.value,
        data.value.stepMap,
        data.value.xPath
      );

      const translateY = interpolate(
        step.value,
        data.value.stepMap,
        data.value.yPath
      );

      return {
        transform: [{ translateX }, { translateY }, { scale: scale.value }],
        opacity: opacity.value,
      };
    });

    return (
      <Animated.Image
        ref={image as any}
        source={RESOURCES.COBBLESTONE.image}
        style={[styles.image, imageStyle]}
      />
    );
  }
);

MockItem.displayName = "MockItem";

export default MockItem;

const styles = StyleSheet.create({
  image: {
    width: "20%",
    height: "20%",
    position: "absolute",
  },
});
