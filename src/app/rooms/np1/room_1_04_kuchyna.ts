import {room_1_06_obyvacka} from "./room_1_06_obyvacka";
import {blinder, bulb, frame, knxSwitch, point, pyrSensor, rawCable, Room, socket, wallLight} from "../../types";
import {BOX_SIZE} from "../../render";

export const room_1_04_kuchyna: Room = {
    id: "1.04",
    name: "Kuchyna",
    nameOffset: {vertical: 100},
    width: 300,
    height: 385,
    left: room_1_06_obyvacka.left + 652 + 38 + 35,
    top: room_1_06_obyvacka.top + room_1_06_obyvacka.height + 30,
    topWall: [
        pyrSensor(200)
    ],
    leftWall: [
        frame(130, [socket()]),
        rawCable(220),
        frame(350, [knxSwitch(8)]),
        blinder("MZ104.2", 50, 200),
        blinder("MZ104.1", 260, 80),
        wallLight("Ee1.3", 30, BOX_SIZE + 4),
    ],
    bottomWall: [
        frame(10, [socket(), socket(), socket(), socket()]),
        frame(100, [socket()]),
        rawCable(120),
        frame(140, [socket()]),
        rawCable(160),
        frame(220, [knxSwitch(2), socket(), socket(), socket(), socket()]),
    ],
    ceilingItems: [
        bulb("1.04a", 100, 180),
        bulb("1.04a", 200, 180),
        point("1.04b", 50, 60),
        point("1.04b", 150, 60),
        point("1.04b", 250, 60),
        point("1.04b", 50, 300),
        point("1.04b", 150, 300),
        point("1.04b", 250, 300),
    ]
};