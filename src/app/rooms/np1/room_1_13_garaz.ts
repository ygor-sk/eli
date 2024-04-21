import {room_1_12_dielna} from "./room_1_12_dielna";
import {bulb, frame, knxSwitch, pirSensor, rawCable, Room, socket, special, wallLight} from "../../types";
import {BOX_SIZE} from "../../render";

export const room_1_13_garaz: Room = {
    id: "1.13",
    name: "Garaz",
    width: 640,
    height: 410,
    left: room_1_12_dielna.left + room_1_12_dielna.width + 15,
    top: room_1_12_dielna.top,
    leftBottomCorner: {
        width: 115,
        height: 155
    },
    rightWall: [
        wallLight("Ee1.1", 380, true),
        special("ovl.brany/plot", 200, {offset: 170, installed: true}), // nie je brana
        rawCable(200,"brana/plot", {offset: 250}),
        rawCable(240,"pivnica", {offset: 250, installed: false}),
        rawCable(260,"studna", {offset: 250}),
        rawCable(280,"zahrada", {offset: 250, installed: false}),
        frame(200, [socket({

            ip: "IP44"
        })], {offset: -400, buried: false})
    ],
    leftWall: [
        frame(100, [knxSwitch("Q113.1", 4)], {offset: -115}),
        special("Klavesnica", 120, {offset: -115, installed: false}),
        special("ovl.garaz brany", 200, {offset: -140}),
    ],
    bottomWall: [
        frame(180, [socket(), socket()]),
        rawCable(440, "El.auto"),
        special("400V_box", 460, {installed: false, offset: -50}),
        rawCable(460, "400V"),
        wallLight("E113.2", 500), // todo 113.1
        frame(540, [socket(), socket()]),
        frame(600, [knxSwitch("Q113.2", 6)]),
        pirSensor("PIR113", 640 - BOX_SIZE - 1, {installed: false}),
    ],
    topWall: [
        wallLight("E113.2", 500) // todo 113.1
    ],
    ceilingItems: [
        bulb("E113.1", 240, 100),
        bulb("E113.1", 240, 300),
    ]
};