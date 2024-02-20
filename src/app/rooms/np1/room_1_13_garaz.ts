import {room_1_12_dielna} from "./room_1_12_dielna";
import {bulb, frame, knxSwitch, pirSensor, rawCable, Room, socket, special, wallLight} from "../../types";
import {BOX_SIZE} from "../../render";

export const room_1_13_garaz: Room = {
    id: "1.13",
    name: "Garaz",
    width: 640,
    height: 410,
    left: room_1_12_dielna.left + room_1_12_dielna.width + 15,
    top: room_1_12_dielna.top,
    leftBottomCorner: {
        width: 115,
        height: 155
    },
    rightWall: [
        wallLight("Ee1.1", 380, 0, true)
    ],
    leftWall: [
        frame(100, [knxSwitch("Q113.1", 2)], -115),
        special(120, "Display", -115),
    ],
    bottomWall: [
        frame(180, [socket(), socket()]),
        rawCable(440, "El.auto"),
        rawCable(500, "400V"),
        frame(580, [socket(), socket()]),
        wallLight("113.2", 540),
        frame(600, [knxSwitch("Q113.2", 6)]),
        pirSensor("PIR113", 640 - BOX_SIZE)
    ],
    topWall: [
        wallLight("113.2", 540)
    ],
    ceilingItems: [
        bulb("113.1", 240, 100),
        bulb("113.1", 240, 300),
    ]
};