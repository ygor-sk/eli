import {Room} from "../../types";
import {room_1_06_obyvacka} from "../np1/room_1_06_obyvacka";

export const room_2_06_zadna: Room = {
    id: "2.06",
    name: "Zadna",
    width: 380,
    height: room_1_06_obyvacka.height,
    left: room_1_06_obyvacka.left,
    top: room_1_06_obyvacka.top,
    bottomWall: [
        {
            type: "Frame", position: 120, items: [
                {type: "Lan"}, {type: "Socket"}, {type: "Socket"}, {type: "Socket"}, {type: "Socket"},
            ],
        },
        { type: "Blinder", position: 30, size: 240},
        { type: "Blinder", position: 280, size: 80},
    ],
    leftWall: [
        {type: "Frame", position: 100, items: [{type: "Socket"}, {type: "Socket"}]},
        {type: "Frame", position: 250, items: [{type: "Socket"}, {type: "Socket"}]},
    ],
    topWall: [
        {type: "Frame", position: 300, items: [{type: "Socket"}]},
    ],
    rightWall: [
        {
            type: "Frame", position: 150, items: [
                {type: "Lan"}, {type: "Socket"}, {type: "Socket"}, {type: "Socket"},
            ],
        },
        {
            type: "Frame", position: 100, items: [
                {type: "Switch", buttons: 8,},
            ],
        }
    ],
    lights: [
        {type: "Bulb", circuit: "2.06a", left: 190, top: 200},
        {type: "Point", circuit: "2.06b", left: 100, top: 100},
        {type: "Point", circuit: "2.06b", left: 280, top: 100},
        {type: "Point", circuit: "2.06b", left: 100, top: 300},
        {type: "Point", circuit: "2.06b", left: 280, top: 300},
    ]
};