import {room_2_07_wc} from "./room_2_07_wc";
import {frame, knxSwitch, point, Room, socket, wallLight} from "../../types";

export const room_2_08_kupelna: Room = {
    id: "2.08",
    name: "Kupelna",
    nameOffset: {vertical: 80},
    width: 345,
    height: room_2_07_wc.height,
    left: room_2_07_wc.left + room_2_07_wc.width + 15,
    top: room_2_07_wc.top,
    leftWall: [
        frame(20, [socket()])
    ],
    bottomWall: [
        frame(90, [knxSwitch("Q208.1", 2)]),
        frame(110, [socket(), socket()]),
        wallLight("E208.2", 150),
        frame(300, [socket(), socket()]),
        wallLight("E208.2", 250),
    ],
    ceilingItems: [
        point("E208.1", 60, 110),
        point("E208.1", 160, 110),
        point("E208.1", 260, 110),
    ]
};