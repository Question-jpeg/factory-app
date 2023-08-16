import { BlockApi, Texture } from "../../models";
import { RESOURCES } from "./../../textures";
import { useBlock } from "./useBlock";

export const useChest = (): BlockApi => {
  const { stopSpawn, paths } = useBlock();

  const availableInput: number[] = [-999];

  const pushItem = () => {};

  const startSpawn = () => {};

  return { startSpawn, stopSpawn, availableInput, pushItem, paths };
};
