import { BlockApi, Texture } from "../../models";
import { useBlock } from "./useBlock";
import { RESOURCES } from "./../../textures";
import { useRef } from "react";

export const useMacerator = (coords: string): BlockApi => {
  const { paths, startSpawn, stopSpawn, pushItemGeneric } = useBlock(coords);

  const availableInput = useRef([
    RESOURCES.COAL.id,
    RESOURCES.DIAMOND.id,
    RESOURCES.AZURESTONE.id,
    RESOURCES.INGOT_LEAD.id,
  ]);

  const rules: { [key: number]: Texture } = {
    [RESOURCES.COAL.id]: RESOURCES.DUST_COAL,
    [RESOURCES.DIAMOND.id]: RESOURCES.DUST_DIAMOND,
    [RESOURCES.AZURESTONE.id]: RESOURCES.DUST_AZURE,
    [RESOURCES.INGOT_LEAD.id]: RESOURCES.DUST_LEAD,
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
      iterations: 1,
    });
  };

  return { paths, availableInput, pushItem, startSpawn, stopSpawn };
};
