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
        wallLight("Ee2.1", 10, true),
        frame(30, [socket({ip: "IP44", installedHardware: false, installedCover: false})], {mirror: true, installed: false}),
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
            [knxSwitch("Q206.2", 8),],
            {buried: false})], // buried no ?
    ceilingItems: [
        bulb("E206.1", 190, 200),
        point("E206.2", 100, 100),
        point("E206.2", 280, 100),
        point("E206.2", 100, 300),
        point("E206.2", 280, 300),
    ]
};