import {room_2_09_satnik} from "./room_2_09_satnik";
import {blinder, bulb, frame, knxSwitch, socket, wallLight} from "../../types";

export const room_2_03_spalna = {
    id: "2.03",
    name: "Spalna",
    nameOffset: {vertical: 80},
    width: 350,
    height: 390,
    left: room_2_09_satnik.left + room_2_09_satnik.width - 350,
    top: room_2_09_satnik.top + room_2_09_satnik.height + 25,
    leftWall: [
        frame(300, [socket()])
    ],
    topWall: [
        frame(100, [knxSwitch("Q203.1", 4)])
    ],
    rightWall: [
        frame(60, [socket(), socket()]),
        frame(90, [knxSwitch("Q203.2", 2)]),
        wallLight("E203.2", 110),
        wallLight("E203.3", 260),
        frame(280, [knxSwitch("Q203.3", 2)]),
        frame(295, [socket(), socket()]),
    ],
    bottomWall: [
        blinder("MZ203.1", 60, 200),
        frame(30, [socket()])
    ],
    ceilingItems: [
        bulb("E203.1", 175, 200),
    ]
};