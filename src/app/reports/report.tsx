import {floors} from "../floors";
import {CeilingItem, Floor, Frame, FrameItem, Room, WallItem} from "../types";


const wallItems = (room: Room) => [
    ...(room.rightWall || []),
    ...(room.leftWall || []),
    ...(room.topWall || []),
    ...(room.bottomWall || []),
]

export function* allItems(): Generator<{ floor: Floor, room: Room, frame: Frame | null, item: WallItem | FrameItem | CeilingItem }> {
    for (const floor of floors) {
        for (const room of floor.rooms) {
            for (const wallItem of wallItems(room)) {
                yield {floor, room, frame: null, item: wallItem}
                if (wallItem.type === "Frame") {
                    for (const frameItem of wallItem.items) {
                        yield {floor, room, frame: wallItem, item: frameItem};
                    }
                }
            }
            for (const ceilingItem of (room.ceilingItems || [])) {
                yield {floor, room, frame: null, item: ceilingItem}
            }
        }
    }
}

