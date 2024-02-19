import {room_1_09_sprcha} from "./room_1_09_sprcha";
import {frame, Room, socket} from "../../types";

export const room_1_10_technicka: Room = {
    id: "1.10",
    name: "Technicka",
    width: 210,
    height: 235,
    left: room_1_09_sprcha.left + room_1_09_sprcha.width + 15,
    top: room_1_09_sprcha.top,
    leftWall: [
        frame(150, [socket()]),
        frame(200, [socket()]),
    ],
    rightWall: [
        frame(150, [socket()]),
    ],
};