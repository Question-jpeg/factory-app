import { BlockApi, Texture } from "../../models";
import { RESOURCES } from "./../../textures";
import { useBlock } from "./useBlock";
import { useRef } from "react";

export const useSieve = (): BlockApi => {
  const { createItem, stopSpawn, paths, timeout, stack } = useBlock();

  const availableInput = [
    RESOURCES.GRAVEL.id,
    RESOURCES.SAND.id,
    RESOURCES.DUST.id,
  ];

  const rules = useRef({
    [RESOURCES.GRAVEL.id]: { index: 0, list: [] }
  }) 

  const pushItem = ({
    texture,
    destroyItem,
  }: {
    texture: Texture;
    destroyItem: () => any;
  }) => {
    //  if (timeout.current) {
    //   if (stack.current.length === 5) destroyItem();
    //   else stack.current.push({ texture, destroyItem });
    // } else
    //   timeout.current = setTimeout(() => {
    //     destroyItem();
    //     createItem(rules[texture.id]);

    //     timeout.current = undefined;
    //     if (stack.current.length) pushItem(stack.current.pop());
    //   }, 500);
  };

  const startSpawn = () => {};

  return { startSpawn, stopSpawn, availableInput, pushItem, paths };
};
