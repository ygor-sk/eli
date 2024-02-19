import {blinder, frame, knxSwitch, Room, socket} from "../../types";
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
    leftWall: [
        frame(100, [socket(), socket(), knxSwitch(2)]),
        blinder(200, 80),
    ],
    rightWall: [
        frame(100, [socket(), knxSwitch(6), knxSwitch(2),])],
    topWall: [
        frame(100, [socket(), knxSwitch(6), knxSwitch(2)])],
    bottomWall: [],
};