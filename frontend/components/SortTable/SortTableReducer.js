import update, {
    extend
} from 'immutability-helper';
import {
    combineReducers
} from 'redux';

function sortOrderUpdate(order) {
    let status;
    if (order === '') {
        status = 'asc';
    } else if (order === 'asc') {
        status = 'desc';
    } else if (order === 'desc') {
        status = '';
    }
    return status;
}

function updateCta(storeState, data) {
    let itemData = storeState.columns[data.index];
    let existingItemIndex;
    const existingItem = storeState.cta
        .find((item, i) => {
            if (item.key === itemData.property) {
                existingItemIndex = i;
                return item;
            }
        });

    const sortFn = {
        sortNumber: sortNumber,
        sortString: sortString
    };

    let storeItemAs = {
        key: itemData.property,
        fn: sortFn[data.header.sortConfig.type],
        order: itemData.header.sortConfig.order,
        keydown: itemData.keydown,
        data: []
    };

    let result;

    if (existingItem) {
        if (data.keydown) {
            result = update(storeState, {
                cta: {
                    [existingItemIndex]: {
                        order: {
                            $set: itemData.header.sortConfig.order
                        },
                        keydown: {
                            $set: itemData.keydown
                        }
                    }
                }
            })
        } else {
            result = update(
                storeState, {
                    cta: {
                        $set: [storeItemAs]
                    }
                }
            );
        }
    } else {
        result = update(
            storeState, {
                cta: {
                    $push: [storeItemAs]
                }
            }
        );
    }

    result = update(
        result, {
            cta: {
                [0]: {
                    data: {
                        $set: storeState.rows
                    }
                }
            }
        }
    );

    return result;
}

function updateColumns(storeState, data) {
    return update(storeState, {
        columns: {
            [data.index]: {
                header: {
                    sortConfig: {
                        order: {
                            $set: sortOrderUpdate(
                                data.header.sortConfig.order
                            )
                        }
                    }
                }
            }
        }
    });
}

function sortNumber(a, b, key, order) {
    return order === 'desc' ?
        (b[key] - a[key]) :
        (a[key] - b[key]);
}

function sortString(a, b, key, order) {
    const x = a[key].toLowerCase();
    const y = b[key].toLowerCase();

    return order === 'desc' ?
        (x < y ? 1 : x > y ? -1 : 0) :
        (x < y ? -1 : x > y ? 1 : 0);
}

function sortFn(data, toSort, toSortBy) {
    return data
        .sort(function(a, b) {
            if (toSortBy) {
                if (toSortBy && a[toSort.key] === b[toSort.key]) {
                    return toSortBy.fn(a, b, toSortBy.key, toSortBy.order);
                }
            } else {
                return toSort.fn(a, b, toSort.key, toSort.order);
            }
        });
}

function sortColumn(arrayActions) {
    return arrayActions
        .reduce(function(acc, curr, index) {
            const result = {};
            const toSort = {
                key: acc.key,
                fn: acc.fn,
                order: acc.order
            };
            const toSortBy = {
                key: curr.key,
                fn: curr.fn,
                order: curr.order
            };
            const applyArg = [acc.data, toSort];

            if (index > 0) {
                applyArg.push(toSortBy);
            }

            Object.assign(result, curr);

            result.data = sortFn.apply(null, applyArg);

            return result;
        }, arrayActions[0]);
}

function updateRows(storeState) {
    console.log(storeState.cta);

    return update(storeState, {
        rows: {
            $set: sortColumn(storeState.cta).data
        }
    });
}

export function SortTableReducer(storeState = {
    cta: [],
    columns: [],
    rows: []
}, action) {
    switch (action.type) {
        case 'SORT_TABLE_COLUMN_UPDATE':
            let result = updateColumns(storeState, action.data);

            result = updateCta(
                result,
                action.data
            );

            result = updateRows(result);

            return result;
            break;
        default:
            return storeState
    }
}

export default SortTableReducer;
