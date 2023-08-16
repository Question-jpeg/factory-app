import React, {
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Image, StyleSheet, View } from "react-native";
import { CELL_BORDER_WIDTH, CELL_SIZE } from "../config/sizes";
import { AppContext } from "../context";
import { EDIT_MODES } from "../enums";
import { BuildingAPI, Neighbours, Texture } from "../models";
import { ATTACHMENTS, BUILDINGS, RESOURCES } from "../textures";
import { getNeighboursDict } from "../utils";
import { times } from "lodash";
import { useExtractor } from "./buildings/useExtractor";
import { useHammer } from "./buildings/useHammer";
// import { useCompressor } from "./buildings/useCompressor";
import { useSieve } from './buildings/useSieve';
import { useChest } from './buildings/useChest';

const MAPPING = {
  [BUILDINGS.EXTRACTOR.id]: () => useExtractor(),
  [BUILDINGS.HAMMER.id]: () => useHammer(),
  // [BUILDINGS.COMPRESSOR.id]: () => useCompressor(),
  [BUILDINGS.SIEVE.id]: () => useSieve(),
  // [BUILDINGS.CHEST.id]: () => useChest(),
};

const Building = React.forwardRef(
  (
    {
      coords,
      texture,
      setEditMode,
    }: {
      coords: string;
      texture: Texture;
      setEditMode: (mode: EDIT_MODES) => any;
    },
    ref
  ) => {
    const neighbours = useRef<Neighbours>({});
    const G = useRef(0);
    const H = useRef(0);
    const Connection = useRef<BuildingAPI>();
    const block = MAPPING[texture.id]();

    useImperativeHandle(
      ref,
      () =>
        ({
          id: texture.id,
          coords,
          neighbours,
          block,
          F: () => G.current + H.current,
          G,
          H,
          Connection,
          refreshNode: () => {
            G.current = 0;
            H.current = 0;
            Connection.current = undefined
          },          
          setEditMode,
          initNeighbours: (field) => {
            const buildings = getNeighboursDict(
              coords,
              field,
              (building) => building.id === BUILDINGS.PIPE.id
            );
            neighbours.current = buildings;
          },
          toggleNeighbour: (building) => {
            if (building.id === BUILDINGS.PIPE.id) {
              const targetCoords = building.coords;
              if (neighbours.current[targetCoords])
                delete neighbours.current[targetCoords];
              else
                neighbours.current[targetCoords] = { building, servo: false };
            }
          },
          toggleServo: (building) => {
            const targetCoords = building.coords;
            const servo = Boolean(neighbours.current[targetCoords]?.servo);

            neighbours.current[targetCoords] = { building, servo: !servo };
          },
          addNeighbour: (building) => {
            if (building.id === BUILDINGS.PIPE.id)
              neighbours.current[building.coords] = { building, servo: false };
          },
          removeNeighbour: (building) => {
            delete neighbours.current[building.coords];
          },
        } as BuildingAPI)
    );

    return <Image source={texture.image} style={styles.image} />;
  }
);

Building.displayName = "Building";

export default Building;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
});
