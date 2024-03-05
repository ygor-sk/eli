import {room_1_04_kuchyna} from "./room_1_04_kuchyna";
import {frame, knxSwitch, point, Room} from "../../types";

export const room_1_05_satnik: Room = {
    id: "1.05",
    name: "Satnik",
    nameOffset: {vertical: 80},
    width: 145,
    height: 120,
    left: room_1_04_kuchyna.left + room_1_04_kuchyna.width + 15,
    top: room_1_04_kuchyna.top,
    topWall: [
        frame(
            120,
            [knxSwitch("Q105.1", 2, {installed: false})],
            {installed: false}
        )
    ],
    ceilingItems: [
        point("E105.1", 45, 60),
        point("E105.1", 100, 60),
    ]
};