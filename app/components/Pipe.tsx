import React, {
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Image, StyleSheet, View } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { CELL_SIZE } from "../config/sizes";
import { AppContext } from "../context";
import { DIRECTIONS, EDIT_MODES } from "../enums";
import { BuildingAPI, Neighbours } from "../models";
import { ATTACHMENTS, BUILDINGS } from "../textures";
import { getDirection, getNeighboursDict } from "./../utils";

const Pipe = React.forwardRef(
  (
    {
      coords,
      setEditMode,
    }: { coords: string; setEditMode: (mode: EDIT_MODES) => any },
    ref
  ) => {
    const neighbours = useRef<Neighbours>({});
    const [neighboursState, setNeighboursState] = useState<Neighbours>({});
    const directionsRotations = {
      [DIRECTIONS.LEFT]: "0deg",
      [DIRECTIONS.TOP]: "90deg",
      [DIRECTIONS.RIGHT]: "180deg",
      [DIRECTIONS.BOTTOM]: "-90deg",
    };

    const G = useRef(0);
    const H = useRef(0);
    const Connection = useRef<BuildingAPI>();

    useImperativeHandle(
      ref,
      () =>
        ({
          id: BUILDINGS.PIPE.id,
          coords,
          neighbours,
          setEditMode,
          F: () => G.current + H.current,
          G,
          H,
          Connection,
          refreshNode: () => {
            G.current = 0;
            H.current = 0;
            Connection.current = undefined;
          },          
          toggleNeighbour: (building) => {
            const targetCoords = building.coords;

            if (neighbours.current[targetCoords])
              delete neighbours.current[targetCoords];
            else neighbours.current[targetCoords] = { building, servo: false };

            setNeighboursState({ ...neighbours.current });
          },
          toggleServo: (building) => {
            const targetCoords = building.coords;
            const servo = !Boolean(neighbours.current[targetCoords]?.servo);

            neighbours.current[targetCoords] = { building, servo };

            setNeighboursState({ ...neighbours.current });
          },
          addNeighbour: (building) => {
            const targetCoords = building.coords;
            neighbours.current[targetCoords] = { building, servo: false };

            setNeighboursState({ ...neighbours.current });
          },
          removeNeighbour: (building) => {
            delete neighbours.current[building.coords];

            setNeighboursState({ ...neighbours.current });
          },
          initNeighbours: (field) => {
            const neighboursDict = getNeighboursDict(coords, field);
            neighbours.current = neighboursDict;

            setNeighboursState({ ...neighbours.current });
          },
        } as BuildingAPI)
    );

    return (
      <>
        <Image source={BUILDINGS.PIPE.image} style={styles.image} />
        {Object.values(neighboursState).map(({ building, servo }, i) => {
          const direction = getDirection(coords, building.coords);
          return (
            <Animated.Image
              key={i}
              source={
                servo
                  ? ATTACHMENTS.SERVO
                  : building.id === BUILDINGS.PIPE.id
                  ? ATTACHMENTS.CONNECTOR
                  : ATTACHMENTS.NODE
              }
              style={[
                styles.image,
                { transform: [{ rotate: directionsRotations[direction] }] },
              ]}
            />
          );
        })}
      </>
    );
  }
);

Pipe.displayName = "Pipe";

export default Pipe;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
});
