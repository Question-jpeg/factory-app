import { BlockApi, Texture } from "../../models";
import { RESOURCES } from "./../../textures";
import { useBlock } from "./useBlock";

export const useExtractor = (): BlockApi => {
  const { intervalRef, createItem, stopSpawn, paths } = useBlock();

  const availableInput: number[] = [];

  const pushItem = () => {};

  const startSpawn = () => {
    intervalRef.current = setInterval(() => {
      createItem(RESOURCES.COBBLESTONE);
    }, 500);
  };

  return { startSpawn, stopSpawn, availableInput, pushItem, paths };
};
