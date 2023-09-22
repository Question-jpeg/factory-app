import { BlockApi, Texture } from "../../models";
import { RESOURCES } from "./../../textures";
import { useBlock } from "./useBlock";
import { useRef } from "react";

export const useHammer = (coords: string): BlockApi => {
  const { paths, startSpawn, stopSpawn, pushItemGeneric } = useBlock(coords);

  const availableInput = useRef([
    RESOURCES.COBBLESTONE.id,
    RESOURCES.GRAVEL.id,
    RESOURCES.SAND.id,
  ]);

  const rules = {
    [RESOURCES.COBBLESTONE.id]: RESOURCES.GRAVEL,
    [RESOURCES.GRAVEL.id]: RESOURCES.SAND,
    [RESOURCES.SAND.id]: RESOURCES.DUST,
  };

  const pushItem = ({
    textureId,
    destroyItem,
  }: {
    textureId: number;
    destroyItem: () => any;
  }) => {
    pushItemGeneric({
      texture: rules[textureId],
      destroyItem,
      milliseconds: 1500,
      iterations: 1
    });
  };

  return { startSpawn, stopSpawn, availableInput, pushItem, paths };
};
