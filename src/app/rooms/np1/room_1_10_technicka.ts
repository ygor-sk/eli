import {room_1_09_sprcha} from "./room_1_09_sprcha";
import {frame, knxSwitch, point, Room, socket, wallLight} from "../../types";

export const room_1_10_technicka: Room = {
    id: "1.10",
    name: "Technicka",
    width: 210,
    height: 235,
    left: room_1_09_sprcha.left + room_1_09_sprcha.width + 15,
    top: room_1_09_sprcha.top,
    leftWall: [
        frame(130, [socket({ip: "IP44", installedCover: false})], {installed: false}),
        frame(180, [socket({ip: "IP44", installedCover: false})], {installed: false}),
    ],
    rightWall: [
        frame(200, [socket({ip: "IP44", installedCover: false})], {installed: false}),
    ],
    bottomWall: [
        frame(100, [knxSwitch("Q110.1", 1, {installed: false})], {installed: false})
    ],
    topWall: [
        wallLight("Ee1.1", 180, true)
    ],
    ceilingItems: [
        point("110.1", 70, 80),
        point("110.1", 140, 80),
    ]
};