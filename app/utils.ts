import { COUNT_SIZE } from "./config/sizes";
import { join, times } from "lodash";
import {
  BuildingAPI,
  Field,
  Neighbours,
  Recipe,
  SavedBuilding,
} from "./models";
import { MutableRefObject } from "react";
import { DIRECTIONS } from "./enums";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function clampWorklet(number: number, lower: number, upper: number) {
  "worklet";
  return Math.min(Math.max(number, lower), upper);
}

export const getCoords = ({ i, j }: { i: number; j: number }): string => {
  return `${i}_${j}`;
};

export const getIJ = (coords: string): { i: number; j: number } => {
  const [i, j] = coords.split("_").map((v) => parseInt(v));
  return { i, j };
};

export const getCoordsDelta = (
  origin: string,
  target: string
): { i: number; j: number } => {
  const o = getIJ(origin);
  const t = getIJ(target);
  return { i: t.i - o.i, j: t.j - o.j };
};

export const isNeighbours = (coordsA: string, coordsB: string) => {
  const { i, j } = getCoordsDelta(coordsA, coordsB);
  return (i === 0 && Math.abs(j) === 1) || (j === 0 && Math.abs(i) === 1);
};

export const getDirection = (origin: string, target: string): DIRECTIONS => {
  const { i, j } = getCoordsDelta(origin, target);
  if (i === -1) return DIRECTIONS.TOP;
  if (i === 1) return DIRECTIONS.BOTTOM;
  if (j === -1) return DIRECTIONS.LEFT;
  else return DIRECTIONS.RIGHT;
};

export const getNeighboursList = (
  coords: string,
  field: MutableRefObject<Field>
): BuildingAPI[] => {
  const { i, j } = getIJ(coords);

  return [
    { i: i - 1, j },
    { i, j: j - 1 },
    { i: i + 1, j },
    { i, j: j + 1 },
  ]
    .map((raw) => field.current[getCoords(raw)])
    .filter((v) => v);
};

export const getNeighboursDict = (
  coords: string,
  field: MutableRefObject<Field>,
  filterFunc = (building: BuildingAPI) => true
): Neighbours => {
  const { i, j } = getIJ(coords);

  const rDict: Neighbours = {};
  [
    { i: i - 1, j },
    { i, j: j - 1 },
    { i: i + 1, j },
    { i, j: j + 1 },
  ].forEach((ij) => {
    const c = getCoords(ij);
    const building = field.current[c];
    if (building && filterFunc(building)) rDict[c] = { building, servo: false };
  });

  return rDict;
};

export const writeItem = (
  itemsCount: { [key: number]: number },
  destroys: { [key: number]: () => any },
  textureId: number,
  destroyItem: () => any
) => {
  itemsCount[textureId] = itemsCount[textureId] ? itemsCount[textureId] + 1 : 1;

  if (itemsCount[textureId] === 1) destroys[textureId] = destroyItem;
  else destroyItem();
};

export const clearItems = (
  itemsCount: { [key: string]: number },
  destroys: { [key: string]: () => any }
) => {
  Object.keys(itemsCount)
    .filter((key) => itemsCount[key] === 0)
    .forEach((key) => {
      destroys[key]();
      destroys[key] = () => true;
    });
};

export const isRecipeCompleted = (
  { craft }: Recipe,
  itemsCount: { [key: string]: number }
) => {
  let ok = true;
  for (let textureId of Object.keys(craft)) {
    if (
      !itemsCount[textureId] ||
      itemsCount[textureId] < craft[textureId as any]
    ) {
      ok = false;
      break;
    }
  }
  if (ok) {
    Object.keys(craft).forEach((textureId) => {
      itemsCount[textureId] -= craft[textureId as any];
    });
  }
  return ok;
};

export const getBuildings = (field: MutableRefObject<Field>) => {
  return Object.values(field.current)
    .flatMap((row) => Object.values(row))
    .filter((v) => v);
};

export const saveField = (field: { [key: string]: SavedBuilding }) => {
  AsyncStorage.setItem("field", JSON.stringify(field));
};

export const restoreField = async (): Promise<
  | {
      [key: string]: SavedBuilding;
    }
  | undefined
> => {
  const field = await AsyncStorage.getItem("field");
  return field ? JSON.parse(field) : undefined;
};
