import {allReportItems} from "./report";

type ItemRow = {
    floor: number
    roomId: string
    roomName: string
    kind: string
    id: string
    missing: boolean
}

export const allItemRows: ItemRow[] = [...allReportItems()]
    .flatMap(reportItem => {
        function getColumns(): Omit<ItemRow, "floor" | "roomId" | "roomName"> | undefined {
            const item = reportItem.item;
            switch (item.type) {
                case "Frame":
                    return {
                        kind: "Ramik - " + item.items.length + (item.options.buried ? "" : " - nadomietkovy"),
                        missing: !item.options.installed,
                        id: ""
                    };
                case "PirSensor":
                    return {kind: "PIR senzor", missing: !item.options.installed, id: item.name};
                case "Special":
                    return {kind: item.name, missing: !item.options.installed, id: item.name};
                case "KnxControl":
                    return {
                        kind: "KNX spinac - " + item.knxType + " tlacidla",
                        missing: !item.options.installed,
                        id: item.name
                    };
                case "SocketHardware":
                    return {kind: "Zasuvka - strojcek", missing: !item.options.installed, id: ""};
                case "SocketCover":
                    return {kind: "Zasuvka - kryt " + item.options.ip, missing: !item.options.installed, id: ""};
                case "Lan":
                    return {kind: "Zasuvka LAN", missing: item.options.missing, id: item.name};
                case "Tunnel":
                    return {kind: "Tunel", missing: false, id: ""};
                case "Sensor":
                    return {kind: "Senzor - pohyb", missing: !item.options.installed, id: item.circuit};
                case "Smoke":
                    return {kind: "Senzor - dym", missing: !item.options.installed, id: item.circuit};
            }
        }

        const columns = getColumns();
        return columns ?
            [{
                floor: reportItem.floor.name,
                roomId: reportItem.room.id,
                roomName: reportItem.room.name,
                ...columns
            }] : [];
    });

export const missingItemRows: ItemRow[] = allItemRows.filter(item => item.missing);

function ItemsReport(rows: ItemRow[]) {
    return <table className={"table table-bordered table-sm"}>
        <thead>
        <tr>
            <th>nr.</th>
            <th>Poschodie</th>
            <th>Miestnost</th>
            <th>Miestnost</th>
            <th>Typ</th>
            <th>ID</th>
            <th>Status</th>
        </tr>
        </thead>
        <tbody>
        {rows.map((row, index) =>
            <tr className={row.missing ? "table-danger" : undefined}>
                <td>{index + 1}</td>
                <td>{row.floor}</td>
                <td>{row.roomId}</td>
                <td>{row.roomName}</td>
                <td>{row.kind}</td>
                <td>{row.id}</td>
                <td>{row.missing ? "chýba" : ""}</td>
            </tr>)}
        </tbody>
    </table>
}

export const AllItemsReport = () => ItemsReport(allItemRows);
export const MissingItemsReport = () => ItemsReport(missingItemRows);