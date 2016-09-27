import React, { Component } from 'react';
import Button from '../app/components/Button/Button';

import './App.css';

class App extends Component {
  render(){
    return (
      <div className="app">
        <Button />
        <div className="tip"></div>
      </div>
    );
  }
}

export default App;