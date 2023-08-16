import { BuildingAPI } from "../models";
import { BUILDINGS } from "../textures";
import { getIJ } from "../utils";

const getDistance = (a: BuildingAPI, b: BuildingAPI) => {
  const { i: i1, j: j1 } = getIJ(a.coords);
  const { i: i2, j: j2 } = getIJ(b.coords);

  return Math.abs(i2 - i1) + Math.abs(j2 - j1);
};

export const findPath = (from: BuildingAPI, to: BuildingAPI) => {
  const getNeighbours = (building: BuildingAPI) => {
    if (building.id !== BUILDINGS.PIPE.id && building !== from) return [];
    return Object.values(building.neighbours.current)
      .filter(({ servo }) =>
        building.id === BUILDINGS.PIPE.id ? !servo : servo
      )
      .map(({ building: b }) => b);
  };

  const toSearch: BuildingAPI[] = [from];
  const processed: BuildingAPI[] = [];

  while (toSearch.length) {
    let current = toSearch[0];

    for (let node of toSearch) {
      if (
        node.F() < current.F() ||
        (node.F() === current.F() && node.H.current < current.H.current)
      )
        current = node;
    }

    if (current === to) {
      let currentPathTile = to;
      const path = [];
      while (currentPathTile !== from) {
        path.push(currentPathTile);
        currentPathTile = currentPathTile.Connection.current;
      }
      path.push(currentPathTile);

      return path.reverse().map((b) => b.coords);
    }

    processed.push(current);
    toSearch.splice(toSearch.indexOf(current), 1);

    for (let neighbor of getNeighbours(current).filter(
      (node) => !processed.includes(node)
    )) {
      const inSearch = toSearch.includes(neighbor);

      const costToNeighbor = current.G.current + 1;

      if (!inSearch || costToNeighbor < neighbor.G.current) {
        neighbor.G.current = costToNeighbor;
        neighbor.Connection.current = current;

        if (!inSearch) {
          neighbor.H.current = getDistance(neighbor, to);
          toSearch.push(neighbor);
        }
      }
    }
  }
  return null;
};
