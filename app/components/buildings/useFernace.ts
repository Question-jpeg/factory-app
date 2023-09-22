import { BlockApi, Texture } from "../../models";
import { RESOURCES } from "../../textures";
import { useBlock } from "./useBlock";
import { useRef } from 'react';

export const useFernace = (coords: string): BlockApi => {
  const { paths, pushItemGeneric, startSpawn, stopSpawn } = useBlock(coords);

  const availableInput = useRef([
    RESOURCES.LEAD_GRAVEL.id,
    RESOURCES.COPPER_GRAVEL.id,
    RESOURCES.GOLD_GRAVEL.id,
    RESOURCES.IRON_GRAVEL.id,
    RESOURCES.TIN_GRAVEL.id,

    RESOURCES.LEAD_SAND.id,
    RESOURCES.COPPER_SAND.id,
    RESOURCES.GOLD_SAND.id,
    RESOURCES.IRON_SAND.id,
    RESOURCES.TIN_SAND.id,

    RESOURCES.LEAD_DUST.id,
    RESOURCES.COPPER_DUST.id,
    RESOURCES.GOLD_DUST.id,
    RESOURCES.IRON_DUST.id,
    RESOURCES.TIN_DUST.id,

    RESOURCES.SAND.id,
    RESOURCES.RAW_RUBBER.id,
  ]);

  const rules: { [key: number]: Texture } = {
    [RESOURCES.LEAD_GRAVEL.id]: RESOURCES.INGOT_LEAD,
    [RESOURCES.COPPER_GRAVEL.id]: RESOURCES.INGOT_COPPER,
    [RESOURCES.GOLD_GRAVEL.id]: RESOURCES.INGOT_GOLD,
    [RESOURCES.IRON_GRAVEL.id]: RESOURCES.INGOT_IRON,
    [RESOURCES.TIN_GRAVEL.id]: RESOURCES.INGOT_TIN,

    [RESOURCES.LEAD_SAND.id]: RESOURCES.INGOT_LEAD,
    [RESOURCES.COPPER_SAND.id]: RESOURCES.INGOT_COPPER,
    [RESOURCES.GOLD_SAND.id]: RESOURCES.INGOT_GOLD,
    [RESOURCES.IRON_SAND.id]: RESOURCES.INGOT_IRON,
    [RESOURCES.TIN_SAND.id]: RESOURCES.INGOT_TIN,

    [RESOURCES.LEAD_DUST.id]: RESOURCES.INGOT_LEAD,
    [RESOURCES.COPPER_DUST.id]: RESOURCES.INGOT_COPPER,
    [RESOURCES.GOLD_DUST.id]: RESOURCES.INGOT_GOLD,
    [RESOURCES.IRON_DUST.id]: RESOURCES.INGOT_IRON,
    [RESOURCES.TIN_DUST.id]: RESOURCES.INGOT_TIN,

    [RESOURCES.SAND.id]: RESOURCES.GLASS,
    [RESOURCES.RAW_RUBBER.id]: RESOURCES.RUBBER
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

  return { availableInput, paths, pushItem, startSpawn, stopSpawn };
};
