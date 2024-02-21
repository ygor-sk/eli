import {Room, wallLight} from "../../types";
import {room_1_08_wc} from "./room_1_08_wc";

export const room_1_07_kumbal: Room = {
    id: "1.07",
    name: "Kumbal",
    width: 200,
    height: 250 - 15,
    left: room_1_08_wc.left - 215,
    top: room_1_08_wc.top,
    leftBottomCorner: {height: 150, width: 100},
    bottomWall: [
        wallLight("1.07a", 150),
    ],
    rightWall: [
        wallLight("1.07a", 180),
    ],
};