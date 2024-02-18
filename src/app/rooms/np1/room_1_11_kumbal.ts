import {room_1_12_dielna} from "./room_1_12_dielna";
import {Room} from "../../types";

export const room_1_11_kumbal: Room = {
    id: "1.11",
    name: "Kumbal",
    width: 100,
    height: 130,
    left: room_1_12_dielna.left + room_1_12_dielna.width + 15,
    top: room_1_12_dielna.top + 265 + 15,
};