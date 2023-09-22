import { StyleSheet } from "react-native";
import { CELL_COLOR, UI_COLOR } from "../config/colors";
import { INVENTORY_WIDTH } from "../config/sizes";
import { INVENTORY_CELL_SIZE } from "./../config/sizes";

export const inventoryStyles = StyleSheet.create({
  scrollStyle: {
    gap: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    padding: 20,
  },
  imageContainer: {
    width: INVENTORY_CELL_SIZE,
    aspectRatio: 1,
    padding: 10,
    backgroundColor: CELL_COLOR,
    borderRadius: 5,
    borderColor: "white",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  container: {
    position: "absolute",
    height: "100%",
    width: INVENTORY_WIDTH,
    backgroundColor: UI_COLOR,
    borderWidth: 2,
    flexDirection: 'row'
  },
});
