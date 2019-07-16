
import powerbi from "powerbi-visuals-api";
import DataView = powerbi.DataView;

import { AdvancedFilterConditionOperators, IFilterColumnTarget } from "powerbi-models"
import { interactivityFilterService } from "powerbi-visuals-utils-interactivityutils"
import extractFilterColumnTarget = interactivityFilterService.extractFilterColumnTarget;

export interface IFilterTableColumn {
    columnName: string;
    tableName: string;
}

export interface IFilterTableRow {
    column: IFilterTableColumn;
    displayColumn: IFilterTableColumn;
    condition?: AdvancedFilterConditionOperators;
    selectedValue: powerbi.PrimitiveValue;
    values: powerbi.PrimitiveValue[];
    enabled: boolean;
}

export interface IFilterTableConditions {
    rows: IFilterTableRow[];
}

export function parseData(datavew: DataView): IFilterTableConditions {
    const columns: powerbi.DataViewMetadataColumn[] = datavew.metadata.columns;
    
    const rows: IFilterTableRow[] = columns.map( (column: powerbi.DataViewMetadataColumn, index: number) => {
        const extractedTarget: IFilterColumnTarget = extractFilterColumnTarget(column);
        const values = [...new Set(datavew.table.rows.map( cols => cols[index] ))];
        return {
            column: {
                columnName: extractedTarget.column,
                tableName: extractedTarget.table
            },
            displayColumn: {
                columnName: column.displayName,
                tableName: column.queryName.split(".")[0]
            },
            condition: "Is",
            values: values,
            selectedValue: values[0],
            enabled: true
        } as IFilterTableRow;
    })

    return <IFilterTableConditions>{
        rows: rows
    }
}