import {allReportItems} from "./report";
import {KnxControl} from "../types";

type Row = {
    floor: number
    room: string
    name: string,
    knxType: KnxControl['knxType'],
    missing: boolean
}

const rows: Row[] = [...allReportItems()]
    .flatMap(item =>
        item.item.type === "KnxControl" ?
            [{
                floor: item.floor.name,
                room: item.room.name,
                name: item.item.name,
                knxType: item.item.knxType,
                missing: !item.item.options.installed,
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
            <th>Pocet tlacitok</th>
            <th>Status</th>
        </tr>
        </thead>
        <tbody>
        {rows.map((row, index) =>
            <tr>
                <td>{index + 1}</td>
                <td>{row.floor}</td>
                <td>{row.room}</td>
                <td>{row.name}</td>
                <td>{row.knxType}</td>
                <td className={row.missing ? "table-danger" : undefined}>{row.missing ? "chýba" : ""}</td>
            </tr>)}
        </tbody>
    </table>
}