import { BlockApi } from "../../models";
import { useBlock } from "./useBlock";
import { useRef } from "react";
import { RESOURCES } from "./../../textures";

export const useSawmill = (coords: string): BlockApi => {
  const { paths, startSpawn, stopSpawn, pushItemGeneric } = useBlock(coords);

  const availableInput = useRef([RESOURCES.WOOD.id]);

  const pushItem = ({
    textureId,
    destroyItem,
  }: {
    textureId: number;
    destroyItem: () => any;
  }) => {
    pushItemGeneric({
      texture: RESOURCES.PLANKS,      
      milliseconds: 500,
      iterations: 4,
    });
    pushItemGeneric({
      texture: RESOURCES.RAW_RUBBER,
      destroyItem,
      milliseconds: 500,
      iterations: 1,
    });
  };

  return { availableInput, paths, pushItem, startSpawn, stopSpawn };
};
