import {Floor} from "./types";
import {room_1_04_kuchyna} from "./rooms/np1/room_1_04_kuchyna";
import {room_1_03_spajza} from "./rooms/np1/room_1_03_spajza";
import {room_1_06_obyvacka} from "./rooms/np1/room_1_06_obyvacka";
import {room_1_12_dielna} from "./rooms/np1/room_1_12_dielna";
import {room_1_05_satnik} from "./rooms/np1/room_1_05_satnik";
import {room_1_02_hostovska} from "./rooms/np1/room_1_02_hostovska";
import {room_1_08_wc} from "./rooms/np1/room_1_08_wc";
import {room_1_09_sprcha} from "./rooms/np1/room_1_09_sprcha";
import {room_1_10_technicka} from "./rooms/np1/room_1_10_technicka";
import {room_1_01_chodba} from "./rooms/np1/room_1_01_chodba";
import {room_1_13_garaz} from "./rooms/np1/room_1_13_garaz";
import {room_1_11_kumbal} from "./rooms/np1/room_1_11_kumbal";
import {room_2_06_zadna} from "./rooms/np2/room_2_06_zadna";
import {room_2_05_pracovna} from "./rooms/np2/room_2_05_pracovna";
import {room_2_01_schody} from "./rooms/np2/room_2_01_schody";
import {room_2_07_wc} from "./rooms/np2/room_2_07_wc";
import {room_2_02_chodba} from "./rooms/np2/room_2_02_chodba";
import {room_2_08_kupelna} from "./rooms/np2/room_2_08_kupelna";
import {room_2_09_satnik} from "./rooms/np2/room_2_09_satnik";
import {room_2_03_spalna} from "./rooms/np2/room_2_03_spalna";
import {room_2_04_herna} from "./rooms/np2/room_2_04_herna";
import {room_3_01_podkrovie} from "./rooms/np3/room_3_01_podkrovie";
import {room_1_07_kumbal} from "./rooms/np1/room_1_07_kumbal";
import {room_2_10_sklep} from "./rooms/np2/room_2_10_sklep";

export const np_1: Floor = {
    name: "np1",
    rooms: [
        room_1_01_chodba,
        room_1_02_hostovska,
        room_1_03_spajza,
        room_1_04_kuchyna,
        room_1_05_satnik,
        room_1_06_obyvacka,
        room_1_07_kumbal,
        room_1_08_wc,
        room_1_09_sprcha,
        room_1_10_technicka,
        room_1_11_kumbal,
        room_1_12_dielna,
        room_1_13_garaz,
    ]
}

export const np_2: Floor = {
    name: "np2",
    rooms: [
        room_2_01_schody,
        room_2_02_chodba,
        room_2_03_spalna,
        room_2_04_herna,
        room_2_05_pracovna,
        room_2_06_zadna,
        room_2_07_wc,
        room_2_08_kupelna,
        room_2_09_satnik,
        room_2_10_sklep,
    ]
}

export const np_3: Floor = {
    name: "np3",
    rooms: [
        room_3_01_podkrovie,
    ]
}

export const floors: Floor[] = [np_1, np_2, np_3];