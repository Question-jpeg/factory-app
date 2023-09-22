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
import { useCompressor } from "./buildings/useCompressor";
import { useSieve } from "./buildings/useSieve";
import { useChest } from "./buildings/useChest";
import { useFernace } from "./buildings/useFernace";
import { useMelter } from "./buildings/useMelter";
import { useMetalFormer } from "./buildings/useMetalFormer";
import { useBench } from "./buildings/useBench";
import { useMacerator } from "./buildings/useMacerator";
import { useTreeFarm } from "./buildings/useTreeFarm";
import { useSawmill } from "./buildings/useSawmill";
import { useStringFarm } from "./buildings/useStringFarm";

const MAPPING = {
  [BUILDINGS.EXTRACTOR.id]: (coords: string) => useExtractor(coords),
  [BUILDINGS.HAMMER.id]: (coords: string) => useHammer(coords),
  [BUILDINGS.COMPRESSOR.id]: (coords: string) => useCompressor(coords),
  [BUILDINGS.SIEVE.id]: (coords: string) => useSieve(coords),
  [BUILDINGS.CHEST.id]: (coords: string) => useChest(coords),
  [BUILDINGS.FURNACE.id]: (coords: string) => useFernace(coords),
  [BUILDINGS.MELTER.id]: (coords: string) => useMelter(coords),
  [BUILDINGS.METAL_FORMER.id]: (coords: string) => useMetalFormer(coords),
  [BUILDINGS.BENCH.id]: (coords: string) => useBench(coords),
  [BUILDINGS.MACERATOR.id]: (coords: string) => useMacerator(coords),
  [BUILDINGS.TREE_FARM.id]: (coords: string) => useTreeFarm(coords),
  [BUILDINGS.SAWMILL.id]: (coords: string) => useSawmill(coords),
  [BUILDINGS.STRING_FARM.id]: (coords: string) => useStringFarm(coords),
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
    const block = MAPPING[texture.id](coords);

    const isAnimatingOverflow = useRef(false);

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
          animateOverflow: () => {
            if (!isAnimatingOverflow.current) {
              isAnimatingOverflow.current = true;
              setEditMode(EDIT_MODES.DELETE);
              setTimeout(() => {
                setEditMode(EDIT_MODES.NONE);
                setTimeout(() => {
                  setEditMode(EDIT_MODES.DELETE);
                  setTimeout(() => {
                    setEditMode(EDIT_MODES.NONE);
                    setTimeout(() => {
                      isAnimatingOverflow.current = false;
                    }, 500);
                  }, 500);
                }, 500);
              }, 500);
            }
          },
          refreshNode: () => {
            G.current = 0;
            H.current = 0;
            Connection.current = undefined;
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
