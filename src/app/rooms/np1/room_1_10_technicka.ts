import {room_1_09_sprcha} from "./room_1_09_sprcha";
import {frame, knxSwitch, point, Room, socket} from "../../types";

export const room_1_10_technicka: Room = {
    id: "1.10",
    name: "Technicka",
    width: 210,
    height: 235,
    left: room_1_09_sprcha.left + room_1_09_sprcha.width + 15,
    top: room_1_09_sprcha.top,
    leftWall: [
        frame(130, [socket()]),
        frame(180, [socket()]),
    ],
    rightWall: [
        frame(200, [socket()]),
    ],
    bottomWall: [
        frame(100, [knxSwitch(1)])
    ],
    ceilingItems: [
        point("1.10a", 70, 80),
        point("1.10a", 140, 80),
    ]
};