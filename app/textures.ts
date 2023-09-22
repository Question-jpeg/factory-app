import { Texture } from "./models";

export const RESOURCES = {
  ARMED_GLASS: {
    id: 0,
    image: require("../assets/app/resources/armedGlass.png"),
  },

  COBBLESTONE: {
    id: 1,
    image: require("../assets/app/resources/cobblestone.png"),
  },

  COPPER_DUST: {
    id: 2,
    image: require("../assets/app/resources/copperDust.png"),
  },

  COPPER_GRAVEL: {
    id: 3,
    image: require("../assets/app/resources/copperGravel.png"),
  },

  COPPER_SAND: {
    id: 4,
    image: require("../assets/app/resources/copperSand.png"),
  },

  DUST: {
    id: 5,
    image: require("../assets/app/resources/dust.png"),
  },

  GLASS: {
    id: 6,
    image: require("../assets/app/resources/glass.png"),
  },

  GOLD_DUST: {
    id: 7,
    image: require("../assets/app/resources/goldDust.png"),
  },

  GOLD_GRAVEL: {
    id: 8,
    image: require("../assets/app/resources/goldGravel.png"),
  },

  GOLD_SAND: {
    id: 9,
    image: require("../assets/app/resources/goldSand.png"),
  },

  GRAVEL: {
    id: 10,
    image: require("../assets/app/resources/gravel.png"),
  },

  IRON_DUST: {
    id: 11,
    image: require("../assets/app/resources/ironDust.png"),
  },

  IRON_GRAVEL: {
    id: 12,
    image: require("../assets/app/resources/ironGravel.png"),
  },

  IRON_SAND: {
    id: 13,
    image: require("../assets/app/resources/ironSand.png"),
  },

  LEAD_DUST: {
    id: 14,
    image: require("../assets/app/resources/leadDust.png"),
  },

  LEAD_GRAVEL: {
    id: 15,
    image: require("../assets/app/resources/leadGravel.png"),
  },

  LEAD_SAND: {
    id: 16,
    image: require("../assets/app/resources/leadSand.png"),
  },

  LUMINATOR: {
    id: 17,
    image: require("../assets/app/resources/luminator.png"),
  },

  PLANKS: {
    id: 18,
    image: require("../assets/app/resources/planks.png"),
  },

  SAND: {
    id: 19,
    image: require("../assets/app/resources/sand.png"),
  },

  TIN_DUST: {
    id: 20,
    image: require("../assets/app/resources/tinDust.png"),
  },

  TIN_GRAVEL: {
    id: 21,
    image: require("../assets/app/resources/tinGravel.png"),
  },

  TIN_SAND: {
    id: 22,
    image: require("../assets/app/resources/tinSand.png"),
  },

  WOOD: {
    id: 23,
    image: require("../assets/app/resources/wood.png"),
  },

  WOOL: {
    id: 24,
    image: require("../assets/app/resources/wool.png"),
  },

  ADVANCED_CIRCUIT: {
    id: 25,
    image: require("../assets/app/resources/items/advancedCircuit.png"),
  },

  ADVANCED_HEAT_SWITCH: {
    id: 26,
    image: require("../assets/app/resources/items/advancedHeatSwitch.png"),
  },

  AZURESTONE: {
    id: 27,
    image: require("../assets/app/resources/items/azurestone.png"),
  },

  BATTERY: {
    id: 28,
    image: require("../assets/app/resources/items/battery.png"),
  },

  BROKEN_COPPER: {
    id: 29,
    image: require("../assets/app/resources/items/brokenCopper.png"),
  },

  BROKEN_GOLD: {
    id: 30,
    image: require("../assets/app/resources/items/brokenGold.png"),
  },

  BROKEN_IRON: {
    id: 31,
    image: require("../assets/app/resources/items/brokenIron.png"),
  },

  BROKEN_LEAD: {
    id: 32,
    image: require("../assets/app/resources/items/brokenLead.png"),
  },

  BROKEN_TIN: {
    id: 33,
    image: require("../assets/app/resources/items/brokenTin.png"),
  },

  CABLE_COPPER: {
    id: 34,
    image: require("../assets/app/resources/items/CableCopper.png"),
  },

  CABLE_GOLD: {
    id: 35,
    image: require("../assets/app/resources/items/CableGold.png"),
  },

  CABLE_IRON: {
    id: 36,
    image: require("../assets/app/resources/items/CableIron.png"),
  },

  CABLE_TIN: {
    id: 37,
    image: require("../assets/app/resources/items/CableTin.png"),
  },

  CARBON_FIBER: {
    id: 38,
    image: require("../assets/app/resources/items/carbonFiber.png"),
  },

  CARBON_MESH: {
    id: 39,
    image: require("../assets/app/resources/items/carbonMesh.png"),
  },

  CARBON_PLATE: {
    id: 40,
    image: require("../assets/app/resources/items/carbonPlate.png"),
  },

  CASING_BRONZE: {
    id: 41,
    image: require("../assets/app/resources/items/casingBronze.png"),
  },

  CASING_COPPER: {
    id: 42,
    image: require("../assets/app/resources/items/casingCopper.png"),
  },

  CASING_GOLD: {
    id: 43,
    image: require("../assets/app/resources/items/casingGold.png"),
  },

  CASING_IRON: {
    id: 44,
    image: require("../assets/app/resources/items/casingIron.png"),
  },

  CASING_LEAD: {
    id: 45,
    image: require("../assets/app/resources/items/casingLead.png"),
  },

  CASING_TIN: {
    id: 46,
    image: require("../assets/app/resources/items/casingTin.png"),
  },

  CIRCUIT: {
    id: 47,
    image: require("../assets/app/resources/items/circuit.png"),
  },

  COAL: {
    id: 48,
    image: require("../assets/app/resources/items/coal.png"),
  },

  CRUSHED_COPPER: {
    id: 49,
    image: require("../assets/app/resources/items/crushedCopper.png"),
  },

  CRUSHED_GOLD: {
    id: 50,
    image: require("../assets/app/resources/items/crushedGold.png"),
  },

  CRUSHED_IRON: {
    id: 51,
    image: require("../assets/app/resources/items/crushedIron.png"),
  },

  CRUSHED_LEAD: {
    id: 52,
    image: require("../assets/app/resources/items/crushedLead.png"),
  },

  CRUSHED_TIN: {
    id: 53,
    image: require("../assets/app/resources/items/crushedTin.png"),
  },

  CRYSTAL: {
    id: 54,
    image: require("../assets/app/resources/items/crystal.png"),
  },

  DIAMOND: {
    id: 55,
    image: require("../assets/app/resources/items/diamond.png"),
  },

  DUST_AZURE: {
    id: 56,
    image: require("../assets/app/resources/items/dustAzure.png"),
  },

  DUST_COAL: {
    id: 57,
    image: require("../assets/app/resources/items/dustCoal.png"),
  },

  DUST_DIAMOND: {
    id: 58,
    image: require("../assets/app/resources/items/dustDiamond.png"),
  },

  DUST_ENERGIUM: {
    id: 59,
    image: require("../assets/app/resources/items/dustEnergium.png"),
  },

  DUST_LEAD: {
    id: 60,
    image: require("../assets/app/resources/items/dustLead.png"),
  },

  GLOWSTONE: {
    id: 61,
    image: require("../assets/app/resources/items/glowstone.png"),
  },

  HEAT_SWITCH: {
    id: 62,
    image: require("../assets/app/resources/items/heatSwitch.png"),
  },

  INGOT_ALLOY: {
    id: 63,
    image: require("../assets/app/resources/items/IngotAlloy.png"),
  },

  INGOT_BRONZE: {
    id: 64,
    image: require("../assets/app/resources/items/IngotBronze.png"),
  },

  INGOT_COPPER: {
    id: 65,
    image: require("../assets/app/resources/items/IngotCopper.png"),
  },

  INGOT_GOLD: {
    id: 66,
    image: require("../assets/app/resources/items/IngotGold.png"),
  },

  INGOT_IRON: {
    id: 67,
    image: require("../assets/app/resources/items/IngotIron.png"),
  },

  INGOT_LEAD: {
    id: 68,
    image: require("../assets/app/resources/items/IngotLead.png"),
  },

  INGOT_TIN: {
    id: 69,
    image: require("../assets/app/resources/items/IngotTin.png"),
  },

  ISOLATED_CABLE_COPPER: {
    id: 70,
    image: require("../assets/app/resources/items/IsolatedCableCopper.png"),
  },

  ISOLATED_CABLE_GOLD: {
    id: 71,
    image: require("../assets/app/resources/items/IsolatedCableGold.png"),
  },

  ISOLATED_CABLE_IRON: {
    id: 72,
    image: require("../assets/app/resources/items/IsolatedCableIron.png"),
  },

  ISOLATED_CABLE_TIN: {
    id: 73,
    image: require("../assets/app/resources/items/IsolatedCableTin.png"),
  },

  NANO_BOOTS: {
    id: 74,
    image: require("../assets/app/resources/items/nanoBoots.png"),
  },

  NANO_CHESTPLATE: {
    id: 75,
    image: require("../assets/app/resources/items/nanoChestplate.png"),
  },

  NANO_HELMET: {
    id: 76,
    image: require("../assets/app/resources/items/nanoHelmet.png"),
  },

  NANO_LEGS: {
    id: 77,
    image: require("../assets/app/resources/items/nanoLegs.png"),
  },

  NIGHTVISION_GOGGLES: {
    id: 78,
    image: require("../assets/app/resources/items/nightvisionGoggles.png"),
  },

  ORE_IRIDIUM: {
    id: 79,
    image: require("../assets/app/resources/items/oreIridium.png"),
  },

  PLATE_ALLOY: {
    id: 80,
    image: require("../assets/app/resources/items/PlateAlloy.png"),
  },

  PLATE_AZURE: {
    id: 81,
    image: require("../assets/app/resources/items/PlateAzure.png"),
  },

  PLATE_BRONZE: {
    id: 82,
    image: require("../assets/app/resources/items/PlateBronze.png"),
  },

  PLATE_COPPER: {
    id: 83,
    image: require("../assets/app/resources/items/PlateCopper.png"),
  },

  PLATE_GOLD: {
    id: 84,
    image: require("../assets/app/resources/items/PlateGold.png"),
  },

  PLATE_IRON: {
    id: 85,
    image: require("../assets/app/resources/items/PlateIron.png"),
  },

  PLATE_LEAD: {
    id: 86,
    image: require("../assets/app/resources/items/PlateLead.png"),
  },

  PLATE_TIN: {
    id: 87,
    image: require("../assets/app/resources/items/PlateTin.png"),
  },

  POWDERED_COPPER: {
    id: 88,
    image: require("../assets/app/resources/items/powderedCopper.png"),
  },

  POWDERED_GOLD: {
    id: 89,
    image: require("../assets/app/resources/items/powderedGold.png"),
  },

  POWDERED_IRON: {
    id: 90,
    image: require("../assets/app/resources/items/powderedIron.png"),
  },

  POWDERED_LEAD: {
    id: 91,
    image: require("../assets/app/resources/items/powderedLead.png"),
  },

  POWDERED_TIN: {
    id: 92,
    image: require("../assets/app/resources/items/powderedTin.png"),
  },

  RAW_RUBBER: {
    id: 93,
    image: require("../assets/app/resources/items/rawRubber.png"),
  },

  REDSTONE: {
    id: 94,
    image: require("../assets/app/resources/items/redstone.png"),
  },

  RUBBER: {
    id: 95,
    image: require("../assets/app/resources/items/rubber.png"),
  },

  RUBBER_BOOTS: {
    id: 96,
    image: require("../assets/app/resources/items/rubberBoots.png"),
  },

  SHARD_IRIDIUM: {
    id: 97,
    image: require("../assets/app/resources/items/shardIridium.png"),
  },

  STRING: {
    id: 98,
    image: require("../assets/app/resources/items/string.png"),
  },

  SULFUR: {
    id: 99,
    image: require("../assets/app/resources/items/sulfur.png"),
  },
};

