import { useContext, useEffect, useRef } from "react";
import { AppContext } from "../../context";
import { Paths, Texture } from "../../models";

export const useBlock = (coords: string) => {
  const timer = useRef<any>();
  const paths = useRef<Paths>({});
  const stack = useRef<any[]>([]);
  const spawnAllowed = useRef(true);
  const itemsCount = useRef<{ [key: number]: number }>({});

  const { spawner, blocks } = useContext(AppContext);

  const createItem = (texture: Texture, customPathTexture?: Texture) => {
    const data = paths.current[customPathTexture?.id ?? texture.id];

    if (data) {
      spawner.current?.createItem({
        texture,
        initPath: data.list[data.index++ % data.list.length],
      });
    }
  };

  const pushItemGeneric = ({
    texture,
    destroyItem = () => true,
    milliseconds,
    iterations,
    customPathTexture,
  }: {
    texture: Texture;
    destroyItem?: () => any;
    milliseconds?: number;
    iterations?: number;
    customPathTexture?: Texture;
  }) => {
    if (spawnAllowed.current) {
      if (timer.current) {
        if (stack.current.length === 3) {
          destroyItem();
          blocks.current[coords].animateOverflow();
        } else
          stack.current.push({
            texture,
            destroyItem,
            milliseconds,
            iterations,
          });
      } else {
        if (milliseconds) {
          let counter = 0;
          timer.current = setInterval(() => {
            createItem(texture, customPathTexture);

            if (++counter === iterations) {
              clearInterval(timer.current);
              destroyItem();
              timer.current = undefined;
              if (stack.current.length) pushItemGeneric(stack.current.pop());
            }
          }, milliseconds);
        } else {
          destroyItem();
          createItem(texture, customPathTexture);
        }
      }
    }
  };

  const countItem = (textureId: number) => {
    itemsCount.current[textureId] = itemsCount.current[textureId]
      ? itemsCount.current[textureId] + 1
      : 1;
  };

  const startSpawn = () => {
    spawnAllowed.current = true;
  };

  const stopSpawn = () => {
    spawnAllowed.current = false;

    clearInterval(timer.current);

    timer.current = undefined;
    stack.current = [];
  };

  useEffect(() => {
    return function cleanup() {
      stopSpawn();
    };
  }, []);

  return {
    timer,
    paths,
    itemsCount,
    countItem,
    pushItemGeneric,
    createItem,
    startSpawn,
    stopSpawn,
  };
};
