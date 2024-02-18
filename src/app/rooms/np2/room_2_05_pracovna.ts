import {Room} from "../../types";
import {room_2_06_zadna} from "./room_2_06_zadna";
import {BOX_SIZE} from "../../render";

export const room_2_05_pracovna: Room = {
    id: "2.05",
    name: "Pracovna",
    width: 400,
    height: room_2_06_zadna.height,
    left: room_2_06_zadna.left + room_2_06_zadna.width + 15,
    top: room_2_06_zadna.top,
    bottomWall: [
        { type: "WallLight", position: 280, offset: BOX_SIZE + 4, circuit: "Ext.1"}
    ]
};