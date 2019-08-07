import React from "react";
import * as Table from "reactabular-table";

import * as sort from "sortabular";
import orderBy from "lodash/orderBy";
import * as resolve from "table-resolver";
import { compose } from "redux";

import styles from "./SampleTable.Module.css";

const initialRows = [
  { id: 100, name: "Abraham", family: "Blue", city: "SYD", score: 500 },
  { id: 101, name: "Jack", family: "Hanson", city: "SYD", score: 100 },
  { id: 102, name: "Joe", family: "Black", city: "BNE", score: 300 },
  { id: 103, name: "Dwayne", family: "Johnson", city: "MEL", score: 200 },
  { id: 104, name: "Pieter", family: "Pan", city: "PER", score: 400 },
  { id: 105, name: "Jack", family: "Hemsworth", city: "SYD", score: 700 }
];

export default class SampleTable extends React.Component {
  constructor(props) {
    super(props);
    const cities = {
      SYD: "Sydney",
      PER: "Perth",
      BNE: "Brisbane",
      MEL: "Melbourne",
      DRW: "Darwin"
    };

    const getSortingColumns = () => this.state.sortingColumns || {};
    const sortable = sort.sort({
      getSortingColumns,
      onSort: selectedColumn => {
        this.setState({
          sortingColumns: sort.byColumns({
            sortingColumns: this.state.sortingColumns,
            selectedColumn
          })
        });
      },

      // Use property strategy over index one given we have nested data
      strategy: sort.strategies.byProperty
    });
    const resetable = sort.reset({
      event: "onDoubleClick",
      getSortingColumns,
      onReset: ({ sortingColumns }) => this.setState({ sortingColumns }),
      strategy: sort.strategies.byProperty
    });

    this.state = {
      columns: [
        {
          property: "id",
          header: {
            label: "ID"
          }
        },
        {
          property: "name",
          header: {
            label: "Name",
            transforms: [resetable],
            formatters: [
              sort.header({
                sortable,
                getSortingColumns,
                strategy: sort.strategies.byProperty
              })
            ]
          }
        },
        {
          property: "family",
          header: {
            label: "Family",
            transforms: [resetable],
            formatters: [
              sort.header({
                sortable,
                getSortingColumns,
                strategy: sort.strategies.byProperty
              })
            ]
          }
        },
        {
          property: "city",
          header: {
            label: "City",
            transforms: [resetable],
            formatters: [
              sort.header({
                sortable,
                getSortingColumns,
                strategy: sort.strategies.byProperty
              })
            ]
          },
          cell: {
            formatters: [city => cities[city]]
          }
        },
        {
          property: "score",
          header: {
            label: "Score",
            transforms: [resetable],
            formatters: [
              sort.header({
                sortable,
                getSortingColumns,
                strategy: sort.strategies.byProperty
              })
            ]
          }
        }
      ],

      // Sort the first column in a descending way by default.
      // "asc" would work too and you can set multiple if you want.
      sortingColumns: {
        name: {
          direction: "asc",
          position: 0
        }
      },
      rows: initialRows
    };
  }

  render() {
    const { rows, sortingColumns, columns } = this.state;
    const resolvedColumns = resolve.columnChildren({ columns });
    const sortedRows = compose(
      sort.sorter({
        columns: resolvedColumns,
        sortingColumns,
        sort: orderBy,
        strategy: sort.strategies.byProperty
      }),
      resolve.resolve({
        columns: resolvedColumns,
        method: resolve.nested
      })
    )(rows);
    return (
      <div>
        <Table.Provider
          columns={resolvedColumns}
          className="table table-striped table-bordered"
        >
          <Table.Header headerRows={resolve.headerRows({ columns })} />

          <Table.Body rows={sortedRows} rowKey="id" />
        </Table.Provider>
      </div>
    );
  }
}
