import { BlockApi } from "../../models";
import { useBlock } from "./useBlock";
import { RESOURCES } from "./../../textures";
import { useRef } from "react";
import { writeItem, clearItems } from "./../../utils";

export const useMelter = (coords: string): BlockApi => {
  const { paths, itemsCount, startSpawn, stopSpawn, pushItemGeneric, countItem } = useBlock(coords);

  const availableInput = useRef([
    RESOURCES.INGOT_COPPER.id,
    RESOURCES.INGOT_TIN.id,
  ]);

  const pushItem = ({
    textureId,
    destroyItem,
  }: {
    textureId: number;
    destroyItem: () => any;
  }) => {
    destroyItem()
    countItem(textureId)

    if (
      itemsCount.current[RESOURCES.INGOT_COPPER.id] &&
      itemsCount.current[RESOURCES.INGOT_TIN.id]
    ) {
      itemsCount.current[RESOURCES.INGOT_COPPER.id]--;
      itemsCount.current[RESOURCES.INGOT_TIN.id]--;

      pushItemGeneric({
        texture: RESOURCES.INGOT_BRONZE,
        iterations: 2,
        milliseconds: 1000,
      });
    }
  };

  return { paths, availableInput, startSpawn, stopSpawn, pushItem };
};
