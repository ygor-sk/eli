import {room_1_05_satnik} from "./room_1_05_satnik";
import {blinder, frame, knxSwitch, lan, pyrSensor, Room, socket, tunnel} from "../../types";
import {BOX_SIZE} from "../../render";

export const room_1_02_hostovska: Room = {
    id: "1.02",
    name: "Hostovska",
    width: 300,
    height: 385,
    left: room_1_05_satnik.left + room_1_05_satnik.width + 15,
    top: room_1_05_satnik.top,
    topWall: [
        frame(100, [knxSwitch(4)]),
        pyrSensor(0)
    ],
    rightWall: [
        frame(60, [socket()]),
        frame(300, [socket()]),
    ],
    bottomWall: [
        blinder(60, 180)
    ],
    leftWall: [
        frame(30, [socket()]),
        frame(100, [tunnel(), socket(), socket(), lan()]),
        frame(100, [tunnel(), socket(), socket(), socket(), socket()], -BOX_SIZE - 4),
    ]
};