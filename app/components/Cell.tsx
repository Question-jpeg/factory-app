import React, {
  MutableRefObject,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import {
  BACKGROUND_COLOR,
  UI_COLOR,
  CELL_COLOR,
  CELL_BORDER_COLOR,
} from "../config/colors";
import { CELL_BORDER_WIDTH, CELL_SIZE } from "../config/sizes";
import { BUILDINGS } from "../textures";
import Building from "./Building";
import { AppContext } from "./../context";
import { EDIT_MODES, SELECTIONS } from "../enums";
import { CellAPI, Texture } from "../models";
import Pipe from "./Pipe";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { isNeighbours } from "../utils";

const Cell = React.forwardRef(({ coords }: { coords: string }, ref) => {
  const {
    selection,
    placeBuilding,
    destroyBuilding,
    field,
    selectedBuilding,
    selectedConnections,
    UI,
  } = useContext(AppContext);
  const [building, setBuilding] = useState<Texture>();
  const overlayMode = useSharedValue<EDIT_MODES>(EDIT_MODES.NONE);

  useImperativeHandle(
    ref,
    () =>
      ({
        setBuilding,
      } as CellAPI)
  );

  const overlayStyle = useAnimatedStyle(() => ({
    backgroundColor:
      overlayMode.value === EDIT_MODES.DELETE
        ? "brown"
        : overlayMode.value === EDIT_MODES.CONNECT
        ? "green"
        : overlayMode.value === EDIT_MODES.SERVO
        ? "orange"
        : "transparent",
  }));

  const setEditMode = (mode: EDIT_MODES) => {
    overlayMode.value = mode;
  };

  const onPress = () => {
    if (selection.current !== SELECTIONS.PLAY) {
      if (!field.current[coords]) {
        if (selection.current === SELECTIONS.PIPE) setBuilding(BUILDINGS.PIPE);
        else if (
          selection.current === SELECTIONS.BUILD &&
          selectedBuilding.current
        )
          setBuilding(selectedBuilding.current);
      } else if (
        selection.current === SELECTIONS.CONNECTION ||
        selection.current === SELECTIONS.SERVO
      ) {
        if (
          overlayMode.value === EDIT_MODES.CONNECT ||
          overlayMode.value === EDIT_MODES.SERVO
        ) {
          delete selectedConnections.current[coords];
          setEditMode(EDIT_MODES.NONE);
        } else {
          setEditMode(
            selection.current === SELECTIONS.CONNECTION
              ? EDIT_MODES.CONNECT
              : EDIT_MODES.SERVO
          );
          selectedConnections.current[coords] = field.current[coords];
          const selBuildings = Object.values(selectedConnections.current);

          if (selBuildings.length === 2) {
            const pipe = selBuildings.find((b) => b.id === BUILDINGS.PIPE.id);
            const cube = selBuildings.find((b) => b.id !== BUILDINGS.PIPE.id);
            const cubes = selBuildings.filter(
              (b) => b.id !== BUILDINGS.PIPE.id
            );

            const coordsA = selBuildings[0].coords;
            const coordsB = selBuildings[1].coords;
            if (
              isNeighbours(coordsA, coordsB) &&
              (selection.current === SELECTIONS.CONNECTION
                ? cubes.length < 2
                : pipe && cube)
            ) {
              selBuildings.forEach((b) => b.setEditMode(EDIT_MODES.NONE));
              selectedConnections.current = {};

              if (selection.current === SELECTIONS.CONNECTION) {
                selBuildings[0].toggleNeighbour(selBuildings[1]);
                selBuildings[1].toggleNeighbour(selBuildings[0]);
              } else {
                pipe!.toggleServo(cube!);
                cube!.toggleServo(pipe!);
              }
            } else {
              selBuildings
                .find((b) => b.coords !== coords)
                ?.setEditMode(EDIT_MODES.NONE);
              selectedConnections.current = { [coords]: field.current[coords] };
            }
          }
        }
      } else if (selection.current === SELECTIONS.DELETE) {
        setEditMode(EDIT_MODES.NONE);

        destroyBuilding(field.current[coords]);
        setBuilding(undefined);
      } else if (building?.id === BUILDINGS.BENCH.id)
        UI.current?.setBench(field.current[coords]);
      else if (building?.id === BUILDINGS.METAL_FORMER.id)
        UI.current?.setMetalFormer(field.current[coords]);
    }
  };

  return (
    <TouchableOpacity {...{ onPress }} style={[styles.cell]}>
      {building &&
        (building.id === BUILDINGS.PIPE.id ? (
          <Pipe
            ref={(ref) => placeBuilding(coords, ref)}
            {...{ coords, setEditMode }}
          />
        ) : (
          <Building
            ref={(ref) => placeBuilding(coords, ref)}
            texture={building}
            {...{ coords, setEditMode }}
          />
        ))}
      <Animated.View
        style={[StyleSheet.absoluteFillObject, { opacity: 0.33 }, overlayStyle]}
      />
    </TouchableOpacity>
  );
});

Cell.displayName = "Cell";

export default Cell;

const styles = StyleSheet.create({
  cell: {
    aspectRatio: 1,
    width: CELL_SIZE,
    justifyContent: "center",
    alignItems: "center",
  },
});
