import {room_1_12_dielna} from "./room_1_12_dielna";
import {Room} from "../../types";

export const room_1_13_garaz: Room = {
    id: "1.13",
    name: "Garaz",
    width: 640,
    height: 410,
    left: room_1_12_dielna.left + room_1_12_dielna.width + 15,
    top: room_1_12_dielna.top,
    leftBottomCorner: {
        width: 115,
        height: 155
    },
};