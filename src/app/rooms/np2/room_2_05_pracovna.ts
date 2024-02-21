import {blinder, bulb, frame, knxSwitch, lan, pirSensor, point, Room, socket, wallLight} from "../../types";
import {room_2_06_zadna} from "./room_2_06_zadna";
import {BOX_SIZE} from "../../render";

export const room_2_05_pracovna: Room = {
        id: "2.05",
        name: "Pracovna",
        nameOffset: {vertical: 120},
        width: 400,
        height: room_2_06_zadna.height,
        left: room_2_06_zadna.left + room_2_06_zadna.width + 15,
        top: room_2_06_zadna.top,
        leftWall: [
            frame(150, [
                lan("PC205c", {missing: true}),
                socket({installedCover: false}),
                socket({installedCover: false}),
            ], {installed: false}),
        ],
        topWall: [
            frame(20, [
                lan("PC205b", {missing: true}),
                socket({installedCover: false}),
                socket({installedCover: false}),
                socket({installedCover: false}),
                socket({installedCover: false}),
            ], {installed: false}),
            frame(320, [socket(), socket()]),
            pirSensor("PIR205", 400 - BOX_SIZE - 2, {installed: false}),
        ],
        rightWall: [
            frame(240, [socket(), socket(), socket(), socket(), lan("PC205a")]),
            frame(120, [knxSwitch("Q205.1", 8)])
        ],
        bottomWall: [
            blinder("MZ205.1", 20, 100),
            blinder("MZ205.2", 130, 100),
            wallLight("Ee1.5", 280, true)
        ],
        ceilingItems: [
            bulb("E205.1", 200, 200),
            point("E205.2", 80, 80),
            point("E205.2", 320, 80),
            point("E205.2", 80, 320),
            point("E205.2", 320, 320),
        ]

    }
;