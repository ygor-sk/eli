import {blinder, frame, knxSwitch, pyrSensor, Room, socket, special} from "../../types";
import {room_1_12_dielna} from "./room_1_12_dielna";

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
    leftWall: [],
    rightWall: [],
    topWall: [],
    bottomWall: [
        pyrSensor(0),
        frame(170, [socket()]),
        blinder(200, 150),
        blinder(360, 150),
        frame(520, [knxSwitch(8), knxSwitch(6)]),
        special(960, "Sirena"),
        special(1000, "Zvoncek")
    ],
};