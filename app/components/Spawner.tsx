import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import Item from "./Item";
import { CELL_SIZE } from "./../config/sizes";
import { RESOURCES } from "../textures";
import { SpawnerAPI, Item as ItemModel } from "../models";

const Spawner = React.forwardRef(({}, ref) => {
  const [items, setItems] = useState<{ item: ItemModel; id: number }[]>([]);
  const itemId = useRef(0);

  useImperativeHandle(
    ref,
    () =>
      ({
        createItem: (item) => {
          setItems((prev) => {
            return [...prev, { item, id: itemId.current++ }];
          });
        },
        clearItems: () => {
          setItems([]);
        },
      } as SpawnerAPI)
  );

  return (
    <View pointerEvents="none" style={styles.container}>
      {items.map(({ item, id }) => (
        <Item
          key={id}
          item={item}
          destroySelf={() =>
            setItems((prev) => {
              return prev.filter(({ id: itemId }) => itemId !== id);
            })
          }
        />
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
