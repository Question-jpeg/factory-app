import { BlockApi } from "../../models";
import { useBlock } from "./useBlock";
import { useRef } from "react";
import { RESOURCES } from "./../../textures";

export const useTreeFarm = (coords: string): BlockApi => {
  const { paths, timer, stopSpawn, createItem } = useBlock(coords);

  const availableInput = useRef([]);

  const pushItem = () => {};

  const startSpawn = () => {
    timer.current = setInterval(() => {
      createItem(RESOURCES.WOOD);
    }, 3000);
  };

  return { paths, availableInput, pushItem, startSpawn, stopSpawn };
};
