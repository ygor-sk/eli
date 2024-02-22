import {allItemRows, missingItemRows,} from "./ItemsReport";
import _ from "lodash";

type ItemSummaryRow = {
    kind: string
    count: number
}

const allItemCounts = _.countBy(allItemRows, item => item.kind);
const allItemSummary: ItemSummaryRow[] = _.sortBy(Object.entries(allItemCounts)
    .map(([kind, count]) => ({kind, count})), x => x.kind);

const missingItemCounts = _.countBy(missingItemRows, item => item.kind);
const missingItemSummary: ItemSummaryRow[] = _.sortBy(Object.entries(missingItemCounts)
    .map(([kind, count]) => ({kind, count})), x => x.kind);

function ItemsReport(rows: ItemSummaryRow[]) {
    return <table className={"table table-bordered table-sm"}>
        <thead>
        <tr>
            <th>nr.</th>
            <th>Typ</th>
            <th>Pocet</th>
        </tr>
        </thead>
        <tbody>
        {rows.map((row, index) =>
            <tr>
                <td>{index + 1}</td>
                <td>{row.kind}</td>
                <td>{row.count}</td>
            </tr>)}
        </tbody>
    </table>
}


export const AllItemSummaryReport = () => ItemsReport(allItemSummary)
export const MissingItemSummaryReport = () => ItemsReport(missingItemSummary)