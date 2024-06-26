import {
    blinder,
    bulb,
    frame,
    knxSwitch,
    lan,
    pirSensor,
    point, rawCable,
    Room,
    socket,
    special,
    tunnel,
    wallLight
} from "../../types";
import {room_1_12_dielna} from "./room_1_12_dielna";
import {BOX_SIZE} from "../../render";

export const room_1_06_obyvacka: Room = {
    id: "1.06",
    name: "Obyvacka",
    width: 1025,
    height: 435,
    left: room_1_12_dielna.left,
    top: room_1_12_dielna.top + room_1_12_dielna.height + 40,
    rightTopCorner: {
        width: 215,
        height: 250
    },
    leftWall: [
        frame(40, [socket()]),
        blinder("MZ106.2", 100, 250),
        frame(390, [socket()]),
        pirSensor("PIR106.2", 0, {installed: false}),
    ],
    topWall: [
        frame(920, [knxSwitch("Q106.1", 6)], {offset: -250}),
        // special("Display", 780, {installed: false}),
        rawCable( 780, "Display"),
        frame(750, [socket()]),
        frame(480, [socket()]),
        frame(450, [knxSwitch("Q106.3", 4)]),
        frame(150, [lan("PC106a"), socket(), socket(), tunnel()]),
        frame(150 - 2 * BOX_SIZE, [socket(), socket(), socket(), socket()], {offset: -4 * BOX_SIZE}),
        frame(150 + 3 * BOX_SIZE, [tunnel()], {offset: -4 * BOX_SIZE}),
    ],
    bottomWall: [
        frame(170, [socket()]),
        frame(170, [socket({ip: "IP44"})], {mirror: true}),
        blinder("MZ106.3", 200, 150),
        blinder("MZ106.4", 360, 150),
        frame(520, [
            knxSwitch("Q106.4", 4),
            knxSwitch("Q106.2", 6)
        ]),
        frame(520, [
            knxSwitch("Q106.5", 1, {installed: false}),
        ], {mirror: true, installed: false}),
        special("Sirena", 970, {installed: false}),
        // special("Zvoncek", 990, {installed: false}),
        wallLight("Ee1.5", 10, true),
        wallLight("Ee1.4", 380 + 15 + 280, true),
        pirSensor("PIR106.1", 1010, {installed: false})
    ],
    ceilingItems: [
        bulb("E106.2", 160, 220),
        ...([0, 1, 2, 3].map(i => [
            point("E106.1", 100 + i * 200, 80),
            point("E106.1", 100 + i * 200, 340),
        ]).flat()),
        point("E106.4", 900, 340),
        ...([0, 1, 2].map(i =>
            bulb("E106.3", 600 + i * 40, 120)))
    ]
};