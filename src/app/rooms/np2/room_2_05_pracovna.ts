import {Room} from "../../types";
import {room_2_06_zadna} from "./room_2_06_zadna";

export const room_2_05_pracovna: Room = {
    id: "2.05",
    name: "Pracovna",
    width: 400,
    height: room_2_06_zadna.height,
    left: room_2_06_zadna.left + room_2_06_zadna.width + 15,
    top: room_2_06_zadna.top,
};