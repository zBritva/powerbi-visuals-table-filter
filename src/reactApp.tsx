
import React from "react";
import { VisualSettings } from "./settings"
import { IFilterTableConditions, IFilterTableRow } from "./dataparser";

const conditionTypes: string[] = [
    "None" , "LessThan" , "LessThanOrEqual" , "GreaterThan" , "GreaterThanOrEqual" , "Contains" , "DoesNotContain" , "StartsWith" , "DoesNotStartWith" , "Is" , "IsNot" , "IsBlank" , "IsNotBlank"];

export interface IConditionsTableProps {
    settings: VisualSettings;
    conditionUpdateReceiver?: (receiver: (conditions: IFilterTableConditions) => void) => void;
}

export interface IConditionsTableState {
    conditions: IFilterTableConditions;
}

export class FilterTableApp extends React.Component<IConditionsTableProps, IConditionsTableState> {

    conditionsUpdateHandler(conditions: IFilterTableConditions) {
        this.setState({
            conditions: conditions
        });
    };

    constructor(props: IConditionsTableProps) {
        super(props);
        if (props.settings.savedFilter._value) {
            this.state = {
                conditions: this.props.settings.savedFilter.value
            }    
        }
        this.state = {
            conditions: {
                rows: []
            }
        }
        this.props.conditionUpdateReceiver(this.conditionsUpdateHandler.bind(this));
    }

    render = () => {
        const { settings: VisualSettings } = this.props;

        return (
                <div className="container-fluid">
                    {/* info bar */}
                    <div className="alert alert-danger alert-dismissible" role="alert" data-dismiss="alert">
                        Advanced conditions isn't supported by Power BI. Visual can give wrong filter on updates of data.
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    {/* content header */}
                    {
                        <div className="row justify-content-start">
                            {this.props.settings.displayTableName.show ? <div className="col">
                                {"Table names"}
                            </div> : null}
                            <div className="col">
                                {"Column names"}
                            </div>
                            {this.props.settings.advancedConditions.show ? 
                            <div className="col">
                                {"Conditions"}
                            </div> : null }
                            <div className="col">
                                {"Values"}
                            </div>
                        </div>
                    }
                    {/* content table */}
                    {
                        this.state.conditions.rows.map((value: IFilterTableRow) => {
                            return (<div className="row justify-content-start content">
                                {this.props.settings.displayTableName.show ? <div className="col">
                                    {value.column.tableName}
                                </div> : null}
                                <div className="col">
                                    {value.column.columnName}
                                </div>
                                {this.props.settings.advancedConditions.show ? 
                                <div className="col">
                                    {value.enabled ? 
                                    
                                    <div className="dropdown">
                                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            { value.condition }
                                        </button>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            { conditionTypes.map(val => {
                                                if (value.condition === val) {
                                                    return (<button type="button" className="dropdown-item active  btn-sm" > { val }</button >)
                                                } else {
                                                    return (<button type="button" className="dropdown-item  btn-sm" > { val }</button >)
                                                }
                                            }) }
                                        </div>
                                    </div>
                                        
                                    : null}
                                    
                                </div> : null }
                                <div className="col">
                                    <div className="dropdown">
                                        <button className="btn btn-secondary dropdown-toggle btn-sm" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            { value.selectedValue }
                                        </button>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            { value.values.map(val => {
                                                if (value.selectedValue === val) {
                                                    return (<button type="button" className="dropdown-item active  btn-sm" > { val }</button >)
                                                } else {
                                                    return (<button type="button" className="dropdown-item  btn-sm" > { val }</button >)
                                                }
                                            }) }
                                        </div>
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <button type="button" className="btn btn-danger btn-sm">Remove</button>
                                </div>
                            </div>)
                        })
                    }
                    {/* buttons bar */}
                    <div className="row justify-content-end  no-gutters">
                        <div className="col-auto">
                            <button type="button" className="btn btn-primary btn-sm">Add</button>
                        </div>
                        <div className="col-auto">
                            <button type="button" className="btn btn-info btn-sm">Apply</button>
                        </div>
                        <div className="col-auto">
                            <button type="button" className="btn btn-success btn-sm">Save</button>
                        </div>
                    </div>
                </div>
        );
    }
}
