import { BlockApi, Texture } from "../../models";
import { RESOURCES } from "./../../textures";
import { useBlock } from "./useBlock";
import { useRef } from 'react';

export const useExtractor = (coords: string): BlockApi => {
  const { timer, paths, stopSpawn, createItem } = useBlock(coords);

  const availableInput = useRef([]);

  const pushItem = () => {};

  const startSpawn = () => {
    timer.current = setInterval(() => {
      createItem(RESOURCES.COBBLESTONE);
    }, 500);
  };

  return { startSpawn, stopSpawn, availableInput, pushItem, paths };
};
