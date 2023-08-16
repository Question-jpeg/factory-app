import { Texture } from "./models";

export const RESOURCES = {
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
  COAL: {
    id: 4,
    image: require('../assets/app/resources/items/coal.png')
  },
  BROKEN_IRON: {
    id: 5,
    image: require('../assets/app/resources/items/brokenIron.png')
  },
  BROKEN_TIN: {
    id: 6,
    image: require('../assets/app/resources/items/brokenTin.png')
  },
  BROKEN_COPPER: {
    id: 7,
    image: require('../assets/app/resources/items/brokenCopper.png')
  }
};

export const BUILDINGS = {
  PIPE: {
    id: 0,
    image: require("../assets/app/buildings/pipes/pipe.png"),
  },
  // CHEST: {
  //   id: 1,
  //   image: require('../assets/app/buildings/chest.png')
  // },
  EXTRACTOR: {
    id: 2,
    image: require("../assets/app/buildings/extractor.png"),
  },
  BENCH: {
    id: 3,
    image: require("../assets/app/buildings/bench.png"),
  },
  COMPRESSOR: {
    id: 4,
    image: require("../assets/app/buildings/compressor.png"),
  },
  HAMMER: {
    id: 5,
    image: require("../assets/app/buildings/hammer.png"),
  },
  SIEVE: {
    id: 6,
    image: require("../assets/app/buildings/sieve.png"),
  },
  METAL_FORMER: {
    id: 7,
    image: require("../assets/app/buildings/metalFormer.png"),
  },
  FURNACE: {
    id: 8,
    image: require("../assets/app/buildings/furnace.png"),
  },
};

export const ATTACHMENTS = {
  CONNECTOR: require("../assets/app/buildings/pipes/connector.png"),
  NODE: require("../assets/app/buildings/pipes/node.png"),
  SERVO: require("../assets/app/buildings/pipes/servo.png"),
};

export const ICONS = {
  PIPE: require("../assets/app/icons/pipe_hor.png"),
  SERVO: require("../assets/app/icons/servo_center.png"),
  CONNECTOR: require("../assets/app/icons/connector_center.png"),
};

const ASSETS_RESOURCES = Object.values(RESOURCES).map(
  (item: Texture) => item.image
);
const ASSETS_BUILDINGS = Object.values(BUILDINGS).map(
  (item: Texture) => item.image
);
const ASSETS_ATTACHMENTS = Object.values(ATTACHMENTS);
const ASSETS_ICONS = Object.values(ICONS);

export const ASSETS = [
  ...ASSETS_RESOURCES,
  ...ASSETS_BUILDINGS,
  ...ASSETS_ATTACHMENTS,
  ...ASSETS_ICONS,
];
