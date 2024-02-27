import {allReportItems} from "./report";

type Row = {
    floor: number
    room: string
    name: string
}

const rows: Row[] = [...allReportItems()]
    .flatMap(item =>
        item.item.type === "KnxControl" ?
            [{
                floor: item.floor.name,
                room: item.room.name,
                name: item.item.name
            }] : [])
    .sort();

export function KnxSwitchReport() {
    return <table className={"table table-bordered table-sm"}>
        <thead>
        <tr>
            <th>nr.</th>
            <th>Poschodie</th>
            <th>Miestnost</th>
            <th>ID</th>
        </tr>
        </thead>
        <tbody>
        {rows.map((row, index) =>
            <tr>
                <td>{index + 1}</td>
                <td>{row.floor}</td>
                <td>{row.room}</td>
                <td>{row.name}</td>
            </tr>)}
        </tbody>
    </table>
}