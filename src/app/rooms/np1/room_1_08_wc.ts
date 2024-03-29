import {room_1_06_obyvacka} from "./room_1_06_obyvacka";
import {frame, knxSwitch, point, Room, socket} from "../../types";

export const room_1_08_wc: Room = {
    id: "1.08",
    name: "WC",
    width: 100,
    height: 235,
    left: room_1_06_obyvacka.left + room_1_06_obyvacka.width + 15,
    top: room_1_06_obyvacka.top,
    leftWall: [
        frame(30, [knxSwitch("Q108.1", 1, {installed: false})], {installed: false, buried: false})
    ],
    topWall: [
        frame(10, [socket({ip: "IP44"})], {mirror: true})
    ],
    ceilingItems: [
        point("E108.1", 50, 60),
        point("E108.1", 50, 160),
    ]
};