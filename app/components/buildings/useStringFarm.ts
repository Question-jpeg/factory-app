import { BlockApi } from "../../models";
import { useBlock } from "./useBlock";
import { useRef } from "react";
import { RESOURCES } from "./../../textures";

export const useStringFarm = (coords: string): BlockApi => {
  const { paths, timer, createItem, stopSpawn } = useBlock(coords);

  const availableInput = useRef([]);

  const pushItem = () => {};

  const startSpawn = () => {
    timer.current = setInterval(() => {
      createItem(RESOURCES.STRING);
    }, 500);
  };

  return { paths, availableInput, pushItem, startSpawn, stopSpawn };
};
