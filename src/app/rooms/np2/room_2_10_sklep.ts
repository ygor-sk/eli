import {room_1_13_garaz} from "../np1/room_1_13_garaz";
import {wallLight} from "../../types";

export const room_2_10_sklep = {
    id: "2.10",
    name: "Sklep",
    width: room_1_13_garaz.width,
    height: room_1_13_garaz.height,
    left: room_1_13_garaz.left,
    top: room_1_13_garaz.top,
    bottomWall: [
        wallLight("E113.3", 150),
        wallLight("E113.3", 450),
    ]
};