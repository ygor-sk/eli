import {room_1_08_wc} from "./room_1_08_wc";
import {bulb, frame, knxSwitch, pirSensor, point, Room, special, wallLight} from "../../types";

export const room_1_01_chodba: Room = {
    id: "1.01",
    name: "Chodba",
    nameOffset: {vertical: 90},
    width: 460,
    height: 185,
    left: room_1_08_wc.left,
    top: room_1_08_wc.top + room_1_08_wc.height + 15,
    topWall: [
        pirSensor("PIR101", 0)
    ],
    bottomWall: [
        frame(420, [knxSwitch("Q101.1", 4)]),
        special("Display", 360)
    ],
    rightWall: [
        wallLight("Ee1.2", 90, true),
        frame(20, [knxSwitch("Q101.3", 2)], 0, true),
    ],
    ceilingItems: [
        bulb("E101.1", 230, 90),
        point("E101.2", 130, 90),
        point("E101.2", 330, 90),
    ]
};