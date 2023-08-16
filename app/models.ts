import { MutableRefObject } from "react";
import { EDIT_MODES, SELECTIONS } from "./enums";

export type Texture = {
  id: number;
  image: any;
};

export type Item = {
  texture: Texture;
  initPath: string[];
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
  block: BlockApi;
  H: MutableRefObject<number>;
  G: MutableRefObject<number>;
  F: () => number;
  Connection: MutableRefObject<BuildingAPI>;
  refreshNode: () => any;
  addNeighbour: (building: BuildingAPI) => any;
  removeNeighbour: (building: BuildingAPI) => any;
  toggleNeighbour: (building: BuildingAPI) => any;
  toggleServo: (building: BuildingAPI) => any;
  initNeighbours: (field: MutableRefObject<Field>) => any;
  setEditMode: (mode: EDIT_MODES) => any;
};

export type BlockApi = {
  availableInput: number[];
  paths: MutableRefObject<Paths>;
  startSpawn: () => any;
  pushItem: ({ texture, destroyItem }: { texture: Texture, destroyItem: () => any }) => any;
  stopSpawn: () => any;
};

export type SideBarAPI = {
  setSelection: (selection: SELECTIONS) => any;
};

export type SpawnerAPI = {
  createItem: (item: Item) => any;
  clearItems: () => any;
};

export type AppContextValue = {
  field: MutableRefObject<Field>;
  blocks: MutableRefObject<Field>;
  selection: MutableRefObject<SELECTIONS>;
  selectedBuilding: MutableRefObject<Texture | undefined>;
  selectedConnections: MutableRefObject<{ [key: string]: BuildingAPI }>;
  spawner: MutableRefObject<SpawnerAPI | undefined>;
  placeBuilding: (coords: string, ref: any) => any;
  destroyBuilding: (building: BuildingAPI) => any;
};
