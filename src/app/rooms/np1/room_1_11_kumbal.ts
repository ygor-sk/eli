import {room_1_12_dielna} from "./room_1_12_dielna";
import {point, Room, sensor} from "../../types";

export const room_1_11_kumbal: Room = {
    id: "1.11",
    name: "Kumbal",
    nameOffset: {vertical: 100},
    width: 100,
    height: 140,
    left: room_1_12_dielna.left + room_1_12_dielna.width + 15,
    top: room_1_12_dielna.top + 270,
    ceilingItems: [
        sensor("P111", 50, 50, {installed: false}),
        point("111.1", 50, 90)
    ]
};