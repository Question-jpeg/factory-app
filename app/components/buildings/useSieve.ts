import { BlockApi, Texture } from "../../models";
import { RESOURCES } from "./../../textures";
import { useBlock } from "./useBlock";
import { useRef } from "react";

export const useSieve = (coords: string): BlockApi => {
  const { startSpawn, stopSpawn, paths, pushItemGeneric } = useBlock(coords);

  const availableInput = useRef([
    RESOURCES.GRAVEL.id,
    RESOURCES.SAND.id,
    RESOURCES.DUST.id,
  ]);

  const rules = useRef({
    [RESOURCES.GRAVEL.id]: {
      index: 0,
      list: [
        RESOURCES.BROKEN_LEAD,
        RESOURCES.BROKEN_COPPER,
        RESOURCES.BROKEN_GOLD,
        RESOURCES.BROKEN_IRON,
        RESOURCES.BROKEN_TIN,

        RESOURCES.COAL,
        RESOURCES.DIAMOND,
        RESOURCES.AZURESTONE
      ],
    },
    [RESOURCES.SAND.id]: {
      index: 0,
      list: [
        RESOURCES.CRUSHED_LEAD,
        RESOURCES.CRUSHED_COPPER,
        RESOURCES.CRUSHED_GOLD,
        RESOURCES.CRUSHED_IRON,
        RESOURCES.CRUSHED_TIN,

        RESOURCES.SHARD_IRIDIUM,
      ],
    },
    [RESOURCES.DUST.id]: {
      index: 0,
      list: [
        RESOURCES.POWDERED_LEAD,
        RESOURCES.POWDERED_COPPER,
        RESOURCES.POWDERED_GOLD,
        RESOURCES.POWDERED_IRON,
        RESOURCES.POWDERED_TIN,

        RESOURCES.REDSTONE,
        RESOURCES.SULFUR,
        RESOURCES.GLOWSTONE
      ],
    },
  });

  const pushItem = ({
    textureId,
    destroyItem,
  }: {
    textureId: number;
    destroyItem: () => any;
  }) => {
    const data = rules.current[textureId];
    pushItemGeneric({
      texture: data.list[data.index++ % data.list.length],
      destroyItem,
      milliseconds: 1500,
      iterations: 1,
    });
  };

  return { startSpawn, stopSpawn, availableInput, pushItem, paths };
};
