import {room_2_03_spalna} from "./room_2_03_spalna";
import {BOX_SIZE} from "../../render";
import {blinder, bulb, frame, knxSwitch, lan, point, pirSensor, Room, socket, wallLight} from "../../types";

export const room_2_04_herna: Room = {
    id: "2.04",
    name: "Herna",
    nameOffset: {vertical: 80},
    width: 410,
    height: 390,
    left: room_2_03_spalna.left - 15 - 410,
    top: room_2_03_spalna.top,
    leftWall: [
        blinder("MZ204.2", 60, 180),
        blinder("MZ204.1", 250, 100),
        frame(100, [socket(), socket(), socket(), socket()]),
        frame(360, [knxSwitch("Q204.2", 4)]),
        wallLight("Ee2.1", 20, true),
        frame(40, [socket({ip: "IP44"})], {mirror: true})
    ],
    topWall: [
        frame(200, [
            socket({installedCover: false}),
            socket({installedCover: false}),
            socket({installedCover: false}),
            socket({installedCover: false}),
            lan("PC204a", {missing: true})], {installed: false}),
        frame(300, [knxSwitch("Q204.1", 4)]),
        pirSensor("PIR204", 410 - BOX_SIZE - 2, {installed: false}),
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