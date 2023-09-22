import { BlockApi, Texture } from "../../models";
import { useBlock } from "./useBlock";
import { RESOURCES } from "./../../textures";
import { useRef } from "react";
import { METAL_FORMER_MODES } from "../../enums";

const data: {
  [key in METAL_FORMER_MODES]: {
    availableInput: number[];
    rules: { [key: number]: Texture };
  };
} = {
  [METAL_FORMER_MODES.ROLLING]: {
    availableInput: [
      RESOURCES.INGOT_BRONZE.id,
      RESOURCES.INGOT_IRON.id,
      RESOURCES.INGOT_TIN.id,
      RESOURCES.INGOT_ALLOY.id,
      RESOURCES.INGOT_COPPER.id,
      // RESOURCES.INGOT_GOLD.id,

      RESOURCES.PLATE_BRONZE.id,
      RESOURCES.PLATE_IRON.id,
      RESOURCES.PLATE_TIN.id,
      RESOURCES.PLATE_COPPER.id,
      // RESOURCES.PLATE_GOLD.id,
    ],
    rules: {
      [RESOURCES.INGOT_BRONZE.id]: RESOURCES.PLATE_BRONZE,
      [RESOURCES.INGOT_IRON.id]: RESOURCES.PLATE_IRON,
      [RESOURCES.INGOT_TIN.id]: RESOURCES.PLATE_TIN,
      [RESOURCES.INGOT_ALLOY.id]: RESOURCES.PLATE_ALLOY,
      [RESOURCES.INGOT_COPPER.id]: RESOURCES.PLATE_COPPER,
      [RESOURCES.INGOT_GOLD.id]: RESOURCES.PLATE_GOLD,

      [RESOURCES.PLATE_BRONZE.id]: RESOURCES.CASING_BRONZE,
      [RESOURCES.PLATE_IRON.id]: RESOURCES.CASING_IRON,
      [RESOURCES.PLATE_TIN.id]: RESOURCES.CASING_TIN,
      [RESOURCES.PLATE_COPPER.id]: RESOURCES.CASING_COPPER,
      [RESOURCES.PLATE_GOLD.id]: RESOURCES.CASING_GOLD,
    },
  },
  [METAL_FORMER_MODES.CUTTING]: {
    availableInput: [
      RESOURCES.PLATE_COPPER.id,
      // RESOURCES.PLATE_GOLD.id,
      // RESOURCES.PLATE_IRON.id,
      RESOURCES.PLATE_TIN.id,
    ],
    rules: {
      [RESOURCES.PLATE_COPPER.id]: RESOURCES.CABLE_COPPER,
      [RESOURCES.PLATE_GOLD.id]: RESOURCES.CABLE_GOLD,
      [RESOURCES.PLATE_IRON.id]: RESOURCES.CABLE_IRON,
      [RESOURCES.PLATE_TIN.id]: RESOURCES.CABLE_TIN,
    },
  },
  [METAL_FORMER_MODES.EXTRUDING]: {
    availableInput: [
      RESOURCES.INGOT_COPPER.id,
      // RESOURCES.INGOT_GOLD.id,
      // RESOURCES.INGOT_IRON.id,
      RESOURCES.INGOT_TIN.id,
    ],
    rules: {
      [RESOURCES.INGOT_COPPER.id]: RESOURCES.CABLE_COPPER,
      [RESOURCES.INGOT_GOLD.id]: RESOURCES.CABLE_GOLD,
      [RESOURCES.INGOT_IRON.id]: RESOURCES.CABLE_IRON,
      [RESOURCES.INGOT_TIN.id]: RESOURCES.CABLE_TIN,
    },
  },
};

const initMode = METAL_FORMER_MODES.ROLLING;

export const useMetalFormer = (coords: string): BlockApi => {
  const { paths, startSpawn, stopSpawn, pushItemGeneric } = useBlock(coords);

  const metalFormerMode = useRef(initMode);

  const availableInput = useRef(data[initMode].availableInput);

  const rules = useRef(data[initMode].rules);

  const setMetalFormerMode = (mode: METAL_FORMER_MODES) => {
    metalFormerMode.current = mode;

    availableInput.current = data[mode].availableInput;
    rules.current = data[mode].rules;
  };

  const counts: { [key: number]: { [key: number]: number } } = {
    [METAL_FORMER_MODES.CUTTING]: {
      [RESOURCES.CABLE_COPPER.id]: 3,
      [RESOURCES.CABLE_GOLD.id]: 3,
      [RESOURCES.CABLE_IRON.id]: 3,
      [RESOURCES.CABLE_TIN.id]: 3,
    },
    [METAL_FORMER_MODES.EXTRUDING]: {
      [RESOURCES.CABLE_COPPER.id]: 9,
      [RESOURCES.CABLE_GOLD.id]: 9,
      [RESOURCES.CABLE_IRON.id]: 9,
      [RESOURCES.CABLE_TIN.id]: 9,
    },
    [METAL_FORMER_MODES.ROLLING]: {
      [RESOURCES.CASING_BRONZE.id]: 1,
      [RESOURCES.CASING_COPPER.id]: 1,
      [RESOURCES.CASING_GOLD.id]: 1,
      [RESOURCES.CASING_IRON.id]: 1,
      [RESOURCES.CASING_LEAD.id]: 1,
      [RESOURCES.CASING_TIN.id]: 1,

      [RESOURCES.PLATE_ALLOY.id]: 9,
      [RESOURCES.PLATE_BRONZE.id]: 9,
      [RESOURCES.PLATE_COPPER.id]: 9,
      [RESOURCES.PLATE_GOLD.id]: 9,
      [RESOURCES.PLATE_IRON.id]: 9,
      [RESOURCES.PLATE_LEAD.id]: 9,
      [RESOURCES.PLATE_TIN.id]: 9,
    },
  };

  const pushItem = ({
    textureId,
    destroyItem,
  }: {
    textureId: number;
    destroyItem: () => any;
  }) => {
    const targetTexture = rules.current[textureId];
    const count = counts[metalFormerMode.current][targetTexture.id]
    pushItemGeneric({
      texture: targetTexture,
      destroyItem,
      milliseconds: 1500 / count,
      iterations: count,
    });
  };

  return {
    paths,
    availableInput,
    metalFormerMode,
    startSpawn,
    stopSpawn,
    pushItem,
    setMetalFormerMode,
  };
};
