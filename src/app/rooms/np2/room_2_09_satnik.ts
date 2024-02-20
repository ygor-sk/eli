import {room_2_02_chodba} from "./room_2_02_chodba";
import {frame, knxSwitch, point, socket} from "../../types";

export const room_2_09_satnik = {
    id: "2.09",
    name: "Satnik",
    nameOffset: {vertical: 80},
    width: 210,
    height: room_2_02_chodba.height,
    left: room_2_02_chodba.left + room_2_02_chodba.width + 15,
    top: room_2_02_chodba.top,
    bottomWall: [
        frame(100, [knxSwitch("Q209.1", 1)]),
        frame(120, [socket()]),
    ],
    ceilingItems: [
        point("E209.1", 60, 90),
        point("E209.1", 160, 90),
    ]
};