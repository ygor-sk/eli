import {room_1_08_wc} from "./room_1_08_wc";
import {frame, knxSwitch, point, Room, socket, wallLight} from "../../types";

export const room_1_09_sprcha: Room = {
    id: "1.09",
    name: "Sprcha",
    width: 120,
    height: 235,
    left: room_1_08_wc.left + room_1_08_wc.width + 15,
    top: room_1_08_wc.top,
    leftWall: [
        frame(20, [socket({ip: "IP44"})]),
        wallLight("109.2", 100)
    ],
    bottomWall: [
        frame(30, [knxSwitch("Q109.1", 2, {installed: false})], {installed: false})
    ],
    ceilingItems: [
        point("E109.1", 60, 60),
        point("E109.1", 60, 160),
    ]
};