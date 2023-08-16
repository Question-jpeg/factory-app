import { useContext, useEffect, useRef } from "react";
import { AppContext } from "../../context";
import { Paths, Texture } from "../../models";

export const useBlock = () => {
  const intervalRef = useRef<any>();
  const paths = useRef<Paths>({});
  const timeout = useRef<any>();
  const stack = useRef<any[]>([]);

  const { spawner } = useContext(AppContext);

  const createItem = (texture: Texture) => {
    const data = paths.current[texture.id] || paths.current[-999];

    if (data) {
      const { index, list } = data;
      data.index = (index + 1) % list.length;

      spawner.current?.createItem({
        texture,
        initPath: list[index],
      });
    }
  };

  const stopSpawn = () => {
    clearInterval(intervalRef.current);
    clearTimeout(timeout.current);

    intervalRef.current = undefined;
    timeout.current = undefined;
    stack.current = [];
  };

  useEffect(() => {
    return function cleanup() {
      stopSpawn();
    };
  }, []);

  return {
    intervalRef,
    createItem,
    stopSpawn,
    paths,
    timeout,
    stack,
  };
};
