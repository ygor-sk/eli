import {frame, point, Room, sensor, socket} from "../../types";
import {room_2_06_zadna} from "./room_2_06_zadna";
import {room_2_05_pracovna} from "./room_2_05_pracovna";

export const room_2_01_schody: Room = {
    id: "2.01",
    name: "Schody",
    width: 215,
    height: 250,
    left: room_2_05_pracovna.left + room_2_05_pracovna.width + 15,
    top: room_2_05_pracovna.top,
    rightWall: [
        frame(200, [socket()])
    ],
    ceilingItems: [
        point("E202.1", 50, 100),
        point("E202.1", 150, 100),
        sensor("P202.1", 100, 220)
    ]
};