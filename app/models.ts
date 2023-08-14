import { MutableRefObject } from "react";
import { DIRECTIONS, EDIT_MODES, SELECTIONS } from "./enums";

export type Texture = {
  id: number;
  image: any;
};

export type Item = {
  texture: Texture;
  initCoords: string;
};

export type Field = { [coords: string]: BuildingAPI };

export type BuildingAPI = {
  id: number;
  coords: string;
  neighbours: MutableRefObject<Neighbours>;
  distributionDict: MutableRefObject<{ [key: number]: number }>;
  pushItem: (texture: Texture) => any;
  addNeighbour: (building: BuildingAPI) => any;
  removeNeighbour: (building: BuildingAPI) => any;
  toggleNeighbour: (building: BuildingAPI) => any;
  toggleServo: (building: BuildingAPI) => any;
  initNeighbours: (field: MutableRefObject<Field>) => any;
  setEditMode: (mode: EDIT_MODES) => any;
};

export type SideBarAPI = {
  setSelection: (selection: SELECTIONS) => any;
};

export type SpawnerAPI = {
  createItem: (item: Item) => any;
};

export type Neighbours = {
  [key: string]: { servo: boolean; building: BuildingAPI };
};

export type AppContextValue = {
  field: MutableRefObject<Field>;
  selection: MutableRefObject<SELECTIONS>;
  selectedBuilding: MutableRefObject<Texture | undefined>;
  selectedConnections: MutableRefObject<{ [key: string]: BuildingAPI }>;
  spawner: MutableRefObject<SpawnerAPI | undefined>;
  placeBuilding: (coords: string, ref: any) => any;
  destroyBuilding: (building: BuildingAPI) => any;
};

// export class Cell {

//   public outputs: Cell[] = []

//   constructor(
//     public field: Field,
//     public coords: Coords,
//     public texture: Item
//   ) {}

//   getTexture() {}

//   notify() {

//   }
// }
