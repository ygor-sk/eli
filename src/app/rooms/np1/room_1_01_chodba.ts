import {room_1_08_wc} from "./room_1_08_wc";
import {bulb, special, frame, knxSwitch, point, pyrSensor, wallLight} from "../../types";
import {BOX_SIZE} from "../../render";

export const room_1_01_chodba = {
    id: "1.01",
    name: "Chodba",
    width: 460,
    height: 185,
    left: room_1_08_wc.left,
    top: room_1_08_wc.top + room_1_08_wc.height + 15,
    topWall: [
        pyrSensor(0)
    ],
    bottomWall: [
        frame(420, [knxSwitch("Q101.1", 4)]),
        special(360, "Display")
    ],
    rightWall: [
        wallLight("Ee1.2", 90, 0, true),
        frame(20, [knxSwitch("Q101.3", 4)], BOX_SIZE + 4),
    ],
    lights: [
        bulb("E101.1", 230, 90),
        point("E101.2", 130, 90),
        point("E101.2", 330, 90),
    ]
};