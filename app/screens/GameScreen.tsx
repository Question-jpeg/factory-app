import { times } from "lodash";
import { Dimensions, StyleSheet, View } from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import { useRef } from "react";
import {
  CELL_BORDER_WIDTH,
  CELL_SIZE,
  COUNT_SIZE,
  FIELD_SIZE,
} from "../config/sizes";
import { BuildingAPI, Field, SpawnerAPI, Texture } from "../models";
import { SELECTIONS } from "../enums";
import { INITIAL_SELECTION } from "../config/values";
import { BUILDINGS } from "../textures";
import { clampWorklet, getCoords, getNeighboursList } from "../utils";
import { AppContext } from "../context";
import Underlay from "../components/Underlay";
import Spawner from "../components/Spawner";
import Cell from "../components/Cell";
import UI from "../components/UI";
import { BACKGROUND_COLOR, CELL_COLOR, UI_COLOR } from "../config/colors";

const { width: windowWidth, height: windowHeight } = Dimensions.get("screen");
const initialX = windowWidth / 2;
const initialY = -FIELD_SIZE / 2 + windowHeight / 2;

export default function GameScreen() {
  const field = useRef<Field>({});
  const blocks = useRef<Field>({});
  const selection = useRef<SELECTIONS>(INITIAL_SELECTION);
  const selectedBuilding = useRef<Texture>();
  const selectedConnections = useRef<{ [key: string]: BuildingAPI }>({});
  const spawner = useRef<SpawnerAPI>();

  const placeBuilding = (coords: string, ref: BuildingAPI) => {
    if (ref && field.current[coords]?.id !== ref.id) {
      field.current[coords] = ref;
      if (ref.id !== BUILDINGS.PIPE.id) blocks.current[coords] = ref;

      ref.initNeighbours(field);
      getNeighboursList(coords, field).forEach((b) => b.addNeighbour(ref));
    }
  };

  const destroyBuilding = (building: BuildingAPI) => {
    const coords = building.coords;
    delete field.current[coords];
    delete blocks.current[coords];
    getNeighboursList(coords, field).forEach((b) =>
      b.removeNeighbour(building)
    );
  };

  const x = useSharedValue(initialX);
  const xOffset = useSharedValue(initialX);
  const y = useSharedValue(initialY);
  const yOffset = useSharedValue(initialY);

  const scale = useSharedValue(1);
  const scaleOffset = useSharedValue(1);

  const onGestureEvent = useAnimatedGestureHandler({
    onActive: (event) => {
      x.value = clampWorklet(
        xOffset.value + event.translationX / scale.value,
        -FIELD_SIZE + windowWidth / 2,
        windowWidth / 2
      );
      y.value = clampWorklet(
        yOffset.value + event.translationY / scale.value,
        -FIELD_SIZE + windowHeight / 2,
        windowHeight / 2
      );
    },
    onEnd: () => {
      xOffset.value = x.value;
      yOffset.value = y.value;
    },
  });

  const onPinchEvent =
    useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
      onActive: (event) => {
        scale.value = clampWorklet(scaleOffset.value * event.scale, 0.25, 2);
      },
      onEnd: () => {
        scaleOffset.value = scale.value;
      },
    });

  const fieldStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }, { translateY: y.value }],
  }));

  const zoomStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AppContext.Provider
      value={{
        ...{
          field,
          blocks,
          selection,
          placeBuilding,
          destroyBuilding,
          selectedBuilding,
          selectedConnections,
          spawner,
        },
      }}
    >
      <GestureHandlerRootView>
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View style={[fieldStyles.fill]}>
            <PinchGestureHandler onGestureEvent={onPinchEvent}>
              <Animated.View style={[fieldStyles.fill, fieldStyles.camera]}>
                <Animated.View style={[fieldStyles.fill, zoomStyle]}>
                  <Animated.View style={[fieldStyles.field, fieldStyle]}>
                    <View
                      pointerEvents="none"
                      style={[fieldStyles.fill, fieldStyles.rows]}
                    >
                      {times(COUNT_SIZE).map((i) => (
                        <View key={i} style={fieldStyles.row}>
                          {times(COUNT_SIZE).map((j) => (
                            <Underlay key={j} />
                          ))}
                        </View>
                      ))}
                    </View>
                    <Spawner ref={spawner} />
                    <View style={[fieldStyles.fill, fieldStyles.rows]}>
                      {times(COUNT_SIZE).map((i) => (
                        <View key={i} style={fieldStyles.row}>
                          {times(COUNT_SIZE).map((j) => (
                            <Cell coords={getCoords({ i, j })} key={j} />
                          ))}
                        </View>
                      ))}
                    </View>
                  </Animated.View>
                </Animated.View>
              </Animated.View>
            </PinchGestureHandler>
          </Animated.View>
        </PanGestureHandler>
      </GestureHandlerRootView>
      <UI />
    </AppContext.Provider>
  );
}

const debugBarStyles = StyleSheet.create({
  debugBar: {
    width: "50%",
    position: "absolute",
    backgroundColor: UI_COLOR,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

const fieldStyles = StyleSheet.create({
  image: {
    resizeMode: "contain",
    width: CELL_SIZE * 0.5,
    height: CELL_SIZE * 0.5,
    borderRadius: 5,
  },

  row: { flexDirection: "row", gap: -CELL_BORDER_WIDTH },
  rows: {
    gap: -CELL_BORDER_WIDTH,
    position: "absolute",
  },
  field: {
    width: FIELD_SIZE,
    height: FIELD_SIZE,
    backgroundColor: CELL_COLOR,
  },
  camera: {
    backgroundColor: BACKGROUND_COLOR,
  },
  fill: {
    width: "100%",
    height: "100%",
  },
});
