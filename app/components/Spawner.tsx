import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import Item from "./Item";
import { CELL_SIZE } from "./../config/sizes";
import { RESOURCE_BLOCKS } from "../textures";
import { SpawnerAPI, Item as ItemModel } from "../models";

const Spawner = React.forwardRef(({}, ref) => {
  const [items, setItems] = useState<{ [key: string]: ItemModel }>({});
  const itemId = useRef(0);

  useImperativeHandle(
    ref,
    () =>
      ({
        createItem: (item) => {
          setItems((prev) => {
            const newState = { ...prev };
            newState[itemId.current++] = item;
            return newState;
          });
        },
      } as SpawnerAPI)
  );

  return (
    <View pointerEvents="none" style={styles.container}>
      {Object.keys(items).map((id) => {
        const item = items[id];
        return (
          <Item
            key={id}
            item={item}
            destroySelf={() =>
              setItems((prev) => {
                const newState = { ...prev };
                delete newState[id];
                return newState;
              })
            }
          />
        );
      })}
    </View>
  );
});

Spawner.displayName = "Spawner";

export default Spawner;

const styles = StyleSheet.create({
  container: {
    aspectRatio: 1,
    width: CELL_SIZE,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    // backgroundColor: 'red'
  },
});
