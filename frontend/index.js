import React from 'react';
import ReactDOM from 'react-dom';
import {MyTable,} from 'MyTable';

ReactDOM.render(
  <div className="container">
    <h2 className="center">Table:</h2>
    <MyTable />
  </div>,
  document.getElementById('app')
);
