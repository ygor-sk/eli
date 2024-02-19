import {room_1_08_wc} from "./room_1_08_wc";
import {bulb, display, frame, knxSwitch, point, pyrSensor} from "../../types";

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
        frame(420, [knxSwitch(4)]),
        display(360)
    ],
    lights: [
        bulb("1.01a", 230, 90),
        point("1.01b", 130, 90),
        point("1.01b", 330, 90),
    ]
};