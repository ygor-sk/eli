import {frame, knxSwitch, pirSensor, point, Room, socket} from "../../types";
import {room_2_05_pracovna} from "./room_2_05_pracovna";
import {room_2_01_schody} from "./room_2_01_schody";

export const room_2_02_chodba: Room = {
    id: "2.02",
    name: "Chodba",
    nameOffset: {vertical: -80},
    width: 465,
    height: 185,
    left: room_2_05_pracovna.left + room_2_05_pracovna.width + 15,
    top: room_2_01_schody.top + room_2_01_schody.height,
    topWall: [
        frame(215, [knxSwitch("Q202.1", 1, {installed: false})], {installed: false})
    ],
    rightWall: [
        pirSensor("PIR202", 0, {installed: false})
    ],
    bottomWall: [
        frame(325, [knxSwitch("Q202.2", 1, {installed: false})], {installed: false}),
        frame(160, [socket()]),
        frame(100, [socket({name: "202.2"})]),
    ],
    ceilingItems: [
        point("E202.1", 50, 90),
        point("E202.1", 220, 90),
        point("E202.1", 380, 90),
    ]
};