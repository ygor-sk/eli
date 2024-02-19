import {
    blinder,
    bulb,
    frame,
    knxSwitch,
    lan,
    point,
    pyrSensor,
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
        blinder(100, 250),
        frame(390, [socket()]),
    ],
    topWall: [
        frame(920, [knxSwitch(6)], -250),
        frame(780, [socket()]),
        special(730, "Display"),
        frame(480, [socket()]),
        frame(450, [knxSwitch(4)]),
        frame(150, [lan(), socket(), socket(), tunnel()]),
        frame(150 - 2 * BOX_SIZE, [socket(), socket(), socket(), socket()], -BOX_SIZE - 4),
        frame(150 + 3 * BOX_SIZE, [tunnel()], -BOX_SIZE - 4),
    ],
    bottomWall: [
        pyrSensor(0),
        frame(170, [socket()]),
        blinder(200, 150),
        blinder(360, 150),
        frame(520, [knxSwitch(8), knxSwitch(6)]),
        special(960, "Sirena"),
        special(1000, "Zvoncek"),
        wallLight("Ee1.5", 10, BOX_SIZE + 4),
        wallLight("Ee1.4", 380 + 15 + 280, BOX_SIZE + 4),
    ],
    ceilingItems: [
        bulb("106.1", 160, 220),
        ...([0, 1, 2, 3].map(i => [
            point("106.3", 100 + i * 200, 80),
            point("106.3", 100 + i * 200, 340),
        ]).flat()),
        point("106.4", 900, 340),
        ...([0, 1, 2].map(i =>
            bulb("106.2", 600 + i * 40, 120)))
    ]
};