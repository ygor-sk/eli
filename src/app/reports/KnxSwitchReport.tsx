import {allItems} from "./report";

type Row = {
    floor: number
    room: string
    name: string
}

const rows: Row[] = [...allItems()]
    .flatMap(item =>
        item.item.type === "KnxControl" ?
            [{
                floor: item.floor.name,
                room: item.room.name,
                name: item.item.name
            }] : [])
    .sort();

export function KnxSwitchReport() {
    return <table>
        <tr>
            <th>Poschodie</th>
            <th>Miestnost</th>
            <th>ID</th>
        </tr>
        {rows.map(row =>
            <tr>
                <td>{row.floor}</td>
                <td>{row.room}</td>
                <td>{row.name}</td>
            </tr>)}
    </table>
}