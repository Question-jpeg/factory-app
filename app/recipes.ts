import { Recipe, Texture } from "./models";
import { RESOURCES } from "./textures";

export const RECIPES = {
  INGOT_ALLOY: {
    texture: RESOURCES.INGOT_ALLOY,
    craft: {
      [RESOURCES.PLATE_BRONZE.id]: 3,
      [RESOURCES.PLATE_IRON.id]: 3,
      [RESOURCES.PLATE_TIN.id]: 3,
    },
    count: 1,
  },
  CARBON_FIBER: {
    texture: RESOURCES.CARBON_FIBER,
    craft: {
      [RESOURCES.DUST_COAL.id]: 4,
    },
    count: 1,
  },
  CARBON_MESH: {
    texture: RESOURCES.CARBON_MESH,
    craft: {
      [RESOURCES.CARBON_FIBER.id]: 2,
    },
    count: 1,
  },
  DUST_ENERGIUM: {
    texture: RESOURCES.DUST_ENERGIUM,
    craft: {
      [RESOURCES.DUST_DIAMOND.id]: 4,
      [RESOURCES.REDSTONE.id]: 5,
    },
    count: 4,
  },
  ARMED_GLASS: {
    texture: RESOURCES.ARMED_GLASS,
    craft: {
      [RESOURCES.GLASS.id]: 7,
      [RESOURCES.PLATE_ALLOY.id]: 2,
    },
    count: 7,
  },
  ISOLATED_COPPER_CABLE: {
    texture: RESOURCES.ISOLATED_CABLE_COPPER,
    craft: {
      [RESOURCES.RUBBER.id]: 1,
      [RESOURCES.CABLE_COPPER.id]: 1,
    },
    count: 1,
  },
  WOOL: {
    texture: RESOURCES.WOOL,
    craft: {
      [RESOURCES.STRING.id]: 4,
    },
    count: 1,
  },
  RUBBER_BOOTS: {
    texture: RESOURCES.RUBBER_BOOTS,
    craft: {
      [RESOURCES.RUBBER.id]: 6,
      [RESOURCES.WOOL.id]: 1,
    },
    count: 1,
  },
  NANO_BOOTS: {
    texture: RESOURCES.NANO_BOOTS,
    craft: {
      [RESOURCES.CARBON_PLATE.id]: 4,
      [RESOURCES.CRYSTAL.id]: 1,
    },
    count: 1,
  },
  NANO_LEGS: {
    texture: RESOURCES.NANO_LEGS,
    craft: {
      [RESOURCES.CARBON_PLATE.id]: 6,
      [RESOURCES.CRYSTAL.id]: 1,
    },
    count: 1,
  },
  NANO_CHESTPLATE: {
    texture: RESOURCES.NANO_CHESTPLATE,
    craft: {
      [RESOURCES.CARBON_PLATE.id]: 7,
      [RESOURCES.CRYSTAL.id]: 1,
    },
    count: 1,
  },
  BATTERY: {
    texture: RESOURCES.BATTERY,
    craft: {
      [RESOURCES.ISOLATED_CABLE_COPPER.id]: 2,
      [RESOURCES.CASING_BRONZE.id]: 5,
      [RESOURCES.SULFUR.id]: 1,
      [RESOURCES.DUST_LEAD.id]: 1,
    },
    count: 1,
  },
  CIRCUIT: {
    texture: RESOURCES.CIRCUIT,
    craft: {
      [RESOURCES.ISOLATED_CABLE_COPPER.id]: 6,
      [RESOURCES.REDSTONE.id]: 2,
      [RESOURCES.PLATE_IRON.id]: 1,
    },
    count: 1,
  },
  HEAT_SWITCH: {
    texture: RESOURCES.HEAT_SWITCH,
    craft: {
      [RESOURCES.CIRCUIT.id]: 1,
      [RESOURCES.PLATE_COPPER.id]: 5,
      [RESOURCES.PLATE_TIN.id]: 3,
    },
    count: 1,
  },
  ADVANCED_HEAT_SWITCH: {
    texture: RESOURCES.ADVANCED_HEAT_SWITCH,
    craft: {
      [RESOURCES.PLATE_AZURE.id]: 4,
      [RESOURCES.PLATE_COPPER.id]: 1,
      [RESOURCES.HEAT_SWITCH.id]: 2,
      [RESOURCES.CIRCUIT.id]: 2,
    },
    count: 1,
  },
  LUMINATOR: {
    texture: RESOURCES.LUMINATOR,
    craft: {
      [RESOURCES.CASING_IRON.id]: 2,
      [RESOURCES.ISOLATED_CABLE_COPPER.id]: 1,
      [RESOURCES.CABLE_TIN.id]: 1,
      [RESOURCES.GLASS.id]: 5,
    },
    count: 8,
  },
  ADVANCED_CIRCUIT: {
    texture: RESOURCES.ADVANCED_CIRCUIT,
    craft: {
      [RESOURCES.REDSTONE.id]: 4,
      [RESOURCES.AZURESTONE.id]: 2,
      [RESOURCES.GLOWSTONE.id]: 2,
      [RESOURCES.CIRCUIT.id]: 1,
    },
    count: 1,
  },
  NIGHTVISION_GOGGLES: {
    texture: RESOURCES.NIGHTVISION_GOGGLES,
    craft: {
      [RESOURCES.ADVANCED_HEAT_SWITCH.id]: 2,
      [RESOURCES.BATTERY.id]: 1,
      [RESOURCES.LUMINATOR.id]: 2,
      [RESOURCES.ARMED_GLASS.id]: 1,
      [RESOURCES.RUBBER.id]: 2,
      [RESOURCES.ADVANCED_CIRCUIT.id]: 1,
    },
    count: 1,
  },
  NANO_HELMET: {
    texture: RESOURCES.NANO_HELMET,
    craft: {
      [RESOURCES.CARBON_PLATE.id]: 4,
      [RESOURCES.NIGHTVISION_GOGGLES.id]: 1,
      [RESOURCES.CRYSTAL.id]: 1
    },
    count: 1
  }
};
