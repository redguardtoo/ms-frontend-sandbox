import React from 'react';
import {
    connect
} from 'react-redux';
import * as Table from 'reactabular-table';

import tableData from './SortTableData';
import {
    SortTableColumnReducer
} from './SortTableReducer';

export class SortTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keydown: false
        };
        this.handleSortTableClick = this.handleSortTableClick.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleSortTableClick(data) {
        data.keydown = this.state.keydown;
        this.props.sortColumnUpdate(data);
    }

    handleKeyDown(e) {
        console.log(e);
        if (e.keyCode === 91) {
            this.setState({
                keydown: true
            });
        }
    }

    handleKeyUp(e) {
        if (e.keyCode === 91) {
            this.setState({
                keydown: false
            });
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('keyup', this.handleKeyUp);
    }

    render() {
        return (
            <div>
                <table className="table table-striped table-bordered">
                    <TableHeader columns={this.props.columns} onClick={this.handleSortTableClick} />
                    <TableBody rows={this.props.data} />
                </table>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const SortTableColumnReducer = state.app.SortTableReducer.columns;
    const SortTableRowsReducer = state.app.SortTableReducer.rows;
    const SortTableCtaReducer = state.app.SortTableReducer.cta;

    state.app.SortTableReducer = {
        columns: SortTableColumnReducer.length ? SortTableColumnReducer : ownProps.columns,
        rows: SortTableRowsReducer.length ? SortTableRowsReducer : tableData,
        cta: SortTableCtaReducer.length ? SortTableCtaReducer : []
    };

    return {
        columns: state.app.SortTableReducer.columns,
        data: state.app.SortTableReducer.rows,
        cta: state.app.SortTableReducer.cta
    };
}

function mapDispatchToProps(dispatch) {
    return ({
        sortColumnUpdate: (data) => {
            dispatch({
                type: 'SORT_TABLE_COLUMN',
                data: data
            });
            return dispatch({
                type: 'SORT_TABLE_COLUMN_UPDATE',
                data: data
            });
        }
    });
}

function TableHeader(props) {
    return (
        <thead>
            <tr>
                {
                    props.columns.map((rowItem, i)=>{
                        const status = {
                            '': '-',
                            'asc': '^',
                            'desc': 'V'
                        };
                        let stateDisplay;

                        const rowItemProps = {
                            key:i
                        }

                        if(i){
                            rowItemProps.onClick = ()=>{
                                rowItem.index = i;
                                props.onClick(rowItem);
                            }

                            stateDisplay = status[rowItem.header.sortConfig.order];
                        }
                        return (<th {...rowItemProps}>{rowItem.header.label} {stateDisplay}</th>);
                    })
                }
            </tr>
        </thead>
    );
}

function TableBody(props) {
    return (
        <tbody>
        {
            props.rows.map((rowItem, key)=>{
                return (
                    <tr key={key}>
                        {
                            Object.keys(rowItem).map((k, i)=>{
                                return (
                                    <td key={i}>{rowItem[k]}</td>
                                 );
                            })    
                        }
                    </tr>
                )
            })
        }
        </tbody>
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SortTable);
