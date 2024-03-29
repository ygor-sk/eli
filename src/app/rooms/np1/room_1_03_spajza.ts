import {room_1_04_kuchyna} from "./room_1_04_kuchyna";
import {frame, point, Room, socket} from "../../types";

export const room_1_03_spajza: Room = {
    id: "1.03",
    name: "Spajza",
    width: 160,
    height: 250,
    left: room_1_04_kuchyna.left + room_1_04_kuchyna.width,
    top: room_1_04_kuchyna.top + room_1_04_kuchyna.height - 250,
    topWall: [
        frame(70, [socket(), socket()])
    ],
    ceilingItems: [
        point("E103.1", 80, 60),
        point("E103.1", 80, 180),
    ]
};