import {room_1_06_obyvacka} from "./room_1_06_obyvacka";
import {frame, knxSwitch, point, Room} from "../../types";

export const room_1_08_wc: Room = {
    id: "1.08",
    name: "WC",
    width: 100,
    height: 235,
    left: room_1_06_obyvacka.left + room_1_06_obyvacka.width + 15,
    top: room_1_06_obyvacka.top,
    leftWall: [
        frame(30, [knxSwitch("Q108.1", 1)])
    ],
    ceilingItems: [
        point("1.08a", 50, 60),
        point("1.08a", 50, 160),
    ]
};