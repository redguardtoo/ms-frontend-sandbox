# ReactJS Table Sorting task #

## Task outline ##
To build a table with multi column sort function as shown below:

![Table Sample](/images/table.png)
               
## Requirements ## 
-	Ensure each column has 3 different states: `(unsorted, sorted-ascending, sorted-descending)`.

*Note: When multiple columns are selected for sorting data, numerical indicators will show the column sort order. (see screenshots below, numerical indicators in orange).*
-	Apply column sorting via the table header.
-	Provide the ability to sort the table data by one or multiple columns.
-	**Sorting algorithm should be implemented in `vanilla javascript` without using any third party library**

Following images show expected implementation:

1) Initial run for the default data

![Table Sample](/images/table_initial.png)


2) After clicking on the ‘family’ column for the first time, it should be the primary sort in ascending order

![Table Sample](/images/table_sort_asc.png)

3) After clicking on the ‘family’ column for second time it will remain the primary sort, but changes to descending order

![Table Sample](/images/table_sort_desc.png)

4) After clicking on the ‘family’ column for third time, it becomes unsorted

![Table Sample](/images/table_sort_multi.png)

NOTE: the above applies to all columns, ‘family’ was just an example

5) And finally, after holding the **Ctrl key** down and clicking on the score, city and name in order, `‘score’ is primary sort(1), ‘city’ secondary sort(2) and ‘name’ third(3)`

## Checklist before submitting code
- Please use [vanilla javascript API `sort`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) to implement sorting algorithm
- Change code in `frontend/components/MyTable/` and it should be unit tested by running `npm test`.
- Please only use the libraries specified in `package.json` to finish the task (no new dependencies)
- Take a screenshot of finished component and send to us, along with your code (zip or github link)

## Usage
Run `npm install && npm start` will:
- Compile the code into dev version
- Start the dev web server

The root directory of the running application is at `frontend-dist`, relative to this README.

You can open `http://127.0.0.1:3333/webpack-dev-server/` or `http://127.0.0.1:3333/` in browser.

When you update the code, the **code is automatically deployed and browser is updated automatically**. So you basically need do nothing if you use `npm start` to start the server.

***

## Coding Style

### General

Code indentation is two spaces for JS/JSX.

Keep an eye on console output (the command line window where you run npm commands) from time to time. Any issue is automatically checked and reported there. Make sure zero problem is reported.

### Javascript
Keep javascript code clean and easy to read. So don't use syntactic sugar simply because you can. In the meantime, you do have the full freedom to use any syntax babel compiler supports.

The key point is to be practical and avoid over engineering. For example, it's better to write the redux reducer in its simplest form without extra function wrapper. If there are many reducers rules for one component, it's fine to place those rules inside a function or even an independent js file. But the better solution is to re-design the component so it expose less API to external environment.