export const RESOURCES_IMAGES: { [key: number]: number } = {};

Object.values(RESOURCES).forEach(
  ({ id, image }) => (RESOURCES_IMAGES[id] = image)
);

export const BUILDINGS = {
  PIPE: {
    id: 13,
    image: require("../assets/app/buildings/pipes/pipe.png"),
  },

  BENCH: {
    id: 0,
    image: require("../assets/app/buildings/bench.png"),
  },

  CHEST: {
    id: 1,
    image: require("../assets/app/buildings/chest.png"),
  },

  COMPRESSOR: {
    id: 2,
    image: require("../assets/app/buildings/compressor.png"),
  },

  EXTRACTOR: {
    id: 3,
    image: require("../assets/app/buildings/extractor.png"),
  },

  FURNACE: {
    id: 4,
    image: require("../assets/app/buildings/furnace.png"),
  },

  HAMMER: {
    id: 5,
    image: require("../assets/app/buildings/hammer.png"),
  },

  MACERATOR: {
    id: 6,
    image: require("../assets/app/buildings/macerator.png"),
  },

  MELTER: {
    id: 7,
    image: require("../assets/app/buildings/melter.png"),
  },

  METAL_FORMER: {
    id: 8,
    image: require("../assets/app/buildings/metalFormer.png"),
  },

  SAWMILL: {
    id: 9,
    image: require("../assets/app/buildings/sawmill.png"),
  },

  SIEVE: {
    id: 10,
    image: require("../assets/app/buildings/sieve.png"),
  },

  STRING_FARM: {
    id: 11,
    image: require("../assets/app/buildings/stringFarm.png"),
  },

  TREE_FARM: {
    id: 12,
    image: require("../assets/app/buildings/treeFarm.png"),
  },
};

export const BUILDINGS_IMAGES: { [key: number]: number } = {};

Object.values(BUILDINGS).forEach(
  ({ id, image }) => (BUILDINGS_IMAGES[id] = image)
);

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
