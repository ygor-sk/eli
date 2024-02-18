import {Room} from "../../types";
import {room_2_06_zadna} from "./room_2_06_zadna";
import {room_2_05_pracovna} from "./room_2_05_pracovna";
import {room_2_01_schody} from "./room_2_01_schody";

export const room_2_02_chodba: Room = {
    id: "2.02",
    name: "Chodba",
    width: 465,
    height: 185,
    left: room_2_05_pracovna.left + room_2_05_pracovna.width + 15,
    top: room_2_01_schody.top + room_2_01_schody.height,
};