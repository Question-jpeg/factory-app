import { BlockApi, Texture } from "../../models";
import { RESOURCES } from "./../../textures";
import { useBlock } from "./useBlock";
import { useRef } from "react";

export const useChest = (coords: string): BlockApi => {
  const { startSpawn, stopSpawn, paths } = useBlock(coords);

  const availableInput = useRef(Object.values(RESOURCES).map(({ id }) => id));

  const pushItem = ({
    textureId,
    destroyItem,
  }: {
    textureId: number;
    destroyItem: () => any;
  }) => {
    destroyItem();
  };

  return { startSpawn, stopSpawn, availableInput, pushItem, paths };
};
