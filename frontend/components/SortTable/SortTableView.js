import React from 'react';
import SortTable from './SortTable';

const columns = [
{
    property: 'id',
    header: {
        label: 'ID'
    }
},
{
    property: 'name',
    header: {
        label: 'Name',
        sortConfig: {
            type: 'sortString',
            order: ''
        }
    }
},
{
    property: 'family',
    header: {
        label: 'Family',
        sortConfig: {
            type: 'sortString',
            order: ''
        }
    }
},
{
    property: 'city',
    header: {
        label: 'City',
        sortConfig: {
            type: 'sortString',
            order: ''
        }
    }
},
{
    property: 'score',
    header: {
        label: 'Score',
        sortConfig: {
            type: 'sortNumber',
            order: ''
        }
    }
}];

export default class SortTableView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    render() {
        return (
            <div>
                <h1>Sort Table</h1>
                <SortTable columns={columns} />
            </div>
        );
    }
}
