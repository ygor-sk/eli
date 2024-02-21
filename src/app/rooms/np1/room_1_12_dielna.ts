import {blinder, bulb, frame, knxSwitch, pirSensor, Room, socket, wallLight} from "../../types";
import {BOX_SIZE} from "../../render";

export const room_1_12_dielna: Room = {
    id: "1.12",
    name: "Dielna",
    width: 315, height: 410,
    left: 0, top: 0,
    leftWall: [
        frame(
            100,
            [knxSwitch("Q112.1", 4, undefined, {installed: false})],
            0, false, {installed: false}
            ),
        frame(
            120,
            [knxSwitch("Q112.2", 2, undefined, {installed: false})], 0            ,
            true, {installed: false}),
        frame(200, [socket(), socket()]),
        blinder("MZ112.1", 140, 200),
        wallLight("Ee1.6", 50, true)
    ],
    topWall: [
        frame(150, [socket(), socket()]),
    ],
    rightWall: [
        frame(200, [socket(), socket()]),
        frame(100, [knxSwitch("Q112.1", 4)]),
        pirSensor("PIR112", 0, {installed: false}),
    ],
    ceilingItems: [
        bulb("1.03a", 80, 100),
        bulb("1.03a", 240, 100),
        bulb("1.03a", 80, 300),
        bulb("1.03a", 240, 300),
    ],
}