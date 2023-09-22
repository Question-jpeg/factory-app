import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { Alert, Image, StyleSheet, View } from "react-native";
import Item from "./Item";
import { CELL_SIZE } from "./../config/sizes";
import { RESOURCES } from "../textures";
import { SpawnerAPI, Item as ItemModel, ItemAPI } from "../models";
import { times } from "lodash";

const N = 1000;

const Spawner = React.forwardRef(({}, ref) => {
  const items = useRef<ItemAPI[]>([]);
  const itemId = useRef(0);

  const addItem = (ref: ItemAPI, id: number) => {
    if (ref && !items.current[id]) items.current[id] = ref;
  };

  useImperativeHandle(
    ref,
    () =>
      ({
        createItem: ({ initPath, texture }) => {
          while (true) {
            const item = items.current[itemId.current++ % N];
            if (item.isFree.current) {
              item.create(texture, initPath);
              break;
            }
          }
        },
        clearItems: () => {
          items.current.forEach((item) => item.reset());
        },
      } as SpawnerAPI)
  );

  return (
    <View pointerEvents="none" style={styles.container}>
      {times(N).map((i) => (
        <Item key={i} ref={(ref) => addItem(ref as ItemAPI, i)} />
      ))}
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
