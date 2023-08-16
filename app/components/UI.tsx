import React, { useContext, useEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { INITIAL_SELECTION } from "../config/values";
import { AppContext } from "../context";
import { EDIT_MODES, SELECTIONS } from "../enums";
import { BuildingAPI, Paths, Texture } from "../models";
import Inventory from "./Inventory";
import SideBar from "./Sidebar";
import { findPath } from "./../logic/findPath";

export default function UI() {
  const [inventoryVisible, setInventoryVisible] = useState(true);
  const [selectedOption, setSelectedOptionState] = useState(INITIAL_SELECTION);
  const [selectedBuilding, setSelectedBuildingState] = useState<Texture>();
  const [UIVisible, setUIVisible] = useState(true);
  const {
    field,
    selection,
    selectedBuilding: selectedBuildingRef,
    selectedConnections,
    blocks,
    spawner,
  } = useContext(AppContext);

  const toggleInventoryVisible = () => {
    setInventoryVisible((prev) => !prev);
  };

  const toggleUIVisible = () => {
    setUIVisible((prev) => {
      if (prev) setSelectedOption(SELECTIONS.PLAY);
      else setSelectedOption(SELECTIONS.PIPE);

      return !prev;
    });
  };

  const setSelectedOption = (opt: SELECTIONS) => {
    if (opt !== selectedOption) {
      if (selectedOption === SELECTIONS.DELETE) {
        Object.values(field.current).forEach((b) => {
          b.setEditMode(EDIT_MODES.NONE);
        });
      }
      if (selectedOption === SELECTIONS.BUILD)
        setSelectedBuildingState(undefined);
      if (
        selectedOption === SELECTIONS.CONNECTION ||
        selectedOption === SELECTIONS.SERVO
      ) {
        Object.keys(selectedConnections.current).map((coords) => {
          selectedConnections.current[coords].setEditMode(EDIT_MODES.NONE);
        });
        selectedConnections.current = {};
      }

      if (opt === SELECTIONS.DELETE) {
        Object.values(field.current).forEach((b) => {
          b.setEditMode(EDIT_MODES.DELETE);
        });
      }

      selection.current = opt;
      setSelectedOptionState(opt);
    }
  };

  const setSelectedBuilding = (building: Texture) => {
    if (selectedBuilding?.id !== building.id) {
      setSelectedOption(SELECTIONS.BUILD);

      selectedBuildingRef.current = building;
      setSelectedBuildingState(building);
    }
  };

  useEffect(() => {
    const blocksArr = Object.values(blocks.current);

    if (UIVisible) {
      spawner.current?.clearItems();
      blocksArr.forEach((b) => b.block.stopSpawn());
    } else {
      const nodes = Object.values(field.current);

      const result: { [key: string]: Paths } = {};
      blocksArr.forEach((building) => (result[building.coords] = {}));

      for (let i = 0; i < blocksArr.length; i++) {
        for (let j = 0; j < blocksArr.length; j++) {
          const a = blocksArr[i];
          const b = blocksArr[j];
          if (a !== b) {
            const path = findPath(a, b);
            if (path) {
              b.block.availableInput.forEach((textureId) => {
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

      Object.keys(result).forEach((coords) => {
        blocks.current[coords].block.paths.current = result[coords];
      });
      blocksArr.forEach((b) => b.block.startSpawn());
    }
  }, [UIVisible]);

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
        }}
      />
      <Inventory
        {...{
          inventoryVisible,
          selectedBuilding,
          setSelectedBuilding,
          UIVisible,
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({});
