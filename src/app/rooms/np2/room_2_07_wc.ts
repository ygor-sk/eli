import {room_2_01_schody} from "./room_2_01_schody";
import {frame, knxSwitch, point} from "../../types";

export const room_2_07_wc = {
    id: "2.07",
    name: "WC",
    width: 100,
    height: 235,
    left: room_2_01_schody.left + room_2_01_schody.width + 15,
    top: room_2_01_schody.top,
    leftWall: [
        frame(20, [knxSwitch(1)])
    ],
    ceilingItems: [
        point("207.1", 50, 60),
        point("207.1", 50, 160),
    ]
};