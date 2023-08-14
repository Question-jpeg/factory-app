import React, {
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { StyleSheet } from "react-native";
import { BuildingAPI, Item as ItemModel, Texture } from "../models";
import { CELL_BORDER_WIDTH, CELL_SIZE } from "./../config/sizes";
import { AppContext } from "./../context";
import { getCoordsDelta, getIJ } from "../utils";
import { BUILDINGS } from "../textures";

export default function Item({
  item: { texture, initCoords },
  destroySelf,
}: {
  item: ItemModel;
  destroySelf: () => any;
}) {
  const { field } = useContext(AppContext);

  const coords = useRef(initCoords);
  const { i: initI, j: initJ } = getIJ(initCoords);

  const curBuilding = useRef(field.current[initCoords]);
  const x = useSharedValue(initJ * (CELL_SIZE - CELL_BORDER_WIDTH));
  const y = useSharedValue(initI * (CELL_SIZE - CELL_BORDER_WIDTH));

  const exitNode = (variantsCoords: string[]) => {
    const distributionDict = curBuilding.current.distributionDict.current;

    let index = 0;
    if (distributionDict[texture.id]) index = distributionDict[texture.id]++;
    else distributionDict[texture.id] = 1;

    const targetCoords = variantsCoords[index % variantsCoords.length];
    const { i, j } = getIJ(targetCoords);
    const { i: iDelta } = getCoordsDelta(coords.current, targetCoords);

    const prevCoords = coords.current;
    coords.current = targetCoords;
    curBuilding.current = field.current[targetCoords];

    if (iDelta)
      y.value = withTiming(
        (CELL_SIZE - CELL_BORDER_WIDTH) * i,
        {
          duration: 1000,
          easing: Easing.linear,
        },
        () => runOnJS(moveOneStep)(prevCoords)
      );
    else
      x.value = withTiming(
        (CELL_SIZE - CELL_BORDER_WIDTH) * j,
        {
          duration: 1000,
          easing: Easing.linear,
        },
        () => runOnJS(moveOneStep)(prevCoords)
      );
  };

  const moveOneStep = (prevCoords: string) => {
    const neighbours = { ...curBuilding.current.neighbours.current };
    if (curBuilding.current.id !== BUILDINGS.PIPE.id) {
      if (!prevCoords) {
        const servosCoords = Object.values(neighbours)
          .filter(({ servo }) => servo)
          .map(({ building }) => building.coords);
        if (!servosCoords.length) destroySelf();
        else exitNode(servosCoords);
      } else {
        curBuilding.current.pushItem(texture);
        destroySelf();
      }
    } else {
      delete neighbours[prevCoords];
      const neighboursCoords = Object.keys(neighbours);
      if (!neighboursCoords.length) destroySelf();
      else if (neighboursCoords.length === 1) exitNode(neighboursCoords);
      else {
      }
    }
  };

  useEffect(() => {
    moveOneStep("");
  }, []);

  const itemStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }, { translateY: y.value }],
  }));

  return (
    <Animated.Image source={texture.image} style={[styles.image, itemStyle]} />
  );
}

const styles = StyleSheet.create({
  image: {
    width: "20%",
    height: "20%",
    // borderRadius: 3,
    position: "absolute",
  },
});
