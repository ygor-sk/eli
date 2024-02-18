import {room_2_03_spalna} from "./room_2_03_spalna";
import {BOX_SIZE} from "../../render";

export const room_2_04_herna = {
    id: "2.04",
    name: "Herna",
    width: 410,
    height: 390,
    left: room_2_03_spalna.left - 15 - 410,
    top: room_2_03_spalna.top,
    leftWall: [
        {type: "WallLight", position: 30, offset: BOX_SIZE + 4, circuit: "Ext.1"}
    ]
};