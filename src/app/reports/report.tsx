import {floors} from "../floors";
import {Frame, KnxControl, Room} from "../types";

export function Report() {
    return <table>
        <tr>
            <th>room</th>
            <th>name</th>
        </tr>
        {knxSwitchReport.map(row =>
            <tr>
                <td>{row.room}</td>
                <td>{row.name}</td>
            </tr>)}
    </table>
}


type KnxSwitchReport = {
    room: string
    name: string
}

type KnxSwitchReportKeys = keyof KnxSwitchReport;

const wallItems = (room: Room) => [
    ...(room.rightWall || []),
    ...(room.leftWall || []),
    ...(room.topWall || []),
    ...(room.bottomWall || []),
]

function* frameItems(): Generator<{ room: Room, knxControl: KnxControl }> {
    for (const floor of floors) {
        for (const room of floor.rooms) {
            for (const wallItem of wallItems(room)) {
                if (wallItem.type === "Frame") {
                    for (const frameItem of wallItem.items) {
                        if (frameItem.type === "KnxControl") {
                            yield {room, knxControl: frameItem};
                        }
                    }
                }
            }
        }
    }
}

const knxSwitchReport: KnxSwitchReport[] = [...frameItems()].map(item => ({
    room: item.room.name,
    name: item.knxControl.name
})).sort();