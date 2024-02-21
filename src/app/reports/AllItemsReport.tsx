import {allItems} from "./report";

type Row = {
    floor: string
    room: string
    name: string
}

const rows: Row[] = [...allItems()]
    .flatMap(item => {
        function getColumns() {
            switch (item.item.type) {
                case "Frame":
                    return "Ramcek-" + item.item.items.length;
                case "PirSensor":
                    return "PIR senzor";
                case "Special":
                    return item.item.name;
                case "KnxControl":
                    return "KNX vypinac - " + item.item.knxType + "x";
                case "Socket":
                    return "Zasuvka " + item.item.options.ip;
                case "Lan":
                    return "Zasuvka LAN";
                case "Tunnel":
                    return "Tunel";
                case "Sensor":
                    return "Senzor - pohyb";
                case "Smoke":
                    return "Senzor - dym";
            }
        }

        let kind = getColumns();

        return kind ?
            [{
                floor: item.floor.name,
                room: item.room.name,
                name: kind
            }] : [];
    })
    .sort();

export function AllItemsReport() {
    return <table className={"table table-bordered"}>
        <thead>
        <tr>
            <th>Poschodie</th>
            <th>Miestnost</th>
            <th>ID</th>
        </tr>
        </thead>
        <tbody>
        {rows.map(row =>
            <tr>
                <td>{row.floor}</td>
                <td>{row.room}</td>
                <td>{row.name}</td>
            </tr>)}
        </tbody>
    </table>
}