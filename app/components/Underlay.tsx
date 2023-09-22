import React, { useImperativeHandle, useState } from "react";
import { StyleSheet, View } from "react-native";
import { CELL_BORDER_COLOR } from "../config/colors";
import { CELL_BORDER_WIDTH } from "../config/sizes";
import { CELL_SIZE } from "./../config/sizes";

export default function Underlay() {
  return (
    <View style={[styles.cell]} />
  )
}

const styles = StyleSheet.create({
  cell: {
    aspectRatio: 1,
    borderWidth: CELL_BORDER_WIDTH,
    borderColor: CELL_BORDER_COLOR,
    width: CELL_SIZE,
    justifyContent: "center",
    alignItems: "center",
  },
});
