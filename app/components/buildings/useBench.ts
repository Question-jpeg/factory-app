import { BlockApi, Recipe } from "../../models";
import { useRef } from "react";
import { useBlock } from "./useBlock";
import { writeItem, isRecipeCompleted } from "./../../utils";
import { RECIPES } from "./../../recipes";

export const useBench = (coords: string): BlockApi => {
  const recipe = useRef<Recipe>(RECIPES.INGOT_ALLOY);
  const availableInput = useRef<number[]>(
    Object.keys(RECIPES.INGOT_ALLOY.craft).map((id) => parseInt(id))
  );

  const {
    paths,
    itemsCount,
    countItem,
    pushItemGeneric,
    startSpawn,
    stopSpawn,
  } = useBlock(coords);

  const setRecipe = (newRecipe: Recipe) => {
    recipe.current = newRecipe;
    availableInput.current = Object.keys(newRecipe.craft).map((id) =>
      parseInt(id)
    );
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

    if (isRecipeCompleted(recipe.current, itemsCount.current))
      pushItemGeneric({
        texture: recipe.current.texture,
        iterations: recipe.current.count,
        milliseconds: 500,
      });
  };

  return {
    availableInput,
    paths,
    recipe,
    setRecipe,
    pushItem,
    startSpawn,
    stopSpawn,
  };
};
