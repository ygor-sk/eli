import {blinder, bulb, frame, knxSwitch, pyrSensor, Room, socket, wallLight} from "../../types";
import {BOX_SIZE} from "../../render";

export const room_1_12_dielna: Room = {
    id: "1.12",
    name: "Dielna",
    width: 315, height: 410,
    left: 0, top: 0,
    leftWall: [
        frame(100, [knxSwitch(2)]),
        frame(200, [socket(), socket()]),
        blinder("MZ112.1", 140, 200),
        wallLight("Ee1.6", 50, BOX_SIZE + 4)
    ],
    ceilingItems: [
        bulb("1.03a", 80, 100),
        bulb("1.03a", 240, 100),
        bulb("1.03a", 80, 300),
        bulb("1.03a", 240, 300),
    ],
    topWall: [
        frame(150, [socket(), socket()]),
    ],
    rightWall: [
        frame(200, [socket(), socket()]),
        frame(100, [knxSwitch(4)]),
        pyrSensor(0)
    ],
}