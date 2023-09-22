import { MutableRefObject } from "react";
import { EDIT_MODES, METAL_FORMER_MODES, SELECTIONS } from "./enums";

export type SavedBuilding = {
  id: number;
  recipe?: Recipe;
  metalFormerMode?: METAL_FORMER_MODES;
  neighbours: { [key: string]: boolean };
};

export type Texture = {
  id: number;
  image: any;
};

export type Item = {
  texture: Texture;
  initPath: string[];
};

export type Recipe = {
  texture: Texture;
  craft: { [key: number]: number };
  count: number;
};

export type Field = { [coords: string]: BuildingAPI };

export type Neighbours = {
  [key: string]: { servo: boolean; building: BuildingAPI };
};

export type Paths = {
  [key: number]: { index: number; list: string[][] };
};

export type BuildingAPI = {
  id: number;
  coords: string;
  neighbours: MutableRefObject<Neighbours>;
  setNeighboursState?: (neighbours: Neighbours) => any;
  block: BlockApi;
  H: MutableRefObject<number>;
  G: MutableRefObject<number>;
  F: () => number;
  Connection: MutableRefObject<BuildingAPI>;
  animateOverflow: () => any;
  refreshNode: () => any;
  addNeighbour: (building: BuildingAPI) => any;
  removeNeighbour: (building: BuildingAPI) => any;
  toggleNeighbour: (building: BuildingAPI) => any;
  toggleServo: (building: BuildingAPI) => any;
  initNeighbours: (field: MutableRefObject<Field>) => any;
  setEditMode: (mode: EDIT_MODES) => any;
};

export type BlockApi = {
  availableInput: MutableRefObject<number[]>;
  paths: MutableRefObject<Paths>;
  recipe?: MutableRefObject<Recipe>;
  setRecipe?: (recipe: Recipe) => any;
  metalFormerMode?: MutableRefObject<METAL_FORMER_MODES>;
  setMetalFormerMode?: (mode: METAL_FORMER_MODES) => any;
  startSpawn: () => any;
  pushItem: ({
    textureId,
    destroyItem,
  }: {
    textureId: number;
    destroyItem: () => any;
  }) => any;
  stopSpawn: () => any;
};

export type CellAPI = {
  setBuilding: (texture: Texture) => any;
};

export type SideBarAPI = {
  setSelection: (selection: SELECTIONS) => any;
};

export type SpawnerAPI = {
  createItem: (item: Item) => any;
  clearItems: () => any;
};

export type UIApi = {
  setBench: (bench: BuildingAPI) => any;
  setMetalFormer: (metalFormer: BuildingAPI) => any;
};

export type ItemAPI = {
  create: (texture: Texture, path: string[]) => any;
  reset: () => any;
  isFree: MutableRefObject<boolean>;
};

export type AppContextValue = {
  field: MutableRefObject<Field>;
  blocks: MutableRefObject<Field>;
  selection: MutableRefObject<SELECTIONS>;
  selectedBuilding: MutableRefObject<Texture | undefined>;
  selectedConnections: MutableRefObject<{ [key: string]: BuildingAPI }>;
  spawner: MutableRefObject<SpawnerAPI | undefined>;
  UI: MutableRefObject<UIApi | undefined>;
  placeBuilding: (coords: string, ref: any) => any;
  destroyBuilding: (building: BuildingAPI) => any;
};
