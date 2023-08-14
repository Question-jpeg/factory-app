import { Texture } from "./models";

export const RESOURCE_BLOCKS = {
  COBBLESTONE: {
    id: 0,
    image: require("../assets/app/resources/cobblestone.png"),
  },
  GRAVEL: {
    id: 1,
    image: require("../assets/app/resources/gravel.png"),
  },
  SAND: {
    id: 2,
    image: require("../assets/app/resources/sand.png"),
  },
  DUST: {
    id: 3,
    image: require("../assets/app/resources/dust.png"),
  },
};

export const BUILDINGS = {
  PIPE: {
    id: 0,
    image: require("../assets/app/buildings/pipes/pipe.png"),
  },
  CHEST: {
    id: 1,
    image: require('../assets/app/buildings/chest.png')
  },
  EXTRACTOR: {
    id: 2,
    image: require('../assets/app/buildings/extractor.png')
  },
  BENCH: {
    id: 3,
    image: require('../assets/app/buildings/bench.png')
  },
  COMPRESSOR: {
    id: 4,
    image: require('../assets/app/buildings/compressor.png')
  },
  HAMMER: {
    id: 5,
    image: require('../assets/app/buildings/hammer.png')
  },
  SIEVE: {
    id: 6,
    image: require('../assets/app/buildings/sieve.png')
  }
};

export const ATTACHMENTS = {
  CONNECTOR: require("../assets/app/buildings/pipes/connector.png"),
  NODE: require('../assets/app/buildings/pipes/node.png'),
  SERVO: require('../assets/app/buildings/pipes/servo.png')
};

export const ICONS = {
  PIPE: require("../assets/app/icons/pipe_hor.png"),
  SERVO: require("../assets/app/icons/servo_center.png"),
  CONNECTOR: require("../assets/app/icons/connector_center.png"),
};

const ASSETS_RESOURCE_BLOCKS = Object.values(RESOURCE_BLOCKS).map(
  (item: Texture) => item.image
);
const ASSETS_BUILDINGS = Object.values(BUILDINGS).map(
  (item: Texture) => item.image
);
const ASSETS_ATTACHMENTS = Object.values(ATTACHMENTS);
const ASSETS_ICONS = Object.values(ICONS);

export const ASSETS = [
  ...ASSETS_RESOURCE_BLOCKS,
  ...ASSETS_BUILDINGS,
  ...ASSETS_ATTACHMENTS,
  ...ASSETS_ICONS,
];
