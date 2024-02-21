import {room_1_05_satnik} from "./room_1_05_satnik";
import {blinder, bulb, frame, knxSwitch, lan, pirSensor, Room, socket, tunnel} from "../../types";
import {BOX_SIZE} from "../../render";

export const room_1_02_hostovska: Room = {
    id: "1.02",
    name: "Hostovska",
    nameOffset: {vertical: 100},
    width: 300,
    height: 385,
    left: room_1_05_satnik.left + room_1_05_satnik.width + 15,
    top: room_1_05_satnik.top,
    topWall: [
        frame(100, [knxSwitch("Q102.1", 4)]),
        pirSensor("PIR102", 0, {installed: false})
    ],
    rightWall: [
        frame(60, [socket()]),
        frame(300, [socket()]),
    ],
    bottomWall: [
        blinder("MZ102.1", 60, 180)
    ],
    leftWall: [
        frame(30, [socket()]),
        frame(100, [tunnel(), socket(), socket(), lan("PC102a")]),
        frame(100, [tunnel(), socket(), socket(), socket(), socket()], {offset: -4 * BOX_SIZE}),
    ],
    ceilingItems: [
        bulb("E102.1", 150, 190)
    ]
};