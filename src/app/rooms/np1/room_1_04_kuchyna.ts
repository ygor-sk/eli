import {room_1_06_obyvacka} from "./room_1_06_obyvacka";
import {
    blinder,
    bulb,
    frame,
    knxSwitch,
    pirSensor,
    point,
    rawCable,
    Room,
    smoke,
    socket,
    wallLight
} from "../../types";

export const room_1_04_kuchyna: Room = {
    id: "1.04",
    name: "Kuchyna",
    nameOffset: {vertical: 100},
    width: 300,
    height: 385,
    left: room_1_06_obyvacka.left + 652 + 38 + 35,
    top: room_1_06_obyvacka.top + room_1_06_obyvacka.height + 30,
    topWall: [
        pirSensor("PIR104", 285, {installed: false})
    ],
    leftWall: [
        frame(130, [socket()]),
        rawCable(220, "kuch.doska"),
        frame(
            350,
            [knxSwitch("Q104.2", 8)]
        ),
        blinder("MZ104.2", 80, 170),
        blinder("MZ104.1", 260, 80),
        wallLight("Ee1.3", 30, true),
        frame(50, [socket({ip: "IP44"})], {mirror: true}),
    ],
    bottomWall: [
        frame(10, [socket(), socket(), socket(), socket()]),
        frame(100, [socket()]),
        rawCable(120, "var.doska"),
        frame(140, [socket()]),
        rawCable(170, "digestor"),
        frame(
            210,
            [
                knxSwitch("Q104.3", 2), // todo: installed cover false
                socket(), socket(), socket(), socket()
            ]
        ),
        wallLight("E104.3", 285)
    ],
    ceilingItems: [
        bulb("E104.2", 100, 180),
        bulb("E104.2", 200, 180),
        point("E104.1", 50, 60),
        point("E104.1", 150, 60),
        point("E104.1", 250, 60),
        point("E104.1", 50, 180),
        point("E104.1", 50, 300),
        point("E104.1", 150, 300),
        point("E104.1", 250, 300),
        smoke("DYM", 250, 180, {installed: false})
    ]
};