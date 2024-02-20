import {blinder, bulb, frame, knxSwitch, lan, point, pyrSensor, Room, socket, wallLight} from "../../types";
import {room_2_06_zadna} from "./room_2_06_zadna";
import {BOX_SIZE} from "../../render";

export const room_2_05_pracovna: Room = {
        id: "2.05",
        name: "Pracovna",
        width: 400,
        height: room_2_06_zadna.height,
        left: room_2_06_zadna.left + room_2_06_zadna.width + 15,
        top: room_2_06_zadna.top,
        leftWall: [
            frame(150, [lan(), socket(), socket()]),
        ],
        topWall: [
            frame(20, [lan(), socket(), socket(), socket(), socket()]),
            frame(320, [socket(), socket()]),
            pyrSensor(400 - BOX_SIZE - 2),
        ],
        rightWall: [
            frame(240, [socket(), socket(), socket(), socket(), lan()]),
            frame(120, [knxSwitch("Q205.1", 8)])
        ],
        bottomWall: [
            blinder("MZ205.1", 20, 100),
            blinder("MZ205.2", 130, 100),
            wallLight("Ext.1", 280, BOX_SIZE + 4)
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