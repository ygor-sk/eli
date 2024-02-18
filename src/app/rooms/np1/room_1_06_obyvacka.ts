import {Room} from "../../types";
import {room_1_12_dielna} from "./room_1_12_dielna";

export const room_1_06_obyvacka: Room = {
    id: "1.06",
    name: "Obyvacka",
    width: 1025,
    height: 435,
    left: room_1_12_dielna.left,
    top: room_1_12_dielna.top + room_1_12_dielna.height + 40,
    rightTopCorner: {
        width: 215,
        height: 250
    },
    leftWall: [
        {
            type: "Frame",
            position: 100,
            items: [
                {type: "Socket"},
                {type: "Socket"},
                {type: "Switch", buttons: 2},
            ]
        },
        {type: "Blinder", position: 200, size: 80},
    ],
    rightWall: [
        {
            type: "Frame",
            position: 100,
            items: [
                {type: "Socket"},
                {type: "Switch", buttons: 6},
                {type: "Switch", buttons: 2},
            ]
        }
    ],
    topWall: [
        {
            type: "Frame",
            position: 100,
            items: [
                {type: "Socket"},
                {type: "Switch", buttons: 6},
                {type: "Switch", buttons: 2},
            ]
        }
    ],
    bottomWall: [
        {
            type: "Frame",
            position: 100,
            items: [
                {type: "Socket"},
                {type: "Switch", buttons: 6},
                {type: "Switch", buttons: 2},
            ]
        }
    ],
};