import {bulb, Room} from "../../types";

export const room_1_12_dielna: Room = {
    id: "1.12",
    name: "Dielna",
    width: 315, height: 410,
    left: 0, top: 0,
    lights: [
        bulb("1.03a", 80, 100),
        bulb("1.03a", 270, 100),
        bulb("1.03a", 80, 300),
        bulb("1.03a", 270, 300),
    ]
};