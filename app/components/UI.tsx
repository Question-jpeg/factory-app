import React, {
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Alert, StyleSheet } from "react-native";
import { INITIAL_SELECTION } from "../config/values";
import { AppContext } from "../context";
import { EDIT_MODES, SELECTIONS } from "../enums";
import {
  BlockApi,
  BuildingAPI,
  Paths,
  Recipe,
  SavedBuilding,
  Texture,
  UIApi,
} from "../models";
import Inventory from "./Inventory";
import SideBar from "./Sidebar";
import { findPath } from "./../logic/findPath";
import { useSharedValue, withTiming } from "react-native-reanimated";
import RecipeSelector from "./RecipeSelector";
import MetalFormerModeSelector from "./MetalFormerModeSelector";
import { saveField } from "./../utils";

const UI = React.forwardRef(({}, ref) => {
  const inventoryVisible = useSharedValue(1);
  const selectedOption = useSharedValue(INITIAL_SELECTION);
  const selectedBuildingId = useSharedValue<number | undefined>(undefined);
  const UIVisible = useSharedValue(1);

  const [bench, setBenchState] = useState<BuildingAPI>();
  const [metalFormer, setMetalFormerState] = useState<BuildingAPI>();
  const recipeSelectorVisible = useSharedValue(0);
  const metalFormerModeSelectorVisible = useSharedValue(0);

  const {
    field,
    selection,
    selectedBuilding,
    selectedConnections,
    blocks,
    spawner,
  } = useContext(AppContext);

  const setBlock = (
    block: BuildingAPI,
    selection: SELECTIONS,
    setStateFn: React.Dispatch<React.SetStateAction<BuildingAPI | undefined>>
  ) => {
    setStateFn((prev) => {
      if (prev && prev.coords === block.coords) {
        setSelectedOption(SELECTIONS.PIPE);
        return undefined;
      } else if (prev) prev.setEditMode(EDIT_MODES.NONE);
      else setSelectedOption(selection);

      block.setEditMode(EDIT_MODES.CONNECT);
      return block;
    });
  };

  useImperativeHandle(
    ref,
    () =>
      ({
        setBench: (bench) => {
          setBlock(bench, SELECTIONS.BENCH, setBenchState);
        },
        setMetalFormer: (metalFormer) => {
          setBlock(metalFormer, SELECTIONS.METAL_FORMER, setMetalFormerState);
        },
      } as UIApi)
  );

  const toggleInventoryVisible = () => {
    if (recipeSelectorVisible.value || metalFormerModeSelectorVisible.value) {
      setSelectedOption(SELECTIONS.PIPE);
      if (!inventoryVisible.value) inventoryVisible.value = withTiming(1);
    } else {
      let toValue = 1;
      if (inventoryVisible.value) toValue = 0;
      inventoryVisible.value = withTiming(toValue);
    }
  };

  const save = () => {
    const saved: { [key: string]: SavedBuilding } = {};
    Object.keys(field.current).forEach((coords) => {
      const building = field.current[coords];
      const neighbours: { [key: string]: any } = {};

      Object.values(building.neighbours.current).forEach(
        ({ building, servo }) => (neighbours[building.coords] = servo)
      );

      saved[coords] = {
        id: building.id,
        recipe: building.block?.recipe?.current,
        metalFormerMode: building.block?.metalFormerMode?.current,
        neighbours,
      };
    });
    saveField(saved);
  };

  const onPlay = () => {
    save();

    const blocksArr = Object.values(blocks.current);

    const nodes = Object.values(field.current);

    const result: { [key: string]: Paths } = {};
    blocksArr.forEach((building) => (result[building.coords] = {}));

    for (let i = 0; i < blocksArr.length; i++) {
      const a = blocksArr[i];
      if (Object.values(a.neighbours.current).length) {
        for (let j = 0; j < blocksArr.length; j++) {
          const b = blocksArr[j];
          if (Object.values(b.neighbours.current).length) {
            if (a !== b) {
              const path = findPath(a, b);
              if (path) {
                b.block.availableInput.current.forEach((textureId) => {
                  result[a.coords][textureId]
                    ? result[a.coords][textureId].list.push(path)
                    : (result[a.coords][textureId] = {
                        index: 0,
                        list: [path],
                      });
                });
              }
              nodes.forEach((b) => b.refreshNode());
            }
          }
        }
      }
    }

    Object.keys(result).forEach((coords) => {
      blocks.current[coords].block.paths.current = result[coords];
    });
    blocksArr.forEach((b) => b.block.startSpawn());
  };

  const onBuild = () => {
    const blocksArr = Object.values(blocks.current);
    blocksArr.forEach((b) => b.block.stopSpawn());
    spawner.current?.clearItems();
  };

  const toggleUIVisible = () => {
    if (UIVisible.value) {
      onPlay();
      setSelectedOption(SELECTIONS.PLAY);
    } else {
      onBuild();
      setSelectedOption(INITIAL_SELECTION);
    }
  };

  const setSelectedOption = (opt: SELECTIONS) => {
    if (opt !== selectedOption.value) {
      if (selectedOption.value === SELECTIONS.DELETE) {
        Object.values(field.current).forEach((b) => {
          b.setEditMode(EDIT_MODES.NONE);
        });
      } else if (selectedOption.value === SELECTIONS.BUILD)
        selectedBuildingId.value = undefined;
      else if (
        selectedOption.value === SELECTIONS.CONNECTION ||
        selectedOption.value === SELECTIONS.SERVO
      ) {
        Object.keys(selectedConnections.current).map((coords) => {
          selectedConnections.current[coords].setEditMode(EDIT_MODES.NONE);
        });
        selectedConnections.current = {};
      } else if (selectedOption.value === SELECTIONS.BENCH) {
        recipeSelectorVisible.value = withTiming(0);

        bench!.setEditMode(EDIT_MODES.NONE);
        setBenchState(undefined);
      } else if (selectedOption.value === SELECTIONS.METAL_FORMER) {
        metalFormerModeSelectorVisible.value = withTiming(0);

        metalFormer!.setEditMode(EDIT_MODES.NONE);
        setMetalFormerState(undefined);
      } else if (selectedOption.value === SELECTIONS.PLAY) {
        UIVisible.value = withTiming(1);
      }

      if (opt === SELECTIONS.DELETE) {
        Object.values(field.current).forEach((b) => {
          b.setEditMode(EDIT_MODES.DELETE);
        });
      } else if (opt === SELECTIONS.BENCH) {
        recipeSelectorVisible.value = withTiming(1);
      } else if (opt === SELECTIONS.METAL_FORMER) {
        metalFormerModeSelectorVisible.value = withTiming(1);
      } else if (opt === SELECTIONS.PLAY) {
        UIVisible.value = withTiming(0);
      }

      selection.current = opt;
      selectedOption.value = opt;
    }
  };

  const setSelectedBuilding = (building: Texture) => {
    if (selectedBuildingId.value !== building.id) {
      setSelectedOption(SELECTIONS.BUILD);

      selectedBuilding.current = building;
      selectedBuildingId.value = building.id;
    }
  };

  return (
    <>
      <SideBar
        {...{
          inventoryVisible,
          toggleInventoryVisible,
          selectedOption,
          setSelectedOption,
          UIVisible,
          toggleUIVisible,
          recipeSelectorVisible,
          metalFormerModeSelectorVisible,
        }}
      />
      <Inventory
        {...{
          inventoryVisible,
          selectedBuildingId,
          setSelectedBuilding,
          UIVisible,
        }}
      />
      <RecipeSelector
        {...{
          bench,
          UIVisible,
          recipeSelectorVisible,
        }}
      />
      <MetalFormerModeSelector
        {...{ UIVisible, metalFormerModeSelectorVisible, metalFormer }}
      />
    </>
  );
});

UI.displayName = "UI";

export default UI;

const styles = StyleSheet.create({});
