import {BOX_SIZE} from "../../render";
import {blinder, bulb, frame, knxSwitch, lan, pirSensor, point, Room, socket, wallLight} from "../../types";
import {room_1_06_obyvacka} from "../np1/room_1_06_obyvacka";

export const room_2_06_zadna: Room = {
    id: "2.06",
    name: "Zadna",
    nameOffset: {vertical: 120},
    width: 380,
    height: room_1_06_obyvacka.height,
    left: room_1_06_obyvacka.left,
    top: room_1_06_obyvacka.top,
    bottomWall: [
        frame(120, [
            lan("PC206b"), socket(), socket(), socket(), socket(),
        ]),
        blinder("MZ206.1", 50, 220),
        blinder("MZ206.2", 280, 80),
        wallLight("Ee1.5", 10, true),
        frame(30, [socket({ip: "IP44"})], {mirror: true}),
    ],
    leftWall: [
        frame(100, [socket(), socket()]),
        frame(250, [socket(), socket()]),
    ],
    topWall: [
        frame(300, [socket()]),
        pirSensor("PIR206", 380 - BOX_SIZE - 1, {installed: false}),
    ],
    rightWall: [
        frame(150, [
            lan("PC206a"), socket(), socket(), socket(),
        ]),
        frame(
            100,
            [knxSwitch("Q206.2", 8, {installed: false}),],
            {installed: false, buried: false})],
    ceilingItems: [
        bulb("2.06a", 190, 200),
        point("2.06b", 100, 100),
        point("2.06b", 280, 100),
        point("2.06b", 100, 300),
        point("2.06b", 280, 300),
    ]
};