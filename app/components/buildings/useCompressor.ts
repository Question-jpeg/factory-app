import { BlockApi, Texture } from "../../models";
import { RESOURCES } from "./../../textures";
import { useBlock } from "./useBlock";
import { useRef } from "react";

export const useCompressor = (coords: string): BlockApi => {
  const {
    startSpawn,
    stopSpawn,
    paths,
    pushItemGeneric,
    itemsCount,
    countItem,
  } = useBlock(coords);

  const availableInput = useRef([
    RESOURCES.BROKEN_LEAD.id,
    RESOURCES.BROKEN_COPPER.id,
    RESOURCES.BROKEN_GOLD.id,
    RESOURCES.BROKEN_IRON.id,
    RESOURCES.BROKEN_TIN.id,

    RESOURCES.CRUSHED_LEAD.id,
    RESOURCES.CRUSHED_COPPER.id,
    RESOURCES.CRUSHED_GOLD.id,
    RESOURCES.CRUSHED_IRON.id,
    RESOURCES.CRUSHED_TIN.id,

    RESOURCES.POWDERED_LEAD.id,
    RESOURCES.POWDERED_COPPER.id,
    RESOURCES.POWDERED_GOLD.id,
    RESOURCES.POWDERED_IRON.id,
    RESOURCES.POWDERED_TIN.id,

    RESOURCES.SHARD_IRIDIUM.id,
    RESOURCES.CARBON_MESH.id,
    RESOURCES.DUST_ENERGIUM.id,
    RESOURCES.DUST_AZURE.id,
  ]);
  const rules: { [key: number]: Texture } = {
    [RESOURCES.BROKEN_LEAD.id]: RESOURCES.LEAD_GRAVEL,
    [RESOURCES.BROKEN_COPPER.id]: RESOURCES.COPPER_GRAVEL,
    [RESOURCES.BROKEN_GOLD.id]: RESOURCES.GOLD_GRAVEL,
    [RESOURCES.BROKEN_IRON.id]: RESOURCES.IRON_GRAVEL,
    [RESOURCES.BROKEN_TIN.id]: RESOURCES.TIN_GRAVEL,

    [RESOURCES.CRUSHED_LEAD.id]: RESOURCES.LEAD_SAND,
    [RESOURCES.CRUSHED_COPPER.id]: RESOURCES.COPPER_SAND,
    [RESOURCES.CRUSHED_GOLD.id]: RESOURCES.GOLD_SAND,
    [RESOURCES.CRUSHED_IRON.id]: RESOURCES.IRON_SAND,
    [RESOURCES.CRUSHED_TIN.id]: RESOURCES.TIN_SAND,

    [RESOURCES.POWDERED_LEAD.id]: RESOURCES.LEAD_DUST,
    [RESOURCES.POWDERED_COPPER.id]: RESOURCES.COPPER_DUST,
    [RESOURCES.POWDERED_GOLD.id]: RESOURCES.GOLD_DUST,
    [RESOURCES.POWDERED_IRON.id]: RESOURCES.IRON_DUST,
    [RESOURCES.POWDERED_TIN.id]: RESOURCES.TIN_DUST,

    [RESOURCES.SHARD_IRIDIUM.id]: RESOURCES.ORE_IRIDIUM,
    [RESOURCES.CARBON_MESH.id]: RESOURCES.CARBON_PLATE,
    [RESOURCES.DUST_ENERGIUM.id]: RESOURCES.CRYSTAL,
    [RESOURCES.DUST_AZURE.id]: RESOURCES.PLATE_AZURE,
  };
  const uniquePathItems: number[] = [
    RESOURCES.SHARD_IRIDIUM.id,
    RESOURCES.CARBON_MESH.id,
    RESOURCES.DUST_ENERGIUM.id,
    RESOURCES.DUST_AZURE.id,
  ];
  const counts: { [key: number]: number } = {
    [RESOURCES.CARBON_MESH.id]: 1,
    [RESOURCES.DUST_ENERGIUM.id]: 1,
    [RESOURCES.DUST_AZURE.id]: 1,
  };

  const pushItem = ({
    textureId,
    destroyItem,
  }: {
    textureId: number;
    destroyItem: () => any;
  }) => {
    destroyItem();
    countItem(textureId);

    if (itemsCount.current[textureId] === (counts[textureId] ?? 4)) {
      itemsCount.current[textureId] = 0;

      const resultTexture = rules[textureId];
      pushItemGeneric({
        texture: resultTexture,
        customPathTexture: uniquePathItems.includes(textureId)
          ? resultTexture
          : RESOURCES.IRON_GRAVEL,
      });
    }
  };

  return { startSpawn, stopSpawn, availableInput, pushItem, paths };
};
