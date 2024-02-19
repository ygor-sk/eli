import {room_2_03_spalna} from "./room_2_03_spalna";
import {BOX_SIZE} from "../../render";
import {blinder, bulb, frame, knxSwitch, lan, point, pyrSensor, Room, socket, wallLight} from "../../types";

export const room_2_04_herna: Room = {
    id: "2.04",
    name: "Herna",
    nameOffset: {vertical: 80},
    width: 410,
    height: 390,
    left: room_2_03_spalna.left - 15 - 410,
    top: room_2_03_spalna.top,
    leftWall: [
        blinder(60, 180),
        blinder(250, 100),
        frame(100, [socket(), socket(), socket(), socket()]),
        frame(360, [knxSwitch(4)]),
        wallLight("Ext.1", 30, BOX_SIZE + 4)
    ],
    topWall: [
        frame(200, [socket(), socket(), socket(), socket(), lan()]),
        frame(300, [knxSwitch(4)]),
        pyrSensor(410 - BOX_SIZE - 2),
    ],
    bottomWall: [
        frame(350, [socket()])
    ],
    ceilingItems: [
        bulb("E204.1", 200, 200),
        point("E204.2", 80, 80),
        point("E204.2", 80, 230),
        point("E204.2", 200, 320),
        point("E204.2", 350, 320),
    ]
};