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

## Data ##
-	Please create JSON mock data following screenshot above. (You can change the data values to whatever you like to aid testing the sort).


## Checklist before submitting code
- Please use [vanilla javascript API `sort`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) to implement sorting algorithm
- Components are placed in `frontend/components/` and it should be unit tested by running `npm run test`. See `MSNotification.test.js` for sample). In summary, for component `YourComponent`, you should provide us `YourComponent.js` at "frontend/components/YourComponent/" and `YourComponent.test.js` at "frontend/test/"
- Please only use the libraries specified in `package.json` to finish the task (no new dependencies)
- Make sure statements like `console.log` or `debugger` is removed
- Take a screenshot of finished component and send to us, along with your code (zip or github link)
- Please use APIs from `CommonUtil.js`

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
We use javascript [ES2015](https://babeljs.io/docs/learn-es2015/) and [JSX](https://facebook.github.io/react/docs/jsx-in-depth.html) in javascript files. The ES2015 javascript is compiled into ES5 by [Babel](https://babeljs.io/).

Keep javascript code clean and easy to read. So don't use syntactic sugar simply because you can. In the meantime, you do have the full freedom to use any syntax babel compiler supports.

The key point is to be practical and avoid over engineering. For example, it's better to write the redux reducer in its simplest form without extra function wrapper. If there are many reducers rules for one component, it's fine to place those rules inside a function or even an independent js file. But the better solution is to re-design the component so it expose less API to external environment.

### React
In `import` statement, the path should be relative to the current file or the root directory `frontend/components`. Here are two examples:
```javascript
// relative to current file
import { fetchComponentData } from './util.js';
// relative to root
import { fetchComponentData } from 'fetchData/fetchData.js';
```
Root is defined in webpack.config.js `resolve` section.

We prefer the path relative to root.

But relative to current file is OK if the path is not **relative** to the parent directory. In other words, ".." must NOT appear in the path.

Front end components are placed at `frontend/components`:
- A component could inherit from other component
- A component could import another component
- A component is a directory containing JS files
- See `frontend/components/MSFormInput` for example
- We use third party UI components from react-bootstrap. If your new component is to inherit from or override a react-bootstrap component. Your component name should comply with react-bootstrap naming convention. For example, if a component type is button, its name **must** end with "Button"
- Make your code DRY (Don't Repeat Yourself) is encouraged. But avoid over-engineering by creating too many tiny components

Here is a component `YourComponentName.js` using redux,
```javascript
import React from 'react';
import { connect } from 'react-redux';
// Optional

export class YourComponentName extends React.Component {
  componentDidMount() {
  }

  constructor(props) {
    super(props);
    this.state = {
    };
    this.clickMe = this.clickMe.bind(this);
  }

  clickMe() {
    alert('clickMe() called');
  }

  render() {
    return (
      <div>
        <h1>hello</h1>
        <button onClick={this.clickMe}>Click Me</button>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return({
    callDistpach: () {
      dispatch({
        type: 'EVT_GET_CASHFORECAST',
        date: true
      });
    }
  });
}
export default connect(
  function (storeState) {
    // store state to props
    return {
    };
  },
  mapDispatchToProps
)(YourComponentName);
```

If your component is simple (a button, for example) which does NOT use redux, here is the minimum code(note keyword "default"),
```javascript
import React from 'react';
export default class YourComponentName extends React.Component {
  render() {
    return (
      <h1>hello</h1>
    );
  }
}
```
