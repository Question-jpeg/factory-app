import { COUNT_SIZE } from "./config/sizes";
import { join, times } from "lodash";
import { BuildingAPI, Field, Neighbours } from "./models";
import { MutableRefObject } from "react";
import { DIRECTIONS } from "./enums";

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

// export const updateNeighbours = (
//   updateNumber: number,
//   neighbours: Neighbours
// ) => {
//   Object.values(neighbours).forEach((n) => n?.update(updateNumber));
// };

export const getBuildings = (field: MutableRefObject<Field>) => {
  return Object.values(field.current)
    .flatMap((row) => Object.values(row))
    .filter((v) => v);
};

export const deepSearchForBlock = (from: BuildingAPI) => {
  
}
