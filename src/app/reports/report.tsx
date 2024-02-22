import {floors} from "../floors";
import {CeilingItem, Floor, Frame, FrameItem, Room, Socket, SocketCover, SocketHardware, WallItem} from "../types";


const wallItems = (room: Room) => [
    ...(room.rightWall || []),
    ...(room.leftWall || []),
    ...(room.topWall || []),
    ...(room.bottomWall || []),
]

type ReportItem = {
    floor: Floor,
    room: Room,
    item: WallItem | FrameItem | CeilingItem | SocketHardware| SocketCover
    frame?: Frame,
    socket?: Socket,
};

export function* allItems(): Generator<ReportItem> {
    for (const floor of floors) {
        for (const room of floor.rooms) {
            for (const wallItem of wallItems(room)) {
                yield {floor, room, item: wallItem}
                if (wallItem.type === "Frame") {
                    for (const frameItem of wallItem.items) {
                        yield {floor, room, frame: wallItem, item: frameItem};
                        if (frameItem.type === "Socket") {
                            yield {floor, room, frame: wallItem, item: frameItem.hardware}
                            yield {floor, room, frame: wallItem, item: frameItem.cover}
                        }
                    }
                }
            }
            for (const ceilingItem of (room.ceilingItems || [])) {
                yield {floor, room, item: ceilingItem}
            }
        }
    }
}

