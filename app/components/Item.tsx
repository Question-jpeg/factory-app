import React, {
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import Animated, {
  Easing,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { StyleSheet } from "react-native";
import { ItemAPI, Texture } from "../models";
import { getIJ } from "../utils";
import { RESOURCES } from "./../textures";
import { CELL_BORDER_WIDTH, CELL_SIZE } from "../config/sizes";
import { AppContext } from "../context";

const Item = React.forwardRef(({}, ref) => {
  const step = useSharedValue(0);
  const data = useSharedValue({
    xPath: [0, 1],
    yPath: [0, 1],
    stepMap: [0, 1],
  });
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0);
  const [source, setSource] = useState(RESOURCES.COBBLESTONE.image);

  const isFree = useRef(true);

  const { blocks } = useContext(AppContext);

  const reset = () => {
    step.value = 0;
    scale.value = 1;
    opacity.value = 0;
    isFree.current = true;
  };

  const onFinish = (textureId: number, path: string[]) => {
    blocks.current[path.at(-1)!].block.pushItem({
      textureId,
      destroyItem: reset,
    });
  };

  const animate = (textureId: number, path: string[]) => {
    scale.value = withTiming(0.33);
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
          runOnJS(onFinish)(textureId, path);
          scale.value = withTiming(1);
        }
      }
    );
  };

  useImperativeHandle(
    ref,
    () =>
      ({
        create: (texture: Texture, path: string[]) => {
          isFree.current = false;

          setSource(texture.image);

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
        reset,
        isFree
      } as ItemAPI)
  );

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

  return <Animated.Image {...{ source }} style={[styles.image, imageStyle]} />;
});

Item.displayName = "Item";

export default Item;

const styles = StyleSheet.create({
  image: {
    width: "66%",
    height: "66%",
    position: "absolute",
  },
});
