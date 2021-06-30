import React, { useState } from 'react';

const dataRows = [
  {id: 100, name: 'john', family: 'blue', city: 'darwin', score: 500,},
  {id: 101, name: 'tom', family: 'hanson', city: 'sydney', score: 100,},
  {id: 102, name: 'jerry', family: 'larson', city: 'brisbane', score: 300,},
  {id: 103, name: 'peter', family: 'larson', city: 'melbourne', score: 200,},
  {id: 104, name: 'simon', family: 'larson', city: 'perth', score: 400,},
];

const dataColumns = [
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
    }
  },
  {
    property: 'city',
    header: {
      label: 'City',
    },
  },
  {
    property: 'score',
    header: {
      label: 'Score',
    },
  }
];

export function MyTable() {
  const [columnSortStatus, setColumnSortStatus] = useState({
    id: 'desc',
    name: 'asc',
    city: '',
  });

  const sortColumn = (columnProperty) => {
    if(columnSortStatus[columnProperty] === 'asc') {
      setColumnSortStatus({...columnSortStatus, [columnProperty]: 'desc'});
    } else if(columnSortStatus[columnProperty] === 'desc') {
      setColumnSortStatus({...columnSortStatus, [columnProperty]: 'asc'});
    } else {
      // default sort order
      setColumnSortStatus({...columnSortStatus, [columnProperty]: 'asc'});
    }
  };

  const renderHeader = () => {
    const result = [];

    for (let j = 0; j < dataColumns.length; j++) {
      const column = dataColumns[j];
      const sortStyle = {
        border: 0,
      };

      let sortButton = <button onClick={() => sortColumn(column.property)} style={sortStyle}>&#8597;</button>;
      if(columnSortStatus[column.property] === 'asc') {
        sortButton = <button onClick={() => sortColumn(column.property)} style={sortStyle}>&#8593;</button>;
      } else if (columnSortStatus[column.property] === 'desc') {
        sortButton = <button onClick={() => sortColumn(column.property)} style={sortStyle}>&#8595;</button>;
      }

      result.push(
        <th key={'h' + j.toString()}>{column.header.label}{sortButton}</th>
      );
    }
    return result;
  };

  const renderRows = () => {
    const result = [];

    for (let i = 0; i < dataRows.length; i++) {
      const row = dataRows[i];

      const cells = [];
      for (let j = 0; j < dataColumns.length; j++) {
        const column = dataColumns[j];
        const val = row[column.property];
        cells.push(<td key={'c' + j.toString()}>{val}</td>);
      }

      result.push(<tr key={'r' + i.toString()}>{cells}</tr>);
    }

    return result;
  };

  return (
    <table className="table table-striped table-bordered">
      <thead><tr>{renderHeader()}</tr></thead>
      <tbody>{renderRows()}</tbody>
    </table>
  );
}
