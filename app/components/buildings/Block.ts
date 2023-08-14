import { MutableRefObject } from "react";
import { ItemAPI } from "../../models";

export default abstract class Block {
  constructor(public items: MutableRefObject<{ [key: number]: ItemAPI[] }>) {}

  abstract onItemsUpdate(): any;

  pushItem(item: ItemAPI) {
    this.items.current[item.id].push(item);
    this.onItemsUpdate();
  }
}
