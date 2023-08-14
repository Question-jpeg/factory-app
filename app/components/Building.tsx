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
import { ATTACHMENTS, BUILDINGS, RESOURCE_BLOCKS } from "../textures";
import { getNeighboursDict } from "../utils";
import { times } from "lodash";

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
    const items = useRef<{ [key: number]: number }>();
    const updateNumberRef = useRef(0);
    const intervalRef = useRef<any>();
    const distributionDict = useRef<{ [key: number]: number }>({});

    const { spawner } = useContext(AppContext);

    const pushItem = (item: Texture) => {
      if (texture.id === BUILDINGS.HAMMER.id) {
        const converter = {
          [RESOURCE_BLOCKS.COBBLESTONE.id]: RESOURCE_BLOCKS.GRAVEL,
          [RESOURCE_BLOCKS.GRAVEL.id]: RESOURCE_BLOCKS.SAND,
          [RESOURCE_BLOCKS.SAND.id]: RESOURCE_BLOCKS.DUST,
        };
        spawner.current?.createItem({
          initCoords: coords,
          texture: converter[item.id],
        });
      }
    };

    useImperativeHandle(
      ref,
      () =>
        ({
          id: texture.id,
          coords,
          setEditMode,
          neighbours,
          distributionDict,
          pushItem,
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

    useEffect(() => {
      if (texture.id === BUILDINGS.EXTRACTOR.id) {
        intervalRef.current = setInterval(() => {
          spawner.current?.createItem({
            texture: RESOURCE_BLOCKS.COBBLESTONE,
            initCoords: coords,
          });
        }, 1000);
      }

      return function cleanup() {
        clearInterval(intervalRef.current);
      };
    }, []);

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
