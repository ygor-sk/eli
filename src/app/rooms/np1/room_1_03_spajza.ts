import {room_1_04_kuchyna} from "./room_1_04_kuchyna";

export const room_1_03_spajza = {
    id: "1.03",
    name: "Spajza",
    width: 160,
    height: 250,
    left: room_1_04_kuchyna.left + room_1_04_kuchyna.width,
    top: room_1_04_kuchyna.top + room_1_04_kuchyna.height - 250
};