// import { useRef } from "react";
// import { BlockApi, Texture } from "../../models";
// import { RESOURCE_BLOCKS } from "./../../textures";
// import { useBlock } from "./useBlock";

// export const useCompressor = (): BlockApi => {
//   const { createItem, stopSpawn, paths } = useBlock();

//   const itemsCount = useRef<{ [key: string]: number }>({
//     [RESOURCE_BLOCKS.COBBLESTONE.id]: 0,
//     [RESOURCE_BLOCKS.GRAVEL.id]: 0,
//     [RESOURCE_BLOCKS.SAND.id]: 0,
//     [RESOURCE_BLOCKS.DUST.id]: 0,
//   });
//   const availableInput = [
//     RESOURCE_BLOCKS.COBBLESTONE.id,
//     RESOURCE_BLOCKS.GRAVEL.id,
//     RESOURCE_BLOCKS.SAND.id,
//     RESOURCE_BLOCKS.DUST.id,
//   ];

//   const rules: { [key: string]: Texture } = {
//     [RESOURCE_BLOCKS.COBBLESTONE.id]: RESOURCE_BLOCKS.COMPRESSED_COBBLESTONE,
//     [RESOURCE_BLOCKS.GRAVEL.id]: RESOURCE_BLOCKS.COMPRESSED_GRAVEL,
//     [RESOURCE_BLOCKS.SAND.id]: RESOURCE_BLOCKS.COMPRESSED_SAND,
//     [RESOURCE_BLOCKS.DUST.id]: RESOURCE_BLOCKS.COMPRESSED_DUST,
//   };

//   const pushItem = ({
//     texture,
//     destroyItem,
//   }: {
//     texture: Texture;
//     destroyItem: () => any;
//   }) => {
//     destroyItem();

//     itemsCount.current[texture.id]++;
//     if (itemsCount.current[texture.id] === 9) {
//       itemsCount.current[texture.id] = 0;
//       createItem(rules[texture.id]);
//     }
//   };

//   const startSpawn = () => {};

//   return { startSpawn, stopSpawn, availableInput, pushItem, paths };
// };
