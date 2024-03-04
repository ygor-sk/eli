import {allReportItems} from "./report";
import {KnxControl} from "../types";
import {Action, actions} from "../knx/actions";
import {actors} from "../knx/actors";

type RowAction = {
    kind: string
    name: string
    position: any
    action: string,
    actors: string[]
};

type Row = {
    floor: number
    room: string
    name: string,
    // knxType: KnxControl['knxType'],
    missing: boolean,
    actions: RowAction[]
}

function findActions(sourceName: string): Action[] {
    return actions.filter(a => a.source.name === sourceName)
}

const rows: Row[] = [...allReportItems()].flatMap(item => {
    if (item.item.type === "KnxControl") {
        const actions = findActions(item.item.name);
        return [{
            floor: item.floor.name,
            room: item.room.name,
            name: item.item.name,
            // knxType: item.item.knxType,
            missing: !item.item.options.installed,
            actions: actions.map(mapToRowAction)
        }];
    }
    if (item.item.type === "Sensor") {
        const actions = findActions(item.item.circuit);
        return [{
            floor: item.floor.name,
            room: item.room.name,
            name: item.item.circuit,
            // knxType: 0,
            missing: !item.item.options.installed,
            actions: actions.map(mapToRowAction)
        }];
    }
    return [];
})
.sort();

function mapToRowAction(action: Action): RowAction {
    function position() {
        if (action.source.type === "KnxSwitch") {
            return action.source.position;
        }
        return "-"
    }

    if (action.target.type === "Lights") {
        return {
            name: action.target.names.join(", "),
            action: "zap/vyp",
            kind: "Svetlo",
            position: position(),
            actors: action.target.names.map(targetName => {
                return actors.find(actor => actor.circuits.find(c => c === targetName))?.name || "???"
            })
        }
    }
    if (action.target.type === "Blinder") {
        return {
            name: action.target.name,
            action: action.target.direction === "up" ? "Hore" : "Dole",
            kind: "Zaluzia",
            position: position(),
            actors: []
        }
    }
    return {name: "???", kind: "???", action: "???", position: "???", actors: []}
}

export function KnxSwitchReport() {
    return <table className={"table table-bordered table-sm"}>
        <thead>
        <tr>
            <th>nr.</th>
            <th>Poschodie</th>
            <th>Miestnost</th>
            <th>ID</th>
            <th>Pozicia</th>
        </tr>
        </thead>
        <tbody>
        {rows.map((row, index) => {
            return row.actions.map(action => {
                return <tr>
                    <td>{index + 1}</td>
                    <td>{row.floor}</td>
                    <td>{row.room}</td>
                    <td className={row.missing ? "table-danger" : undefined}>{row.name}</td>
                    <td>{action.position}</td>
                    <td>{action.kind}</td>
                    <td>{action.name}</td>
                    <td>{action.action}</td>
                    <td className={action.actors.find(a => a === "???") ? "table-danger" : undefined}>{action.actors.join(", ")}</td>
                </tr>;

            })
        })}
        </tbody>
    </table>
}