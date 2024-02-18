import {Room} from "../../types";
import {room_2_07_wc} from "../np2/room_2_07_wc";
import {room_2_02_chodba} from "../np2/room_2_02_chodba";
import {room_2_04_herna} from "../np2/room_2_04_herna";
import {room_2_09_satnik} from "../np2/room_2_09_satnik";

export const room_3_01_podkrovie: Room = {
    id: "3.01",
    name: "Podkrovie",
    width: 400,
    height: 400,
    left: room_2_02_chodba.left + (room_2_02_chodba.width + 15 + room_2_09_satnik.width) / 2 - 200,
    top: room_2_07_wc.top + (room_2_07_wc.height + 15 + room_2_02_chodba.height + 25 + room_2_04_herna.height) / 2 - 200
};