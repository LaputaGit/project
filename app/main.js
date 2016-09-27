'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// import Button from './component/Button/Button';
import App from '../container/App';

// class HelloWorld extends Component {
//   render(){
//     return (
//       <h1>hehe leisiwole</h1>
//     )
//   }
// }

// ReactDOM.render(<HelloWorld />, document.getElementById('app'));
// ReactDOM.render(<Button />, document.getElementById('app'));

let root = document.getElementById('app');
ReactDOM.render( <App />, root );