import {room_2_09_satnik} from "./room_2_09_satnik";

export const room_2_03_spalna = {
    id: "2.03",
    name: "Spalna",
    width: 350,
    height: 390,
    left: room_2_09_satnik.left + room_2_09_satnik.width - 350,
    top: room_2_09_satnik.top + room_2_09_satnik.height + 25
};