import React, { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import { INITIAL_SELECTION } from "../config/values";
import { AppContext } from "../context";
import { EDIT_MODES, SELECTIONS } from "../enums";
import { Texture } from "../models";
import Inventory from "./Inventory";
import SideBar from "./Sidebar";

export default function UI() {
  const [inventoryVisible, setInventoryVisible] = useState(false);
  const [selectedOption, setSelectedOptionState] = useState(INITIAL_SELECTION);
  const [selectedBuilding, setSelectedBuildingState] = useState<Texture>();
  const {
    field,
    selection,
    selectedBuilding: selectedBuildingRef,
    selectedConnections,
  } = useContext(AppContext);

  const toggleInventoryVisible = () => {
    setInventoryVisible((prev) => !prev);
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
      if (selectedOption === SELECTIONS.CONNECTION || selectedOption === SELECTIONS.SERVO) {
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

  return (
    <>
      <SideBar
        {...{
          inventoryVisible,
          toggleInventoryVisible,
          selectedOption,
          setSelectedOption,
        }}
      />
      <Inventory
        {...{ inventoryVisible, selectedBuilding, setSelectedBuilding }}
      />
    </>
  );
}

const styles = StyleSheet.create({});
